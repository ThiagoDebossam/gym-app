import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import loginErrorUtils from "../utils/loginErrorUtils";

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
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(loginErrorUtils(error.code));
      throw new Error(error);
    }
  };

  const register = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
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
