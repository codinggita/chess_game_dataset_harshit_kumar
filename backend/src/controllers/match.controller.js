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
