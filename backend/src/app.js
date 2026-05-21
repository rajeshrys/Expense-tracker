const express = require("express")
const app = express()
const authRoutes = require("./routes/auth.routes")
const authIncome = require("../src/routes/income.routes")
const authExpense = require("../src/routes/expese.routes")
const UpdateRoute = require("../src/routes/update.routes")

const cookieparser = require("cookie-parser")
const cors = require("cors")

app.use(express.json())
app.use(cookieparser())

app.use(cors({
    origin: "https://expense-tracker-five-tau-66.vercel.app",
    credentials:true
}))

/**
 * @description Used for authentication 
 */
app.use("/api/auth",authRoutes)

/**
 * @description Used for Income Management 
 */
app.use("/api/income",authIncome)

/**
 * @description Used for Income Management 
 */
app.use("/api/expense",authExpense)

/**
 * @description Used for Update Profile
 */
app.use("/api/update",UpdateRoute)

module.exports = app
