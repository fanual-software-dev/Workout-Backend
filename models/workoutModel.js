const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title:{
        type: String,
        required: true
    },

    reps:{
        type: Number,
        required: true
    },

    load:{
        type: Number,
        required: true
    },

    createdBy:{
        type: mongoose.Types.ObjectId,
        required: true
    }

    
},{timestamps: true})


module.exports = mongoose.model('DotWorkout',workoutSchema)