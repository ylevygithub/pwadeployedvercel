const API_KEY = 'd9fc022845c710ff39499a8d72b9d7b1'; // Remplacez par votre clé API
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const tmdbService = {
  // Obtenir les films populaires
  getPopularMovies: async () => {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`
    );
    return response.json();
  },

  // Obtenir un film en vedette (random parmi les plus populaires)
  getFeaturedMovie: async () => {
    const movies = await tmdbService.getPopularMovies();
    const randomIndex = Math.floor(Math.random() * movies.results.length);
    return movies.results[randomIndex];
  },

  // Construire l'URL de l'image
  getImageUrl: (path, size = 'original') => {
    return `${IMAGE_BASE_URL}/${size}${path}`;
  }
};