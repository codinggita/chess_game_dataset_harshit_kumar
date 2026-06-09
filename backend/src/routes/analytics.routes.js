const express = require('express');
const {
  getVictoryDistribution,
  getColorAdvantage,
  getTurnCountAverage,
  getRatedVsCasual,
  getOpeningSuccess,
  getShortestGames,
  getLongestGames,
  getRatingGapUpsets,
  getCheckmateFrequency,
  getDrawFrequency,
  getResignationFrequency,
  getTimeouts,
  getPlayerGrowth,
  getHourlyActivity,
  getTimeControlUsage
} = require('../controllers/analytics.controller');

const router = express.Router();

router.get('/victory-distribution', getVictoryDistribution);
router.get('/color-advantage', getColorAdvantage);
router.get('/turn-count-average', getTurnCountAverage);
router.get('/rated-vs-casual', getRatedVsCasual);
router.get('/opening-success', getOpeningSuccess);
router.get('/shortest-games', getShortestGames);
router.get('/longest-games', getLongestGames);
router.get('/rating-gap-upsets', getRatingGapUpsets);
router.get('/checkmate-frequency', getCheckmateFrequency);
router.get('/draw-frequency', getDrawFrequency);
router.get('/resignation-frequency', getResignationFrequency);
router.get('/timeouts', getTimeouts);
router.get('/player-growth', getPlayerGrowth);
router.get('/hourly-activity', getHourlyActivity);
router.get('/time-control-usage', getTimeControlUsage);

module.exports = router;
