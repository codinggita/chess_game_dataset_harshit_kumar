const express = require('express');
const {
  getVictoryDistribution,
  getColorAdvantage,
  getTurnCountAverage,
  getRatedVsCasual,
  getOpeningSuccess
} = require('../controllers/analytics.controller');

const router = express.Router();

router.get('/victory-distribution', getVictoryDistribution);
router.get('/color-advantage', getColorAdvantage);
router.get('/turn-count-average', getTurnCountAverage);
router.get('/rated-vs-casual', getRatedVsCasual);
router.get('/opening-success', getOpeningSuccess);

module.exports = router;
