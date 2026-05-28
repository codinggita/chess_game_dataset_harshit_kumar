const express = require('express');
const {
  getTotalMatches,
  getTotalPlayers,
  getAverageRating,
  getTopOpenings,
  getWhiteWinRate,
  getBlackWinRate,
  getDrawRate
} = require('../controllers/stats.controller');

const router = express.Router();

router.get('/total-matches', getTotalMatches);
router.get('/total-players', getTotalPlayers);
router.get('/average-rating', getAverageRating);
router.get('/top-openings', getTopOpenings);
router.get('/white-win-rate', getWhiteWinRate);
router.get('/black-win-rate', getBlackWinRate);
router.get('/draw-rate', getDrawRate);

module.exports = router;
