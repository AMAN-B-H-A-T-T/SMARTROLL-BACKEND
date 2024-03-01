const express = require('express')
const { token_verify } = require('../utils/tokenVerify')
const { get_all_branch_details_controller , create_branch_Controller } = require('../controller/branches.controller')
const route = express.Router()

route.post("/create_branch",create_branch_Controller)
route.get("/get_all_details",token_verify,get_all_branch_details_controller)

module.exports = route