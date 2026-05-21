const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true,'username is required']
    },
    email:{
        type: String,
        unique:[true,'email should be unique'],
        required:[true,'email is required for login'],
        lowercase:true,
        trim: true
    },
    password:{
        type: String,
        required:[true,'password is required']
    }
})

const usermodel = mongoose.model("user",userSchema)

module.exports = usermodel