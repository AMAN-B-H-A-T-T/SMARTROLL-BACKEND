const mongoose = require('mongoose')

const Teacher = mongoose.model("Teacher",mongoose.Schema({
    profile : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Profile"
    },
    branch:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch"
    },
}))

module.exports = {Teacher}