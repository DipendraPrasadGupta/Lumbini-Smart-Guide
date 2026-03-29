import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import VoiceGuide from '../components/VoiceGuide';
import MonumentCard from '../components/MonumentCard';
import CustomTabBar from '../components/CustomTabBar';
import { Colors, Typography } from '../constants/Theme';
import { useLanguage } from '../context/LanguageContext';
import { SITES } from '../constants/Sites';


const { width } = Dimensions.get('window');

const InfoCard = ({ icon, title, description }: { icon: any, title?: string, description: string }) => (
  <View style={styles.infoCard}>
    <View style={styles.infoCardIcon}>
      {icon}
    </View>
    <View style={styles.infoCardContent}>
      {title && <Text style={styles.infoCardLabel}>{title}</Text>}
      {title && <Text style={styles.infoCardSmallTitle}>{description.split('.')[0]}</Text>}
      {!title && <Text style={styles.infoCardText}>{description}</Text>}
    </View>
  </View>
);

export default function TempleDetail() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t, locale, setLanguage } = useLanguage();
  const site = SITES.maya_devi;

  const handleBack = () => router.back();
  const toggleLanguage = () => setLanguage(locale === 'en' ? 'ne' : 'en');


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <Image
            source={require('../assets/images/temple_hero.png')}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay} />

          {/* Custom Header with Back Button logic over the image */}
          <View style={[styles.headerOverlay, { paddingTop: Math.max(insets.top, 20) }]}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Ionicons name="chevron-back" size={24} color={Colors.white} />
            </TouchableOpacity>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.langButton} onPress={toggleLanguage}>
                <MaterialIcons name="translate" size={20} color={Colors.white} />
                <Text style={styles.langText}>{locale === 'en' ? 'EN' : 'NE'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.notificationButton} onPress={() => { }}>
                <Ionicons name="notifications-outline" size={20} color={Colors.white} />
                <View style={styles.notificationBadge} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.profileCircle}
                onPress={() => router.push('/profile')}
              >
                <Image
                  source={{ uri: 'https://i.pravatar.cc/100?img=11' }}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Floating View in 3D Button */}
          <TouchableOpacity style={styles.floating3DButton} activeOpacity={0.8}>
            <View style={styles.inner3DButton}>
              <MaterialCommunityIcons name="layers-triple" size={24} color={Colors.natural} />
              <View style={styles.text3DContainer}>
                <Text style={styles.text3DHeader}>{t('view_in')}</Text>
                <Text style={styles.text3DTitle}>{t('three_d')}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          <Text style={styles.label}>{t('unesco_site')}</Text>
          <Text style={styles.title}>{locale === 'ne' ? site.titleNe : site.title}</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={16} color={Colors.primary} />
            <Text style={styles.locationText}>{locale === 'ne' ? site.locationNe : site.location}</Text>
          </View>


          {/* AI Voice Guide */}
          <VoiceGuide />

          {/* Info Cards */}
          <View style={styles.infoCard}>
            <View style={styles.infoCardIcon}>
              <MaterialCommunityIcons name="history" size={24} color={Colors.primary} />
            </View>
            <Text style={styles.infoCardText}>
              {t('maya_devi_desc_1')}
            </Text>
          </View>

          <View style={[styles.infoCard, { flexDirection: 'column', alignItems: 'flex-start' }]}>
            <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center', marginBottom: 12 }}>
              <View style={styles.infoCardIcon}>
                <MaterialCommunityIcons name="pillar" size={24} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.infoCardLabel}>{t('architecture_label')}</Text>
                <Text style={styles.infoCardSmallTitle}>{t('ashoka_pillar_title')}</Text>
              </View>
            </View>
            <Text style={styles.infoCardText}>
              {t('ashoka_pillar_desc')}
            </Text>
          </View>

          {/* Nearby Monuments */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('nearby_monuments')}</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>{t('view_all')}</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            <MonumentCard
              name={locale === 'ne' ? SITES.pagoda_peace.titleNe : SITES.pagoda_peace.title}
              distance={`1.2 KM ${t('away')}`}
              image={require('../assets/images/timeline_5.png')}
            />
            <MonumentCard
              name={locale === 'ne' ? SITES.pillar_ashoka.titleNe : SITES.pillar_ashoka.title}
              distance={`0.3 KM ${t('away')}`}
              image={require('../assets/images/timeline_4.png')}
            />
            <MonumentCard
              name={locale === 'ne' ? SITES.puskarini_pond.titleNe : SITES.puskarini_pond.title}
              distance={`0.1 KM ${t('away')}`}
              image={require('../assets/images/timeline_1.png')}
            />
          </ScrollView>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Floating Bottom Nav */}
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
    height: 450,
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
  profileCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  profileImage: {
    width: '100%',
    height: '100%',
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
  notificationButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderColor: '#000',
  },

  floating3DButton: {
    position: 'absolute',
    bottom: -30,
    alignSelf: 'center',
    zIndex: 20,
  },
  inner3DButton: {
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
  text3DContainer: {
    justifyContent: 'center',
  },
  text3DHeader: {
    color: Colors.natural,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  text3DTitle: {
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
  highlightText: {
    color: Colors.white,
    fontWeight: '700',
  },
  italicText: {
    fontStyle: 'italic',
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
  viewAllText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '700',
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
