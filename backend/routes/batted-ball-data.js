const express = require('express')
const {createBattedBallData, getAllBattedBallData, deleteBattedBallData } 
= require('../controllers/batted-ball-controller')

//creates an instance of express router which we must first require in
const router = express.Router()

// route handler will handle get requests to local host 4000/ 
router.get('/', getAllBattedBallData) 

router.post('/', createBattedBallData)

router.delete('/', deleteBattedBallData)

module.exports = router