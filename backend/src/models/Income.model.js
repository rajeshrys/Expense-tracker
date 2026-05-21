const mongoose = require("mongoose")

const incomeSchema = new mongoose.Schema({
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
            values:['SALARY','BUSINESS','FREELANCE'],
            message:"category can be SALARY,BUSINESS or FREELANCE"
        },
        required:[true,'title is required'],
        index : true
    },
    date:{
        type:Date,
        required: [true,'date is required']
    },
    paymentMethod:{
        type:String,
        enum:{
            values:['UPI','CASH','CHEQUE'],
            message:"paymentMethod can be UPI, CHEQUE or CASH "
        },
        required:[true,'paymentMethod is required']
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true})

const incomemodel = mongoose.model("income",incomeSchema)

module.exports = incomemodel