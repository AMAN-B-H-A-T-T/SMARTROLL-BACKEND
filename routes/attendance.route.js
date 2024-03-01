const express = require('express')
const route = express.Router()
const { token_verify } = require("../utils/tokenVerify");
const { mark_student_attendance_controller } = require('../controller/attendance.controller');

route.get('/mark_attendance',token_verify,mark_student_attendance_controller)
module.exports = route