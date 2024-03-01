const express = require('express')
const { create_batch_controller, get_batch_controller } = require('../controller/batches.controller')
const { token_verify } = require('../utils/tokenVerify')

const router = express.Router()

router.get("/get_batches",token_verify,get_batch_controller)
router.post("/createBatch",token_verify,create_batch_controller)

module.exports = router