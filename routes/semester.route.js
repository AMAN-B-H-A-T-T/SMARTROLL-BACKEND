const { create_semester_controller, get_semester_by_batches_controller } = require("../controller/semester.controller");
const { token_verify } = require("../utils/tokenVerify");
const express = require('express')
const route = express.Router()

route.get("/get_semster",token_verify,get_semester_by_batches_controller)
route.post("/create_semester",token_verify,create_semester_controller)

module.exports = route
