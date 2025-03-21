import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getTrainingsByStudentId, deleteTraining } from '../services/TrainingService';
import { styles } from './StudentTrainingsScreen.styles';

const StudentTrainingsScreen = ({ route, navigation }) => {
  const params = route.params || {};
  const student = params.student || {};
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (student && student.id) {
      loadTrainings();
    } else {
      setError('Dados do aluno não encontrados.');
      setLoading(false);
    }
  }, [student]);

  const loadTrainings = async () => {
    try {
      setLoading(true);
      const trainingsList = await getTrainingsByStudentId(student.id);
      setTrainings(trainingsList);
      setError('');
    } catch (error) {
      console.error('Erro ao carregar treinos:', error);
      setError('Não foi possível carregar os treinos');
    } finally {
      setLoading(false);
    }
  };

  // Function to serialize dates in an object
  const serializeObjectDates = (obj) => {
    if (!obj) return obj;
    
    const result = { ...obj };
    
    // Check and convert specific fields that may contain dates
    Object.keys(result).forEach(key => {
      if (result[key] && typeof result[key].toDate === 'function') {
        // Convert Firestore Timestamp to ISO string
        result[key] = result[key].toDate().toISOString();
      } else if (result[key] && result[key] instanceof Date) {
        // Convert Date to ISO string
        result[key] = result[key].toISOString();
      }
    });
    
    return result;
  };

  const handleCreateTraining = () => {
    if (!student || !student.id) {
      Alert.alert('Erro', 'Dados do aluno não encontrados ou incompletos');
      return;
    }
    
    // Create a clean copy of student data to avoid serialization issues
    const cleanStudent = {
      id: student.id,
      name: student.name || 'Aluno',
      email: student.email || '',
      phone: student.phone || '',
    };
    
    navigation.navigate('CreateTraining', { student: cleanStudent });
  };

  const handleEditTraining = (training) => {
    if (!student || !student.id) {
      Alert.alert('Erro', 'Dados do aluno não encontrados ou incompletos');
      return;
    }
    
    // Serialize the training object to ensure there are no non-serializable dates
    const serializedTraining = serializeObjectDates(training);
    
    // Create a clean copy of student data
    const cleanStudent = {
      id: student.id,
      name: student.name || 'Aluno',
      email: student.email || '',
      phone: student.phone || '',
    };
    
    navigation.navigate('CreateTraining', { 
      student: cleanStudent, 
      training: serializedTraining 
    });
  };

  const handleViewTraining = (training) => {
    if (!student || !student.id) {
      Alert.alert('Erro', 'Dados do aluno não encontrados ou incompletos');
      return;
    }
    
    // Serialize the training object to ensure there are no non-serializable dates
    const serializedTraining = serializeObjectDates(training);
    
    // Create a clean copy of student data
    const cleanStudent = {
      id: student.id,
      name: student.name || 'Aluno',
      email: student.email || '',
      phone: student.phone || '',
    };
    
    navigation.navigate('TrainingDetails', { 
      training: serializedTraining, 
      student: cleanStudent 
    });
  };

  const handleDeleteTraining = (trainingId, trainingName) => {
    Alert.alert(
      "Excluir Treino",
      `Tem certeza que deseja excluir o treino "${trainingName}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              await deleteTraining(trainingId);
              loadTrainings();
            } catch (error) {
              setError('Não foi possível excluir o treino');
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.studentName}>Treinos de {student.name}</Text>
      </View>
      
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
      
      <FlatList
        data={trainings}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Nenhum treino registrado para este aluno
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.trainingCard}
            onPress={() => handleViewTraining(item)}
          >
            <View style={styles.trainingHeader}>
              <Text style={styles.trainingName}>{item.name || 'Treino sem nome'}</Text>
              <Text style={styles.trainingDate}>
                {item.startDate && typeof item.startDate.toDate === 'function' 
                  ? new Date(item.startDate.toDate()).toLocaleDateString('pt-BR')
                  : 'Data não disponível'}
              </Text>
            </View>
            
            <Text style={styles.exerciseCount}>
              {item.exercises ? item.exercises.length : 0} exercícios
            </Text>
            
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleEditTraining(item)}
              >
                <Feather name="edit" size={20} color="#6200EE" />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleDeleteTraining(item.id, item.name)}
              >
                <Feather name="trash-2" size={20} color="#FF5252" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
      
      <TouchableOpacity
        style={styles.fab}
        onPress={handleCreateTraining}
      >
        <Feather name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default StudentTrainingsScreen; 