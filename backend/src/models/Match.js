const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  match_id: {
    type: String,
    required: true,
    unique: true
  },
  rated: {
    type: Boolean
  },
  created_at: {
    type: Date
  },
  last_move_at: {
    type: Date
  },
  turns: {
    type: Number
  },
  victory_status: {
    type: String
  },
  winner: {
    type: String
  },
  increment_code: {
    type: String
  },
  white_id: {
    type: String
  },
  white_rating: {
    type: Number
  },
  black_id: {
    type: String
  },
  black_rating: {
    type: Number
  },
  moves: {
    type: [String]
  },
  opening_eco: {
    type: String
  },
  opening_name: {
    type: String
  },
  opening_ply: {
    type: Number
  }
}, {
  timestamps: true // Adds createdAt and updatedAt for the DB document itself
});

module.exports = mongoose.model('Match', matchSchema);
