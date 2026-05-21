const express = require("express")
const router = express.Router()

const authmiddleware = require("../middleware/auth.middleware")
const expensecontroller = require("../controllers/expense.controller")

/**
 * @description used to create the expense
 * @route POST /api/expense/create
 */
router.post(
    "/create",
    authmiddleware.authMiddleware,
    expensecontroller.createexpensecontroller
)

/**
 * @description used to get the expense
 * @route GET /api/expense/get
 */
router.get(
    "/get",
    authmiddleware.authMiddleware,
    expensecontroller.getexpensecontroller
)

/**
 * @description used to get expense by specific category
 * @route GET /api/expense/get/:category
 */
router.get(
    "/get/:category",
    authmiddleware.authMiddleware,
    expensecontroller.getexpensebycategorycontroller
)

/**
 * @description used to update expense by Id
 * @route PATCH /api/expense/update/:id
 */
router.patch(
    "/update/:id",
    authmiddleware.authMiddleware,
    expensecontroller.updateexpensecontroller
)

/**
 * @description used to delete expense by Id
 * @route DELETE /api/expense/delete/:id
 */
router.delete(
    "/delete/:id",
    authmiddleware.authMiddleware,
    expensecontroller.deleteexpensecontroller
)

/**
 * @description used to delete all expense records by user
 * @route DELETE /api/expense/deleteall
 */
router.delete(
    "/deleteall",
    authmiddleware.authMiddleware,
    expensecontroller.deleteallexpensecontroller
)

module.exports = router