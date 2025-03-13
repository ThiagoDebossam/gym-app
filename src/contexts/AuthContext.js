import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import loginErrorUtils from "../utils/loginErrorUtils";
import { collection, doc, getDocs, query, setDoc, where } from "@firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError("");
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  const login = async (email, password) => {
    try {
      const user = await getUserByEmail(email);
      if (user.status != 1 ) throw { code: 'auth/user-not-active' };
      if (user.admin != 1 ) throw { code: 'auth/user-not-allowed' };
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(loginErrorUtils(error.code));
      throw new Error(error);
    }
  };

  const register = async (email, password, isAdmin = 0) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email,
        status: 1,
        admin: isAdmin,
        createdAt: new Date(),
      });
    } catch (error) {
      setError(loginErrorUtils(error.code));
      throw new Error(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      setError(loginErrorUtils(error.code));
      throw new Error(error);
    }
  };

  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      setError(loginErrorUtils(error.code));
      throw new Error(error);
    }
  };

  const getUserByEmail = async (email) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      throw new Error("auth/user-not-found");
    }
    return querySnapshot.docs[0].data();
  }

  const share = {
    loading,
    error,
    user,
    login,
    logout,
    register,
    sendPasswordReset
  };

  return (
    <AuthContext.Provider value={share}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
