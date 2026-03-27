import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { Colors, Typography } from '../constants/Theme';

export default function CustomHeader() {
  return (
    <View style={styles.container}>
      {/* Left Section */}
      <View style={styles.leftContainer}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={28} color={Colors.primary} />
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>LUMBINI</Text>
          <Text style={styles.titleText}>GUIDE</Text>
        </View>
      </View>

      {/* Right Section */}
      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.langButton}>
            <MaterialIcons name="translate" size={18} color={Colors.white} />
            <Text style={styles.langText}>ENGLISH</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.profileContainer}>
           <Image 
            source={{ uri: 'https://i.pravatar.cc/100?img=11' }} 
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60, // Top inset spacing
    paddingBottom: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
    zIndex: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: 16,
  },
  titleContainer: {
    justifyContent: 'center',
  },
  titleText: {
    color: Colors.primary,
    fontSize: 20,
    fontFamily: Typography.headline,
    fontWeight: '700',
    letterSpacing: 2,
    lineHeight: 24,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  langButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF20',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  langText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
    fontFamily: Typography.label,
  },
  profileContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: '#FFFFFF20',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
});
