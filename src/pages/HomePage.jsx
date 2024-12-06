import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { tmdbService } from '../services/tmdb';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const [popularMovies, featured] = await Promise.all([
          tmdbService.getPopularMovies(),
          tmdbService.getFeaturedMovie()
        ]);

        setMovies(popularMovies.results);
        setFeaturedMovie(featured);
        if ("caches" in window) {
          const cache = await caches.open("movie-data-cache");
          await cache.put("/popular-movies", new Response(JSON.stringify(popularMovies.results)));
          console.log("Popular movies cached successfully!");
        }
      } catch (error) {
        console.error('Error loading movies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative">
        <div className="relative h-[70vh] overflow-hidden">
          {loading ? (
            <div className="w-full h-full bg-gray-700 animate-pulse" />
          ) : (
            <img
              src={tmdbService.getImageUrl(featuredMovie?.backdrop_path)}
              alt={featuredMovie?.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50">
            <div className="absolute bottom-0 left-0 p-8 max-w-2xl">
              <h1 className="text-4xl font-bold text-white mb-4">
                {loading ? 'Loading...' : featuredMovie?.title}
              </h1>
              <p className="text-gray-300 mb-6">
                {loading ? 'Please wait...' : featuredMovie?.overview}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-6">Popular Movies</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {loading ? (
            [...Array(10)].map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-gray-700 animate-pulse rounded-lg" />
            ))
          ) : (
            movies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                rating={movie.vote_average}
                posterUrl={tmdbService.getImageUrl(movie.poster_path, 'w500')}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;