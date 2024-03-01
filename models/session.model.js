const mongoose = require('mongoose')

const Session = mongoose.model("Session",mongoose.Schema({
    lecture:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Lecture",
        required:true
    },
    active:{
        type:String,
        required:true,
        default:"pre"
    },
    created_at:{
        type:String,
        required:true
    },
    day:{
        type:String,
        required:true
    }
}))

module.exports = {Session}