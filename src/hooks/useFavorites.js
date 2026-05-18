import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const item = window.localStorage.getItem('anime-favorites');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('anime-favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error(error);
    }
  }, [favorites]);

  const addFavorite = (anime) => {
    setFavorites((prev) => {
      // Avoid duplicates
      if (prev.find((item) => item.mal_id === anime.mal_id)) return prev;
      return [...prev, anime];
    });
  };

  const removeFavorite = (animeId) => {
    setFavorites((prev) => prev.filter((item) => item.mal_id !== animeId));
  };

  const isFavorite = (animeId) => {
    return favorites.some((item) => item.mal_id === animeId);
  };

  const toggleFavorite = (anime) => {
    if (isFavorite(anime.mal_id)) {
      removeFavorite(anime.mal_id);
    } else {
      addFavorite(anime);
    }
  };

  return { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite };
};
