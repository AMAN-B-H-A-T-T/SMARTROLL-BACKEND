const mongoose = require('mongoose')
const Semester = mongoose.model("Semester",mongoose.Schema({
    term:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Terms"
    },
    sem_no:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
}))

module.exports = {Semester}