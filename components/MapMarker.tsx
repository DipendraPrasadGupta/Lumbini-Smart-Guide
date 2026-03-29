import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, DimensionValue, Image, ImageSourcePropType } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence
} from 'react-native-reanimated';
import { Colors, Typography } from '../constants/Theme';

type MapMarkerProps = {
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  label?: string;
  size?: number;
  highlighted?: boolean;
  color?: string;
  isMuseum?: boolean;
  image?: ImageSourcePropType;
  top?: DimensionValue;
  left?: DimensionValue;
  onPress?: () => void;
};

export default function MapMarker({ 
  iconName, 
  label, 
  size = 46, 
  highlighted = false, 
  color,
  isMuseum = false,
  image,
  top,
  left,
  onPress
}: MapMarkerProps) {
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0);

  useEffect(() => {
    if (highlighted) {
      pulseScale.value = withRepeat(
        withTiming(1.6, { duration: 1500 }),
        -1,
        false
      );
      pulseOpacity.value = withRepeat(
        withSequence(
          withTiming(0.6, { duration: 750 }),
          withTiming(0, { duration: 750 })
        ),
        -1,
        false
      );
    } else {
      pulseScale.value = 1;
      pulseOpacity.value = 0;
    }
  }, [highlighted]);

  const animatedPulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  const animatedMarkerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(highlighted ? 1.3 : 1, { duration: 300 }) }],
  }));

  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.container, 
        top !== undefined && { top }, 
        left !== undefined && { left },
        highlighted && { zIndex: 100 }
      ]}
    >
      {/* Pulse Effect */}
      {highlighted && (
        <Animated.View style={[
          styles.pulseRing,
          { width: size, height: size, borderColor: color || Colors.primary },
          animatedPulseStyle
        ]} />
      )}

      {/* Icon Circle */}
      <Animated.View style={[
        styles.markerContainer,
        { width: size, height: size },
        highlighted && { borderColor: '#FFF', borderWidth: 3.5 },
        color ? { 
          backgroundColor: highlighted ? color : color + '25', 
          borderColor: highlighted ? '#FFF' : 'rgba(255,255,255,0.3)' 
        } : null,
        animatedMarkerStyle
      ]}>
        <View style={styles.innerCircle}>
          {image ? (
            <Image source={image} style={styles.markerImage} />
          ) : isMuseum ? (
            <Text style={styles.museumLetter}>M</Text>
          ) : (
             <MaterialCommunityIcons 
              name={iconName} 
              size={size * 0.55} 
              color={Colors.white} 
            />
          )}
        </View>
      </Animated.View>

      {/* Label Pill */}
      {label ? (
        <View style={[styles.labelContainer, highlighted && styles.highlightedLabel]}>
           <Text style={styles.labelText}>{label}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  pulseRing: {
    position: 'absolute',
    borderRadius: 100,
    borderWidth: 5,
  },
  markerContainer: {
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 12,
    overflow: 'hidden',
  },
  innerCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  markerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  museumLetter: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '900',
    fontFamily: Typography.label,
  },
  labelContainer: {
    marginTop: 8,
    backgroundColor: 'rgba(15, 15, 15, 0.95)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  highlightedLabel: {
    borderColor: '#FFBE9D',
    backgroundColor: '#2A1A12',
  },
  labelText: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: 10,
    fontWeight: '800',
    fontFamily: Typography.label,
    letterSpacing: 0.2,
    textAlign: 'center',
  },
});
