import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './StudentListScreen.styles';
import { deleteStudent, getStudentsByTrainerId } from '../services/StudentService';
import { useAuth } from '../contexts/AuthContext';

const StudentListScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setError('');
      const studentsList = await getStudentsByTrainerId(user.uid);
      setStudents(studentsList);
    } catch (error) {
      setError('Não foi possível carregar a lista de alunos');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadStudents();
  };

  const handleDeleteStudent = async (studentId, studentName) => {
    Alert.alert(
      "Deletar Aluno",
      `Tem certeza que deseja deletar ${studentName}?`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Deletar",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              setError('');
              await deleteStudent(studentId);
              await loadStudents();
            } catch (error) {
              setError('Não foi possível deletar o aluno');
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.phone.includes(searchQuery)
  );

  const handleAddStudent = () => {
    navigation.navigate('RegisterStudent');
  };

  const handleEditStudent = (student) => {
    navigation.navigate('RegisterStudent', { student });
  };

  const renderStudentCard = ({ item }) => (
    <View style={styles.studentCard}>
      <Text style={styles.studentName}>{item.name}</Text>
      <Text style={styles.studentInfo}>{item.email}</Text>
      <Text style={styles.studentInfo}>{item.phone}</Text>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleEditStudent(item)}
        >
          <Feather name="edit" size={20} color="#6200EE" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDeleteStudent(item.id, item.name)}
        >
          <Feather name="trash-2" size={20} color="#FF5252" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const ListHeaderComponent = () => (
    <>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#bbb" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar aluno..."
          placeholderTextColor="#bbb"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
    </>
  );

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {searchQuery
          ? 'Nenhum aluno encontrado'
          : 'Você ainda não possui alunos cadastrados'}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredStudents}
        renderItem={renderStudentCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#6200EE"]}
            tintColor="#6200EE"
          />
        }
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddStudent}
      >
        <Feather name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default StudentListScreen; 