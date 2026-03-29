import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Typography } from '../../constants/Theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function NavigationScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View /> 
        <TouchableOpacity onPress={() => router.replace('/')}>
          <Text style={styles.skipText}>SKIP</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Image Section */}
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000' }} 
          style={styles.heroImage}
          resizeMode="cover"
        />
        {/* Floating UI Elements over image */}
        <View style={styles.markerContainer}>
            <View style={styles.marker}>
                <MaterialIcons name="temple-buddhist" size={16} color={Colors.natural} />
            </View>
            <View style={[styles.marker, { top: 120, left: 40 }]}>
                <Ionicons name="location" size={14} color={Colors.natural} />
            </View>
        </View>

        {/* Compass Overlay */}
        <View style={styles.compassWrapper}>
            <View style={styles.compassContainer}>
                 <View style={styles.compassInner}>
                    <Ionicons name="compass" size={24} color={Colors.natural} />
                 </View>
            </View>
            <Text style={styles.compassLabel}>ZENITH</Text>
        </View>
      </View>

      {/* Text Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Smart Navigation</Text>
        <Text style={styles.description}>
          Find temples, monasteries, and historical landmarks easily.
        </Text>
      </View>

      {/* Pagination & Button Footer */}
      <View style={styles.footer}>
        <View style={styles.pagination}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/onboarding/aiguide')}
        >
          <Text style={styles.buttonText}>Next</Text>
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
  skipText: {
    color: '#FFFFFF70',
    fontSize: 14,
    fontFamily: Typography.label,
    letterSpacing: 2,
    fontWeight: '700',
  },
  imageContainer: {
    height: width * 0.9,
    width: width * 0.85,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: '#1A1A1A',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    opacity: 0.4,
  },
  markerContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  marker: {
    position: 'absolute',
    top: 100,
    right: 60,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },
  compassWrapper: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    alignItems: 'center',
  },
  compassContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  compassInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  compassLabel: {
    position: 'absolute',
    top: 25,
    color: '#FFFFFF40',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 60,
  },
  title: {
    color: Colors.white,
    fontSize: 42,
    fontFamily: Typography.headline,
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    color: '#FFFFFF80',
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 28,
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
    paddingHorizontal: 50,
    borderRadius: 40,
    gap: 12,
  },
  buttonText: {
    color: Colors.natural,
    fontSize: 18,
    fontWeight: '700',
    fontFamily: Typography.body,
  }
});
