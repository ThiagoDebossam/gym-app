import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  RefreshControl,
} from "react-native";
import { Feather } from '@expo/vector-icons';
import { useAuth } from "../contexts/AuthContext";
import { styles } from "./HomeScreen.styles";
import { getStudentsByTrainerId } from "../services/StudentService";

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadStudentsCount();
  }, []);

  const loadStudentsCount = async () => {
    try {
      const students = await getStudentsByTrainerId(user.uid);
      setTotalStudents(students.length);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadStudentsCount();
  };

  const menuItems = [
    {
      title: 'Alunos',
      icon: 'users',
      onPress: () => navigation.navigate('StudentList'),
    },
    {
      title: 'Novo Aluno',
      icon: 'user-plus',
      onPress: () => navigation.navigate('RegisterStudent'),
    },
    {
      title: 'Treinos',
      icon: 'activity',
      onPress: () => {/* TODO: Implementar tela de treinos */},
    },
    {
      title: 'Configurações',
      icon: 'settings',
      onPress: () => {/* TODO: Implementar tela de configurações */},
    },
  ];

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#6200EE"]}
          tintColor="#6200EE"
        />
      }
    >
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Bem-vindo</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalStudents}</Text>
          <Text style={styles.statLabel}>Alunos Ativos</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Treinos Criados</Text>
        </View>
      </View>

      <View style={styles.menuGrid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <Feather
              name={item.icon}
              size={32}
              color="#fff"
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Feather name="log-out" size={24} color="#FF5252" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
