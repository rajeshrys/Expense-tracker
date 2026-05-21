const incomemodel  = require("../models/Income.model")

async function createincomecontroller(req,res) {

    const {amount,title,category,date,paymentMethod} = req.body

    const user = req.user

    if(!amount || !title|| !category|| !date|| !paymentMethod){
        return res.status(400).json({message:"Missing Fields"})
    }

    if(!user){
        return res.status(401).json({message:"user not found"})
    }

    const income = await incomemodel.create({
        user: user._id,
        amount,
        title,
        category,
        date,
        paymentMethod
    })

    res.status(200).json({message:"Income created successfully",
        income
    })

}

async function getincomecontroller(req,res){
    const user = req.user
    const getincomes = await incomemodel.find({user:user._id})
    if(!getincomes){
        return res.status(401).json({message:"user is not logged in"})
    }

    res.status(200).json({message:"Successfully fetched userincome",
        getincomes
    })
}

async function getincomebycategorycontroller(req,res){
    const {category} = req.params
    console.log(category)
    const incomes= await incomemodel.find({category})
    if(!incomes){
        return res.status(401).json({
            message:"No income records"
        })
    }
        if(incomes.length === 0){
        return res.status(404).json({
            message:"No income records"
        })
    }
    res.status(200).json({
        message:`Successfully fetched using ${category}`,
        incomes
    })
}

async function updateincomecontroller(req,res){
    const incomeId = req.params
    
    if(!incomeId){
        return res.status(401).json({message:"Id is required"})
    }
    const incomerecord = await incomemodel.findByIdAndUpdate({
        _id: incomeId.id
    },req.body,{new:true})

    res.status(200).json({message:"Successfully updated the income record",incomerecord})
}

async function deleteincomecontroller(req,res){
    const income = req.params
    if(!income){
        return res.status(401).json({message:"Id is required"})
    }
    const incomerecord = await incomemodel.findByIdAndDelete({
        _id: income.id
    })

    res.status(200).json({message:"Successfully deleted the income record",incomerecord})
}

async function deleteallincomecontroller(req,res){
    const user = req.user
    console.log(user)
    if(!user){
        return res.status(401).json({message:"User not found"})
    }
    console.log("called me")
    const incomerecords = await incomemodel.deleteMany({user:user})
    console.log(incomerecords)
    if(!incomerecords){
        return res.status(400).json({message:"No income records found"})
    }
    res.status(200).json({message:"Successfully deleted all records"})

}

module.exports = {
    createincomecontroller,
    getincomecontroller,
    getincomebycategorycontroller,
    updateincomecontroller,
    deleteincomecontroller,
    deleteallincomecontroller
}