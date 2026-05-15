require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const connectDB = require('../src/config/db');
const Match = require('../src/models/Match');

const seedData = async () => {
  try {
    // 1. Connect to MongoDB
    await connectDB();

    // 2. Read JSON dataset
    const dataPath = path.join(__dirname, '../data/Chess Game Dataset.json');
    console.log(`Reading dataset from ${dataPath}...`);
    
    if (!fs.existsSync(dataPath)) {
      throw new Error(`Dataset not found at ${dataPath}. Please check the path.`);
    }

    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const matches = JSON.parse(rawData);

    // 3. Transform data
    console.log('Transforming data...');
    const transformedMatches = matches.map((match) => ({
      match_id: match.id,
      rated: match.rated === 'TRUE' || match.rated === true,
      created_at: new Date(Number(match.created_at)),
      last_move_at: new Date(Number(match.last_move_at)),
      turns: Number(match.turns),
      victory_status: match.victory_status,
      winner: match.winner,
      increment_code: match.increment_code,
      white_id: match.white_id,
      white_rating: Number(match.white_rating),
      black_id: match.black_id,
      black_rating: Number(match.black_rating),
      moves: match.moves ? match.moves.split(' ') : [],
      opening_eco: match.opening_eco,
      opening_name: match.opening_name,
      opening_ply: Number(match.opening_ply)
    }));

    // Deduplicate matches based on match_id
    console.log('Deduplicating matches...');
    const uniqueMatchesMap = new Map();
    for (const match of transformedMatches) {
      if (!uniqueMatchesMap.has(match.match_id)) {
        uniqueMatchesMap.set(match.match_id, match);
      }
    }
    const deduplicatedMatches = Array.from(uniqueMatchesMap.values());

    // 4. Clear existing match data
    console.log('Clearing existing match data...');
    await Match.deleteMany({});

    // 5. Bulk insert
    console.log(`Seeding ${deduplicatedMatches.length} unique matches (filtered from ${transformedMatches.length})...`);
    await Match.insertMany(deduplicatedMatches);

    console.log('Data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error with seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedData();
