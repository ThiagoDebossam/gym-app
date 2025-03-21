import { collection, query, where, orderBy, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

export const getTrainingsByStudentId = async (studentId) => {
  try {
    const q = query(
      collection(db, 'trainings'),
      where('studentId', '==', studentId),
      orderBy('startDate', 'desc')
    );
    
    const trainingsSnapshot = await getDocs(q);
    return trainingsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching trainings:', error);
    throw error;
  }
};

export const getTrainingById = async (trainingId) => {
  try {
    const trainingDoc = await getDoc(doc(db, 'trainings', trainingId));
    
    if (!trainingDoc.exists()) {
      throw new Error('Training not found');
    }
    
    return {
      id: trainingDoc.id,
      ...trainingDoc.data()
    };
  } catch (error) {
    console.error('Error fetching training:', error);
    throw error;
  }
};

export const createTraining = async (trainingData) => {
  try {
    // Convert from frontend Portuguese field names to backend English field names
    const backendData = {
      name: trainingData.nome,
      studentId: trainingData.studentId,
      exercises: trainingData.exercicios,
      startDate: trainingData.dataInicio,
      status: trainingData.status,
      createdAt: serverTimestamp()
    };
    
    const trainingRef = await addDoc(collection(db, 'trainings'), backendData);
    
    return trainingRef.id;
  } catch (error) {
    console.error('Error creating training:', error);
    throw error;
  }
};

export const updateTraining = async (trainingId, trainingData) => {
  try {
    // Convert from frontend Portuguese field names to backend English field names
    const backendData = {
      name: trainingData.nome,
      exercises: trainingData.exercicios,
      status: trainingData.status,
      updatedAt: serverTimestamp()
    };
    
    // Only update studentId if it exists in the incoming data
    if (trainingData.studentId) {
      backendData.studentId = trainingData.studentId;
    }
    
    await updateDoc(doc(db, 'trainings', trainingId), backendData);
  } catch (error) {
    console.error('Error updating training:', error);
    throw error;
  }
};

export const deleteTraining = async (trainingId) => {
  try {
    await deleteDoc(doc(db, 'trainings', trainingId));
  } catch (error) {
    console.error('Error deleting training:', error);
    throw error;
  }
};