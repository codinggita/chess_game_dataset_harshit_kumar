const Match = require('../models/Match');

// Get total number of matches
exports.getTotalMatches = async (req, res) => {
  try {
    const total = await Match.countDocuments();
    res.status(200).json({ success: true, stat: 'total_matches', value: total });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Get total number of unique players
exports.getTotalPlayers = async (req, res) => {
  try {
    // Get unique IDs from both white and black sides
    const whitePlayers = await Match.distinct('white_id');
    const blackPlayers = await Match.distinct('black_id');
    
    // Combine and use a Set to remove any duplicates
    const uniquePlayers = new Set([...whitePlayers, ...blackPlayers]);
    
    res.status(200).json({ success: true, stat: 'total_players', value: uniquePlayers.size });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Get the average player rating across all matches
exports.getAverageRating = async (req, res) => {
  try {
    const data = await Match.aggregate([
      {
        $group: {
          _id: null,
          avgWhite: { $avg: "$white_rating" },
          avgBlack: { $avg: "$black_rating" }
        }
      },
      {
        $project: {
          // Add the two averages and divide by 2 for the overall average
          overallAverage: { $divide: [ { $add: ["$avgWhite", "$avgBlack"] }, 2 ] },
          _id: 0
        }
      }
    ]);
    
    // Default to 0 if no data is found, otherwise round to nearest whole number
    const avgRating = data.length > 0 ? Math.round(data[0].overallAverage) : 0;
    
    res.status(200).json({ success: true, stat: 'average_rating', value: avgRating });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Get top 5 most played openings
exports.getTopOpenings = async (req, res) => {
  try {
    const data = await Match.aggregate([
      { $group: { _id: "$opening_name", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }, // Just the top 5 for a dashboard card
      { $project: { name: "$_id", count: 1, _id: 0 } }
    ]);
    
    res.status(200).json({ success: true, stat: 'top_openings', value: data });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Helper function to calculate a percentage win rate
const calculateRate = async (condition) => {
  const total = await Match.countDocuments();
  if (total === 0) return 0;
  
  const subset = await Match.countDocuments(condition);
  return Math.round((subset / total) * 100);
};

// Get white win rate percentage
exports.getWhiteWinRate = async (req, res) => {
  try {
    const rate = await calculateRate({ winner: 'white' });
    res.status(200).json({ success: true, stat: 'white_win_rate', value: rate, unit: '%' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Get black win rate percentage
exports.getBlackWinRate = async (req, res) => {
  try {
    const rate = await calculateRate({ winner: 'black' });
    res.status(200).json({ success: true, stat: 'black_win_rate', value: rate, unit: '%' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Get draw rate percentage
exports.getDrawRate = async (req, res) => {
  try {
    const rate = await calculateRate({ winner: 'draw' });
    res.status(200).json({ success: true, stat: 'draw_rate', value: rate, unit: '%' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
