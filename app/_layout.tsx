import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

// _layout.tsx es el archivo raíz que Expo Router usa para envolver todas las
// pantallas de /app. Acá es donde en la Fase 3 vamos a meter el AuthProvider
// (contexto de sesión de Supabase) para que toda la app tenga acceso al usuario logueado.
export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="dark" />
    </>
  );
}
