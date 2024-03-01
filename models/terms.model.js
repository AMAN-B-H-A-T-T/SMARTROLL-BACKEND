const mongoose = require('mongoose')

const Terms = mongoose.model("Terms",mongoose.Schema({
    branch : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"Branch"
    },
    activation:{
        type:Boolean,
        required:true
    },
    start_year:{
        type:String,
        required:true
    },
    end_year:{
        type:String,
        required:true
    }
}))

module.exports = {Terms}