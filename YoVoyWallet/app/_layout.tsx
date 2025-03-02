import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* El grupo (auth) se muestra primero */}
      <Stack.Screen name="(auth)" />

      {/* Luego, cuando el usuario haya iniciado sesión, lo dirigimos a (tabs) */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
