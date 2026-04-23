import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Typography } from '../../constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../config/firebase";

export default function SignupScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (!fullName || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Attempting to create user with email:', email.trim());
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      console.log('User created successfully:', userCredential.user.uid);
      
      // Update the user's profile with their full name
      console.log('Updating profile with name:', fullName.trim());
      await updateProfile(userCredential.user, {
        displayName: fullName.trim()
      });

      // Initialize user data in Firestore
      console.log('Initializing Firestore document...');
      try {
        await setDoc(doc(db, "users", userCredential.user.uid), {
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          level: 1,
          monumentsVisited: 0,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          preferences: {
            darkMode: true,
            language: 'en'
          }
        });
        console.log('Firestore document initialized successfully');
      } catch (firestoreErr) {
        console.error('Firestore Initialization Error:', firestoreErr);
        // We still redirect even if firestore fails for now, or we can show an error
        // setError('Account created, but failed to initialize profile data.');
      }

      router.replace('/');
    } catch (err: any) {
      console.error(err);
      let errorMessage = 'Failed to create account. Please try again.';
      
      if (err.code === 'auth/email-already-in-use') errorMessage = 'This email is already registered.';
      else if (err.code === 'auth/invalid-email') errorMessage = 'Invalid email address.';
      else if (err.code === 'auth/weak-password') errorMessage = 'The password is too weak.';
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color={Colors.white} />
            </TouchableOpacity>

            <View style={styles.header}>
                <Text style={styles.logoText}>LUMBINI GUIDE</Text>
            </View>

            <View style={styles.topContent}>
                <Text style={styles.title}>Seek Invitation</Text>
                <Text style={styles.subtitle}>
                    Join the circle of enlightened travelers and begin your personalized pilgrimage.
                </Text>
            </View>

            {/* Signup Form */}
            <View style={styles.authCard}>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>FULL NAME</Text>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="person-outline" size={20} color={Colors.white} style={styles.icon} />
                        <TextInput 
                            placeholder="Siddhartha Gautama" 
                            placeholderTextColor="#FFFFFF40"
                            style={styles.input}
                            value={fullName}
                            onChangeText={setFullName}
                        />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>SPIRITUAL IDENTITY (EMAIL)</Text>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="mail-outline" size={20} color={Colors.white} style={styles.icon} />
                        <TextInput 
                            placeholder="path@peace.com" 
                            placeholderTextColor="#FFFFFF40"
                            style={styles.input}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>SECURE KEY (PASSWORD)</Text>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="lock-closed-outline" size={20} color={Colors.white} style={styles.icon} />
                        <TextInput 
                            placeholder="Min. 8 characters" 
                            placeholderTextColor="#FFFFFF40"
                            style={styles.input}
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                </View>

                {error ? (
                    <View style={styles.errorContainer}>
                        <Ionicons name="alert-circle-outline" size={16} color="#FF6B6B" />
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                ) : null}

                <TouchableOpacity 
                    style={[styles.primaryButton, loading && styles.disabledButton]}
                    onPress={handleSignup}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color={Colors.natural} />
                    ) : (
                        <>
                            <Text style={styles.buttonText}>Join the Path</Text>
                            <Ionicons name="star" size={20} color={Colors.natural} />
                        </>
                    )}
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.footerLink}>
                        Already a pilgrim? <Text style={styles.orangeLink}>Sign In</Text>
                    </Text>
                </TouchableOpacity>
            </View>
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
  backButton: {
    marginTop: 20,
    width: 44,
    height: 44,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
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
    paddingHorizontal: 10,
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
  },
  disabledButton: {
    opacity: 0.7,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    padding: 12,
    borderRadius: 15,
    marginBottom: 15,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.2)',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 13,
    fontFamily: Typography.body,
    flex: 1,
  },
  buttonText: {
    color: Colors.natural,
    fontSize: 18,
    fontWeight: '700',
    fontFamily: Typography.body,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerLink: {
    color: '#FFFFFF40',
    fontSize: 14,
    fontWeight: '500',
  },
  orangeLink: {
    color: '#D4B390',
    fontWeight: '700',
  }
});
