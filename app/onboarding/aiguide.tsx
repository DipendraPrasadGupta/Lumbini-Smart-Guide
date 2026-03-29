import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Typography } from '../../constants/Theme';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function AIGuideScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header (Empty for symmetry) */}
      <View style={styles.header} />

      {/* Hero Image Section */}
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000' }} 
          style={styles.heroImage}
          resizeMode="cover"
        />
        {/* Floating Icons */}
        <View style={styles.micCircle}>
             <MaterialCommunityIcons name="microphone" size={20} color={Colors.white} />
        </View>
        <View style={styles.sparkleTag}>
             <MaterialCommunityIcons name="star-four-points" size={18} color={Colors.primary} />
        </View>
        {/* Audio Wave Visualization Placeholder */}
        <View style={styles.waveContainer}>
            {[1, 2, 3, 2, 1].map((h, i) => (
                <View key={i} style={[styles.waveBar, { height: h * 6 }]} />
            ))}
        </View>
      </View>

      {/* Text Content */}
      <View style={styles.content}>
        <Text style={styles.title}>AI Guide</Text>
        <Text style={styles.description}>
          Ask questions and listen to the history of Lumbini.
        </Text>
      </View>

      {/* Pagination & Button Footer */}
      <View style={styles.footer}>
        <View style={styles.pagination}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/auth/login' as any)}
        >
          <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signInLink}>
            <Text style={styles.signInText}>ALREADY HAVE AN ACCOUNT? <Text style={styles.signInBold}>SIGN IN</Text></Text>
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
    height: 44,
  },
  imageContainer: {
    height: width * 0.85,
    width: width * 0.8,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  micCircle: {
    position: 'absolute',
    bottom: 40,
    left: -20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sparkleTag: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 10,
    borderRadius: 12,
  },
  waveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    position: 'absolute',
  },
  waveBar: {
    width: 3,
    backgroundColor: '#FFFFFF40',
    borderRadius: 2,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 80,
  },
  title: {
    color: Colors.white,
    fontSize: 48,
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
    paddingVertical: 18,
    paddingHorizontal: 80,
    borderRadius: 12, // Match mockup's sharper button
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  buttonText: {
    color: Colors.natural,
    fontSize: 16,
    fontWeight: '800',
    fontFamily: Typography.body,
    letterSpacing: 1,
  },
  signInLink: {
    marginTop: 35,
  },
  signInText: {
    color: '#FFFFFF40',
    fontSize: 11,
    letterSpacing: 1,
    fontWeight: '600',
  },
  signInBold: {
    color: '#FFFFFF70',
    fontWeight: '800',
  }
});
