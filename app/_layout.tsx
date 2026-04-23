import { Stack } from "expo-router";
import * as ExpoSplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import { NotoSerif_400Regular, NotoSerif_700Bold } from '@expo-google-fonts/noto-serif';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Manrope_400Regular, Manrope_700Bold } from '@expo-google-fonts/manrope';
import CustomSplashScreen from '../components/SplashScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LanguageProvider } from '../context/LanguageContext';
import { SavedSitesProvider } from '../context/SavedSitesContext';

ExpoSplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [loaded, error] = useFonts({
    NotoSerif_400Regular,
    NotoSerif_700Bold,
    Inter_400Regular,
    Inter_700Bold,
    Manrope_400Regular,
    Manrope_700Bold,
  });

  useEffect(() => {
    // Hide the native splash screen as soon as the JS bundle loads
    ExpoSplashScreen.hideAsync();
    
    async function prepare() {
      try {
        // Pre-load assets, make any API calls here
        // We simulate a delay to let the custom splash animation play out
        await new Promise(resolve => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsAppReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (loaded || error) {
      if (isAppReady) {
        ExpoSplashScreen.hideAsync();
      }
    }
  }, [loaded, error, isAppReady]);

  if (!loaded && !error) {
    return <CustomSplashScreen />;
  }

  if (!isAppReady) {
    return <CustomSplashScreen />;
  }

  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <SavedSitesProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="ar" options={{ headerShown: false }} />
            <Stack.Screen name="chat" options={{ headerShown: false }} />
            <Stack.Screen name="historical-timeline" options={{ headerShown: false }} />
            <Stack.Screen name="temple-detail" options={{ headerShown: false }} />
            <Stack.Screen name="saved-monuments" options={{ headerShown: false }} />
            <Stack.Screen name="language-settings" options={{ headerShown: false }} />
            <Stack.Screen name="app-settings" options={{ headerShown: false }} />
            <Stack.Screen name="stay-eat" options={{ headerShown: false }} />
            <Stack.Screen name="stay-detail/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="eat-detail/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="booking-stays/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="booking-eat/[id]" options={{ headerShown: false }} />
          </Stack>
        </SavedSitesProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
