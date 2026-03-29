import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated, Dimensions, TouchableWithoutFeedback, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Typography } from '../constants/Theme';
import { useLanguage } from '../context/LanguageContext';

const { width } = Dimensions.get('window');
const MENU_WIDTH = width * 0.75;

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
}

export default function SideMenu({ visible, onClose }: SideMenuProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const pathname = usePathname();
  const { locale, setLanguage } = useLanguage();
  
  const [showModal, setShowModal] = useState(visible);
  const slideAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -MENU_WIDTH,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        })
      ]).start(() => {
        setShowModal(false);
      });
    }
  }, [visible]);

  const handleNavigation = (path: any) => {
    onClose();
    // Run after animation completes
    setTimeout(() => {
      router.push(path);
    }, 300);
  };

  const toggleLanguage = () => {
    setLanguage(locale === 'en' ? 'ne' : 'en');
  };

  const menuItems = [
    { id: 'home', icon: 'map', label: locale === 'en' ? 'Map View' : 'नक्सा', path: '/' },
    { id: 'profile', icon: 'person', label: locale === 'en' ? 'Profile' : 'प्रोफाइल', path: '/profile' },
    { id: 'ar', icon: 'scan', label: locale === 'en' ? 'AR View' : 'एआर दृश्य', path: '/ar' },
    { id: 'chat', icon: 'chatbubbles', label: locale === 'en' ? 'AI Assistant' : 'एआई सहायक', path: '/chat' },
    { id: 'timeline', icon: 'time', label: locale === 'en' ? 'Timeline' : 'टाइमलाइन', path: '/historical-timeline' },
  ];

  if (!showModal) return null;

  return (
    <Modal visible={showModal} transparent={true} animationType="none" onRequestClose={onClose}>
      <View style={styles.overlayContainer}>
        {/* Dimmed Background */}
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
        </TouchableWithoutFeedback>

        {/* Sliding Menu Panel */}
        <Animated.View style={[styles.menuPanel, { transform: [{ translateX: slideAnim }] }]}>
          <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) }]}>
            <View style={styles.profileSection}>
              <Image source={{ uri: 'https://i.pravatar.cc/100?img=11' }} style={styles.profileImage} />
              <View style={styles.profileText}>
                <Text style={styles.greeting}>Lumbini Guide</Text>
                <Text style={styles.subtitle}>{locale === 'en' ? 'Welcome!' : 'स्वागत छ!'}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={28} color={Colors.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.menuItemsContainer}>
            {menuItems.map((item) => {
              const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
              return (
                <TouchableOpacity 
                  key={item.id} 
                  style={[styles.menuItem, isActive && styles.activeMenuItem]}
                  onPress={() => handleNavigation(item.path)}
                >
                  <Ionicons name={item.icon as any} size={24} color={isActive ? Colors.primary : Colors.white} />
                  <Text style={[styles.menuItemText, isActive && styles.activeMenuItemText]}>{item.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
            <TouchableOpacity style={styles.langButton} onPress={toggleLanguage}>
              <MaterialIcons name="translate" size={20} color={Colors.white} />
              <Text style={styles.langText}>
                {locale === 'en' ? 'Switch to Nepali' : 'अंग्रेजीमा स्विच गर्नुहोस्'}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  menuPanel: {
    width: MENU_WIDTH,
    height: '100%',
    backgroundColor: '#1A1A1A', // Dark theme for premium feel
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  profileText: {
    justifyContent: 'center',
  },
  greeting: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: Typography.headline,
    fontWeight: 'bold',
  },
  subtitle: {
    color: Colors.gray,
    fontSize: 12,
    fontFamily: Typography.body,
  },
  closeBtn: {
    padding: 4,
  },
  menuItemsContainer: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    gap: 16,
  },
  activeMenuItem: {
    backgroundColor: 'rgba(255, 190, 157, 0.1)', 
  },
  menuItemText: {
    color: '#E0E0E0',
    fontSize: 15,
    fontFamily: Typography.body,
    fontWeight: '500',
  },
  activeMenuItemText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  footer: {
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    paddingTop: 20,
  },
  langButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 12,
  },
  langText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Typography.label,
  },
});
