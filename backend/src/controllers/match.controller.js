const Match = require('../models/Match');

exports.getMatches = async (req, res) => {
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
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.getMatchById = async (req, res) => {
  try {
    const match = await Match.findOne({ match_id: req.params.id });
    
    if (!match) {
      return res.status(404).json({ success: false, error: 'Match not found' });
    }
    
    res.status(200).json({
      success: true,
      data: match
    });
  } catch (error) {
    console.error(`Error fetching match: ${error.message}`);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.createMatch = async (req, res) => {
  try {
    const match = await Match.create(req.body);
    
    res.status(201).json({
      success: true,
      data: match
    });
  } catch (error) {
    console.error(`Error creating match: ${error.message}`);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.updateMatch = async (req, res) => {
  try {
    const match = await Match.findOneAndUpdate(
      { match_id: req.params.id }, 
      req.body, 
      {
        new: true, // Return the updated document
        runValidators: true // Run schema validations
      }
    );
    
    if (!match) {
      return res.status(404).json({ success: false, error: 'Match not found' });
    }
    
    res.status(200).json({
      success: true,
      data: match
    });
  } catch (error) {
    console.error(`Error updating match: ${error.message}`);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.deleteMatch = async (req, res) => {
  try {
    const match = await Match.findOneAndDelete({ match_id: req.params.id });
    
    if (!match) {
      return res.status(404).json({ success: false, error: 'Match not found' });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error(`Error deleting match: ${error.message}`);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// ====== FILTERING ROUTE HANDLERS ======

exports.getRatedMatches = async (req, res) => {
  try {
    const matches = await Match.find({ rated: true }).limit(50);
    res.status(200).json({ success: true, count: matches.length, data: matches });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.getUnratedMatches = async (req, res) => {
  try {
    const matches = await Match.find({ rated: false }).limit(50);
    res.status(200).json({ success: true, count: matches.length, data: matches });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.getWhiteWins = async (req, res) => {
  try {
    const matches = await Match.find({ winner: 'white' }).limit(50);
    res.status(200).json({ success: true, count: matches.length, data: matches });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.getBlackWins = async (req, res) => {
  try {
    const matches = await Match.find({ winner: 'black' }).limit(50);
    res.status(200).json({ success: true, count: matches.length, data: matches });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.getCheckmates = async (req, res) => {
  try {
    const matches = await Match.find({ victory_status: 'mate' }).limit(50);
    res.status(200).json({ success: true, count: matches.length, data: matches });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// ====== SORTING ROUTE HANDLERS ======

exports.getLongestMatches = async (req, res) => {
  try {
    const matches = await Match.find().sort({ turns: -1 }).limit(50);
    res.status(200).json({ success: true, count: matches.length, data: matches });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.getShortestMatches = async (req, res) => {
  try {
    const matches = await Match.find().sort({ turns: 1 }).limit(50);
    res.status(200).json({ success: true, count: matches.length, data: matches });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.getHighestRatedMatches = async (req, res) => {
  try {
    const matches = await Match.find().sort({ white_rating: -1 }).limit(50);
    res.status(200).json({ success: true, count: matches.length, data: matches });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
