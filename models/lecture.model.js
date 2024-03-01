const mongoose = require('mongoose')

const Lecture = mongoose.model("Lecture",mongoose.Schema({
    schedule : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Schedule",
    },
    classroom:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Classroom",
    },
    batch:{
        type : [mongoose.Schema.Types.ObjectId],
        ref:"Batch"
    },
    subject:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subject",
    },
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
    },
    start_time:{
        type:String,
        default:"00:00:00"
    },
    end_time:{
        type:String,
        default:"00:00:00"
    }  
}))
module.exports = {Lecture}