const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts

const getWorkouts = async (req,res) => {

    const createdBy = req.id
    const workouts = await Workout.find({createdBy:createdBy}).sort({createdAt:-1})

    res.status(200).json(workouts)
}

// get a single workout

const getWorkout = async (req,res) =>{

    const {id} = req.params
    const createdBy = req.id

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(505).json({error:"Invalid Id"})
    }

    const workout = await Workout.findOne({_id:id, createdBy:createdBy})

    if(!workout){
        return res.status(404).json({error:'No such workout'})
    }

    return res.status(200).json(workout)
}

// create a new workout

const createWorkout = async (req,res)=>{
    const {title,load,reps} = req.body
    const createdBy = req.id
    try{
        const workout = await Workout.create({title,load,reps,createdBy:createdBy})
        res.status(200).json(workout)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

// delete a workout

const deleteWorkout = async(req,res)=>{
    const {id} = req.params
    const createdBy = req.id

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(505).json({error:"Invalid ID"})
    }

    const workout = await Workout.findOneAndDelete({_id: id,createdBy:createdBy})

    if(!workout){
        return res.status(404).json({error:"File not found"})
    }

    return res.status(200).json(workout)
}

// update a workout

const updateWorkout = async (req,res) =>{
    const {id} = req.params
    const createdBy = req.id

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(505).json({error:'Invalid ID'})
    }

    const workout = await Workout.findOneAndUpdate({_id : id,createdBy:createdBy},{
        ...req.body
    })

    if (!workout){
        return res.status(404).json({error:'No such Document'})
    }

    return res.status(200).json(workout)
}

module.exports = {createWorkout,getWorkouts,getWorkout,deleteWorkout,updateWorkout}