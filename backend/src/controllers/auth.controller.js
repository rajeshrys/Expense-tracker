const usermodel  = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const blacklistmodel = require("../models/blacklist.model")

async function userregistercontroller(req,res){
    
    try{

    const {username,email,password} = req.body;
    if(!username || !email || !password){
        res.status(400).json({
            message:"Missing required fields"
        })
    }

    const isuserexists = await usermodel.findOne({email:email})

    if(isuserexists){
        res.status(409).json({message:"User already exists"})
    }

    const hash = await bcrypt.hash(password,10)

    const user = await usermodel.create({
        username: username,
        email:email,
        password:hash
    })

    const token = jwt.sign({
        _id:user._id
    },process.env.JWT_SECRET,{expiresIn:"3d"})

    res.cookie('token',token)

    res.status(201).json({
        message:"User registration successful",
        token,
        user:{
            _id:user._id,
            username: user.username,
            email:user.email,
        }
    })

    }
    catch(err){
        res.status(500).json({message:"Internal Server error"})
    }

}

async function userlogincontroller(req,res){
    const {email,password} =req.body;
    if(!email|| !password){
        res.status(400).json({message:"Missing Required fields"})
    }
    const user = await usermodel.findOne({email})

    if(!user){
        res.status(401).json({message:"Invalid email"})
    }
    console.log(user.password)
    const decoded = await bcrypt.compare(password,user.password)
    console.log(decoded)

    if(!decoded){
        res.status(401).json({message:"Invalid credentials"})
    }

    const token = jwt.sign({
        _id:user._id
    },process.env.JWT_SECRET,{expiresIn:"3d"})

    res.cookie('token',token)
    

    res.status(200).json({
        message:"User logged in successfully",
        token,
        user:{
            _id:user._id,
            email:user.email,
        }
    })
}

async function userlogoutcontroller(req,res){
    const token = req.cookies.token || req.headers.authorization?.split("")[1]
    if(!token){
        res.status(401).json({message:"Token is required"})
    }
    const blacklisttoken = await blacklistmodel.create({
        token: token
    })
    res.clearCookie('token')
    res.status(200).json({message:"User logged out Successfully"})
}

async function getmecontroller(req,res){
     const userId = req.user._id
    const user = await usermodel.findById(userId)
    if(!user){
        return res.status(400).json({message:"user not found"})
    }
    res.status(200).json({message:"user fetched successfully",
        user
    })
}
module.exports={
    userregistercontroller,
    userlogincontroller,
    userlogoutcontroller,
    getmecontroller
}