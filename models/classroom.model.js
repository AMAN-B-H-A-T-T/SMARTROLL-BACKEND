const mongoose = require('mongoose')

const Classroom = mongoose.model("Classroom",mongoose.Schema({
    branch:{
        type : mongoose.Schema.Types.ObjectId,
        required:true
    },
    router:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Router",
        required:true
    },
    class_name:{
        type:String,
        required:true
    }
}))
module.exports = {Classroom}