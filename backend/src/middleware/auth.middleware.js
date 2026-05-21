const jwt = require("jsonwebtoken")
const usermodel = require("../models/user.model")
require("dotenv").config()


async function authMiddleware(req,res,next){
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
    if(!token){
        res.status(400).json({message:"Token is Missing"})
    }
    const isvalid = await jwt.verify(token,process.env.JWT_SECRET)

    if(!isvalid){
        res.status(400).json({message:"Token is Missing"})
    }
    const user = await usermodel.findById({
        _id: isvalid._id
    })
    req.user = user

    next()

}

module.exports = {authMiddleware}
