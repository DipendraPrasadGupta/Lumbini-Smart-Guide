import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Switch, Dimensions, Alert, Modal, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography } from '../constants/Theme';
import { useLanguage } from '../context/LanguageContext';
import { useSavedSites } from '../context/SavedSitesContext';
import { SITES } from '../constants/Sites';
import CustomTabBar from '../components/CustomTabBar';
import CustomHeader from '../components/CustomHeader';
import { auth, db } from '../config/firebase';
import { onAuthStateChanged, User, updateProfile } from 'firebase/auth';
import { doc, getDoc, onSnapshot, setDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t, locale, setLanguage } = useLanguage();
  const { savedSiteIds, toggleSaveSite } = useSavedSites();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [dbUser, setDbUser] = useState<any>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editType, setEditType] = useState<'name' | 'image'>('name');
  const [editValue, setEditValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const userDocRef = doc(db, "users", firebaseUser.uid);
        
        const checkAndCreateDoc = async () => {
          try {
            const docSnap = await getDoc(userDocRef);
            if (!docSnap.exists()) {
              await setDoc(userDocRef, {
                fullName: firebaseUser.displayName || 'Enlightened Pilgrim',
                email: firebaseUser.email?.toLowerCase() || '',
                level: 1,
                monumentsVisited: 0,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                preferences: {
                  darkMode: true,
                  language: 'en'
                }
              });
            }
          } catch (err) {
            console.error('Error checking/creating user doc:', err);
          }
        };

        checkAndCreateDoc();

        const unsubDoc = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setDbUser(data);
            if (data.preferences?.darkMode !== undefined) {
              setIsDarkMode(data.preferences.darkMode);
            }
          }
        });
        return () => unsubDoc();
      } else {
        setDbUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const toggleDarkMode = async (value: boolean) => {
    setIsDarkMode(value);
    if (user) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, {
          "preferences.darkMode": value,
          updatedAt: serverTimestamp()
        });
      } catch (error) {
        console.error('Error updating dark mode:', error);
      }
    }
  };

  const handlePickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled && result.assets && result.assets[0].uri) {
        setIsSaving(true);
        const uri = result.assets[0].uri;
        
        // Create storage reference
        const filename = `avatars/${user?.uid}_${Date.now()}.jpg`;
        const storageRef = ref(storage, filename);

        // Fetch image as blob
        const response = await fetch(uri);
        const blob = await response.blob();

        // Upload to Storage
        await uploadBytes(storageRef, blob);
        
        // Get download URL
        const downloadURL = await getDownloadURL(storageRef);

        // Update profile
        if (user) {
          await updateProfile(user, { photoURL: downloadURL });
          const userDocRef = doc(db, "users", user.uid);
          await updateDoc(userDocRef, {
            profileImage: downloadURL,
            updatedAt: serverTimestamp()
          });
        }
        
        setIsEditModalVisible(false);
        Alert.alert("Success", "Profile image updated from gallery.");
      }
    } catch (error) {
      console.error('Error picking/uploading image:', error);
      Alert.alert("Error", "Failed to upload image.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditName = () => {
    setEditType('name');
    setEditValue(dbUser?.fullName || user?.displayName || '');
    setIsEditModalVisible(true);
  };

  const handleEditImage = () => {
    setEditType('image');
    setEditValue(dbUser?.profileImage || user?.photoURL || '');
    setIsEditModalVisible(true);
  };

  const handleSaveEdit = async () => {
    if (!user || !editValue.trim()) return;
    
    setIsSaving(true);
    try {
      const userDocRef = doc(db, "users", user.uid);
      
      if (editType === 'name') {
        await updateProfile(user, { displayName: editValue.trim() });
        await updateDoc(userDocRef, {
          fullName: editValue.trim(),
          updatedAt: serverTimestamp()
        });
      } else {
        await updateProfile(user, { photoURL: editValue.trim() });
        await updateDoc(userDocRef, {
          profileImage: editValue.trim(),
          updatedAt: serverTimestamp()
        });
      }
      
      setIsEditModalVisible(false);
      Alert.alert("Success", "Profile updated successfully.");
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert("Error", "Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      t('logout'),
      t('logout_confirm_message'),
      [
        { text: t('cancel'), style: 'cancel' },
        { 
          text: t('logout'), 
          style: 'destructive',
          onPress: async () => {
            try {
              await auth.signOut();
              router.replace('/auth/login');
            } catch (error) {
              console.error('Logout Error:', error);
            }
          }
        }
      ]
    );
  };

  const savedMonumentsData = savedSiteIds.map(id => SITES[id]).filter(Boolean);

  return (
    <View style={styles.container}>
      <CustomHeader />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <TouchableOpacity style={styles.avatarContainer} onPress={handleEditImage}>
            <Image 
              source={{ uri: dbUser?.profileImage || user?.photoURL || 'https://i.pravatar.cc/100?img=11' }} 
              style={styles.avatar}
            />
            <View style={styles.imageEditBadge}>
              <Ionicons name="camera" size={12} color={Colors.white} />
            </View>
          </TouchableOpacity>
          <View style={styles.nameRow}>
            <Text style={styles.userName}>{dbUser?.fullName || user?.displayName || 'Enlightened Pilgrim'}</Text>
            <TouchableOpacity onPress={handleEditName} style={styles.smallEditBtn}>
              <Ionicons name="pencil" size={16} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.emailRow}>
            <MaterialCommunityIcons name="email-outline" size={14} color={Colors.gray} />
            <Text style={styles.userEmail}>{user?.email || 'guest@lumbini.com'}</Text>
          </View>

          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>SEEKER LEVEL {dbUser?.level || 1}</Text>
            </View>
            <View style={[styles.badge, styles.badgeSecondary]}>
              <Text style={styles.badgeText}>{dbUser?.monumentsVisited || 0} MONUMENTS VISITED</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('saved_monuments')}</Text>
          <TouchableOpacity onPress={() => router.push('/saved-monuments')}>
            <Text style={styles.viewAll}>{t('view_all')}</Text>
          </TouchableOpacity>
        </View>

        {savedMonumentsData.length > 0 ? (
          savedMonumentsData.slice(0, 3).map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.monumentCard}
              onPress={() => router.push({ pathname: '/site-detail', params: { id: item.id } })}
            >
              <Image source={item.image} style={styles.cardImage} />
              <View style={styles.cardInfo}>
                <View style={styles.cardTitleRow}>
                  <Text style={styles.cardTitle}>{locale === 'ne' ? item.titleNe : item.title}</Text>
                  <TouchableOpacity onPress={() => toggleSaveSite(item.id)}>
                    <Ionicons name="bookmark" size={20} color="#FFBE9D" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.cardDescription} numberOfLines={2}>
                  {locale === 'ne' ? item.descriptionNe : item.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="bookmark-outline" size={48} color="rgba(255, 255, 255, 0.1)" />
            <Text style={styles.emptyText}>{t('no_saved_monuments')}</Text>
          </View>
        )}

        <Text style={[styles.sectionTitle, { marginTop: 32, marginBottom: 16, marginHorizontal: 24 }]}>
          {t('spiritual_preferences')}
        </Text>
        
        <View style={styles.preferencesContainer}>
          <TouchableOpacity 
            style={styles.prefItem}
            onPress={() => router.push('/language-settings')}
          >
            <View style={styles.prefLeft}>
              <View style={styles.prefIconContainer}>
                <MaterialCommunityIcons name="translate" size={20} color={Colors.white} />
              </View>
              <View>
                <Text style={styles.prefLabel}>{t('language_settings')}</Text>
                <Text style={styles.prefSubLabel}>{t('language_sub')}</Text>
              </View>
            </View>
            <View style={styles.prefRight}>
              <Text style={styles.prefValue}>{locale === 'en' ? 'ENGLISH' : 'नेपाली'}</Text>
              <Ionicons name="chevron-forward" size={18} color={Colors.gray} />
            </View>
          </TouchableOpacity>

          <View style={styles.prefItem}>
            <View style={styles.prefLeft}>
              <View style={styles.prefIconContainer}>
                <Ionicons name="moon" size={20} color="#D988B9" />
              </View>
              <View>
                <Text style={styles.prefLabel}>{t('dark_mode')}</Text>
                <Text style={styles.prefSubLabel}>{t('dark_mode_sub')}</Text>
              </View>
            </View>
            <Switch 
              value={isDarkMode} 
              onValueChange={toggleDarkMode}
              trackColor={{ false: '#2C2C2C', true: '#FFBE9D' }}
              thumbColor={isDarkMode ? '#331D12' : '#767577'}
            />
          </View>

          <TouchableOpacity 
            style={styles.prefItem}
            onPress={() => router.push('/app-settings')}
          >
            <View style={styles.prefLeft}>
              <View style={styles.prefIconContainer}>
                <Ionicons name="settings-sharp" size={20} color={Colors.gray} />
              </View>
              <View>
                <Text style={styles.prefLabel}>{t('app_settings')}</Text>
                <Text style={styles.prefSubLabel}>{t('app_settings_sub')}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.gray} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={20} color="#FFBE9D" />
          <Text style={styles.logoutText}>{t('logout')}</Text>
        </TouchableOpacity>

      </ScrollView>

      <Modal
        visible={isEditModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editType === 'name' ? 'Update Spiritual Name' : 'Update Profile Image'}
            </Text>
            <Text style={styles.modalSubtitle}>
              {editType === 'name' 
                ? 'Enter your preferred name for the journey.' 
                : 'Enter a valid image URL for your profile picture.'}
            </Text>
            
            <TextInput
              style={styles.modalInput}
              value={editValue}
              onChangeText={setEditValue}
              placeholder={editType === 'name' ? 'Siddhartha' : 'https://image-url.com/profile.jpg'}
              placeholderTextColor="rgba(255,255,255,0.3)"
              autoFocus={editType === 'name'}
            />

            {editType === 'image' && (
              <TouchableOpacity 
                style={styles.galleryButton} 
                onPress={handlePickImage}
                disabled={isSaving}
              >
                <Ionicons name="images" size={20} color={Colors.primary} />
                <Text style={styles.galleryButtonText}>Pick from Gallery</Text>
              </TouchableOpacity>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalCancelBtn} 
                onPress={() => setIsEditModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalSaveBtn, isSaving && { opacity: 0.7 }]} 
                onPress={handleSaveEdit}
                disabled={isSaving}
              >
                {isSaving ? (
                  <ActivityIndicator color={Colors.white} size="small" />
                ) : (
                  <Text style={styles.modalSaveText}>Save Changes</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <CustomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  iconButton: {
    padding: 4,
  },
  headerTitle: {
    color: Colors.primary,
    fontSize: 20,
    fontFamily: Typography.headline,
    fontWeight: '700',
    letterSpacing: 2,
  },
  miniProfile: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.primary,
    overflow: 'hidden',
  },
  miniAvatar: {
    width: '100%',
    height: '100%',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  editButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#FFBE9D',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0F0F0F',
  },
  userName: {
    color: Colors.white,
    fontSize: 32,
    fontFamily: Typography.headline,
    fontWeight: '700',
    marginBottom: 8,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  userEmail: {
    color: Colors.gray,
    fontSize: 14,
    fontFamily: Typography.body,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  badgeSecondary: {
    backgroundColor: 'rgba(217, 136, 185, 0.1)',
    borderColor: 'rgba(217, 136, 185, 0.2)',
  },
  badgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 24,
    fontFamily: Typography.headline,
    fontWeight: '600',
  },
  viewAll: {
    color: '#FFBE9D',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  monumentCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 24,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardInfo: {
    padding: 16,
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: Typography.headline,
    fontWeight: '600',
  },
  cardDescription: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    lineHeight: 18,
    fontFamily: Typography.body,
  },
  preferencesContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    marginHorizontal: 24,
    borderRadius: 24,
    padding: 8,
  },
  prefItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    gap: 12,
  },
  prefLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  prefIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prefLabel: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  prefSubLabel: {
    color: Colors.gray,
    fontSize: 11,
    lineHeight: 14,
    maxWidth: 180,
  },
  prefRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  prefValue: {
    color: '#FFBE9D',
    fontSize: 12,
    fontWeight: '700',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    marginTop: 32,
    paddingVertical: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 190, 157, 0.3)',
    gap: 10,
    backgroundColor: 'rgba(255, 190, 157, 0.02)',
  },
  logoutText: {
    color: '#FFBE9D',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    gap: 16,
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: Typography.body,
  },
  imageEditBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1E1E1E',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
    marginTop: 15,
  },
  smallEditBtn: {
    padding: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#1A1A1A',
    borderRadius: 30,
    padding: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  modalTitle: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: Typography.headline,
    fontWeight: '700',
    marginBottom: 8,
  },
  modalSubtitle: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    fontFamily: Typography.body,
    marginBottom: 24,
  },
  modalInput: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 15,
    height: 54,
    paddingHorizontal: 20,
    color: Colors.white,
    fontSize: 16,
    fontFamily: Typography.body,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalCancelBtn: {
    flex: 1,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  modalCancelText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  modalSaveBtn: {
    flex: 2,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  modalSaveText: {
    color: Colors.natural,
    fontSize: 16,
    fontWeight: '700',
  },
  galleryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 190, 157, 0.1)',
    borderRadius: 15,
    height: 54,
    gap: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
  },
  galleryButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  }
});
