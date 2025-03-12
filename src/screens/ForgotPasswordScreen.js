import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import styles from "./LoginScreen.styles";

export default function ForgotPasswordScreen({ navigation }) {
  const { sendPasswordReset, error } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    setLoading(true);
    setMessage("");
    try {
      await sendPasswordReset(email);
      setMessage("E-mail de recuperação enviado com sucesso!");
      setTimeout(() => {
        navigation.navigate('Login');
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Recuperação de Senha</Text>

        {message ? <Text style={styles.successText}>{message}</Text> : null}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Digite seu e-mail"
                placeholderTextColor="#bbb"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleResetPassword}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Recuperar Senha</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}
