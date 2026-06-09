const express = require('express');
const router = express.Router();
const {
  getPlayers,
  getPlayerDetails,
  getPlayerHistory,
  getPlayerStats,
  getPlayerOpenings,
  getPlayerRatingHistory,
  getPlayerWinRate,
  getPlayerLossRate,
  getPlayerDrawRate,
  getRecentMatches,
  getTopRatedPlayers,
  getTopActivePlayers,
  getTopWinningPlayers,
  comparePlayers,
  filterPlayersByRating
} = require('../controllers/player.controller');

// General endpoints
router.get('/', getPlayers);
router.get('/top-rated', getTopRatedPlayers);
router.get('/top-active', getTopActivePlayers);
router.get('/top-winning', getTopWinningPlayers);
router.get('/compare/:player1/:player2', comparePlayers);
router.get('/rating-range', filterPlayersByRating);

// Player specific endpoints
router.get('/:username', getPlayerDetails);
router.get('/:username/history', getPlayerHistory);
router.get('/:username/stats', getPlayerStats);
router.get('/:username/openings', getPlayerOpenings);
router.get('/:username/rating-history', getPlayerRatingHistory);
router.get('/:username/win-rate', getPlayerWinRate);
router.get('/:username/loss-rate', getPlayerLossRate);
router.get('/:username/draw-rate', getPlayerDrawRate);
router.get('/:username/recent', getRecentMatches);

module.exports = router;
