import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Colors, Typography } from '../constants/Theme';

const { width } = Dimensions.get('window');

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  image: any;
  buttonText: string;
  isLast?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ 
  year, 
  title, 
  description, 
  image, 
  buttonText, 
  isLast 
}) => {
  return (
    <View style={styles.container}>
      {/* Left side: Timeline Line and Dot */}
      <View style={styles.leftColumn}>
        <View style={styles.dotContainer}>
           <View style={styles.dotOuter}>
              <View style={styles.dotInner} />
           </View>
        </View>
        {!isLast && <View style={styles.line} />}
      </View>

      {/* Right side: Content Card */}
      <View style={styles.contentColumn}>
        <Text style={styles.yearText}>{year}</Text>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.descriptionText}>{description}</Text>
        
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} resizeMode="cover" />
          <View style={styles.imageOverlay} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  leftColumn: {
    width: 40,
    alignItems: 'center',
    paddingTop: 8,
  },
  dotContainer: {
    zIndex: 1,
  },
  dotOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(230, 126, 34, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  dotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  line: {
    position: 'absolute',
    top: 32,
    bottom: -32,
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  contentColumn: {
    flex: 1,
    paddingLeft: 10,
  },
  yearText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '700',
    marginBottom: 4,
    fontFamily: Typography.label,
  },
  titleText: {
    fontSize: 24,
    color: Colors.white,
    fontFamily: Typography.headline,
    fontWeight: '700',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: Colors.gray,
    fontFamily: Typography.body,
    lineHeight: 20,
    marginBottom: 16,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 20,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: Typography.label,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

export default TimelineItem;
