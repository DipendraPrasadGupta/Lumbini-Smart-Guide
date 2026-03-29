import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect, Circle, Line, G } from 'react-native-svg';

const MapBackground = () => {
  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" viewBox="0 0 400 800">
        <Rect x="0" y="0" width="400" height="800" fill="#1A2A2A"/>
        <Rect x="190" y="50" width="20" height="600" fill="#2E4A4A" opacity="0.5"/>
        <Rect x="50" y="200" width="100" height="300" fill="#243434" rx="10"/>
        <Rect x="250" y="200" width="100" height="300" fill="#243434" rx="10"/>
        <Circle cx="200" cy="700" r="100" fill="#283838"/>
        <Circle cx="200" cy="700" r="40" fill="#2E4A4A" opacity="0.3"/>
        <G opacity="0.1">
          <Line x1="50" y1="200" x2="350" y2="200" stroke="#FFF" strokeWidth="1"/>
          <Line x1="50" y1="350" x2="350" y2="350" stroke="#FFF" strokeWidth="1"/>
          <Line x1="50" y1="500" x2="350" y2="500" stroke="#FFF" strokeWidth="1"/>
          <Line x1="100" y1="100" x2="100" y2="700" stroke="#FFF" strokeWidth="1"/>
          <Line x1="300" y1="100" x2="300" y2="700" stroke="#FFF" strokeWidth="1"/>
        </G>
        <G opacity="0.2">
           <Circle cx="200" cy="400" r="10" fill="#FFF"/>
           <Circle cx="250" cy="150" r="15" fill="#FFF"/>
           <Circle cx="320" cy="100" r="12" fill="#FFF"/>
           <Circle cx="200" cy="700" r="20" fill="#FFF"/>
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1A2A2A',
  },
});

export default MapBackground;
