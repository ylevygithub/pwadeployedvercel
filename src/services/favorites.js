// Constantes pour le stockage local
const FAVORITES_STORAGE_KEY = 'favorites';

// Fonction utilitaire pour obtenir les favoris du localStorage
const getFavoritesFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

// Fonction utilitaire pour sauvegarder les favoris dans le localStorage
const saveFavoritesToStorage = (favorites) => {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
};

// Service des favoris
export const favoritesService = {
  // Ajouter un film aux favoris
  addFavorite: async (movie) => {
    try {
      const favorites = getFavoritesFromStorage();
      
      if (!favorites.some(fav => fav.id === movie.id)) {
        favorites.push({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
          dateAdded: new Date().toISOString()
        });
        
        saveFavoritesToStorage(favorites);
      }
      return { success: true };
    } catch (error) {
      console.error('Error adding favorite:', error);
      return { success: false, error: 'Failed to add favorite' };
    }
  },

  // Supprimer un film des favoris
  removeFavorite: async (movieId) => {
    try {
      const favorites = getFavoritesFromStorage();
      const updatedFavorites = favorites.filter(movie => movie.id !== movieId);
      saveFavoritesToStorage(updatedFavorites);
      return { success: true };
    } catch (error) {
      console.error('Error removing favorite:', error);
      return { success: false, error: 'Failed to remove favorite' };
    }
  },

  // Obtenir tous les favoris
  getFavorites: async () => {
    try {
      return getFavoritesFromStorage();
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  },

  // Vérifier si un film est dans les favoris
  isFavorite: (movieId) => {
    try {
      const favorites = getFavoritesFromStorage();
      return favorites.some(movie => movie.id === movieId);
    } catch {
      return false;
    }
  },

  // Effacer tous les favoris
  clearFavorites: async () => {
    try {
      localStorage.removeItem(FAVORITES_STORAGE_KEY);
      return { success: true };
    } catch (error) {
      console.error('Error clearing favorites:', error);
      return { success: false, error: 'Failed to clear favorites' };
    }
  }
};