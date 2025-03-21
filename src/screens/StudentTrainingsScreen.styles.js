import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  studentName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#121212',
    alignItems: 'center',
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#3A1C1C',
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 80,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#bbb',
    fontSize: 16,
    textAlign: 'center',
  },
  trainingCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  trainingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  trainingName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  trainingDate: {
    fontSize: 14,
    color: '#bbb',
  },
  exerciseCount: {
    fontSize: 14,
    color: '#bbb',
    marginBottom: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    marginLeft: 16,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#6200EE',
    borderRadius: 28,
    elevation: 8,
  },
}); 