import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { favoritesService } from '../services/favorites';
import { tmdbService } from '../services/tmdb';
import { useAuth } from '../contexts/AuthContext';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const userFavorites = await favoritesService.getFavorites(user.token);
        setFavorites(userFavorites);
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please Login</h2>
          <p className="text-gray-400">You need to be logged in to view your favorites</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">My Favorites</h1>
      
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="aspect-[2/3] bg-gray-700 animate-pulse rounded-lg" />
          ))}
        </div>
      ) : favorites.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium text-white mb-2">No favorites yet</h2>
          <p className="text-gray-400">Start adding movies to your favorites!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              rating={movie.vote_average}
              posterUrl={tmdbService.getImageUrl(movie.poster_path, 'w500')}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;