const mongoose = require('mongoose')

const Batch = mongoose.model("Batch",mongoose.Schema({
    division : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"Division",
        required:true
    },
    batch_name : {
        type:String,
     
    }
}))

module.exports = {Batch}