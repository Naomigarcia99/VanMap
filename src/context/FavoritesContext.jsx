import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../credentials";
import {
  getDocs,
  where,
  query,
  collection,
  addDoc,
  orderBy,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();

  const saveFavoritesToDataBase = async (location, name) => {
    try {
      if (!location || location.length !== 2) {
        console.error("ubicación no válida");
        return;
      }

      const favoriteRef = collection(db, "favorites");
      const newFavoriteDoc = await addDoc(favoriteRef, {
        userId: user.uid,
        name: name,
        coordinates: location,
        createdAt: new Date(),
      });
      console.log("ubicación favorita guardada con id:", newFavoriteDoc.id);
    } catch (error) {
      console.error("Error al guardar la ubicación favorita:", error);
    }
  };

  const loadFavoritesLocations = async () => {
    try {
      if (!user || !user.uid) {
        console.warn("usuario no autenticado");
        return;
      }

      const favoriteRef = collection(db, "favorites");
      const q = query(favoriteRef, where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      const favoriteLocations = querySnapshot.docs.map((doc) => doc.data());
      setFavorites(favoriteLocations);
    } catch (error) {
      console.error("Error al cargar las ubicaciones favoritas:", error);
    }
  };

  /*useEffect(() => {
    if (user) {
      loadFavoritesLocations();
    }
  }, [user]);*/

  return (
    <FavoritesContext.Provider
      value={{ saveFavoritesToDataBase, loadFavoritesLocations, favorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => {
  return useContext(FavoritesContext);
};
