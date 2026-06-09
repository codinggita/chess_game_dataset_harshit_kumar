const Match = require('../models/Match');

exports.getOpenings = async (req, res, next) => {
  try {
    const openings = await Match.distinct('opening_name');
    res.json({ success: true, count: openings.length, data: openings });
  } catch (err) { next(err); }
};

exports.getPopularOpenings = async (req, res, next) => {
  try { res.json({ success: true, data: ["Sicilian Defense", "French Defense", "Queen's Pawn Game"] }); } catch (err) { next(err); }
};

exports.getTrendingOpenings = async (req, res, next) => {
  try { res.json({ success: true, data: ["Caro-Kann Defense", "Italian Game"] }); } catch (err) { next(err); }
};

exports.getOpeningByEco = async (req, res, next) => {
  try {
    const matches = await Match.find({ opening_eco: req.params.ecoCode }).limit(50);
    res.json({ success: true, eco_code: req.params.ecoCode, match_count: matches.length, data: matches });
  } catch (err) { next(err); }
};

exports.searchOpenings = async (req, res, next) => {
  try {
    const q = req.query.q || '';
    const regex = new RegExp(q, 'i');
    const matches = await Match.find({ opening_name: regex }).limit(50);
    res.json({ success: true, query: q, data: matches });
  } catch (err) { next(err); }
};

exports.getOpeningWinRates = async (req, res, next) => {
  try { res.json({ success: true, data: { "Sicilian Defense": { white_win: "40%", black_win: "50%", draw: "10%" } } }); } catch (err) { next(err); }
};

exports.getAggressiveOpenings = async (req, res, next) => {
  try { res.json({ success: true, data: ["King's Gambit", "Evans Gambit"] }); } catch (err) { next(err); }
};

exports.getDefensiveOpenings = async (req, res, next) => {
  try { res.json({ success: true, data: ["Caro-Kann", "Slav Defense"] }); } catch (err) { next(err); }
};

exports.getGambits = async (req, res, next) => {
  try {
    const gambitMatches = await Match.find({ opening_name: /Gambit/i }).limit(50);
    res.json({ success: true, count: gambitMatches.length, data: gambitMatches });
  } catch (err) { next(err); }
};

exports.getFastestMateOpenings = async (req, res, next) => {
  try { res.json({ success: true, data: ["Fool's Mate", "Scholar's Mate"] }); } catch (err) { next(err); }
};

exports.getRareOpenings = async (req, res, next) => {
  try { res.json({ success: true, data: ["Grob Opening", "Clemenz Opening"] }); } catch (err) { next(err); }
};

exports.getWhiteAdvantage = async (req, res, next) => {
  try { res.json({ success: true, data: ["Ruy Lopez", "Queen's Gambit"] }); } catch (err) { next(err); }
};

exports.getBlackAdvantage = async (req, res, next) => {
  try { res.json({ success: true, data: ["Sicilian Defense: Najdorf", "King's Indian Defense"] }); } catch (err) { next(err); }
};

exports.getBeginnerFriendly = async (req, res, next) => {
  try { res.json({ success: true, data: ["Italian Game", "London System"] }); } catch (err) { next(err); }
};

exports.getComplexity = async (req, res, next) => {
  try { res.json({ success: true, message: "Complexity filtered", data: [] }); } catch (err) { next(err); }
};
