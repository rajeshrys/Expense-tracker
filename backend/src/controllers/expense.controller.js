const expensemodel = require("../models/expense.model")

async function createexpensecontroller(req, res) {

    const { amount, title, category, date, paymentMethod } = req.body

    const user = req.user

    if (!amount || !title || !category || !date || !paymentMethod) {
        return res.status(400).json({
            message: "Missing Fields"
        })
    }

    if (!user) {
        return res.status(401).json({
            message: "user not found"
        })
    }

    const expense = await expensemodel.create({
        user: user._id,
        amount,
        title,
        category,
        date,
        paymentMethod
    })

    res.status(200).json({
        message: "Expense created successfully",
        expense
    })
}

async function getexpensecontroller(req, res) {

    const user = req.user

    const getexpenses = await expensemodel.find({
        user: user._id
    })

    if (!getexpenses) {
        return res.status(401).json({
            message: "user is not logged in"
        })
    }

    res.status(200).json({
        message: "Successfully fetched user expense",
        getexpenses
    })
}

async function getexpensebycategorycontroller(req, res) {

    const { category } = req.params

    console.log(category)

    const expenses = await expensemodel.find({
        category
    })

    if (!expenses) {
        return res.status(401).json({
            message: "No expense records"
        })
    }

    if (expenses.length === 0) {
        return res.status(404).json({
            message: "No expense records"
        })
    }

    res.status(200).json({
        message: `Successfully fetched using ${category}`,
        expenses
    })
}

async function updateexpensecontroller(req, res) {

    const expenseId = req.params

    if (!expenseId) {
        return res.status(401).json({
            message: "Id is required"
        })
    }

    const expenserecord = await expensemodel.findByIdAndUpdate(
        {
            _id: expenseId.id
        },
        req.body,
        { new: true }
    )

    res.status(200).json({
        message: "Successfully updated the expense record",
        expenserecord
    })
}

async function deleteexpensecontroller(req, res) {

    const expense = req.params

    if (!expense) {
        return res.status(401).json({
            message: "Id is required"
        })
    }

    const expenserecord = await expensemodel.findByIdAndDelete({
        _id: expense.id
    })

    res.status(200).json({
        message: "Successfully deleted the expense record",
        expenserecord
    })
}

async function deleteallexpensecontroller(req, res) {

    const user = req.user

    console.log(user)

    if (!user) {
        return res.status(401).json({
            message: "User not found"
        })
    }

    console.log("called me")

    const expenserecords = await expensemodel.deleteMany({
        user: user
    })

    console.log(expenserecords)

    if (!expenserecords) {
        return res.status(400).json({
            message: "No expense records found"
        })
    }

    res.status(200).json({
        message: "Successfully deleted all records"
    })
}

module.exports = {
    createexpensecontroller,
    getexpensecontroller,
    getexpensebycategorycontroller,
    updateexpensecontroller,
    deleteexpensecontroller,
    deleteallexpensecontroller
}