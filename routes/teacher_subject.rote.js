const express = require('express')
const route = express.Router()
const { set_teacher_subject_controller, get_teacher_contrroller } = require("../controller/teacherSubject.controller");
const { token_verify } = require("../utils/tokenVerify");

route.post("/setSubject",token_verify,set_teacher_subject_controller)
route.get("/getTeacher",token_verify,get_teacher_contrroller)

module.exports = route