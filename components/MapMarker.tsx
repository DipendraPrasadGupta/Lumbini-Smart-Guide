import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors } from '../constants/Theme';

type MapMarkerProps = {
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  top: number | string;
  left: number | string;
  size?: number;
  highlighted?: boolean;
};

export default function MapMarker({ iconName, top, left, size = 50, highlighted = false }: MapMarkerProps) {
  return (
    <View style={[styles.container, { top: top as any, left: left as any, width: size, height: size }]}>
      {/* Outer shadow/glow circle */}
      <View style={[
        styles.outerRing,
        highlighted ? styles.highlightedRing : null,
      ]}>
        <View style={styles.innerCircle}>
          <MaterialCommunityIcons 
            name={iconName} 
            size={size * 0.45} 
            color="#000" 
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  outerRing: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    backgroundColor: '#00000040',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00000090',
  },
  highlightedRing: {
    backgroundColor: '#00000060',
    borderColor: '#000000',
  },
  innerCircle: {
    width: '75%',
    height: '75%',
    borderRadius: 100,
    backgroundColor: Colors.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
