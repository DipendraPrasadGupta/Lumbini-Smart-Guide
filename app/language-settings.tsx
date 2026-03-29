import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Platform, Alert, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography } from '../constants/Theme';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { locale, setLanguage, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const languages = [
    { id: 'en', code: 'Eng', name: 'English', nativeName: 'English', flag: '🇬🇧', isSupported: true },
    { id: 'ne', code: 'Np', name: 'Nepali', nativeName: 'नेपाली', flag: '🇳🇵', isSupported: true },
    { id: 'hi', code: 'Hin', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', isSupported: false },
    { id: 'zh', code: 'Zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', isSupported: false },
    { id: 'ja', code: 'Ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', isSupported: false },
    { id: 'th', code: 'Th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', isSupported: false },
    { id: 'ko', code: 'Ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', isSupported: false },
    { id: 'si', code: 'Si', name: 'Sinhala', nativeName: 'සිංහල', flag: '🇱🇰', isSupported: false },
  ];

  const currentLanguage = languages.find(lang => lang.id === locale) || languages[0];

  const filteredLanguages = languages.filter(lang => 
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLanguageSelect = (lang: typeof languages[0]) => {
    if (lang.isSupported) {
      setLanguage(lang.id as 'en' | 'ne');
    } else {
      Alert.alert(
        'Language Not Available',
        `${lang.name} translation is coming soon in a future update!`,
        [{ text: 'OK', style: 'default' }]
      );
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Language Settings</Text>
        <View style={{ width: 40 }} /> {/* Placeholder */}
      </View>

      <ScrollView 
        keyboardShouldPersistTaps="handled" 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Selected Language Section */}
        <Text style={styles.sectionTitle}>Your Selected Language</Text>
        <View style={styles.selectedCard}>
          <Text style={styles.flagIcon}>{currentLanguage.flag}</Text>
          <View style={styles.languageInfo}>
            <Text style={styles.languageName}>{currentLanguage.nativeName}</Text>
            <Text style={styles.languageSubName}>{currentLanguage.name}</Text>
          </View>
          <View style={styles.codeBadgeSelected}>
            <Text style={styles.codeBadgeTextSelected}>{currentLanguage.code}</Text>
          </View>
          <Ionicons name="checkmark-circle" size={24} color={Colors.primary} style={styles.checkIcon} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={Colors.gray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search language..."
            placeholderTextColor={Colors.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color={Colors.gray} />
            </TouchableOpacity>
          )}
        </View>

        {/* All Languages List */}
        <Text style={styles.sectionTitle}>All Important Languages</Text>
        <View style={styles.listContainer}>
          {filteredLanguages.map((lang, index) => {
            const isSelected = lang.id === locale;
            return (
              <TouchableOpacity 
                key={lang.id} 
                style={[
                  styles.languageItem, 
                  isSelected && styles.languageItemSelected,
                  index === filteredLanguages.length - 1 && { borderBottomWidth: 0 }
                ]}
                onPress={() => handleLanguageSelect(lang)}
              >
                <Text style={styles.listFlagIcon}>{lang.flag}</Text>
                <View style={styles.listLanguageInfo}>
                  <Text style={[styles.listLanguageName, isSelected && { color: Colors.primary }]}>
                    {lang.nativeName}
                  </Text>
                  <Text style={styles.listLanguageSubName}>{lang.name}</Text>
                </View>
                
                <View style={[styles.codeBadge, isSelected && styles.codeBadgeActive]}>
                  <Text style={[styles.codeBadgeText, isSelected && styles.codeBadgeTextActive]}>
                    {lang.code}
                  </Text>
                </View>

                {!lang.isSupported && (
                  <View style={styles.comingSoonBadge}>
                    <Text style={styles.comingSoonText}>Soon</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
          
          {filteredLanguages.length === 0 && (
            <View style={styles.emptyContainer}>
              <Ionicons name="language" size={48} color="rgba(255, 255, 255, 0.1)" />
              <Text style={styles.emptyText}>No languages found matching "{searchQuery}"</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  scrollContent: {
    padding: 24,
    paddingBottom: 60,
  },
  sectionTitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: Typography.label,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 12,
    marginLeft: 4,
  },
  selectedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(230, 126, 34, 0.1)', // Primary color with opacity
    borderWidth: 1,
    borderColor: 'rgba(230, 126, 34, 0.3)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 32,
  },
  flagIcon: {
    fontSize: 36,
    marginRight: 16,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: Typography.headline,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  languageSubName: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 13,
    fontFamily: Typography.body,
  },
  codeBadgeSelected: {
    backgroundColor: 'rgba(230, 126, 34, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 12,
  },
  codeBadgeTextSelected: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkIcon: {
    marginLeft: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: Colors.white,
    fontSize: 16,
    fontFamily: Typography.body,
    height: '100%',
  },
  clearButton: {
    padding: 8,
  },
  listContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 24,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  languageItemSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 16,
  },
  listFlagIcon: {
    fontSize: 28,
    marginRight: 16,
  },
  listLanguageInfo: {
    flex: 1,
  },
  listLanguageName: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: Typography.body,
    fontWeight: '600',
    marginBottom: 2,
  },
  listLanguageSubName: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    fontFamily: Typography.body,
  },
  codeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  codeBadgeActive: {
    backgroundColor: 'rgba(230, 126, 34, 0.1)',
  },
  codeBadgeText: {
    color: Colors.gray,
    fontSize: 11,
    fontWeight: '600',
  },
  codeBadgeTextActive: {
    color: Colors.primary,
  },
  comingSoonBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  comingSoonText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
    fontFamily: Typography.body,
    textAlign: 'center',
  },
});
