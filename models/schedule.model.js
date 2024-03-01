const mongoose = require('mongoose')

const Schedule = mongoose.model("Schedule",mongoose.Schema({
    timetable : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    day:{
        type:String,
        required:true
    }
}))
module.exports = {Schedule}