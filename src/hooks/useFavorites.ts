import { useState, useEffect } from 'react';
import { Lugar } from '@/types/interfaces';

const STORAGE_KEY = 'buenos-aires-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Lugar[]>([]);

  useEffect(() => {
    // Carregar favoritos do localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      }
    }
  }, []);

  const addFavorite = (lugar: Lugar) => {
    const lugarWithId = { ...lugar, id: `${lugar.nome}-${Date.now()}` };
    const newFavorites = [...favorites, lugarWithId];
    setFavorites(newFavorites);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
  };

  const removeFavorite = (lugar: Lugar) => {
    const newFavorites = favorites.filter(fav => fav.nome !== lugar.nome);
    setFavorites(newFavorites);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
  };

  const isFavorited = (lugar: Lugar) => {
    return favorites.some(fav => fav.nome === lugar.nome);
  };

  const toggleFavorite = (lugar: Lugar) => {
    if (isFavorited(lugar)) {
      removeFavorite(lugar);
    } else {
      addFavorite(lugar);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorited,
    toggleFavorite
  };
}
