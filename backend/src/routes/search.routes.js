const express = require('express');
const router = express.Router();
const sc = require('../controllers/search.controller');

// Basic Search
router.get('/matches', sc.searchMatches);
router.get('/players', sc.searchPlayers);
router.get('/openings', sc.searchOpenings);
router.get('/eco', sc.searchEco);

// Advanced Search
router.get('/moves', sc.searchMoves);
router.get('/fuzzy', sc.searchFuzzy);
router.get('/autocomplete', sc.autocomplete);
router.get('/recent', sc.recentSearches);
router.get('/popular', sc.popularSearches);
router.get('/advanced', sc.advancedSearch);
router.get('/player-rating', sc.searchByPlayerRating);
router.get('/date-range', sc.searchByDateRange);
router.get('/opening-family', sc.searchOpeningFamily);
router.get('/checkmate-patterns', sc.searchCheckmatePatterns);
router.get('/endgames', sc.searchEndgames);

module.exports = router;
