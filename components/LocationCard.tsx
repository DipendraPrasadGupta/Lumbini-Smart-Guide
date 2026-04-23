import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Typography } from '../constants/Theme';
import { SiteData } from '../constants/Sites';
import { useLanguage } from '../context/LanguageContext';
import { useSavedSites } from '../context/SavedSitesContext';

interface LocationCardProps {
  site: SiteData;
}

export default function LocationCard({ site }: LocationCardProps) {
  const router = useRouter();
   const { t, locale } = useLanguage();
  const { toggleSaveSite, isSiteSaved } = useSavedSites();
  
  const saved = isSiteSaved(site.id);

  const handleBeginJourney = () => {
    router.push({
      pathname: '/site-detail',
      params: { id: site.id }
    });
  };

  const title = locale === 'ne' ? site.titleNe : site.title;
  const location = locale === 'ne' ? site.locationNe : site.location;
  const description = locale === 'ne' ? site.descriptionNe : site.description;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBeginJourney} activeOpacity={0.9}>
        {/* Selection Label */}
        <Text style={styles.selectionLabel}>{site.category}</Text>

        <View style={styles.headerRow}>
          <Image 
            source={site.image} 
            style={styles.image}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{title}</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={14} color={Colors.primary} />
              <Text style={styles.locationText}>{location} • {site.distance}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.descriptionText}>
          {description}
        </Text>
      </TouchableOpacity>

      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleBeginJourney}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>{t('begin_journey')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.bookmarkButton} 
          onPress={() => toggleSaveSite(site.id)}
          activeOpacity={0.7}
        >
          <Ionicons 
            name={saved ? "bookmark" : "bookmark-outline"} 
            size={24} 
            color={saved ? Colors.primary : Colors.gray} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(25, 25, 25, 0.95)',
    borderRadius: 36,
    padding: 24,
    width: '92%',
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 20,
  },
  selectionLabel: {
    color: Colors.gray,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 16,
    fontFamily: Typography.label,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 16,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 20,
  },
  titleContainer: {
    flex: 1,
  },
  titleText: {
    color: Colors.white,
    fontSize: 24,
    fontFamily: Typography.headline,
    fontWeight: '700',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    color: Colors.gray,
    fontSize: 13,
    fontWeight: '600',
  },
  descriptionText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 24,
    fontFamily: Typography.body,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#FFBE9D',
    paddingVertical: 18,
    borderRadius: 30,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#FFBE9D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#331D12',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
    fontFamily: Typography.label,
  },
  bookmarkButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
});
