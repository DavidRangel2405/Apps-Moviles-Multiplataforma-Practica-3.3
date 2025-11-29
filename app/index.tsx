import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../auth/authProvider';
import { View, ActivityIndicator } from 'react-native';
import 'react-native-get-random-values';
import bcrypt from 'react-native-bcrypt';

// Fix PRNG
bcrypt.setRandomFallback((len: number) => {
  const bytes = new Uint8Array(len);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes);
});

export default function Index() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    // Redirigir según el estado de autenticación
    if (!user) {
      router.replace('/loginScreen');
    } else {
      router.replace('/homeScreen');
    }
  }, [user, loading]);

  // Mostrar spinner mientras se verifica la autenticación
  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: '#0A0A0A' 
    }}>
      <ActivityIndicator size="large" color="#10b981" />
    </View>
  );
}