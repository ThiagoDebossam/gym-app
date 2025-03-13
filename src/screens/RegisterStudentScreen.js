import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "./RegisterStudentScreen.styles";
import { MaskedTextInput } from "react-native-mask-text";
import { createStudent } from "../services/StudentService";
import { useAuth } from "../contexts/AuthContext";

export default function RegisterStudentScreen({ navigation }) {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    setLoading(true);
    setMessage("");

    try {
      await createStudent(
        user.uid,
        name,
        email,
        phone
      );
      setName("");
      setEmail("");
      navigation.navigate('Home');
    } catch (error) {
      setMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Aluno</Text>

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <TextInput
        style={styles.input}
        placeholderTextColor="#bbb"
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholderTextColor="#bbb"
        placeholder="E-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <MaskedTextInput
        style={styles.input}
        mask="(99) 99999-9999"
        placeholderTextColor="#bbb"
        placeholder="Celular"
        maxLength={15}
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Cadastrar</Text>}
      </TouchableOpacity>
    </View>
  );
}
