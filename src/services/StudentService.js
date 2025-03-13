import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const createStudent = async (userId, name, email, phone) => {
  if (!name || !email || !phone || !userId) {
    throw "Preencha todos os campos!";
  }
  if (phone.length < 15) {
    throw "Celular inválido.";
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
