const express = require("express")
const router = express.Router()
const updatecontroller = require("../controllers/profile.controller")
const middelware = require('../middleware/auth.middleware')


/**
 * @description 
 * @route POST - /api/update/updateuser
 */
router.post("/updateuser",middelware.authMiddleware,updatecontroller.updateuserdetails)



module.exports = router