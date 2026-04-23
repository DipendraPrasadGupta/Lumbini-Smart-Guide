import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { Colors, Typography } from '../constants/Theme';
import { useLanguage } from '../context/LanguageContext';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import SideMenu from './SideMenu';

export default function CustomHeader() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { locale, setLanguage } = useLanguage();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [user, setUser] = useState<any>(auth.currentUser);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  const toggleLanguage = () => {
    setLanguage(locale === 'en' ? 'ne' : 'en');
  };

  return (
    <>
      <View style={[styles.container, { paddingTop: Math.max(insets.top, 15) }]}>
        {/* Left Section */}
        <View style={styles.leftContainer}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setIsMenuVisible(true)}
          >
            <Ionicons name="menu" size={28} color={Colors.primary} />
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>LUMBINI</Text>
            <Text style={styles.titleText}>GUIDE</Text>
          </View>
        </View>

        {/* Right Section */}
        <View style={styles.rightContainer}>
          <TouchableOpacity
            style={styles.langButton}
            onPress={toggleLanguage}
          >
            <MaterialIcons name="translate" size={18} color={Colors.white} />
            <Text style={styles.langText}>{locale === 'en' ? 'EN' : 'NE'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => {}}
          >
            <Ionicons name="notifications-outline" size={20} color={Colors.white} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>

          {user ? (
            <TouchableOpacity
              style={styles.profileContainer}
              onPress={() => router.push('/profile')}
            >
              <Image
                source={{ uri: user.photoURL || 'https://i.pravatar.cc/100?img=11' }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => router.push('/auth/login')}
            >
              <Ionicons name="person-circle-outline" size={24} color={Colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <SideMenu
        visible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
    zIndex: 10,
    top: 10,
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
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF20',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderColor: '#1E1E1E',
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
  loginButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 190, 157, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 190, 157, 0.3)',
  }
});
