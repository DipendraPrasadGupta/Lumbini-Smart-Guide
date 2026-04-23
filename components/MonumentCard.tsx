import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '../constants/Theme';

interface MonumentCardProps {
  name: string;
  distance: string;
  image: any;
  onPress?: () => void;
}

const MonumentCard: React.FC<MonumentCardProps> = ({ name, distance, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.9} onPress={onPress}>
      <Image source={image} style={styles.image} />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.distance}>{distance}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 280,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 16,
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  content: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  name: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
    fontFamily: Typography.headline,
    marginBottom: 4,
  },
  distance: {
    color: Colors.gray,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: Typography.body,
  },
});

export default MonumentCard;
