const express = require('express');
const {
  searchMatches,
  searchPlayers,
  searchOpenings,
  searchEco
} = require('../controllers/search.controller');

const router = express.Router();

router.get('/matches', searchMatches);
router.get('/players', searchPlayers);
router.get('/openings', searchOpenings);
router.get('/eco', searchEco);

module.exports = router;
