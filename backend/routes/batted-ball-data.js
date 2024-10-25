const express = require('express')
const {createBattedBallData, getAllBattedBallData, deleteBattedBallData } 
= require('../controllers/batted-ball-controller')

//creates an instance of express router which we must first require in
const router = express.Router()
// all routes after this line require authentication and must pass through the authentication function before next is invoked

// route handler will handle get requests to local host 4000/ 
// will send a request to the server and a response back to the front end, the req/res objects allow us to persist data
router.get('/', getAllBattedBallData) 
// we are sending a response object back to front end with a message

router.post('/', createBattedBallData)

router.delete('/', deleteBattedBallData)

module.exports = router