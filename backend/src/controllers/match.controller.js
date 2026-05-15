const Match = require('../models/Match');

exports.getMatches = async (req, res) => {
  try {
    const matches = await Match.find();
    res.status(200).json({
      success: true,
      count: matches.length,
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
