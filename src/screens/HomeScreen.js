import React from "react";
import { View, Text, Button } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function HomeScreen() {
  const { logout } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Bem-vindo ao App</Text>
      <Button title="Sair" onPress={logout} />
    </View>
  );
}
