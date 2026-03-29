import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SavedSitesContextType {
  savedSiteIds: string[];
  toggleSaveSite: (siteId: string) => void;
  isSiteSaved: (siteId: string) => boolean;
}

const SavedSitesContext = createContext<SavedSitesContextType | undefined>(undefined);

export const SavedSitesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedSiteIds, setSavedSiteIds] = useState<string[]>([]);

  // Load saved sites on mount
  useEffect(() => {
    const loadSavedSites = async () => {
      try {
        const saved = await AsyncStorage.getItem('saved_sites');
        if (saved) {
          setSavedSiteIds(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Error loading saved sites:', error);
      }
    };
    loadSavedSites();
  }, []);

  // Save sites whenever they change
  useEffect(() => {
    const save = async () => {
      try {
        await AsyncStorage.setItem('saved_sites', JSON.stringify(savedSiteIds));
      } catch (error) {
        console.error('Error saving sites:', error);
      }
    };
    save();
  }, [savedSiteIds]);

  const toggleSaveSite = (siteId: string) => {
    setSavedSiteIds((prev) => 
      prev.includes(siteId) 
        ? prev.filter(id => id !== siteId) 
        : [...prev, siteId]
    );
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
