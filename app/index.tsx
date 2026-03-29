import React, { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Dimensions, Pressable, DimensionValue, Text, ScrollView, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, clamp } from 'react-native-reanimated';
import CustomHeader from '../components/CustomHeader';
import SearchBar from '../components/SearchBar';
import MapMarker from '../components/MapMarker';
import LocationCard from '../components/LocationCard';
import CustomTabBar from '../components/CustomTabBar';
import MapBackground from '../components/MapBackground';
import { Colors, Typography } from '../constants/Theme';
import { SITES, SiteData } from '../constants/Sites';
import { useLanguage } from '../context/LanguageContext';


const { width, height } = Dimensions.get('window');
const MAP_WIDTH = width * 3.5;
const MAP_HEIGHT = height * 3.0;

export default function Index() {
  const router = useRouter();
  const { t, locale } = useLanguage();
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>('maya_devi');
  const [searchQuery, setSearchQuery] = useState('');


  // Center Maya Devi (85%, 50%) initially
  const initialX = 0;
  const initialY = -((0.85 * MAP_HEIGHT) - (MAP_HEIGHT / 2));

  const translateX = useSharedValue(initialX);
  const translateY = useSharedValue(initialY);
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const savedTranslateX = useSharedValue(initialX);
  const savedTranslateY = useSharedValue(initialY);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = clamp(savedTranslateX.value + event.translationX, -MAP_WIDTH / 2, MAP_WIDTH / 2);
      translateY.value = clamp(savedTranslateY.value + event.translationY, -MAP_HEIGHT / 2, MAP_HEIGHT / 2);
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = clamp(savedScale.value * event.scale, 0.5, 3.0);
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const getMarkerPosition = (id: string): { top: number; left: number } => {
    switch (id) {
      case 'utility_buspark': return { top: 35, left: 50 };
      case 'utility_helipad': return { top: 27, left: 42 };
      case 'utility_helipad_2': return { top: 24, left: 45 };
      case 'office_ldt': return { top: 94, left: 75 };
      case 'monastery_nava_maitri': return { top: 92, left: 62 };
      case 'maya_devi': return { top: 85, left: 50 };
      case 'pillar_ashoka': return { top: 84, left: 40 };
      case 'puskarini_pond': return { top: 82, left: 65 };
      case 'peace_flame': return { top: 70, left: 52 };
      case 'museum': return { top: 30, left: 65 };
      case 'institute_research': return { top: 28, left: 72 };
      case 'center_meditation_intl': return { top: 22, left: 78 };
      case 'pagoda_peace': return { top: 10, left: 45 };
      case 'monastery_thai': return { top: 60, left: 70 };
      case 'monastery_thai_old': return { top: 65, left: 75 };
      case 'monastery_myanmar': return { top: 55, left: 68 };
      case 'monastery_cambodia': return { top: 50, left: 72 };
      case 'monastery_lanka': return { top: 45, left: 78 };
      case 'monastery_india': return { top: 55, left: 82 };
      case 'monastery_canada': return { top: 62, left: 85 };
      case 'monastery_singapore': return { top: 48, left: 88 };
      case 'pagoda_golden': return { top: 58, left: 62 };
      case 'monastery_chinese': return { top: 60, left: 30 };
      case 'monastery_german': return { top: 55, left: 25 };
      case 'stupa_lotus': return { top: 58, left: 20 };
      case 'monastery_korean': return { top: 40, left: 28 };
      case 'monastery_japan': return { top: 45, left: 22 };
      case 'monastery_vietnam': return { top: 35, left: 15 };
      case 'monastery_france': return { top: 30, left: 12 };
      case 'monastery_austria': return { top: 25, left: 18 };
      case 'monastery_nepal': return { top: 42, left: 40 };
      case 'monastery_urgen': return { top: 48, left: 35 };
      case 'monastery_russia': return { top: 52, left: 38 };
      case 'monastery_bangladesh': return { top: 38, left: 35 };
      case 'vihara_dharma': return { top: 32, left: 25 };
      case 'center_meditation': return { top: 45, left: 55 };
      case 'monastery_kudan': return { top: 15, left: 20 };
      default: return { top: 50, left: 50 };
    }
  };

  const handleSiteSelection = useCallback((siteId: string) => {
    setSelectedSiteId(siteId);
    setSearchQuery('');

    const site = SITES[siteId];
    if (site) {
      const pos = getMarkerPosition(site.id);
      const mx = (pos.left / 100) * MAP_WIDTH;
      const my = (pos.top / 100) * MAP_HEIGHT;

      const targetX = -(mx - MAP_WIDTH / 2);
      // Offset Y by -80 to push marker slightly above center (accounting for LocationCard)
      const targetY = -(my - MAP_HEIGHT / 2) - 80;

      translateX.value = withTiming(targetX);
      translateY.value = withTiming(targetY);
      savedTranslateX.value = targetX;
      savedTranslateY.value = targetY;
      scale.value = withTiming(1.6);
      savedScale.value = 1.6;
    }

    Keyboard.dismiss();
  }, []);

  const handleMarkerPress = (siteId: string) => handleSiteSelection(siteId);

  const handleBackgroundPress = () => {
    setSelectedSiteId(null);
    setSearchQuery('');
  };

  const handleSearchSelect = (site: SiteData) => handleSiteSelection(site.id);

  const selectedSite = useMemo(() => selectedSiteId ? SITES[selectedSiteId] : null, [selectedSiteId]);

  const filteredSites = useMemo(() => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase();
    return Object.values(SITES).filter(site =>
      site.title.toLowerCase().includes(query) ||
      site.titleNe.toLowerCase().includes(query) ||
      site.category.toLowerCase().includes(query) ||
      site.location.toLowerCase().includes(query) ||
      site.locationNe.toLowerCase().includes(query)
    ).slice(0, 5);
  }, [searchQuery]);


  const markers = useMemo(() => Object.values(SITES).map((site) => {
    const pos = getMarkerPosition(site.id);
    const id = site.id;

    // Dim markers that don't match search if searching
    const query = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery ||
      site.title.toLowerCase().includes(query) ||
      site.titleNe.toLowerCase().includes(query) ||
      site.category.toLowerCase().includes(query);


    return (
      <MapMarker
        key={id}
        iconName={
          site.id.includes('helipad') ? 'helicopter' :
            (site.id.includes('buspark') ? 'bus' :
              (id.includes('bank') ? 'bank' :
                (id.includes('atm') ? 'card-account-details' :
                  (id.includes('pillar') ? 'pillar' :
                    (id.includes('museum') ? 'bank' :
                      (id.includes('monastery') || id.includes('maya_devi') || id.includes('temple') ? 'dharmachakra' :
                        (id.includes('flame') ? 'fire' :
                          (id.includes('pagoda') ? 'bank' : 'bank'))))))))
        }
        image={id === 'maya_devi' ? require('../assets/images/Maya Devi Temple.jpg') : undefined}
        isMuseum={id.includes('museum')}
        label={locale === 'ne' ? site.titleNe : site.title}
        top={(pos.top + '%') as DimensionValue}

        left={(pos.left + '%') as DimensionValue}
        size={id.includes('utility') ? 40 : 44}
        color={
          site.id.includes('helipad') ? '#3498DB' :
            (id.includes('utility') ? '#2ECC71' :
              (id.includes('maya_devi') ? '#D988B9' :
                (id.includes('thai') ? '#85C1E9' :
                  (id.includes('chinese') ? '#E74C3C' :
                    (id.includes('german') ? '#F39C12' :
                      (id.includes('korean') ? '#9B59B6' : '#2E4A4A'))))))
        }
        highlighted={selectedSiteId === id}
        onPress={() => handleMarkerPress(id)}
      />
    );
  }), [selectedSiteId, searchQuery]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <GestureDetector gesture={composedGesture}>
          <Animated.View style={[styles.mapContainer, animatedStyle]}>
            <Pressable style={{ width: '100%', height: '100%' }} onPress={handleBackgroundPress}>
              <MapBackground />
              {markers}
            </Pressable>
          </Animated.View>
        </GestureDetector>

        <View style={styles.overlay} pointerEvents="box-none">
          <CustomHeader />
          <View style={styles.searchContainer}>
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              onClear={() => setSearchQuery('')}
              onVoicePress={() => console.log('Voice search activated')}
              placeholder={t('search_placeholder')}
            />

            {filteredSites.length > 0 && (
              <View style={styles.searchResults}>
                <ScrollView keyboardShouldPersistTaps="handled">
                  {filteredSites.map(site => (
                    <TouchableOpacity
                      key={site.id}
                      style={styles.searchItem}
                      onPress={() => handleSearchSelect(site)}
                    >
                      <MaterialCommunityIcons
                        name={site.category === 'SACRED SITE' ? 'dharmachakra' : 'castle'}
                        size={20}
                        color={Colors.primary}
                      />
                      <View style={styles.searchItemText}>
                        <Text style={styles.searchItemTitle}>{locale === 'ne' ? site.titleNe : site.title}</Text>
                        <Text style={styles.searchItemCategory}>{site.category}</Text>
                      </View>

                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          <View style={styles.rightControls}>
            <TouchableOpacity style={styles.controlButton}>
              <MaterialCommunityIcons name="cube-outline" size={24} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton}>
              <MaterialCommunityIcons name="layers-outline" size={24} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.controlButton, styles.locationButton]}
              onPress={() => {
                translateX.value = withTiming(0);
                translateY.value = withTiming(0);
                scale.value = withTiming(1);
                savedTranslateX.value = 0;
                savedTranslateY.value = 0;
                savedScale.value = 1;
                setSelectedSiteId(null);
                setSearchQuery('');
              }}
            >
              <MaterialCommunityIcons name="crosshairs-gps" size={24} color={Colors.natural} />
            </TouchableOpacity>
          </View>

          <View style={styles.content} pointerEvents="box-none">
            <View style={styles.spacer} pointerEvents="none" />
            {selectedSite ? <LocationCard site={selectedSite} /> : null}
          </View>
        </View>
        <CustomTabBar />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.natural,
    overflow: 'hidden',
  },
  mapContainer: {
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    position: 'absolute',
    left: -(MAP_WIDTH - width) / 2,
    top: -(MAP_HEIGHT - height) / 2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
  searchContainer: {
    zIndex: 100,
  },
  searchResults: {
    backgroundColor: 'rgba(25, 25, 25, 0.95)',
    marginHorizontal: 24,
    marginTop: -5,
    borderRadius: 20,
    maxHeight: 250,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    gap: 12,
  },
  searchItemText: {
    flex: 1,
  },
  searchItemTitle: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: Typography.headline,
  },
  searchItemCategory: {
    color: Colors.gray,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
    marginTop: 2,
  },
  rightControls: {
    position: 'absolute',
    right: 24,
    top: '35%',
    gap: 16,
    zIndex: 30,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  locationButton: {
    backgroundColor: '#FFBE9D',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 110,
  },
  spacer: {
    flex: 1,
  },
});
