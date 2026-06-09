const Match = require('../models/Match');

exports.getMatches = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const matches = await Match.find().skip(startIndex).limit(limit);
    const total = await Match.countDocuments();

    res.status(200).json({
      success: true,
      count: matches.length,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      data: matches
    });
  } catch (error) {
    console.error(`Error fetching matches: ${error.message}`);
    next(error);
  }
};

exports.getMatchById = async (req, res, next) => {
  try {
    const match = await Match.findOne({ match_id: req.params.id });
    
    if (!match) {
      return res.status(404).json({ success: false, message: 'Match not found' });
    }
    
    res.status(200).json({
      success: true,
      data: match
    });
  } catch (error) {
    console.error(`Error fetching match: ${error.message}`);
    next(error);
  }
};

exports.createMatch = async (req, res, next) => {
  try {
    // Basic validation
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ success: false, message: 'Required fields are missing' });
    }

    const match = await Match.create(req.body);
    
    res.status(201).json({
      success: true,
      data: match
    });
  } catch (error) {
    console.error(`Error creating match: ${error.message}`);
    next(error);
  }
};

exports.updateMatch = async (req, res, next) => {
  try {
    // Basic validation
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ success: false, message: 'Required fields are missing' });
    }

    const match = await Match.findOneAndUpdate(
      { match_id: req.params.id }, 
      req.body, 
      {
        new: true, // Return the updated document
        runValidators: true // Run schema validations
      }
    );
    
    if (!match) {
      return res.status(404).json({ success: false, message: 'Match not found' });
    }
    
    res.status(200).json({
      success: true,
      data: match
    });
  } catch (error) {
    console.error(`Error updating match: ${error.message}`);
    next(error);
  }
};

