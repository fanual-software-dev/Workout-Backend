const mongoose = require('mongoose')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SIGN_USER = async (id)=>{
    return jwt.sign({_id:id},process.env.SECRET,{expiresIn:'1d'})
}


const SIGN_UP = async (req,res) => {

    const {email,password} = req.body

    try {

        const Exists = await User.findOne({email})

        if (Exists){
            return res.status(401).json({error:"User already exists by this email."})
        }

        const hashpassword = await bcrypt.hash(password,8)
        
        const user = await User.create({email,password:hashpassword})
        const token = await SIGN_USER(user._id)
        
        return res.status(200).json({user,token})
        
    } catch (error) {
        console.log(error)
        return res.status(404).json({error:error})
    }

}

const LOG_IN = async (req,res)=>{
    const {email,password} = req.body

    try {

        const user = await User.findOne({email})
        const token = await SIGN_USER(user._id)
        const match = await bcrypt.compare(password,user.password)
        
        if (!match){

            return res.status(401).json({error:"Password not match"})
        }
        
        return res.status(200).json({user,token})
        
    } catch (error) {
        return res.status(404).json({error:"User Not found"})
    }
}


module.exports = {SIGN_UP,LOG_IN}