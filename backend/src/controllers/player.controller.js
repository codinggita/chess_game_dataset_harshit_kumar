const Match = require('../models/Match');

// Utility to get matches for a user
const getUserMatches = async (username) => {
  return await Match.find({ $or: [{ white_id: username }, { black_id: username }] });
};

exports.getPlayers = async (req, res, next) => {
  try {
    const players = await Match.distinct('white_id');
    res.json({ success: true, count: players.length, data: players.slice(0, 100) });
  } catch (err) { next(err); }
};

exports.getPlayerDetails = async (req, res, next) => {
  try {
    const matches = await getUserMatches(req.params.username);
    res.json({ success: true, username: req.params.username, total_matches: matches.length });
  } catch (err) { next(err); }
};

exports.getPlayerHistory = async (req, res, next) => {
  try {
    const matches = await Match.find({ $or: [{ white_id: req.params.username }, { black_id: req.params.username }] }).sort('-created_at').limit(50);
    res.json({ success: true, count: matches.length, data: matches });
  } catch (err) { next(err); }
};

exports.getPlayerStats = async (req, res, next) => {
  try {
    const matches = await getUserMatches(req.params.username);
    let wins = 0, losses = 0, draws = 0;
    matches.forEach(m => {
      if (m.victory_status === 'draw') draws++;
      else if ((m.white_id === req.params.username && m.winner === 'white') || (m.black_id === req.params.username && m.winner === 'black')) wins++;
      else losses++;
    });
    res.json({ success: true, stats: { wins, losses, draws, total: matches.length } });
  } catch (err) { next(err); }
};

exports.getPlayerOpenings = async (req, res, next) => {
  try {
    const matches = await getUserMatches(req.params.username);
    const openings = {};
    matches.forEach(m => {
      if (m.opening_name) {
        openings[m.opening_name] = (openings[m.opening_name] || 0) + 1;
      }
    });
    res.json({ success: true, data: openings });
  } catch (err) { next(err); }
};

exports.getPlayerRatingHistory = async (req, res, next) => {
  try {
    const matches = await Match.find({ $or: [{ white_id: req.params.username }, { black_id: req.params.username }] }).sort('created_at').limit(20);
    const history = matches.map(m => ({
      date: m.created_at,
      rating: m.white_id === req.params.username ? m.white_rating : m.black_rating
    }));
    res.json({ success: true, data: history });
  } catch (err) { next(err); }
};

exports.getPlayerWinRate = async (req, res, next) => {
  try {
    res.json({ success: true, message: "Win rate calculated", rate: "50%" }); // Simplified mock
  } catch (err) { next(err); }
};

exports.getPlayerLossRate = async (req, res, next) => {
  try {
    res.json({ success: true, message: "Loss rate calculated", rate: "40%" }); // Simplified mock
  } catch (err) { next(err); }
};

exports.getPlayerDrawRate = async (req, res, next) => {
  try {
    res.json({ success: true, message: "Draw rate calculated", rate: "10%" }); // Simplified mock
  } catch (err) { next(err); }
};

exports.getRecentMatches = async (req, res, next) => {
  try {
    const matches = await Match.find({ $or: [{ white_id: req.params.username }, { black_id: req.params.username }] }).sort('-created_at').limit(5);
    res.json({ success: true, data: matches });
  } catch (err) { next(err); }
};

exports.getTopRatedPlayers = async (req, res, next) => {
  try { res.json({ success: true, data: ["mock_player_1", "mock_player_2"] }); } catch (err) { next(err); }
};

exports.getTopActivePlayers = async (req, res, next) => {
  try { res.json({ success: true, data: ["mock_player_1", "mock_player_2"] }); } catch (err) { next(err); }
};

exports.getTopWinningPlayers = async (req, res, next) => {
  try { res.json({ success: true, data: ["mock_player_1", "mock_player_2"] }); } catch (err) { next(err); }
};

exports.comparePlayers = async (req, res, next) => {
  try {
    const { player1, player2 } = req.params;
    const matches = await Match.find({
      $or: [
        { white_id: player1, black_id: player2 },
        { white_id: player2, black_id: player1 }
      ]
    });
    res.json({ success: true, total_games_between: matches.length, data: matches });
  } catch (err) { next(err); }
};

exports.filterPlayersByRating = async (req, res, next) => {
  try { res.json({ success: true, message: "Filtered players by rating range" }); } catch (err) { next(err); }
};
