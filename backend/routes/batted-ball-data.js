const express = require('express')
const { getAllBattedBallData, getUniqueBatters, getBatterData } = require('../controllers/batted-ball-controller')

//creates an instance of express router which we must first require in
const router = express.Router()

// route handler will handle get requests to local host 4000/ 
router.get('/', getAllBattedBallData) 
router.get('/hitters', getUniqueBatters)
router.get('/hitters/:name', getBatterData); // Updated route for searching batters by query parameters

module.exports = router