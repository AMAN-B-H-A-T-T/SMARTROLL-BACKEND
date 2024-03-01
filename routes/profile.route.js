const express = require('express')
const { create_profile_controller, get_profile_controller , user_login_controller , refresh_token_controller, updateProfile_controller} = require('../controller/profile.controller')
const { verifyRefreshToken } = require('../utils/refreshTokenVerify')


const router = express.Router()
router.post("/createUser",create_profile_controller)
router.get("/getProfile",get_profile_controller)
router.post("/login",user_login_controller)
router.get("/refreshToken",verifyRefreshToken,refresh_token_controller)
router.post("/updateProfile",updateProfile_controller)
module.exports = router