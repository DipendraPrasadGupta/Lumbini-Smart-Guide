import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Typography } from '../constants/Theme';
import CustomHeader from '../components/CustomHeader';
import CustomTabBar from '../components/CustomTabBar';

export default function ARScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Immersive Background */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=1000' }}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          {/* Header */}
          <CustomHeader />

          {/* AR Elements */}
          <View style={styles.arContent}>
            {/* Exit Button */}
            <TouchableOpacity
              style={styles.exitButton}
              onPress={() => router.push('/')}
            >
              <Ionicons name="close" size={20} color={Colors.white} />
              <Text style={styles.exitText}>EXIT AR</Text>
            </TouchableOpacity>

            {/* Scanning Status */}
            <View style={styles.scanningContainer}>
              <View style={styles.scanningBubble}>
                <Text style={styles.scanningText}>SCANNING AREA...</Text>
              </View>
              {/* Circular Reticle */}
              <View style={styles.reticle} />
            </View>

            {/* Ashoka Pillar Info Marker */}
            <View style={styles.markerAnchor}>
              <View style={styles.markerLine} />
              <TouchableOpacity style={styles.markerCircle}>
                <MaterialCommunityIcons name="bank" size={16} color={Colors.natural} />
              </TouchableOpacity>

              {/* Right Info Card Overlay */}
              <View style={styles.infoCard}>
                <Text style={styles.cardTitle}>Ashoka Pillar</Text>
                <Text style={styles.cardDescription}>
                  Erected by Ashoka in 249 BC to commemorate his visit of Lord Buddha's birthplace, confirming Lumbini.
                </Text>
                <View style={styles.distanceContainer}>
                  <MaterialCommunityIcons name="ruler" size={14} color={Colors.primary} />
                  <Text style={styles.distanceText}>DISTANCE: 15M</Text>
                </View>
              </View>
            </View>
          </View>

          {/* GPS Data */}
          <View style={styles.gpsContainer}>
            <Text style={styles.gpsText}>LAT: 27.4824° N</Text>
            <Text style={styles.gpsText}>LON: 83.2754° E</Text>
            <Text style={styles.gpsText}>ALT: 150M MSL</Text>
          </View>
        </View>
      </ImageBackground>

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
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',

  },
  arContent: {
    flex: 1,
    paddingHorizontal: 24,
  },
  exitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00000060',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    alignSelf: 'flex-start',
    gap: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF20',
  },
  exitText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: Typography.label,
  },
  scanningContainer: {
    position: 'absolute',
    top: '25%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  scanningBubble: {
    backgroundColor: '#00000080',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#FFFFFF40',
  },
  scanningText: {
    color: Colors.white,
    fontSize: 14,
    letterSpacing: 1.5,
    fontFamily: Typography.label,
    fontWeight: '700',
  },
  reticle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 1,
    borderColor: '#FFFFFF30',
    borderStyle: 'dashed',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerAnchor: {
    position: 'absolute',
    top: '35%',
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  markerLine: {
    width: 2,
    height: 60,
    backgroundColor: Colors.primary,
    position: 'absolute',
    left: -20,
    top: 30,
  },
  markerCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: -35,
    top: 15,
    zIndex: 10,
  },
  infoCard: {
    backgroundColor: '#212121E0',
    padding: 16,
    borderRadius: 16,
    width: 180,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  cardTitle: {
    color: Colors.primary,
    fontSize: 18,
    fontFamily: Typography.headline,
    marginBottom: 8,
  },
  cardDescription: {
    color: Colors.white,
    fontSize: 11,
    lineHeight: 16,
    fontFamily: Typography.body,
    marginBottom: 12,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  distanceText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
    fontFamily: Typography.label,
  },
  gpsContainer: {
    position: 'absolute',
    bottom: 120,
    left: 24,
  },
  gpsText: {
    color: Colors.gray,
    fontSize: 11,
    fontFamily: Typography.label,
    lineHeight: 18,
    letterSpacing: 0.5,
  },
});
