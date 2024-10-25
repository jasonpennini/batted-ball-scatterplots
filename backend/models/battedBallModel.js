// mongoose allows us to create a Schema in the DB. The schema allows us to control the type of data in the DB and set criteria.
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const battedBallSchema = new Schema ({
  batterID: {
    type:Number,
    required:true,
  },
  batter: {
    type: String,
    required:true,
  },
  pitcherID: {
    type: Number,
    required:true, 
  },
  pitcher: {
    type:String,
    required:true,
  },
  gameDate: {
    type: Date,
    required:true,
    max:Date.now,
  },
  launchAngle: {
    type: Number,
    required:true,
    min:-90,
    max:90,
  },
  exitSpeed: {
    type: Number,
    required:true,
    min:0,
    max:130,
  },
  exitDirection: {
    type:Number,
    required:true,
    min:-180,
    max:180,
  },
  hitDistance: {
    type:Number,
    required:true,
    min:0,
    max:600,
  },
  playOutcome: {
    type:String,
    required:true,
  },
   videoLink: {
    type:String,
    required:true,
  }
 
}, {timestamps: true})

//creates the model based on the schema we created above
module.exports = mongoose.model('battedBall', battedBallSchema)