const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth.controller")
const middelware = require("../middleware/auth.middleware")


/**
 * @description Registration api
 * @route POST - /api/auth/register
 */
router.post("/register",authController.userregistercontroller)


/**
 * @description login api
 * @route POST - /api/auth/register
 */
router.post("/login",authController.userlogincontroller)

/**
 * @description logout api
 * @route POST - /api/auth/register
 */
router.get("/logout",authController.userlogoutcontroller)

/**
 * @description getme api
 * @route GET - /api/auth/getme
 */
router.get("/getme",middelware.authMiddleware,authController.getmecontroller)




module.exports = router