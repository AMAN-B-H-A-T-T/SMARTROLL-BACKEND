const express = require('express')
const { create_term_controller , get_term_controller } = require('../controller/terms.controller')
const { token_verify } = require('../utils/tokenVerify')

const route = express.Router()

route.get("/get_terms",token_verify,get_term_controller)
route.post("/create_term",token_verify,create_term_controller)

module.exports = route