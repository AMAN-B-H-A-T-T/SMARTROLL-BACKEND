const mongoose = require('mongoose')

const Router = mongoose.model("Router",mongoose.Schema({
     network_addr : {
        type : String,
        required : true
     },
     network_bits : {
      type:Number,
      required:true
     }
}))

module.exports = {Router}