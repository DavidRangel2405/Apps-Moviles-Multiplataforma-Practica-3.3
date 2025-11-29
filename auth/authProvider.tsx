import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../components/firebaseConfig';
import { get, ref } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import "react-native-get-random-values";
import bcrypt from 'react-native-bcrypt';

// Fix PRNG para bcrypt
bcrypt.setRandomFallback((len: number) => {
  const bytes = new Uint8Array(len);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes);
});

interface User {
  email: string;
  username: string;
  password?: string;
  avatar?: string;
  createdAt?: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginFromDb: (email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Verificar si hay una sesión guardada al iniciar la app
  useEffect(() => {
    checkStoredSession();
  }, []);

  const checkStoredSession = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error al verificar sesión guardada:', error);
    } finally {
      setLoading(false);
    }
  };

  const loginFromDb = async (email: string, password: string) => {
    try {
      const userRef = ref(db, `users/${email.replace(/\./g, "_")}`);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        return { ok: false, message: "Usuario no existe" };
      }

      const data = snapshot.val();

      if (!data.password) {
        return { ok: false, message: "Usuario no tiene contraseña registrada" };
      }

      const isMatch = bcrypt.compareSync(password, data.password);

      if (!isMatch) {
        return { ok: false, message: "Contraseña incorrecta" };
      }

      const userData = { ...data, email };
      setUser(userData);

      // Guardar sesión en AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(userData));

      return { ok: true };
    } catch (err) {
      console.error('Error en loginFromDb:', err);
      return { ok: false, message: "Error inesperado" };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginFromDb, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};