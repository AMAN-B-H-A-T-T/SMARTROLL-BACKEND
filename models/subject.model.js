const mongoose = require('mongoose')
const Subject = mongoose.model('Subject',mongoose.Schema({
    semester : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Semester",
        required:true
    },
    code:{
        type:String,
        required:true,
    },
    credit:{
        type:String,
        required:true
    },
    subject_name:{
        type:String,
        required:true
    }
}))
module.exports = {Subject}