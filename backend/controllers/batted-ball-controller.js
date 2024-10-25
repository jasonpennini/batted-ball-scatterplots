const BattedBall = require('../models/battedBallModel')
const mongoose = require('mongoose')

// get all batted ball data
const getAllBattedBallData = async (req, res) => {
  return res.json({mssg: "GET all batted ball data route test"})
}

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