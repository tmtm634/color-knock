import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { QuizSettingsProvider } from '../contexts/QuizSettingsContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QuizSettingsProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen
            name="index"
            options={({ route }) => ({
              animation: (route.params as any)?.fromResult === 'true' ? 'fade' : 'slide_from_left',
            })}
          />
          <Stack.Screen
            name="quiz"
            options={({ route }) => ({
              animation: (route.params as any)?.fromResult === 'true' ? 'fade' : 'none',
            })}
          />
          <Stack.Screen name="result" options={{ animation: 'slide_from_right' }} />
        </Stack>
        <StatusBar style="auto" />
      </QuizSettingsProvider>
    </ThemeProvider>
  );
}
