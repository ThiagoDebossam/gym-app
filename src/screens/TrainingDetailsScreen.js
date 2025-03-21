import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './TrainingDetailsScreen.styles';

const TrainingDetailsScreen = ({ route, navigation }) => {
  // Ensure route.params exists to avoid errors
  const params = route.params || {};
  const training = params.training || {};
  const student = params.student || {};

  const formatDate = (date) => {
    if (!date) return 'Data não disponível';
    
    try {
      if (typeof date === 'string') {
        // Try to convert ISO string to Date
        return new Date(date).toLocaleDateString('pt-BR');
      } else if (typeof date.toDate === 'function') {
        // Try to convert a Firestore timestamp
        return new Date(date.toDate()).toLocaleDateString('pt-BR');
      } else if (date instanceof Date) {
        // It's already a Date object
        return date.toLocaleDateString('pt-BR');
      }
      
      // Generic fallback
      return typeof date === 'object' ? 'Data complexa' : String(date);
    } catch (error) {
      console.error('Erro ao formatar data:', error, date);
      return 'Data inválida';
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

  const handleEditTraining = () => {
    if (!training || !student) {
      console.error('Dados de treino ou aluno não encontrados');
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
      training: serializedTraining, 
      student: cleanStudent 
    });
  };

  const organizeExercisesByDay = () => {
    const days = {
      segunda: [],
      terca: [],
      quarta: [],
      quinta: [],
      sexta: [],
      sabado: [],
      domingo: [],
      semDias: []
    };

    // Check if exercises exists before iterating
    if (!training.exercises || !Array.isArray(training.exercises)) {
      return days;
    }

    training.exercises.forEach(exercise => {
      if (exercise.diaDoTreino && exercise.diaDoTreino.length > 0) {
        exercise.diaDoTreino.forEach(dia => {
          // Add to the appropriate day array
          if (days[dia]) {
            days[dia].push(exercise);
          } else {
            days.semDias.push(exercise);
          }
        });
      } else {
        days.semDias.push(exercise);
      }
    });

    return days;
  };

  const exercisesByDay = organizeExercisesByDay();

  // Function to convert day name to proper Portuguese display format
  const getDayDisplayName = (day) => {
    const dayMap = {
      'segunda': 'Segunda-feira',
      'terca': 'Terça-feira',
      'quarta': 'Quarta-feira',
      'quinta': 'Quinta-feira',
      'sexta': 'Sexta-feira',
      'sabado': 'Sábado',
      'domingo': 'Domingo',
      'semDias': 'Sem dia específico'
    };
    
    return dayMap[day] || day;
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.trainingName}>{training.name || 'Treino sem nome'}</Text>
            <Text style={styles.studentName}>Aluno: {student.name || 'Não especificado'}</Text>
            <Text style={styles.trainingDate}>
              Criado em: {formatDate(training.startDate)}
            </Text>
          </View>
          
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditTraining}
          >
            <Feather name="edit" size={20} color="#BB86FC" />
          </TouchableOpacity>
        </View>

        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Status:</Text>
          <View style={[
            styles.statusBadge,
            { backgroundColor: training.status === 'ativo' ? '#2D3A2D' : '#333' }
          ]}>
            <Text style={[
              styles.statusText,
              { color: training.status === 'ativo' ? '#4CAF50' : '#bbb' }
            ]}>
              {training.status === 'ativo' ? 'Ativo' : (training.status || 'Não definido')}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Exercícios por Dia</Text>

        {Object.keys(exercisesByDay).map(day => {
          const exercises = exercisesByDay[day];
          if (exercises.length === 0) return null;

          return (
            <View key={day} style={styles.daySection}>
              <Text style={styles.dayTitle}>
                {getDayDisplayName(day)}
              </Text>
              
              {exercises.map((exercise, index) => (
                <View key={exercise.id || index} style={styles.exerciseCard}>
                  <Text style={styles.exerciseName}>{exercise.nome}</Text>
                  
                  <View style={styles.exerciseDetails}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Séries:</Text>
                      <Text style={styles.detailValue}>{exercise.series}</Text>
                    </View>
                    
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Repetições:</Text>
                      <Text style={styles.detailValue}>{exercise.repeticoes}</Text>
                    </View>
                    
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Carga:</Text>
                      <Text style={styles.detailValue}>{exercise.carga || '-'}</Text>
                    </View>
                    
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Descanso:</Text>
                      <Text style={styles.detailValue}>{exercise.descanso || '60s'}</Text>
                    </View>
                    
                    {exercise.observacoes ? (
                      <View style={styles.observacoesContainer}>
                        <Text style={styles.observacoesLabel}>Observações:</Text>
                        <Text style={styles.observacoesText}>{exercise.observacoes}</Text>
                      </View>
                    ) : null}
                  </View>
                </View>
              ))}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TrainingDetailsScreen; 