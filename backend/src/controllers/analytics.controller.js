const Match = require('../models/Match');

exports.getVictoryDistribution = async (req, res, next) => {
  try {
    const data = await Match.aggregate([
      {
        $group: {
          _id: "$victory_status", // Group by the victory_status field
          count: { $sum: 1 }      // Add 1 for every match found
        }
      },
      {
        $project: {
          status: "$_id",         // Rename _id to status for better readability
          count: 1,
          _id: 0                  // Hide the original _id field
        }
      }
    ]);
    
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

exports.getColorAdvantage = async (req, res, next) => {
  try {
    const data = await Match.aggregate([
      {
        $group: {
          _id: "$winner", // Group by the winner field (white, black, draw)
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          winner: "$_id",
          count: 1,
          _id: 0
        }
      }
    ]);
    
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

exports.getTurnCountAverage = async (req, res, next) => {
  try {
    const data = await Match.aggregate([
      {
        $group: {
          _id: null,                      // Group all documents into one single block
          averageTurns: { $avg: "$turns" } // Calculate the average of the turns field
        }
      },
      {
        $project: {
          averageTurns: { $round: ["$averageTurns", 0] }, // Round it to a whole number
          _id: 0
        }
      }
    ]);
    
    res.status(200).json({ success: true, data: data[0] });
  } catch (error) {
    next(error);
  }
};

exports.getRatedVsCasual = async (req, res, next) => {
  try {
    const data = await Match.aggregate([
      {
        $group: {
          _id: "$rated", // Group by whether it is rated (true or false)
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          isRated: "$_id",
          count: 1,
          _id: 0
        }
      }
    ]);
    
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

exports.getOpeningSuccess = async (req, res, next) => {
  try {
    const data = await Match.aggregate([
      {
        $group: {
          _id: "$opening_name",       // Group by the name of the opening move
          timesPlayed: { $sum: 1 }
        }
      },
      {
        $sort: { timesPlayed: -1 }    // Sort by highest timesPlayed descending
      },
      {
        $limit: 10                    // Only show the top 10 most popular openings
      },
      {
        $project: {
          opening: "$_id",
          timesPlayed: 1,
          _id: 0
        }
      }
    ]);
    
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

exports.getShortestGames = async (req, res, next) => { try { res.json({ success: true, message: "Mock Shortest Games Analytics" }); } catch (err) { next(err); } };
exports.getLongestGames = async (req, res, next) => { try { res.json({ success: true, message: "Mock Longest Games Analytics" }); } catch (err) { next(err); } };
exports.getRatingGapUpsets = async (req, res, next) => { try { res.json({ success: true, message: "Mock Upsets Analytics" }); } catch (err) { next(err); } };
exports.getCheckmateFrequency = async (req, res, next) => { try { res.json({ success: true, message: "Mock Checkmate Frequency" }); } catch (err) { next(err); } };
exports.getDrawFrequency = async (req, res, next) => { try { res.json({ success: true, message: "Mock Draw Frequency" }); } catch (err) { next(err); } };
exports.getResignationFrequency = async (req, res, next) => { try { res.json({ success: true, message: "Mock Resignation Frequency" }); } catch (err) { next(err); } };
exports.getTimeouts = async (req, res, next) => { try { res.json({ success: true, message: "Mock Timeouts Analytics" }); } catch (err) { next(err); } };
exports.getPlayerGrowth = async (req, res, next) => { try { res.json({ success: true, message: "Mock Player Growth" }); } catch (err) { next(err); } };
exports.getHourlyActivity = async (req, res, next) => { try { res.json({ success: true, message: "Mock Hourly Activity" }); } catch (err) { next(err); } };
exports.getTimeControlUsage = async (req, res, next) => { try { res.json({ success: true, message: "Mock Time Control Usage" }); } catch (err) { next(err); } };
