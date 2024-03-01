const mongoose = require('mongoose')
const {Schema} = mongoose.Schema()

const Admin = mongoose.model("Admin",mongoose.Schema({
    profile:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Profile"
    },
    branch:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Branch"
    }
}))

module.exports = {
    Admin
}