const express = require('express')
const { token_verify } = require('../utils/tokenVerify')
const { create_classroom_controller } = require('../controller/classroom.controller')
const route = express.Router()

route.post("/create_classroom",token_verify,create_classroom_controller)

module.exports = route