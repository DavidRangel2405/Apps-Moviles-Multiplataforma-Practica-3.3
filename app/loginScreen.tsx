import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Eye, EyeOff } from "lucide-react-native";
import { useRouter } from "expo-router";
import RegisterModal from "./registerModal";
import { useAuth } from "../auth/authProvider";
import 'react-native-get-random-values';

export default function LoginScreen() {
  const router = useRouter();
  const { loginFromDb } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setErrorMsg("Completa todos los campos");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const result = await loginFromDb(email, password);

      if (!result.ok) {
        setErrorMsg(result.message || "Error al iniciar sesión");
        setLoading(false);
        return;
      }

      // LOGIN EXITOSO
      Alert.alert("Bienvenido", "Inicio de sesión correcto");

      router.replace("/homeScreen");

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrorMsg("Hubo un error. Intenta de nuevo.");
    }

    setLoading(false);
  };

  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.box}>
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.subtitle}>Inicia sesión en tu cuenta</Text>

          <Text style={styles.label}>Correo</Text>
          <TextInput
            style={styles.input}
            placeholder="correo@example.com"
            placeholderTextColor="#4c4c4c"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrorMsg("");
            }}
            editable={!loading}
          />

          <Text style={styles.label}>Contraseña</Text>

          <View style={styles.passContainer}>
            <TextInput
              style={[styles.input, { flex: 1, marginBottom: 0 }]}
              placeholder="••••••••"
              placeholderTextColor="#4c4c4c"
              secureTextEntry={!showPass}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setErrorMsg("");
              }}
              editable={!loading}
            />

            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
              {showPass ? (
                <EyeOff size={22} color="#00ff84" />
              ) : (
                <Eye size={22} color="#00ff84" />
              )}
            </TouchableOpacity>
          </View>

          {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
          >
            <LinearGradient
              colors={["#00C851", "#009944"]}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>
                {loading ? "Iniciando..." : "Entrar"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowRegisterModal(true)}
            style={{ marginTop: 20 }}
            disabled={loading}
          >
            <Text style={styles.registerText}>
              ¿No tienes cuenta?{" "}
              <Text style={styles.registerLink}>Regístrate</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <RegisterModal
        visible={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    justifyContent: "center",
    paddingHorizontal: 26,
  },
  box: {
    backgroundColor: "#121212",
    padding: 26,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1f1f1f",
  },
  title: {
    color: "#00ff84",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    color: "#8f8f8f",
    fontSize: 15,
    marginBottom: 22,
  },
  label: {
    color: "#e2e2e2",
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#0d0d0d",
    borderWidth: 1,
    borderColor: "#1d1d1d",
    color: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 18,
  },
  passContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1d1d1d",
    backgroundColor: "#0d0d0d",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 18,
  },
  button: {
    marginTop: 10,
  },
  buttonGradient: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold",
  },
  error: {
    color: "#ff3b30",
    marginBottom: 8,
    textAlign: "center",
    fontWeight: "bold",
  },
  registerText: {
    color: "#8f8f8f",
    fontSize: 14,
    textAlign: "center",
  },
  registerLink: {
    color: "#00ff84",
    fontWeight: "bold",
  },
});