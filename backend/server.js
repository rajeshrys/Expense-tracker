const app = require('./src/app')
require("dotenv").config()
const connectdb = require("./src/config/db")

connectdb()

app.listen(process.env.PORT,()=>{
    console.log("Server is running at port:3000")
})