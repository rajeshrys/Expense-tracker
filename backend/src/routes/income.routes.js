const express = require("express")
const router = express.Router()
const authmiddleware = require("../middleware/auth.middleware")
const incomecontroller  = require("../controllers/income.controller")

/**
 * @description used to create the income
 * @route POST /api/income/create
 */
router.post("/create",authmiddleware.authMiddleware,incomecontroller.createincomecontroller)

/**
 * @description used to get the income
 * @route GET /api/income/get
 */
router.get("/get",authmiddleware.authMiddleware,incomecontroller.getincomecontroller)

/**
 * @description used to get the income by specific category
 * @route GET /api/income/get
 */
router.get("/get/:category",authmiddleware.authMiddleware,incomecontroller.getincomebycategorycontroller)



/**
 * @description used to update the income by Id
 * @route PATCH /api/income/update
 */
router.patch("/update/:id",authmiddleware.authMiddleware,incomecontroller.updateincomecontroller)

/**
 * @description used to update the income by Id
 * @route DELETE /api/income/delete
 */
router.delete("/delete/:id",authmiddleware.authMiddleware,incomecontroller.deleteincomecontroller)


/**
 * @description used to delete all income records by user
 * @route DELETE /api/income/delete
 */
router.delete("/deleteall",authmiddleware.authMiddleware,incomecontroller.deleteallincomecontroller)




module.exports = router