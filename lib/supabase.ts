// react-native-url-polyfill debe importarse antes que cualquier cosa que use `URL`
// (Hermes, el motor JS de RN, no trae una implementación completa de la Web API URL).
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AppState } from 'react-native';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Faltan EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_ANON_KEY. Revisá el archivo .env (ver .env.example).'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // AsyncStorage guarda la sesión en el dispositivo para no tener que
    // loguearse de nuevo cada vez que se abre la app.
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    // React Native no maneja URLs de redirect en la barra del navegador,
    // así que detectSessionInUrl (pensado para web) va apagado.
    detectSessionInUrl: false,
  },
});

// Supabase recomienda esto para RN: cuando la app pasa a background hay que
// pausar el auto-refresh del token, si no sigue reintentando y gasta batería.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
