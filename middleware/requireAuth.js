const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req,res,next)=>{
    const {authorization} = req.headers
   

    if (!authorization){
        return res.status(401).json({error:"Authentication required"})
    }

    try {

        const token = authorization.split(' ')[1]

        const {_id} = jwt.verify(token,process.env.SECRET)

        const id = await User.findOne({_id}).select('_id')

        req.id = id
        
        next()
        
    } catch (error) {
        res.status(404).json({error:"Authentication required. token not match"})
    }


}

module.exports = requireAuth