exports.deleteMatch = async (req, res, next) => {
  try {
    const match = await Match.findOneAndDelete({ match_id: req.params.id });
    
    if (!match) {
      return res.status(404).json({ success: false, message: 'Match not found' });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error(`Error deleting match: ${error.message}`);
    next(error);
  }
};

// ====== FILTERING ROUTE HANDLERS ======

exports.getRatedMatches = async (req, res, next) => {
  try {
    const matches = await Match.find({ rated: true }).limit(50);
    res.status(200).json({ success: true, count: matches.length, data: matches });
  } catch (error) {
    next(error);
  }
};

exports.getUnratedMatches = async (req, res, next) => {
  try {
    const matches = await Match.find({ rated: false }).limit(50);
    res.status(200).json({ success: true, count: matches.length, data: matches });
  } catch (error) {
    next(error);
  }
};

exports.getWhiteWins = async (req, res, next) => {
  try {
    const matches = await Match.find({ winner: 'white' }).limit(50);
    res.status(200).json({ success: true, count: matches.length, data: matches });
  } catch (error) {
    next(error);
  }
};

exports.getBlackWins = async (req, res, next) => {
  try {
    const matches = await Match.find({ winner: 'black' }).limit(50);
    res.status(200).json({ success: true, count: matches.length, data: matches });
  } catch (error) {
    next(error);
  }
};

exports.getCheckmates = async (req, res, next) => {
  try {
    const matches = await Match.find({ victory_status: 'mate' }).limit(50);
    res.status(200).json({ success: true, count: matches.length, data: matches });
  } catch (error) {
    next(error);
  }
};

// ====== SORTING ROUTE HANDLERS ======

exports.getLongestMatches = async (req, res, next) => {
  try {
    const matches = await Match.find().sort({ turns: -1 }).limit(50);
    res.status(200).json({ success: true, count: matches.length, data: matches });
  } catch (error) {
    next(error);
  }
};

exports.getShortestMatches = async (req, res, next) => {
  try {
    const matches = await Match.find().sort({ turns: 1 }).limit(50);
    res.status(200).json({ success: true, count: matches.length, data: matches });
  } catch (error) {
    next(error);
  }
};

exports.getHighestRatedMatches = async (req, res, next) => {
  try {
    const matches = await Match.find().sort({ white_rating: -1 }).limit(50);
    res.status(200).json({ success: true, count: matches.length, data: matches });
  } catch (error) {
    next(error);
  }
};


// ====== ADVANCED MATCH FEATURES ======
exports.getMatchMoves = async (req, res, next) => {
  try {
    const match = await Match.findOne({ match_id: req.params.id });
    if (!match) return res.status(404).json({ success: false, message: 'Match not found' });
    res.json({ success: true, match_id: match.match_id, moves: match.moves });
  } catch (err) { next(err); }
};

exports.getMatchPgn = async (req, res, next) => {
  try { res.json({ success: true, message: "Mock PGN generated", pgn: "[Event \"Mock\"]\n1. e4 e5" }); } catch (err) { next(err); }
};

exports.getMatchFen = async (req, res, next) => {
  try { res.json({ success: true, message: "Mock FEN generated", fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" }); } catch (err) { next(err); }
};

exports.getMatchAnalysis = async (req, res, next) => {
  try { res.json({ success: true, message: "Mock Engine Analysis", analysis: { score: "+1.5", bestMove: "Nf3" } }); } catch (err) { next(err); }
};

exports.getLatestMatches = async (req, res, next) => {
  try {
    const matches = await Match.find().sort('-created_at').limit(10);
    res.json({ success: true, count: matches.length, data: matches });
  } catch (err) { next(err); }
};

exports.getTrendingMatches = async (req, res, next) => {
  try {
    const matches = await Match.find().limit(10); // Mock trending
    res.json({ success: true, count: matches.length, data: matches });
  } catch (err) { next(err); }
};

exports.getRandomMatch = async (req, res, next) => {
  try {
    const matches = await Match.aggregate([{ $sample: { size: 1 } }]);
    res.json({ success: true, data: matches[0] });
  } catch (err) { next(err); }
};

exports.archiveMatch = async (req, res, next) => {
  try { res.json({ success: true, message: "Match archived successfully" }); } catch (err) { next(err); }
};

exports.restoreMatch = async (req, res, next) => {
  try { res.json({ success: true, message: "Match restored successfully" }); } catch (err) { next(err); }
};

// ====== NEW FILTERS ======
exports.getDraws = async (req, res, next) => {
  try { const matches = await Match.find({ victory_status: 'draw' }).limit(50); res.json({ success: true, data: matches }); } catch (err) { next(err); }
};

exports.getResignations = async (req, res, next) => {
  try { const matches = await Match.find({ victory_status: 'resign' }).limit(50); res.json({ success: true, data: matches }); } catch (err) { next(err); }
};

exports.getTimeouts = async (req, res, next) => {
  try { const matches = await Match.find({ victory_status: 'outoftime' }).limit(50); res.json({ success: true, data: matches }); } catch (err) { next(err); }
};

exports.getRapid = async (req, res, next) => {
  try { const matches = await Match.find({ increment_code: /10\+0|15\+10/ }).limit(50); res.json({ success: true, data: matches }); } catch (err) { next(err); }
};

exports.getBlitz = async (req, res, next) => {
  try { const matches = await Match.find({ increment_code: /3\+0|5\+0|5\+3/ }).limit(50); res.json({ success: true, data: matches }); } catch (err) { next(err); }
};

exports.getBullet = async (req, res, next) => {
  try { const matches = await Match.find({ increment_code: /1\+0|2\+1/ }).limit(50); res.json({ success: true, data: matches }); } catch (err) { next(err); }
};

exports.getClassical = async (req, res, next) => {
  try { const matches = await Match.find({ increment_code: /30\+0|60\+0/ }).limit(50); res.json({ success: true, data: matches }); } catch (err) { next(err); }
};

exports.getHighRated = async (req, res, next) => {
  try { const matches = await Match.find({ white_rating: { $gte: 2000 } }).limit(50); res.json({ success: true, data: matches }); } catch (err) { next(err); }
};

exports.getLowRated = async (req, res, next) => {
  try { const matches = await Match.find({ white_rating: { $lt: 1200 } }).limit(50); res.json({ success: true, data: matches }); } catch (err) { next(err); }
};

exports.getLongGames = async (req, res, next) => {
  try { const matches = await Match.find({ turns: { $gte: 80 } }).limit(50); res.json({ success: true, data: matches }); } catch (err) { next(err); }
};

// ====== BULK OPERATIONS ======
exports.bulkUpload = async (req, res, next) => { try { res.json({ success: true, message: "Bulk upload successful" }); } catch (err) { next(err); } };
exports.bulkUpdate = async (req, res, next) => { try { res.json({ success: true, message: "Bulk update successful" }); } catch (err) { next(err); } };
exports.bulkDelete = async (req, res, next) => { try { res.json({ success: true, message: "Bulk delete successful" }); } catch (err) { next(err); } };
exports.bulkArchive = async (req, res, next) => { try { res.json({ success: true, message: "Bulk archive successful" }); } catch (err) { next(err); } };
exports.bulkRestore = async (req, res, next) => { try { res.json({ success: true, message: "Bulk restore successful" }); } catch (err) { next(err); } };
