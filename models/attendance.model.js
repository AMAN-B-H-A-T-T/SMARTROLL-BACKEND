const mongoose = require('mongoose')

const Attendance = mongoose.model('Attendance',mongoose.Schema({
    session:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'Session',
        
    },
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Profile',
        
    },
    is_present:{
        type:Boolean,
    },
    marking_ip:{
        tye:String,
        
    },
    marking_time:{
        type:Date,
        default:Date()
    } 
}))

module.exports = {Attendance}