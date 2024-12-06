const router = require('express').Router();
const movieController = require('../controllers/movieController');
const auth = require('../middleware/authMiddleware');

router.post('/favorite', auth, movieController.toggleFavorite);
router.get('/favorites', auth, movieController.getFavorites);
router.get('/likes/:tmdbId', movieController.getMovieLikes);

module.exports = router;