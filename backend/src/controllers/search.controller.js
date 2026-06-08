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
