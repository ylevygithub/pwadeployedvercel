const Movie = require('../models/Movie');
const User = require('../models/User');

exports.toggleFavorite = async (req, res) => {
  try {
    const { movieData } = req.body;
    const userId = req.user.userId;

    let movie = await Movie.findOne({ tmdbId: movieData.id });
    
    if (!movie) {
      movie = new Movie({
        tmdbId: movieData.id,
        title: movieData.title,
        posterPath: movieData.poster_path,
        voteAverage: movieData.vote_average
      });
      await movie.save();
    }

    const user = await User.findById(userId);
    const isFavorite = user.favorites.includes(movie._id);

    if (isFavorite) {
      // Remove from favorites
      await User.findByIdAndUpdate(userId, {
        $pull: { favorites: movie._id }
      });
      await Movie.findByIdAndUpdate(movie._id, {
        $pull: { likedBy: userId }
      });
    } else {
      // Add to favorites
      await User.findByIdAndUpdate(userId, {
        $addToSet: { favorites: movie._id }
      });
      await Movie.findByIdAndUpdate(movie._id, {
        $addToSet: { likedBy: userId }
      });
    }

    res.json({ success: true, isFavorite: !isFavorite });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('favorites');
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMovieLikes = async (req, res) => {
  try {
    const { tmdbId } = req.params;
    const movie = await Movie.findOne({ tmdbId }).populate('likedBy', 'username');
    
    if (!movie) {
      return res.json({ likes: 0, users: [] });
    }

    res.json({
      likes: movie.likedBy.length,
      users: movie.likedBy.map(user => user.username)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};