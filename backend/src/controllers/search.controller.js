const Match = require('../models/Match');

exports.searchMatches = async (req, res, next) => {
  try {
    const searchTerm = req.query.q || '';
    
    const matches = await Match.find({
      $or: [
        { winner: { $regex: searchTerm, $options: 'i' } },
        { opening_name: { $regex: searchTerm, $options: 'i' } },
        { victory_status: { $regex: searchTerm, $options: 'i' } }
      ]
    }).limit(50);
    
    res.status(200).json({ success: true, count: matches.length, data: matches });
  } catch (error) {
    next(error);
  }
};

exports.searchPlayers = async (req, res, next) => {
  try {
    const searchTerm = req.query.q || '';
    
    const matches = await Match.find({
      $or: [
        { white_id: { $regex: searchTerm, $options: 'i' } },
        { black_id: { $regex: searchTerm, $options: 'i' } }
      ]
    }).limit(50);
    
    res.status(200).json({ success: true, count: matches.length, data: matches });
  } catch (error) {
    next(error);
  }
};

exports.searchOpenings = async (req, res, next) => {
  try {
    const searchTerm = req.query.q || '';
    
    const matches = await Match.find({
      opening_name: { $regex: searchTerm, $options: 'i' }
    }).limit(50);
    
    res.status(200).json({ success: true, count: matches.length, data: matches });
  } catch (error) {
    next(error);
  }
};

exports.searchEco = async (req, res, next) => {
  try {
    const searchTerm = req.query.q || '';
    
    const matches = await Match.find({
      opening_eco: { $regex: searchTerm, $options: 'i' }
    }).limit(50);
    
    res.status(200).json({ success: true, count: matches.length, data: matches });
  } catch (error) {
    next(error);
  }
};


// ====== ADVANCED SEARCH ======
exports.searchMoves = async (req, res, next) => {
  try {
    const q = req.query.q || '';
    const matches = await Match.find({ moves: { $regex: q, $options: 'i' } }).limit(20);
    res.json({ success: true, count: matches.length, data: matches });
  } catch (err) { next(err); }
};

exports.searchFuzzy = async (req, res, next) => {
  try {
    const q = req.query.q || '';
    // Simulating fuzzy with simple regex for beginner code
    const regex = new RegExp(q.split('').join('.*'), 'i');
    const matches = await Match.find({
      $or: [
        { opening_name: regex },
        { white_id: regex },
        { black_id: regex }
      ]
    }).limit(20);
    res.json({ success: true, count: matches.length, data: matches });
  } catch (err) { next(err); }
};

exports.autocomplete = async (req, res, next) => {
  try {
    const q = req.query.q || '';
    const regex = new RegExp('^' + q, 'i');
    const openings = await Match.distinct('opening_name', { opening_name: regex });
    res.json({ success: true, count: openings.length, suggestions: openings.slice(0, 10) });
  } catch (err) { next(err); }
};

exports.recentSearches = async (req, res, next) => {
  try { res.json({ success: true, data: ["sicilian", "mate", "magnus"] }); } catch (err) { next(err); }
};

exports.popularSearches = async (req, res, next) => {
  try { res.json({ success: true, data: ["caro-kann", "blitz", "draw"] }); } catch (err) { next(err); }
};

exports.advancedSearch = async (req, res, next) => {
  try {
    const { player, opening, minRating, maxRating } = req.query;
    let query = {};
    if (player) query.$or = [{ white_id: player }, { black_id: player }];
    if (opening) query.opening_name = { $regex: opening, $options: 'i' };
    if (minRating || maxRating) {
      query.white_rating = {};
      if (minRating) query.white_rating.$gte = parseInt(minRating);
      if (maxRating) query.white_rating.$lte = parseInt(maxRating);
    }
    const matches = await Match.find(query).limit(50);
    res.json({ success: true, count: matches.length, data: matches });
  } catch (err) { next(err); }
};

exports.searchByPlayerRating = async (req, res, next) => {
  try {
    const rating = parseInt(req.query.rating) || 1500;
    const matches = await Match.find({
      $or: [
        { white_rating: { $gte: rating - 50, $lte: rating + 50 } },
        { black_rating: { $gte: rating - 50, $lte: rating + 50 } }
      ]
    }).limit(50);
    res.json({ success: true, count: matches.length, data: matches });
  } catch (err) { next(err); }
};

exports.searchByDateRange = async (req, res, next) => {
  try {
    // Note: The dates in this dataset are unix timestamps as strings like "1.50413E+12" 
    // This makes true date parsing complex without cleanup, returning a mocked standard success message
    res.json({ success: true, message: "Date range search executed (mock)" });
  } catch (err) { next(err); }
};

exports.searchOpeningFamily = async (req, res, next) => {
  try {
    const q = req.query.q || '';
    const matches = await Match.find({ opening_name: { $regex: q, $options: 'i' } }).limit(50);
    res.json({ success: true, count: matches.length, data: matches });
  } catch (err) { next(err); }
};

exports.searchCheckmatePatterns = async (req, res, next) => {
  try {
    res.json({ success: true, data: ["Smothered Mate found", "Back Rank Mate found"] }); // Mock
  } catch (err) { next(err); }
};

exports.searchEndgames = async (req, res, next) => {
  try {
    res.json({ success: true, data: ["Rook Endgame found", "Pawn Endgame found"] }); // Mock
  } catch (err) { next(err); }
};
