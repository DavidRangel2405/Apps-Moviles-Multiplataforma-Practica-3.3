import React, { useState } from "react";
import { Modal, Alert } from "react-native";
import {
  Box,
  Text,
  VStack,
  HStack,
  Input,
  InputField,
  Button,
  ButtonText,
  Pressable,
  Icon,
  Spinner,
} from "@gluestack-ui/themed";
import { X, Mail, Lock, User, Eye, EyeOff } from "lucide-react-native";
import { getDatabase, ref, set, get } from "firebase/database";
import 'react-native-get-random-values';
import bcrypt from 'react-native-bcrypt';

// Fix PRNG
bcrypt.setRandomFallback((len: number) => {
  const bytes = new Uint8Array(len);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes);
});

interface RegisterModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function RegisterModal({ visible, onClose }: RegisterModalProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const db = getDatabase();

  const formatKey = (value: string) => value.trim().toLowerCase().replace(/\./g, "_");

  const handleRegister = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres");
      return;
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Ingresa un correo válido");
      return;
    }

    setLoading(true);

    try {
      const userKey = formatKey(email);
      const userRef = ref(db, "users/" + userKey);

      // Validar si ya existe
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        Alert.alert("Error", "Este correo ya está registrado.");
        setLoading(false);
        return;
      }

      // Guardar usuario
      const hashedPassword = bcrypt.hashSync(password, 10);

      await set(userRef, {
        username,
        email,
        password: hashedPassword, // segura
        createdAt: Date.now(),
      });

      Alert.alert(
        "¡Éxito!", 
        "Cuenta creada correctamente. Ya puedes iniciar sesión.",
        [
          {
            text: "OK",
            onPress: () => {
              onClose();
              // Limpiar campos
              setUsername("");
              setEmail("");
              setPassword("");
            }
          }
        ]
      );

    } catch (error) {
      console.error("Error al registrar:", error);
      Alert.alert("Error", "Hubo un problema al registrar. Intenta de nuevo.");
    }

    setLoading(false);
  };

  const handleClose = () => {
    if (!loading) {
      setUsername("");
      setEmail("");
      setPassword("");
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Box flex={1} bg="rgba(0,0,0,0.85)" justifyContent="center" px="$6">
        <Box
          bg="#111111"
          p="$6"
          borderRadius="$3xl"
          borderWidth={2}
          borderColor="#0aff8a"
          shadowColor="#0aff8a"
          shadowOpacity={0.3}
          shadowRadius={20}
        >
          {/* HEADER */}
          <HStack justifyContent="space-between" alignItems="center" mb="$4">
            <Text fontSize="$2xl" fontWeight="$bold" color="#0aff8a">
              Crear Cuenta
            </Text>

            <Pressable onPress={handleClose} disabled={loading}>
              <Icon as={X} color="#0aff8a" size="xl" />
            </Pressable>
          </HStack>

          <VStack space="lg">
            {/* Username */}
            <HStack space="md" alignItems="center">
              <Icon as={User} color="#0aff8a" />
              <Input 
                variant="outline" 
                borderColor="#0aff8a" 
                flex={1} 
                borderRadius="$lg"
                isDisabled={loading}
              >
                <InputField
                  placeholder="Nombre de usuario"
                  placeholderTextColor="#828282"
                  color="white"
                  value={username}
                  onChangeText={setUsername}
                />
              </Input>
            </HStack>

            {/* Email */}
            <HStack space="md" alignItems="center">
              <Icon as={Mail} color="#0aff8a" />
              <Input 
                variant="outline" 
                borderColor="#0aff8a" 
                flex={1} 
                borderRadius="$lg"
                isDisabled={loading}
              >
                <InputField
                  placeholder="Correo electrónico"
                  placeholderTextColor="#828282"
                  color="white"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </Input>
            </HStack>

            {/* Password */}
            <VStack space="sm">
              <HStack space="md" alignItems="center">
                <Icon as={Lock} color="#0aff8a" />
                <Input 
                  variant="outline" 
                  borderColor="#0aff8a" 
                  flex={1} 
                  borderRadius="$lg"
                  isDisabled={loading}
                >
                  <InputField
                    placeholder="Contraseña (mín. 6 caracteres)"
                    placeholderTextColor="#828282"
                    secureTextEntry={!showPassword}
                    color="white"
                    value={password}
                    onChangeText={setPassword}
                    style={{ flex: 1 }}
                  />
                </Input>
                <Pressable 
                  onPress={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  ml="$-12"
                  zIndex={1}
                  pr="$3"
                >
                  <Icon 
                    as={showPassword ? EyeOff : Eye} 
                    color="#0aff8a" 
                    size="md"
                  />
                </Pressable>
              </HStack>
            </VStack>
          </VStack>

          {/* BOTÓN */}
          <Button
            mt="$8"
            bg="#0aff8a"
            size="lg"
            borderRadius="$2xl"
            onPress={handleRegister}
            isDisabled={loading}
          >
            {loading ? (
              <Spinner color="black" />
            ) : (
              <ButtonText color="black" fontWeight="$bold">
                Crear Cuenta
              </ButtonText>
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}