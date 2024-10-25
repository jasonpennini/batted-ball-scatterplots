// we must require in the .dotenv file and invoke config method
// which adds .env file variables to a project, so we can keep port number hidden
require('dotenv').config()

// after running npm i express 
const express = require('express')

const mongoose = require('mongoose')

const battedBallDataRoutes = require('./routes/batted-ball-data')

// we can create an instance of express  
const app = express()

// special middleware that parses incoming requests in .json format, so we can process it in the request handler as req.body
app.use(express.json())

// adding middleware, which is any function that executes between request and response
// we will never advance to next piece of middleware without next
app.use((req, res, next) => {
  // this will log all requests that occur before response to front end
  console.log(req.path, req.method)
  return next()
})

const port = process.env.PORT

// when we fire a request to this path, use these routes
app.use('/api/battedBallData', battedBallDataRoutes)

//connect to db, .connect is an async method that returns a promise object
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // only listen for requests when we connect to the db. 
    // express instance has a listen method which listens for a specific port and executes the anonymous function
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`)
    })
  })
  .catch((error)=> {
    console.log(error)
  })