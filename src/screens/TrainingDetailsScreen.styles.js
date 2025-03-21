import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  trainingName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  studentName: {
    fontSize: 16,
    color: '#bbb',
    marginBottom: 4,
  },
  trainingDate: {
    fontSize: 14,
    color: '#bbb',
  },
  editButton: {
    padding: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  daySection: {
    marginBottom: 24,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#BB86FC',
    marginBottom: 12,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  exerciseCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  exerciseDetails: {
    paddingLeft: 8,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: '#bbb',
    width: 100,
  },
  detailValue: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  observacoesContainer: {
    marginTop: 8,
  },
  observacoesLabel: {
    fontSize: 14,
    color: '#bbb',
    marginBottom: 4,
  },
  observacoesText: {
    fontSize: 14,
    color: '#fff',
    fontStyle: 'italic',
  },
}); 