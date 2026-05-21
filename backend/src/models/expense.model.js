const mongoose = require("mongoose")

const expensmodel = new mongoose.Schema({
    amount:{
        type: Number,
        required:[true,'amount is required']
    },
    title:{
        type: String,
        required:[true,'title is required']
    },
    category:{
        type: String,
        enum:{
            values:['FOOD','HEALTH','SHOPPING'],
            message:"category can be FOOD,HEALTH,SHOPPING"
        },
        required:[true,'title is required'],
        index : true
    },
    date:{
        type:Date,
        requrired: [true,'date is required']
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    paymentMethod:{
        type:String,
        enum:{
            values:['UPI','CASH','CHEQUE'],
            message:"paymentMethod can be UPI, CHEQUE or CASH "
        },
        required:[true,'paymentMethod is required']
    }
},{timestamps:true})

const expensemodel = mongoose.model("expenses",expensmodel)

module.exports = expensemodel