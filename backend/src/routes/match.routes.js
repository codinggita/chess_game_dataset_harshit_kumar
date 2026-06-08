const express = require('express');
const { protect } = require('../middlewares/auth.middleware');
const {
  getMatches,
  getMatchById,
  createMatch,
  updateMatch,
  deleteMatch,
  // Filter handlers
  getRatedMatches,
  getUnratedMatches,
  getWhiteWins,
  getBlackWins,
  getCheckmates,
  // Sort handlers
  getLongestMatches,
  getShortestMatches,
  getHighestRatedMatches
} = require('../controllers/match.controller');

const router = express.Router();

// Filters
router.get('/filter/rated', getRatedMatches);
router.get('/filter/unrated', getUnratedMatches);
router.get('/filter/white-wins', getWhiteWins);
router.get('/filter/black-wins', getBlackWins);
router.get('/filter/checkmates', getCheckmates);

// Sorting
router.get('/sort/longest', getLongestMatches);
router.get('/sort/shortest', getShortestMatches);
router.get('/sort/highest-rated', getHighestRatedMatches);



router.get('/', getMatches);
// Protect write operations
router.post('/', protect, createMatch);

router.get('/:id', getMatchById);
router.patch('/:id', protect, updateMatch);
router.delete('/:id', protect, deleteMatch);

module.exports = router;
