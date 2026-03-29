import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Typography } from '../../constants/Theme';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function DiscoverScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logoText}>LUMBINI GUIDE</Text>
        <TouchableOpacity onPress={() => router.replace('/')}>
          <Text style={styles.skipText}>SKIP</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Image Section */}
      <View style={styles.imageContainer}>
        <View style={styles.glowBg} />
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=1000' }} 
          style={styles.heroImage}
          resizeMode="cover"
        />
        {/* Floating UI Elements over image */}
        <View style={styles.floatingTag}>
             <Ionicons name="map-outline" size={18} color={Colors.white} />
             <Text style={styles.tagText}>S_AR</Text>
             <Text style={styles.tagSubText}>LIVE AR VIEW</Text>
        </View>
        <View style={styles.navTag}>
             <Ionicons name="compass" size={16} color={Colors.secondary} />
             <Text style={styles.navTagText}>NAVIGATING SACRED GROUNDS</Text>
        </View>
      </View>

      {/* Text Content */}
      <View style={styles.content}>
        <Text style={styles.title}>
          Discover <Text style={styles.titleItalic}>Lumbini</Text>
        </Text>
        <Text style={styles.description}>
          Explore sacred places with interactive maps and virtual tours. Experience the birthplace of peace in immersive detail.
        </Text>
      </View>

      {/* Pagination & Button Footer */}
      <View style={styles.footer}>
        <View style={styles.pagination}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/onboarding/navigation')}
        >
          <Text style={styles.buttonText}>Begin Journey</Text>
          <Ionicons name="arrow-forward" size={20} color={Colors.natural} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.natural,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingTop: 20,
    alignItems: 'center',
  },
  logoText: {
    color: '#D4B390', // Muted gold/tan
    fontSize: 24,
    fontFamily: Typography.headline,
    letterSpacing: 2,
    fontWeight: '700',
  },
  skipText: {
    color: '#FFFFFF70',
    fontSize: 14,
    fontFamily: Typography.label,
    letterSpacing: 2,
    fontWeight: '700',
  },
  imageContainer: {
    height: width,
    width: width * 0.85,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  glowBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#302924', // Subtle brown glow 
  },
  heroImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    opacity: 0.8,
  },
  floatingTag: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  tagText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  tagSubText: {
    color: Colors.white,
    fontSize: 10,
    opacity: 0.7,
  },
  navTag: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 8,
  },
  navTagText: {
    color: Colors.secondary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 50,
  },
  title: {
    color: Colors.white,
    fontSize: 42,
    fontFamily: Typography.headline,
    fontWeight: '700',
    textAlign: 'center',
  },
  titleItalic: {
    color: Colors.primary,
    fontStyle: 'italic',
    fontWeight: '600',
  },
  description: {
    color: '#FFFFFF80',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 26,
    fontFamily: Typography.body,
    marginTop: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 40,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF20',
  },
  activeDot: {
    width: 40,
    backgroundColor: Colors.primary,
  },
  button: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 35,
    borderRadius: 40,
    gap: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  buttonText: {
    color: Colors.natural,
    fontSize: 18,
    fontWeight: '700',
    fontFamily: Typography.body,
  }
});
