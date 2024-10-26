const BattedBall = require('../models/battedBallModel')
const mongoose = require('mongoose')

// get all batted ball data
const getAllBattedBallData = async (req, res) => {
  return res.json({mssg: "GET all batted ball data route test"})
}

// New controller function to get unique batters
const getUniqueBatters = async (req, res) => {
  try {
      const batters = await BattedBall.distinct('batter'); // Fetch unique batters
      res.json(batters);
  } catch (error) {
      res.status(500).send('Error fetching batters: ' + error.message);
  }
};

// New controller function to get data for a specific batter
const getBatterData = async (req, res) => {
  try {
      const hitterName = req.params.name; 
      const hitterData = await BattedBall.find({ batter: hitterName }); // Query the database for the hitter's data
      if (!hitterData.length) {
         return res.status(404).send('Hitter not found');
        }
      res.json(hitterData);
  } catch (error) {
      res.status(500).send('Error fetching hitter data: ' + error.message);
  }
};
 
module.exports = {
  getAllBattedBallData,
  getUniqueBatters,
  getBatterData
}