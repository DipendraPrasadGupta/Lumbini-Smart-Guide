import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography } from '../constants/Theme';
import { useLanguage } from '../context/LanguageContext';

const VoiceGuide = () => {
  const { t, locale } = useLanguage();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
           <View style={styles.avatar}>
              <MaterialIcons name="person" size={20} color={Colors.white} />
           </View>
           <View>
              <Text style={styles.userName}>{t('ai_voice_guide')}</Text>
              <Text style={styles.userStatus}>
                {locale === 'en' ? 'ENGLISH' : 'नेपाली'} • 4:20 {t('remaining')}
              </Text>
           </View>
        </View>
        <TouchableOpacity>
           <Ionicons name="mic-outline" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Waveform visualization placeholder */}
      <View style={styles.waveformContainer}>
        {[0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8, 0.6, 0.4].map((height, index) => (
          <View 
            key={index} 
            style={[
              styles.waveBar, 
              { height: 30 * height },
              index === 2 && styles.activeWaveBar
            ]} 
          />
        ))}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <MaterialIcons name="replay-10" size={28} color={Colors.white} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.playButton}>
          <Ionicons name="play" size={32} color={Colors.natural} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton}>
          <MaterialIcons name="forward-10" size={28} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(230, 126, 34, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: Typography.label,
  },
  userStatus: {
    color: Colors.gray,
    fontSize: 10,
    fontWeight: '600',
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 60,
    marginBottom: 20,
  },
  waveBar: {
    width: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 6,
  },
  activeWaveBar: {
    backgroundColor: Colors.primary,
    width: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  controlButton: {
    opacity: 0.8,
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default VoiceGuide;
