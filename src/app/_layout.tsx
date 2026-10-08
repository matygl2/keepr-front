import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_700Bold,
  useFonts,
} from '@expo-google-fonts/playfair-display';
import { NavigationBar } from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OnboardingScreens from '../components/OnboardingScreens';
import { colors } from '../constants/theme';
import { ProductsProvider } from '../context/ProductsContext';


SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
  });
  const [hasOnboarded, setHasOnboarded] = useState(false);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onLayoutRootView();
    NavigationBar.setHidden(true);
  }, [onLayoutRootView]);
  
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ProductsProvider>
        {!hasOnboarded ? (
          <View style={{ flex: 1, backgroundColor: colors.background }}>
            <OnboardingScreens onFinish={() => setHasOnboarded(true)} />
          </View>
        ) : (
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="product/[id]/index" />
            <Stack.Screen name="product/[id]/maintenance" />
          </Stack>
        )}
      </ProductsProvider>
    </SafeAreaProvider>
  );
}
