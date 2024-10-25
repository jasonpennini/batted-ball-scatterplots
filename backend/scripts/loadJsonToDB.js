const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config()

// Connect to MongoDB (update your connection string as needed)
mongoose.connect(process.env.MONGO_URI);

// Import your battedBall model
const BattedBall = require('../models/battedBallModel'); 

// Load the JSON file
const loadData = async () => {
  try {
    const jsonData = fs.readFileSync(path.join(__dirname, '../output.json'), 'utf-8');

    const parsedData = JSON.parse(jsonData);

    console.log(`Total records to process: ${parsedData.length}`);

    // Ensure the data format matches the schema
    const formattedData = [];
    let validRecordsCount = 0;
    let invalidRecordsCount = 0;

    for (const row of parsedData) {
      // Perform basic validation
      if (
        typeof row.BATTER_ID === 'number' &&
        typeof row.BATTER === 'string' &&
        typeof row.PITCHER_ID === 'number' &&
        typeof row.PITCHER === 'string' &&
        !isNaN(row.LAUNCH_ANGLE) &&
        !isNaN(row.EXIT_SPEED) &&
        !isNaN(row.EXIT_DIRECTION) &&
        !isNaN(row.HIT_DISTANCE) &&
        typeof row.PLAY_OUTCOME === 'string' &&
        typeof row.VIDEO_LINK === 'string'
      ) {
        // Format the data
        formattedData.push({
          batterID: row.BATTER_ID,
          batter: row.BATTER,
          pitcherID: row.PITCHER_ID,
          pitcher: row.PITCHER,
          gameDate: new Date(row.GAME_DATE), // Ensure this handles MM/DD/YYYY format correctly
          launchAngle: row.LAUNCH_ANGLE,
          exitSpeed: row.EXIT_SPEED,
          exitDirection: row.EXIT_DIRECTION,
          hitDistance: row.HIT_DISTANCE,
          playOutcome: row.PLAY_OUTCOME,
          videoLink: row.VIDEO_LINK,
        });
        validRecordsCount++;
      } else {
        console.error(`Invalid record: ${JSON.stringify(row)}`);
        invalidRecordsCount++;
      }
    }

    // Insert data into MongoDB
    const result = await BattedBall.insertMany(formattedData);
    console.log(`Successfully inserted ${validRecordsCount} records into the database!`);
    if (invalidRecordsCount > 0) {
      console.log(`${invalidRecordsCount} records were invalid and not inserted.`);
    }
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Execute the load data function
loadData();
