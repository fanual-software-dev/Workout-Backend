require('dotenv').config()

const express = require('express')
const workoutRoutes = require('./routes/workoutes')
const userRoute = require('./routes/userRoutes')
const mongoose = require('mongoose')

const app = express()

//listen for requests

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT, ()=>{
            console.log('connected to db & listening on port',process.env.PORT)
        })
    })

    .catch((err)=>{
        console.log(err,'here is the error')
    })

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.use(express.json())

app.use('/user',userRoute)
app.use('/api/workouts',workoutRoutes)

