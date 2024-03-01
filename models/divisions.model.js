const mongoose = require('mongoose')

const Division = mongoose.model("Division",mongoose.Schema({
    semester: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Semester"
    },
    division_name : {
        type: String,
        required : true
    }
}))

module.exports = {Division}