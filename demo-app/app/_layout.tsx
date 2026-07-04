import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { ClerkProvider } from '@clerk/clerk-expo';



export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'appFontBold': require('../assets/fonts/OpenSans_Condensed-Bold.ttf'),
    'appFontMedium': require('../assets/fonts/OpenSans_SemiCondensed-Medium.ttf'),
    'appFontRegular': require('../assets/fonts/OpenSans_SemiCondensed-Regular.ttf'),
  });

  return (
    <ClerkProvider>
      <Stack />
    </ClerkProvider>
  );
}
