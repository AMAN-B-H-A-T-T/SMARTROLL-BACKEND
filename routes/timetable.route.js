const express = require('express')
const { token_verify } = require('../utils/tokenVerify')
const { create_timetable_controller, create_lecture_controller, get_Timetable_for_teacher_controller, get_session_details_controller, get_timetable_for_student_controller } = require('../controller/timetable.controller')
const route = express.Router()

route.post("/createTimetable",token_verify,create_timetable_controller)
route.post("/create_lecture",token_verify,create_lecture_controller)
route.get("/get_timeTable_for_teacher",token_verify,get_Timetable_for_teacher_controller)
route.post("/get_session_details",token_verify,get_session_details_controller)
route.get("/get_timetable_for_student",token_verify,get_timetable_for_student_controller)
module.exports = route