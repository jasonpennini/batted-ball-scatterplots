const BattedBall = require('../models/battedBallModel')
const mongoose = require('mongoose')

// get all batted ball data
const getAllBattedBallData = async (req, res) => {
  return res.json({mssg: "GET all batted ball data route test"})
}

 // Validate each batting practice entry in the array
 // Create multiple batting practices from CSV upload
const createBattedBallData = async (req, res) => {
 return res.json({mssg: "POST all batted ball data route test"})
}

// delete all bp entries
const deleteBattedBallData = async (req, res) => {
 return res.json({mssg:"DELETE all batted ball data route route test"})
}
 
module.exports = {
  getAllBattedBallData,
  createBattedBallData,
  deleteBattedBallData
}