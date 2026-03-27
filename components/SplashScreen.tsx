import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Animated, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Typography } from '../constants/Theme';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const progress = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fade in the whole screen
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Pulse animation for the glow
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Progress bar animation
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  }, []);

  const progressStyle = {
    width: progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, width * 0.7],
    }),
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Central Content */}
      <View style={styles.centerSection}>
        {/* Meditation Icon with Glow */}
        <View style={styles.logoOuter}>
            <Animated.View style={[styles.logoGlow, { transform: [{ scale: pulseAnim }] }]} />
            <View style={styles.logoInner}>
                <MaterialCommunityIcons name="meditation" size={60} color={Colors.primary} />
            </View>
        </View>

        {/* Branding */}
        <Text style={styles.title}>Lumbini Smart</Text>
        <Text style={styles.title}>Guide</Text>
        
        <View style={styles.subtitleRow}>
            <View style={styles.line} />
            <Text style={styles.subtitle}>LUMBINI, NEPAL</Text>
            <View style={styles.line} />
        </View>
      </View>

      {/* Decorative Background at Bottom */}
      <View style={styles.bottomSection}>
         <ImageBackground 
            source={{ uri: 'https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=1000' }} 
            style={styles.templeBg}
            imageStyle={{ opacity: 0.2, tintColor: '#000000' }}
         >
            {/* Loading Indicator */}
            <View style={styles.loadingWrapper}>
                <View style={styles.progressBarBg}>
                    <Animated.View style={[styles.progressBarActive, progressStyle]} />
                </View>
                <Text style={styles.quote}>Seeking enlightenment through discovery</Text>
            </View>
         </ImageBackground>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.natural,
    justifyContent: 'space-between',
  },
  centerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  logoOuter: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  logoGlow: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: `${Colors.primary}30`,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 50,
    opacity: 0.4,
  },
  logoInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2C3531',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF10',
    elevation: 10,
  },
  title: {
    color: Colors.white,
    fontSize: 48,
    fontFamily: Typography.headline,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 52,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 15,
  },
  line: {
    height: 1,
    width: 40,
    backgroundColor: '#FFFFFF30',
  },
  subtitle: {
    color: Colors.white,
    fontSize: 14,
    letterSpacing: 4,
    fontFamily: Typography.label,
    fontWeight: '600',
  },
  bottomSection: {
    height: '40%',
    width: '100%',
  },
  templeBg: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 60,
  },
  loadingWrapper: {
    alignItems: 'center',
    width: '100%',
  },
  progressBarBg: {
    width: width * 0.7,
    height: 2,
    backgroundColor: '#FFFFFF10',
    borderRadius: 1,
    marginBottom: 24,
    overflow: 'hidden',
  },
  progressBarActive: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  quote: {
    color: '#FFFFFF60',
    fontSize: 13,
    fontStyle: 'italic',
    fontFamily: Typography.body,
    letterSpacing: 0.5,
  },
});
