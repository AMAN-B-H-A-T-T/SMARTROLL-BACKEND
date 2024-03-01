const express = require('express')
const { token_verify } = require('../utils/tokenVerify')
const { create_router_controller } = require('../controller/router.controller')
const route = express.Router()

route.post("/create_network_address",token_verify,create_router_controller)

module.exports = route