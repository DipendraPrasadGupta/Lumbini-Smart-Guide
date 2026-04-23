import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography } from '../constants/Theme';
import { useLanguage } from '../context/LanguageContext';

export default function AppSettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();

  const [pushEnabled, setPushEnabled] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const SettingSwitch = ({ icon, title, description, value, onValueChange, color = Colors.primary }: any) => (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <View style={styles.settingTextContent}>
          <Text style={styles.settingTitle}>{title}</Text>
          {description && <Text style={styles.settingDescription}>{description}</Text>}
        </View>
      </View>
      <Switch 
        value={value} 
        onValueChange={onValueChange}
        trackColor={{ false: '#2C2C2C', true: `${color}80` }}
        thumbColor={value ? color : '#767577'}
      />
    </View>
  );

  const SettingLink = ({ icon, title, description, onPress, color = Colors.gray }: any) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <View style={styles.settingTextContent}>
          <Text style={styles.settingTitle}>{title}</Text>
          {description && <Text style={styles.settingDescription}>{description}</Text>}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>App Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.card}>
          <SettingSwitch 
            icon="notifications" 
            title="Push Notifications" 
            description="Receive arrival alerts and updates"
            value={pushEnabled}
            onValueChange={setPushEnabled}
          />
          <View style={styles.divider} />
          <SettingSwitch 
            icon="location" 
            title="Location Services" 
            description="Required for AR and proximity alerts"
            value={locationEnabled}
            onValueChange={setLocationEnabled}
            color="#3498DB"
          />
          <View style={styles.divider} />
          <SettingSwitch 
            icon="cloud-offline" 
            title="Offline Mode" 
            description="Download map data for offline use"
            value={offlineMode}
            onValueChange={setOfflineMode}
            color="#2ECC71"
          />
        </View>

        <Text style={styles.sectionTitle}>Data & Storage</Text>
        <View style={styles.card}>
          <SettingLink 
            icon="trash-bin" 
            title="Clear Cache" 
            description="Free up 124MB of storage"
            onPress={() => {}}
          />
          <View style={styles.divider} />
          <SettingLink 
            icon="download" 
            title="Manage Downloads" 
            description="Audio guides and 3D models"
            onPress={() => {}}
          />
        </View>

        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.card}>
          <SettingLink icon="shield-checkmark" title="Privacy Policy" onPress={() => {}} />
          <View style={styles.divider} />
          <SettingLink icon="document-text" title="Terms of Service" onPress={() => {}} />
          <View style={styles.divider} />
          <SettingLink icon="information-circle" title="App Version" description="1.0.0 (Build 42)" onPress={() => {}} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with ♥ in Nepal</Text>
        </View>
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
  content: {
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
    marginTop: 8,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 24,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingTextContent: {
    flex: 1,
  },
  settingTitle: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: Typography.body,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingDescription: {
    color: Colors.gray,
    fontSize: 12,
    fontFamily: Typography.body,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginLeft: 72, // Aligned with text
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 12,
    fontFamily: Typography.body,
  },
});
