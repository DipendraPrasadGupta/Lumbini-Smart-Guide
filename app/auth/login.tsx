import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Typography } from '../../constants/Theme';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.flex}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
          style={styles.flex}
        >
          <ScrollView 
            style={styles.flex}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Logo Section */}
            <View style={styles.header}>
                <Text style={styles.logoText}>LUMBINI GUIDE</Text>
            </View>

            <View style={styles.topContent}>
                <Text style={styles.title}>Start Your Pilgrimage</Text>
                <Text style={styles.subtitle}>
                    Begin your spiritual journey through the sacred birthgrounds of the enlightened one.
                </Text>
            </View>

            {/* Card Section */}
            <View style={styles.authCard}>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>SPIRITUAL IDENTITY (EMAIL)</Text>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="mail-outline" size={20} color={Colors.white} style={styles.icon} />
                        <TextInput 
                            placeholder="Enter your email" 
                            placeholderTextColor="#FFFFFF40"
                            style={styles.input}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>SECURE KEY (PASSWORD)</Text>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="lock-closed-outline" size={20} color={Colors.white} style={styles.icon} />
                        <TextInput 
                            placeholder="........" 
                            placeholderTextColor="#FFFFFF40"
                            style={styles.input}
                            secureTextEntry
                        />
                    </View>
                </View>

                <TouchableOpacity 
                    style={styles.primaryButton}
                    onPress={() => router.replace('/')}
                >
                    <Text style={styles.buttonText}>Begin Journey</Text>
                    <Ionicons name="arrow-forward" size={22} color={Colors.natural} />
                </TouchableOpacity>

                <View style={styles.dividerRow}>
                    <View style={styles.line} />
                    <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
                    <View style={styles.line} />
                </View>

                <TouchableOpacity style={styles.googleButton}>
                    <Image 
                        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png' }} 
                        style={styles.googleIcon}
                    />
                    <Text style={styles.googleButtonText}>Google Account</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.guestButton}
                    onPress={() => router.replace('/')}
                >
                    <Text style={styles.guestButtonText}>Continue as Guest</Text>
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => router.push('/auth/signup')}>
                    <Text style={styles.footerLink}>
                        New to the path? <Text style={styles.orangeLink}>Seek Invitation</Text>
                    </Text>
                </TouchableOpacity>
                
                <View style={styles.legalRow}>
                    <Text style={styles.legalText}>PRIVACY LORE</Text>
                    <View style={styles.dot} />
                    <Text style={styles.legalText}>TERMS OF PEACE</Text>
                </View>
            </View>

            {/* Meditation Watermark */}
            <MaterialCommunityIcons 
                name="meditation" 
                size={120} 
                color="#FFFFFF05" 
                style={styles.watermark} 
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.natural,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 30,
    paddingBottom: 40,
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    marginBottom: 40,
  },
  logoText: {
    color: '#D4B390',
    fontSize: 24,
    fontFamily: Typography.headline,
    letterSpacing: 2,
    fontWeight: '700',
  },
  topContent: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    color: Colors.white,
    fontSize: 42,
    fontFamily: Typography.headline,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: '#FFFFFF70',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 24,
    fontFamily: Typography.body,
    marginTop: 15,
    paddingHorizontal: 20,
  },
  authCard: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 40,
    padding: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    color: Colors.primary,
    fontSize: 10,
    letterSpacing: 1,
    fontWeight: '700',
    marginBottom: 10,
    opacity: 0.8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 25,
    height: 54,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.02)',
  },
  icon: {
    marginRight: 12,
    opacity: 0.7,
  },
  input: {
    flex: 1,
    color: Colors.white,
    fontSize: 15,
    fontFamily: Typography.body,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 58,
    borderRadius: 29,
    marginTop: 10,
    gap: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonText: {
    color: Colors.natural,
    fontSize: 18,
    fontWeight: '700',
    fontFamily: Typography.body,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
    gap: 15,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#FFFFFF10',
  },
  dividerText: {
    color: '#FFFFFF30',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
  },
  googleButton: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
    borderRadius: 27,
    marginBottom: 15,
    gap: 12,
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
  googleButtonText: {
    color: Colors.natural,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: Typography.body,
  },
  guestButton: {
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: Typography.body,
    opacity: 0.9,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
    paddingBottom: 40,
  },
  footerLink: {
    color: '#FFFFFF40',
    fontSize: 14,
    fontWeight: '500',
  },
  orangeLink: {
    color: '#D4B390',
    fontWeight: '700',
  },
  legalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },
  legalText: {
    color: '#FFFFFF20',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#FFFFFF10',
  },
  watermark: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    zIndex: -1,
  }
});
