import React, { createContext, useContext, useState } from "react";
import { auth } from "../credentials";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const registerUser = async ({ email, password, name }) => {
    setLoading(true);
    setError(null);
    try {
      if (!name || name.trim() === "") {
        throw new Error("El nombre es obligatorio.");
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      });
      navigate("/profile");
    } catch (error) {
      handleFirebaseError(error);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const displayName = userCredential.user.displayName || "Usuario Anónimo";

      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: displayName,
      });
      navigate("/profile");
    } catch (error) {
      handleFirebaseError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFirebaseError = (error) => {
    let errorMessage;
    switch (error.code) {
      case "auth/missing-name":
        errorMessage = "El nombre es obligatorio.";
        break;
      case "auth/email-already-in-use":
        errorMessage = "El correo ya está registrado.";
        break;
      case "auth/invalid-email":
        errorMessage = "Correo inválido.";
        break;
      case "auth/weak-password":
        errorMessage = "La contraseña es muy débil.";
        break;
      case "auth/missing-password":
        errorMessage = "Indique una contraseña.";
        break;
      case "auth/user-not-found":
        errorMessage = "Correo no registrado.";
        break;
      case "auth/wrong-password":
        errorMessage = "Contraseña incorrecta.";
        break;
      default:
        errorMessage = "Error al procesar la solicitud. Inténtalo de nuevo.";
    }
    setError(errorMessage);
  };

  const logout = async () => {
    setLoading(true);
    try {
      await auth.signOut();
      setUser(null);
      navigate("/login");
    } catch (error) {
      setError("Error al cerrar sesión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        registerUser,
        loginUser,
        logout,
        resetError: () => setError(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
