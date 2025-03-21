import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createTraining, updateTraining } from '../services/TrainingService';
import { styles } from './CreateTrainingScreen.styles';

const CreateTrainingScreen = ({ route, navigation }) => {
  // Ensure route.params exists to avoid errors
  const params = route.params || {};
  const student = params.student || {};
  const training = params.training || null;
  const isEditing = !!training;
  
  const [name, setName] = useState('');
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  // Use useEffect to safely initialize the state
  useEffect(() => {
    if (isEditing && training) {
      setName(training.name || '');
      setExercises(training.exercises || []);
    }
    setInitialLoadDone(true);
  }, [isEditing, training]);

  const handleAddExercise = () => {
    navigation.navigate('CreateExercise', {
      onExerciseCreated: (exercise) => {
        setExercises(prevExercises => [...prevExercises, exercise]);
      }
    });
  };

  const handleRemoveExercise = (index) => {
    const newExercises = [...exercises];
    newExercises.splice(index, 1);
    setExercises(newExercises);
  };

  const handleSaveTraining = async () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'Por favor, informe o nome do treino');
      return;
    }

    if (exercises.length === 0) {
      Alert.alert('Erro', 'Adicione pelo menos um exercício ao treino');
      return;
    }

    try {
      setLoading(true);
      
      const trainingData = {
        nome: name,
        studentId: student.id,
        exercicios: exercises,
        dataInicio: new Date(),
        status: 'ativo'
      };

      if (isEditing) {
        await updateTraining(training.id, trainingData);
        Alert.alert('Sucesso', 'Treino atualizado com sucesso!');
      } else {
        await createTraining(trainingData);
        Alert.alert('Sucesso', 'Treino criado com sucesso!');
      }

      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar treino:', error);
      Alert.alert('Erro', 'Não foi possível salvar o treino');
      setLoading(false);
    }
  };

  // Show loading until initial data is loaded
  if (loading || !initialLoadDone) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.screenTitle}>
          {isEditing ? 'Editar Treino' : 'Criar Novo Treino'}
        </Text>
        
        <Text style={styles.subtitle}>Aluno: {student.name || 'Não especificado'}</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome do Treino</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Ex: Treino A - Superior"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.exercisesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Exercícios</Text>
            <Text style={styles.exerciseCount}>{exercises.length} exercícios</Text>
          </View>
          
          {exercises.map((exercise, index) => (
            <View key={index} style={styles.exerciseCard}>
              <View style={styles.exerciseHeader}>
                <Text style={styles.exerciseName}>{exercise.nome}</Text>
                <TouchableOpacity
                  onPress={() => handleRemoveExercise(index)}
                >
                  <Feather name="trash-2" size={20} color="#FF5252" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.exerciseDetails}>
                <Text style={styles.exerciseInfo}>{exercise.series} séries x {exercise.repeticoes} repetições</Text>
                <Text style={styles.exerciseInfo}>Carga: {exercise.carga || 'Não especificada'}</Text>
                <Text style={styles.exerciseInfo}>Descanso: {exercise.descanso || '60s'}</Text>
                
                {exercise.observacoes ? (
                  <Text style={styles.exerciseObs}>Observações: {exercise.observacoes}</Text>
                ) : null}
                
                {exercise.diaDoTreino && exercise.diaDoTreino.length > 0 ? (
                  <View style={styles.diasContainer}>
                    <Text style={styles.exerciseInfo}>Dias: </Text>
                    <Text style={styles.exerciseInfo}>
                      {exercise.diaDoTreino.map(day => {
                        // Convert Portuguese day names to Portuguese display
                        const dayMap = {
                          'segunda': 'Segunda',
                          'terca': 'Terça',
                          'quarta': 'Quarta',
                          'quinta': 'Quinta',
                          'sexta': 'Sexta',
                          'sabado': 'Sábado',
                          'domingo': 'Domingo'
                        };
                        return dayMap[day] || day.charAt(0).toUpperCase() + day.slice(1);
                      }).join(', ')}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          ))}
          
          <TouchableOpacity
            style={styles.addExerciseButton}
            onPress={handleAddExercise}
          >
            <Feather name="plus-circle" size={20} color="#BB86FC" />
            <Text style={styles.addExerciseButtonText}>Adicionar Exercício</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSaveTraining}
        disabled={loading}
      >
        <Text style={styles.saveButtonText}>
          {isEditing ? 'Atualizar Treino' : 'Criar Treino'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateTrainingScreen; 