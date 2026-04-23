import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography } from '../constants/Theme';
import { useLanguage } from '../context/LanguageContext';
import { useSavedSites } from '../context/SavedSitesContext';
import { SITES } from '../constants/Sites';

export default function SavedMonumentsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t, locale } = useLanguage();
  const { savedSiteIds, toggleSaveSite } = useSavedSites();

  const savedMonumentsData = savedSiteIds.map(id => SITES[id]).filter(Boolean);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{locale === 'en' ? 'Saved Monuments' : 'बचत गरिएका स्मारकहरू'}</Text>
        <View style={{ width: 24 }} /> {/* Placeholder for balance */}
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {savedMonumentsData.length > 0 ? (
          savedMonumentsData.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.monumentCard}
              onPress={() => router.push({ pathname: '/site-detail', params: { id: item.id } })}
            >
              <Image source={item.image} style={styles.cardImage} />
              <View style={styles.cardInfo}>
                <View style={styles.cardTitleRow}>
                  <Text style={styles.cardTitle}>{locale === 'ne' ? item.titleNe : item.title}</Text>
                  <TouchableOpacity onPress={() => toggleSaveSite(item.id)}>
                    <Ionicons name="bookmark" size={24} color="#FFBE9D" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.cardDescription} numberOfLines={3}>
                  {locale === 'ne' ? item.descriptionNe : item.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="bookmark-outline" size={64} color="rgba(255, 255, 255, 0.1)" />
            <Text style={styles.emptyText}>{locale === 'en' ? 'No saved monuments yet.' : 'कुनै स्मारक बचत गरिएको छैन।'}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#1E1E1E',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: Typography.headline,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 40,
  },
  monumentCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardInfo: {
    padding: 20,
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    color: Colors.white,
    fontSize: 22,
    fontFamily: Typography.headline,
    fontWeight: 'bold',
    flex: 1,
    paddingRight: 16,
  },
  cardDescription: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Typography.body,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
    gap: 20,
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: Typography.body,
  },
});
