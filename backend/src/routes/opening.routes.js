const express = require('express');
const router = express.Router();
const {
  getOpenings,
  getPopularOpenings,
  getTrendingOpenings,
  getOpeningByEco,
  searchOpenings,
  getOpeningWinRates,
  getAggressiveOpenings,
  getDefensiveOpenings,
  getGambits,
  getFastestMateOpenings,
  getRareOpenings,
  getWhiteAdvantage,
  getBlackAdvantage,
  getBeginnerFriendly,
  getComplexity
} = require('../controllers/opening.controller');

router.get('/', getOpenings);
router.get('/popular', getPopularOpenings);
router.get('/trending', getTrendingOpenings);
router.get('/search', searchOpenings);
router.get('/win-rates', getOpeningWinRates);
router.get('/aggressive', getAggressiveOpenings);
router.get('/defensive', getDefensiveOpenings);
router.get('/gambits', getGambits);
router.get('/checkmates', getFastestMateOpenings);
router.get('/rare', getRareOpenings);
router.get('/white-advantage', getWhiteAdvantage);
router.get('/black-advantage', getBlackAdvantage);
router.get('/beginner-friendly', getBeginnerFriendly);
router.get('/complexity', getComplexity);
router.get('/eco/:ecoCode', getOpeningByEco);

module.exports = router;
