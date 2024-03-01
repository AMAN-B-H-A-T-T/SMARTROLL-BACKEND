const mongooose = require('mongoose')

const Student = mongooose.model("Student",mongooose.Schema({
    "profile":{
        type : mongooose.Schema.Types.ObjectId,
        ref:"Profile",
    },
    "enrollment":{
        type:String,
        required:true,
    },
    "batch":{
        type:mongooose.Schema.Types.ObjectId,
        ref:"Batch",
    },
    "branch":{
        type:mongooose.Schema.Types.ObjectId,
        ref:"Branch"
    }
}))

module.exports = {Student}