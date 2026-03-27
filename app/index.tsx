import React from 'react';
import { View, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import MapMarker from '../components/MapMarker';
import LocationCard from '../components/LocationCard';
import CustomTabBar from '../components/CustomTabBar';

import { Colors } from '../constants/Theme';

export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Background / Map Simulation */}
      <View style={styles.mapContainer}>
        {/* Map surface using tertiary color tint */}
        <View style={styles.mapOverlay} />
        
        {/* Decorative Map Markers from the UI */}
        <MapMarker iconName="home-variant" top="45%" left="48%" size={60} />
        <MapMarker iconName="bank" top="65%" left="20%" size={55} highlighted />
        <MapMarker iconName="camera-control" top="60%" left="82%" size={50} />
        <MapMarker iconName="navigation-variant" top="68%" left="78%" size={55} highlighted />
      </View>

      {/* Header Overlay */}
      <View style={styles.overlay}>
        <CustomHeader />
        
        <View style={styles.content}>
          {/* Card is positioned at bottom relative to content flex but above TabBar */}
          <View style={styles.spacer} />
          <LocationCard />
        </View>
      </View>

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
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.tertiary,
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)', // Darker overlay for better contrast
  },
  overlay: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 110, // Space for CustomTabBar
  },
  spacer: {
    flex: 1,
  },
});
