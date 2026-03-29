import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Switch, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography } from '../constants/Theme';
import { useLanguage } from '../context/LanguageContext';
import { useSavedSites } from '../context/SavedSitesContext';
import { SITES } from '../constants/Sites';
import CustomTabBar from '../components/CustomTabBar';
import CustomHeader from '../components/CustomHeader';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t, locale, setLanguage } = useLanguage();
  const { savedSiteIds, toggleSaveSite } = useSavedSites();
  const [isDarkMode, setIsDarkMode] = useState(true);

  const savedMonumentsData = savedSiteIds.map(id => SITES[id]).filter(Boolean);

  return (
    <View style={styles.container}>
      <CustomHeader />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Info */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/100?img=11' }} 
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={14} color="#331D12" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>Enlightened Pilgrim</Text>
          <View style={styles.emailRow}>
            <MaterialCommunityIcons name="email-outline" size={14} color={Colors.gray} />
            <Text style={styles.userEmail}>pilgrim@lumbini.com</Text>
          </View>

          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>SEEKER LEVEL 4</Text>
            </View>
            <View style={[styles.badge, styles.badgeSecondary]}>
              <Text style={styles.badgeText}>12 MONUMENTS VISITED</Text>
            </View>
          </View>
        </View>

        {/* Saved Monuments Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('saved_monuments')}</Text>
          <TouchableOpacity onPress={() => router.push('/saved-monuments')}>
            <Text style={styles.viewAll}>{t('view_all')}</Text>
          </TouchableOpacity>
        </View>

        {savedMonumentsData.length > 0 ? (
          savedMonumentsData.slice(0, 3).map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.monumentCard}
              onPress={() => router.push(item.id === 'maya_devi' ? '/temple-detail' : '/')}
            >
              <Image source={item.image} style={styles.cardImage} />
              <View style={styles.cardInfo}>
                <View style={styles.cardTitleRow}>
                  <Text style={styles.cardTitle}>{locale === 'ne' ? item.titleNe : item.title}</Text>
                  <TouchableOpacity onPress={() => toggleSaveSite(item.id)}>
                    <Ionicons name="bookmark" size={20} color="#FFBE9D" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.cardDescription} numberOfLines={2}>
                  {locale === 'ne' ? item.descriptionNe : item.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="bookmark-outline" size={48} color="rgba(255, 255, 255, 0.1)" />
            <Text style={styles.emptyText}>{t('no_saved_monuments')}</Text>
          </View>
        )}

        {/* Spiritual Preferences Section */}
        <Text style={[styles.sectionTitle, { marginTop: 32, marginBottom: 16, marginHorizontal: 24 }]}>
          {t('spiritual_preferences')}
        </Text>
        
        <View style={styles.preferencesContainer}>
          {/* Language Setting */}
          <TouchableOpacity 
            style={styles.prefItem}
            onPress={() => router.push('/language-settings')}
          >
            <View style={styles.prefLeft}>
              <View style={styles.prefIconContainer}>
                <MaterialCommunityIcons name="translate" size={20} color={Colors.white} />
              </View>
              <View>
                <Text style={styles.prefLabel}>{t('language_settings')}</Text>
                <Text style={styles.prefSubLabel}>{t('language_sub')}</Text>
              </View>
            </View>
            <View style={styles.prefRight}>
              <Text style={styles.prefValue}>{locale === 'en' ? 'ENGLISH' : 'नेपाली'}</Text>
              <Ionicons name="chevron-forward" size={18} color={Colors.gray} />
            </View>
          </TouchableOpacity>

          {/* Dark Mode */}
          <View style={styles.prefItem}>
            <View style={styles.prefLeft}>
              <View style={styles.prefIconContainer}>
                <Ionicons name="moon" size={20} color="#D988B9" />
              </View>
              <View>
                <Text style={styles.prefLabel}>{t('dark_mode')}</Text>
                <Text style={styles.prefSubLabel}>{t('dark_mode_sub')}</Text>
              </View>
            </View>
            <Switch 
              value={isDarkMode} 
              onValueChange={setIsDarkMode}
              trackColor={{ false: '#2C2C2C', true: '#FFBE9D' }}
              thumbColor={isDarkMode ? '#331D12' : '#767577'}
            />
          </View>

          {/* App Settings */}
          <TouchableOpacity 
            style={styles.prefItem}
            onPress={() => router.push('/app-settings')}
          >
            <View style={styles.prefLeft}>
              <View style={styles.prefIconContainer}>
                <Ionicons name="settings-sharp" size={20} color={Colors.gray} />
              </View>
              <View>
                <Text style={styles.prefLabel}>{t('app_settings')}</Text>
                <Text style={styles.prefSubLabel}>{t('app_settings_sub')}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.gray} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <MaterialCommunityIcons name="logout" size={20} color="#FFBE9D" />
          <Text style={styles.logoutText}>{t('logout')}</Text>
        </TouchableOpacity>

      </ScrollView>
      <CustomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  iconButton: {
    padding: 4,
  },
  headerTitle: {
    color: Colors.primary,
    fontSize: 20,
    fontFamily: Typography.headline,
    fontWeight: '700',
    letterSpacing: 2,
  },
  miniProfile: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.primary,
    overflow: 'hidden',
  },
  miniAvatar: {
    width: '100%',
    height: '100%',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  editButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#FFBE9D',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0F0F0F',
  },
  userName: {
    color: Colors.white,
    fontSize: 32,
    fontFamily: Typography.headline,
    fontWeight: '700',
    marginBottom: 8,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  userEmail: {
    color: Colors.gray,
    fontSize: 14,
    fontFamily: Typography.body,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  badgeSecondary: {
    backgroundColor: 'rgba(217, 136, 185, 0.1)',
    borderColor: 'rgba(217, 136, 185, 0.2)',
  },
  badgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 24,
    fontFamily: Typography.headline,
    fontWeight: '600',
  },
  viewAll: {
    color: '#FFBE9D',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  monumentCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 24,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardInfo: {
    padding: 16,
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: Typography.headline,
    fontWeight: '600',
  },
  cardDescription: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    lineHeight: 18,
    fontFamily: Typography.body,
  },
  preferencesContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    marginHorizontal: 24,
    borderRadius: 24,
    padding: 8,
  },
  prefItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    gap: 12,
  },
  prefLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  prefIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prefLabel: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  prefSubLabel: {
    color: Colors.gray,
    fontSize: 11,
    lineHeight: 14,
    maxWidth: 180,
  },
  prefRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  prefValue: {
    color: '#FFBE9D',
    fontSize: 12,
    fontWeight: '700',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    marginTop: 32,
    paddingVertical: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 190, 157, 0.3)',
    gap: 10,
    backgroundColor: 'rgba(255, 190, 157, 0.02)',
  },
  logoutText: {
    color: '#FFBE9D',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    gap: 16,
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: Typography.body,
  },
});
