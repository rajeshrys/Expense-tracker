const usermodel = require("../models/user.model")
const bcrypt = require("bcrypt")

async function updateuserdetails(req,res){

    const { name,email,password } = req.body

    const updateuser = await usermodel.findOne({ email })

    if(!updateuser){
        return res.status(400).json({message:"No user found"})
    }

    let hashedPassword = updateuser.password

    // only hash if new password is sent
    if(password){
        hashedPassword = await bcrypt.hash(password,10)
    }

    const updatedUser = await usermodel.findOneAndUpdate(
        {
            _id:updateuser.id,
        },
        {
            username:name,
            email: email,
            password:hashedPassword
        },
        {
            returnDocument: 'after' 
        }
    )

    res.status(200).json({
        message:"Updated user successfully",
        updatedUser
    })
}

module.exports = { updateuserdetails }