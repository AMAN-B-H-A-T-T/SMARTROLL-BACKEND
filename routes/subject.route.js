const express = require('express')
const route = express.Router()
const { create_subject_controller, get_subject_by_semester_controller } = require("../controller/subject.controller");
const { token_verify } = require('../utils/tokenVerify');


route.get("/get_subject",token_verify,get_subject_by_semester_controller)
route.post("/create_subject",token_verify,create_subject_controller)

module.exports = route