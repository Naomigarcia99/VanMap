import React, { createContext, useContext, useState } from "react";
import { auth, db } from "../utils/credentials";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

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

      const updatedUser = auth.currentUser;

      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: email,
        displayName: name,
        role: "user",
        createdAt: new Date(),
      });

      setUser({
        uid: updatedUser.uid,
        email: updatedUser.email,
        displayName: updatedUser.displayName,
        role: "user",
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

      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();

        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: displayName,
          role: userData.role,
        });
      }
      navigate("/profile");
    } catch (error) {
      handleFirebaseError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFirebaseError = (error) => {
    let errorMessage;
    console.log(error.code);
    switch (error.code) {
      case "auth/missing-name":
        errorMessage = "El nombre es obligatorio";
        break;
      case "auth/email-already-in-use":
        errorMessage = "El correo ya está registrado";
        break;
      case "auth/invalid-email":
        errorMessage = "Correo inválido";
        break;
      case "auth/weak-password":
        errorMessage = "La contraseña es muy débil";
        break;
      case "auth/missing-password":
        errorMessage = "Indique una contraseña";
        break;
      case "auth/user-not-found":
        errorMessage = "Correo no registrado";
        break;
      case "auth/wrong-password":
        errorMessage = "Contraseña incorrecta";
        break;
      case "auth/invalid-credential":
        errorMessage = "Datos incorrectos";
        break;
      default:
        errorMessage = "Rellena todos los campos";
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
        setError,
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
