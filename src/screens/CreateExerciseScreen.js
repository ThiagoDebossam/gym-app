import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { styles } from './CreateExerciseScreen.styles';

const CreateExerciseScreen = ({ route, navigation }) => {
  // Get parameters with validation to avoid errors
  const params = route.params || {};
  const onExerciseCreated = params.onExerciseCreated || (() => {
    console.warn('onExerciseCreated was not provided');
    navigation.goBack();
  });
  
  const [name, setName] = useState('');
  const [sets, setSets] = useState('3');
  const [reps, setReps] = useState('12');
  const [weight, setWeight] = useState('');
  const [rest, setRest] = useState('60');
  const [notes, setNotes] = useState('');
  const [days, setDays] = useState({
    segunda: false,
    terca: false,
    quarta: false,
    quinta: false,
    sexta: false,
    sabado: false,
    domingo: false,
  });

  const toggleDay = (day) => {
    setDays({
      ...days,
      [day]: !days[day],
    });
  };

  const handleSaveExercise = () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'Por favor, informe o nome do exercício');
      return;
    }

    const selectedDays = Object.keys(days).filter(day => days[day]);
    
    if (selectedDays.length === 0) {
      Alert.alert('Aviso', 'Nenhum dia selecionado. Deseja continuar?', [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => saveExercise(selectedDays),
        },
      ]);
    } else {
      saveExercise(selectedDays);
    }
  };

  const saveExercise = (selectedDays) => {
    try {
      const exercise = {
        id: Date.now().toString(),
        nome: name,
        series: parseInt(sets) || 3,
        repeticoes: parseInt(reps) || 12,
        carga: weight,
        descanso: `${rest}s`,
        observacoes: notes,
        diaDoTreino: selectedDays,
      };

      // Call the callback passed as parameter
      onExerciseCreated(exercise);
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar exercício:', error);
      Alert.alert('Erro', 'Não foi possível adicionar o exercício');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.screenTitle}>Adicionar Exercício</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome do Exercício *</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Ex: Supino Reto"
            placeholderTextColor="#777"
          />
        </View>

        <View style={styles.rowContainer}>
          <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Séries</Text>
            <TextInput
              style={styles.input}
              value={sets}
              onChangeText={setSets}
              keyboardType="numeric"
              placeholder="Ex: 3"
              placeholderTextColor="#777"
            />
          </View>

          <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Repetições</Text>
            <TextInput
              style={styles.input}
              value={reps}
              onChangeText={setReps}
              keyboardType="numeric"
              placeholder="Ex: 12"
              placeholderTextColor="#777"
            />
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Carga</Text>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
              placeholder="Ex: 20kg"
              placeholderTextColor="#777"
            />
          </View>

          <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Descanso (segundos)</Text>
            <TextInput
              style={styles.input}
              value={rest}
              onChangeText={setRest}
              keyboardType="numeric"
              placeholder="Ex: 60"
              placeholderTextColor="#777"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Observações</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Instruções adicionais para o exercício..."
            placeholderTextColor="#777"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Dias da Semana</Text>
          <View style={styles.diasContainer}>
            {Object.keys(days).map((day) => {
              const dayDisplayName = {
                segunda: 'Segunda-feira',
                terca: 'Terça-feira',
                quarta: 'Quarta-feira',
                quinta: 'Quinta-feira',
                sexta: 'Sexta-feira',
                sabado: 'Sábado',
                domingo: 'Domingo'
              };
              
              return (
                <View key={day} style={styles.diaRow}>
                  <Text style={styles.diaLabel}>
                    {dayDisplayName[day]}
                  </Text>
                  <Switch
                    value={days[day]}
                    onValueChange={() => toggleDay(day)}
                    trackColor={{ false: "#333", true: "#6200EE" }}
                    thumbColor={days[day] ? "#BB86FC" : "#f4f3f4"}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
      
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSaveExercise}
      >
        <Text style={styles.saveButtonText}>Adicionar ao Treino</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateExerciseScreen; 