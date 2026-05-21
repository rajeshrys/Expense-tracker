const mongoose = require("mongoose")

const blacklistschema = new mongoose.Schema({
    token:{
        type: String,
        required:[true,'token is required']
    }
},{
    timestamps:true
})

const blacklistmodel = mongoose.model("blacklist",blacklistschema)

module.exports = blacklistmodel