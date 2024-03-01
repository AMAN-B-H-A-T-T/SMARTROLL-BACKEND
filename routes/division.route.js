const express = require('express')
const { token_verify } = require('../utils/tokenVerify')
const { get_division_controller, create_division_controller } = require('../controller/division.controller')
const route = express.Router()

route.get("/get_divisions",token_verify,get_division_controller)
route.post("/create_divison",token_verify,create_division_controller)

module.exports = route