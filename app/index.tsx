import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { supabase } from '@/lib/supabase';

// Pantalla temporal de la Fase 1: solo confirma que el cliente de Supabase
// se conecta bien. En la Fase 3 esto se reemplaza por el flujo real de auth.
export default function Index() {
  const [status, setStatus] = useState<'checking' | 'ok' | 'error'>('checking');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(() => setStatus('ok'))
      .catch((error: Error) => {
        setStatus('error');
        setErrorMessage(error.message);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gym Repo</Text>
      <Text style={styles.subtitle}>
        {status === 'checking' && 'Conectando con Supabase...'}
        {status === 'ok' && 'Conexión con Supabase OK ✓'}
        {status === 'error' && `Error de conexión: ${errorMessage}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F1E8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1E1E1C',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#3A4A3C',
    textAlign: 'center',
  },
});
