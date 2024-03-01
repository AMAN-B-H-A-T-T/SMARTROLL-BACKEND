const mongoose = require('mongoose')

const Timetable = mongoose.model("TimeTable",mongoose.Schema({
    division:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Division"
    }
}))
module.exports = {Timetable}