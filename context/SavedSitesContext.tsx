import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../config/firebase';
import { doc, getDoc, updateDoc, onSnapshot, arrayUnion, arrayRemove } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

interface SavedSitesContextType {
  savedSiteIds: string[];
  toggleSaveSite: (siteId: string) => void;
  isSiteSaved: (siteId: string) => boolean;
}

const SavedSitesContext = createContext<SavedSitesContextType | undefined>(undefined);

export const SavedSitesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedSiteIds, setSavedSiteIds] = useState<string[]>([]);

  // Sync with Firestore when user is logged in
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Listen to Firestore for saved sites
        const userDocRef = doc(db, "users", user.uid);
        const unsubscribeDoc = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.savedSiteIds) {
              setSavedSiteIds(data.savedSiteIds);
            }
          }
        });
        return () => unsubscribeDoc();
      } else {
        // Fallback to local storage if not logged in
        const loadLocal = async () => {
          const saved = await AsyncStorage.getItem('saved_sites');
          if (saved) setSavedSiteIds(JSON.parse(saved));
        };
        loadLocal();
      }
    });
    return unsubscribeAuth;
  }, []);

  const toggleSaveSite = async (siteId: string) => {
    const user = auth.currentUser;
    
    // Optimistic update
    const isAdding = !savedSiteIds.includes(siteId);
    setSavedSiteIds(prev => 
      isAdding ? [...prev, siteId] : prev.filter(id => id !== siteId)
    );

    if (user) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, {
          savedSiteIds: isAdding ? arrayUnion(siteId) : arrayRemove(siteId)
        });
      } catch (error) {
        console.error('Error updating saved sites in Firestore:', error);
      }
    } else {
      // Save locally if guest
      try {
        const current = await AsyncStorage.getItem('saved_sites');
        const list = current ? JSON.parse(current) : [];
        const newList = isAdding ? [...list, siteId] : list.filter((id: string) => id !== siteId);
        await AsyncStorage.setItem('saved_sites', JSON.stringify(newList));
      } catch (error) {
        console.error('Error saving sites locally:', error);
      }
    }
  };

  const isSiteSaved = (siteId: string) => savedSiteIds.includes(siteId);

  return (
    <SavedSitesContext.Provider value={{ savedSiteIds, toggleSaveSite, isSiteSaved }}>
      {children}
    </SavedSitesContext.Provider>
  );
};

export const useSavedSites = () => {
  const context = useContext(SavedSitesContext);
  if (context === undefined) {
    throw new Error('useSavedSites must be used within a SavedSitesProvider');
  }
  return context;
};
