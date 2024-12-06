import React, { useState, useEffect } from 'react';
import { Heart, Share2, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { favoritesService } from '../services/favorites';
import Toast from './feedback/Toast';

const MovieCard = ({ 
  id, 
  title = "Movie Title", 
  rating = 4.5, 
  posterUrl = "/api/placeholder/300/450",
  poster_path,
  vote_average
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    setIsLiked(favoritesService.isFavorite(id));
  }, [id]);

  const handleLike = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setToastMessage('Please login to add favorites');
      setShowToast(true);
      return;
    }

    try {
      if (!isLiked) {
        await favoritesService.addFavorite({
          id,
          title,
          poster_path: poster_path || posterUrl,
          vote_average: vote_average || rating
        });
        setToastMessage('Added to favorites');
      } else {
        await favoritesService.removeFavorite(id);
        setToastMessage('Removed from favorites');
      }
      setIsLiked(!isLiked);
      setShowToast(true);
    } catch (error) {
      setToastMessage('Error updating favorites');
      setShowToast(true);
    }
  };

  return (
    <div className="relative group">
      <Toast 
        message={toastMessage} 
        visible={showToast} 
        onClose={() => setShowToast(false)} 
      />

      <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
        <img 
          src={posterUrl}
          alt={title}
          className="w-full aspect-[2/3] object-cover"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 w-full p-4">
            <h3 className="text-white text-lg md:text-xl font-bold mb-2 line-clamp-2">{title}</h3>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white text-sm">{rating}</span>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={handleLike}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors transform hover:scale-110 active:scale-95"
                >
                  <Heart 
                    className={`w-4 h-4 transition-colors ${
                      isLiked ? 'text-red-500 fill-current' : 'text-white'
                    }`} 
                  />
                </button>
                <button 
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors transform hover:scale-110 active:scale-95"
                >
                  <Share2 className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;