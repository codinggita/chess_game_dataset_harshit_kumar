const express = require('express');
const { protect } = require('../middlewares/auth.middleware');
const mc = require('../controllers/match.controller');

const router = express.Router();

// Bulk Routes
router.post('/bulk-upload', protect, mc.bulkUpload);
router.patch('/bulk-update', protect, mc.bulkUpdate);
router.delete('/bulk-delete', protect, mc.bulkDelete);
router.patch('/bulk/archive', protect, mc.bulkArchive);
router.patch('/bulk/restore', protect, mc.bulkRestore);

// Special Matches
router.get('/latest', mc.getLatestMatches);
router.get('/trending', mc.getTrendingMatches);
router.get('/random', mc.getRandomMatch);

// Filters
router.get('/filter/rated', mc.getRatedMatches);
router.get('/filter/unrated', mc.getUnratedMatches);
router.get('/filter/white-wins', mc.getWhiteWins);
router.get('/filter/black-wins', mc.getBlackWins);
router.get('/filter/checkmates', mc.getCheckmates);
router.get('/filter/draws', mc.getDraws);
router.get('/filter/resignations', mc.getResignations);
router.get('/filter/timeouts', mc.getTimeouts);
router.get('/filter/rapid', mc.getRapid);
router.get('/filter/blitz', mc.getBlitz);
router.get('/filter/bullet', mc.getBullet);
router.get('/filter/classical', mc.getClassical);
router.get('/filter/high-rated', mc.getHighRated);
router.get('/filter/low-rated', mc.getLowRated);
router.get('/filter/long-games', mc.getLongGames);

// Sorting
router.get('/sort/longest', mc.getLongestMatches);
router.get('/sort/shortest', mc.getShortestMatches);
router.get('/sort/highest-rated', mc.getHighestRatedMatches);

router.get('/', mc.getMatches);
router.post('/', protect, mc.createMatch);

router.get('/:id', mc.getMatchById);
router.patch('/:id', protect, mc.updateMatch);
router.delete('/:id', protect, mc.deleteMatch);

// Match specifics
router.get('/:id/moves', mc.getMatchMoves);
router.get('/:id/pgn', mc.getMatchPgn);
router.get('/:id/fen', mc.getMatchFen);
router.get('/:id/analysis', mc.getMatchAnalysis);
router.patch('/:id/archive', protect, mc.archiveMatch);
router.patch('/:id/restore', protect, mc.restoreMatch);

module.exports = router;
