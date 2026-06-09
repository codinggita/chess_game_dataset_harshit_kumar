const express = require('express');
const {
  getTotalMatches,
  getTotalPlayers,
  getAverageRating,
  getTopOpenings,
  getWhiteWinRate,
  getBlackWinRate,
  getDrawRate,
  getCheckmateRate,
  getResignationRate,
  getTimeoutRate,
  getRatedGames,
  getUnratedGames,
  getDailyGames,
  getMonthlyGames,
  getYearlyGames
} = require('../controllers/stats.controller');

const router = express.Router();

router.get('/total-matches', getTotalMatches);
router.get('/total-players', getTotalPlayers);
router.get('/average-rating', getAverageRating);
router.get('/top-openings', getTopOpenings);
router.get('/white-win-rate', getWhiteWinRate);
router.get('/black-win-rate', getBlackWinRate);
router.get('/draw-rate', getDrawRate);
router.get('/checkmate-rate', getCheckmateRate);
router.get('/resignation-rate', getResignationRate);
router.get('/timeout-rate', getTimeoutRate);
router.get('/rated-games', getRatedGames);
router.get('/unrated-games', getUnratedGames);
router.get('/daily-games', getDailyGames);
router.get('/monthly-games', getMonthlyGames);
router.get('/yearly-games', getYearlyGames);

module.exports = router;
