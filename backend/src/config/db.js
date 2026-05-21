const mongoose = require("mongoose")
const dns = require("node:dns")
dns.setServers(["1.1.1.1","8.8.8.8"])
require("dotenv").config()

async function connectdb() {
    try{
        await mongoose.connect(process.env.MONGOOSE_URL)
        console.log('connected to database')
    }
    catch(err){
        console.log("Error connecting to database",err)
    }
}

module.exports = connectdb