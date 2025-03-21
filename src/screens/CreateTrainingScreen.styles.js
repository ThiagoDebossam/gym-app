import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#bbb',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
    color: '#fff',
  },
  exercisesSection: {
    marginBottom: 100,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  exerciseCount: {
    fontSize: 14,
    color: '#bbb',
  },
  exerciseCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  exerciseDetails: {
    paddingLeft: 8,
  },
  exerciseInfo: {
    fontSize: 14,
    color: '#bbb',
    marginBottom: 4,
  },
  exerciseObs: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 8,
    fontStyle: 'italic',
  },
  diasContainer: {
    marginTop: 8,
  },
  addExerciseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2D2D3A',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#6200EE',
    borderStyle: 'dashed',
  },
  addExerciseButtonText: {
    color: '#BB86FC',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  saveButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#6200EE',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 