import { collection, addDoc, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { validateStudentData } from "../utils/validationUtils";

export const createStudent = async (userId, name, email, phone) => {
  const validationErrors = validateStudentData({ name, email, phone });
  if (validationErrors) {
    throw validationErrors;
  }
  const studentData = {
    name,
    email,
    phone,
    trainerId: userId,
    status: 1,
    createdAt: new Date(),
  };
  try {
    await addDoc(collection(db, "students"), studentData);
  } catch (error) {
    throw error;
  }
};

export const getStudentsByTrainerId = async (trainerId) => {
  try {
    const studentsRef = collection(db, "students");
    const q = query(
      studentsRef,
      where("trainerId", "==", trainerId),
      where("status", "==", 1)
    );

    const querySnapshot = await getDocs(q);
    const students = [];

    querySnapshot.forEach((doc) => {
      students.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || null,
      });
    });

    return students;
  } catch (error) {
    throw new Error("Não foi possível carregar a lista de alunos");
  }
};

export const deleteStudent = async (studentId) => {
  try {
    const studentRef = doc(db, "students", studentId);
    await updateDoc(studentRef, {
      status: 0,
      deletedAt: new Date()
    });
  } catch (error) {
    console.error("Erro ao deletar aluno:", error);
    throw new Error("Não foi possível deletar o aluno");
  }
};