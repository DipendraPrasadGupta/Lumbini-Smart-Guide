import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors, Typography } from '../constants/Theme';

export default function LocationCard() {
  return (
    <View style={styles.container}>
      <View style={styles.contentRow}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?auto=format&fit=crop&q=80&w=200' }} 
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.categoryText}>QUICK EXPLORE</Text>
          <Text style={styles.titleText}>Sacred Garden Area</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-sharp" size={14} color={Colors.primary} />
            <Text style={styles.locationText}>Main Entrance • 200m away</Text>
          </View>
        </View>
      </View>

      <Text style={styles.descriptionText}>
        The focal point of the garden, containing the marker stone that identifies the exact birthplace of Lord Buddha.
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.buttonText}>BEGIN JOURNEY</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.bookmarkButton}>
          <Ionicons name="bookmark-outline" size={24} color={Colors.secondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.natural,
    borderRadius: 32,
    padding: 24,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  contentRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  categoryText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: Typography.label,
    letterSpacing: 1,
    marginBottom: 4,
  },
  titleText: {
    color: Colors.white,
    fontSize: 22,
    fontFamily: Typography.headline,
    fontWeight: '700',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: Colors.gray,
    fontSize: 12,
    fontFamily: Typography.body,
    marginLeft: 4,
  },
  descriptionText: {
    color: Colors.gray,
    fontSize: 14,
    fontFamily: Typography.body,
    lineHeight: 20,
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    flex: 1,
    marginRight: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: Typography.label,
    letterSpacing: 1,
  },
  bookmarkButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444',
  },
});
