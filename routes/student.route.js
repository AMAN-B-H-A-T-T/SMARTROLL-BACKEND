const { register_student_controller } = require("../controller/student.controller");
const  upload  = require("../utils/multer_middleware");
const { token_verify } = require("../utils/tokenVerify");
const express = require('express')
const route = express.Router()

route.post("/register_student",token_verify,upload.single('file'),register_student_controller)

module.exports = route