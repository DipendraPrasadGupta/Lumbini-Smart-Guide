import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import VoiceGuide from '../components/VoiceGuide';
import MonumentCard from '../components/MonumentCard';
import CustomTabBar from '../components/CustomTabBar';
import { Colors, Typography } from '../constants/Theme';
import { useLanguage } from '../context/LanguageContext';
import { SITES } from '../constants/Sites';

const { width } = Dimensions.get('window');

export default function SiteDetail() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t, locale, setLanguage } = useLanguage();
  
  const site = SITES[id as string] || SITES.maya_devi;

  const handleBack = () => router.back();
  const toggleLanguage = () => setLanguage(locale === 'en' ? 'ne' : 'en');

  const title = locale === 'ne' ? site.titleNe : site.title;
  const location = locale === 'ne' ? site.locationNe : site.location;
  const description = locale === 'ne' ? site.descriptionNe : site.description;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <Image
            source={site.image}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay} />

          {/* Header Controls */}
          <View style={[styles.headerOverlay, { paddingTop: Math.max(insets.top, 20) }]}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Ionicons name="chevron-back" size={24} color={Colors.white} />
            </TouchableOpacity>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.langButton} onPress={toggleLanguage}>
                <MaterialIcons name="translate" size={20} color={Colors.white} />
                <Text style={styles.langText}>{locale === 'en' ? 'EN' : 'NE'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* AR View Button if applicable */}
          <TouchableOpacity style={styles.floatingARButton} activeOpacity={0.8} onPress={() => router.push('/ar')}>
            <View style={styles.innerARButton}>
              <MaterialCommunityIcons name="augmented-reality" size={24} color={Colors.natural} />
              <View style={styles.textARContainer}>
                <Text style={styles.textARHeader}>{t('experience')}</Text>
                <Text style={styles.textARTitle}>AR GUIDE</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          <Text style={styles.label}>{site.category}</Text>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={16} color={Colors.primary} />
            <Text style={styles.locationText}>{location}</Text>
          </View>

          {/* AI Voice Guide */}
          <VoiceGuide />

          {/* Main Description */}
          <View style={styles.infoCard}>
            <View style={styles.infoCardIcon}>
              <MaterialCommunityIcons name="information-variant" size={24} color={Colors.primary} />
            </View>
            <Text style={styles.infoCardText}>
              {description}
            </Text>
          </View>

          {/* Location Info */}
          <View style={styles.infoCard}>
            <View style={styles.infoCardIcon}>
              <MaterialCommunityIcons name="map-marker-distance" size={24} color={Colors.primary} />
            </View>
            <View style={styles.infoCardContent}>
              <Text style={styles.infoCardLabel}>{t('location_details')}</Text>
              <Text style={styles.infoCardSmallTitle}>{site.distance} from core</Text>
            </View>
          </View>

          {/* Nearby Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('nearby_monuments')}</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {Object.values(SITES)
              .filter(s => s.id !== site.id)
              .map(s => {
                // Calculate rough distance for sorting
                const d = Math.sqrt(
                  Math.pow(s.latitude - site.latitude, 2) + 
                  Math.pow(s.longitude - site.longitude, 2)
                );
                return { ...s, rawDistance: d };
              })
              .sort((a, b) => a.rawDistance - b.rawDistance)
              .slice(0, 6)
              .map(nearbySite => (
                <MonumentCard
                  key={nearbySite.id}
                  name={locale === 'ne' ? nearbySite.titleNe : nearbySite.title}
                  distance={nearbySite.distance}
                  image={nearbySite.image}
                  onPress={() => router.push({ pathname: '/site-detail', params: { id: nearbySite.id } })}
                />
              ))
            }
          </ScrollView>

        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <CustomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.natural,
  },
  scrollView: {
    flex: 1,
  },
  heroContainer: {
    height: 400,
    width: '100%',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    alignItems: 'center',
    zIndex: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  langButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  langText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  floatingARButton: {
    position: 'absolute',
    bottom: -30,
    alignSelf: 'center',
    zIndex: 20,
  },
  innerARButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
    gap: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
  textARContainer: {
    justifyContent: 'center',
  },
  textARHeader: {
    color: Colors.natural,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  textARTitle: {
    color: Colors.natural,
    fontSize: 18,
    fontWeight: '900',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  label: {
    color: Colors.gray,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 8,
    fontFamily: Typography.label,
    textTransform: 'uppercase',
  },
  title: {
    color: Colors.white,
    fontSize: 32,
    fontFamily: Typography.headline,
    fontWeight: '700',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 32,
  },
  locationText: {
    color: Colors.gray,
    fontSize: 12,
    fontWeight: '600',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  infoCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(230, 126, 34, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCardContent: {
    flex: 1,
  },
  infoCardText: {
    color: Colors.gray,
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Typography.body,
    flex: 1,
  },
  infoCardLabel: {
    color: Colors.gray,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  infoCardSmallTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
    fontFamily: Typography.headline,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '700',
    fontFamily: Typography.headline,
  },
  horizontalScroll: {
    marginBottom: 40,
    marginHorizontal: -24,
    paddingLeft: 24,
  },
  bottomSpacer: {
    height: 100,
  },
});
