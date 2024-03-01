const mongoose = require('mongoose')
const {Schema} = mongoose.Schema()

const Profile = mongoose.model("Profile",mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        default:""
    },
    phone:{
        type:String,
        default : ""
    },
    password:{
        type:String,
        default:NaN
    },
    branch:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch"
    },
    role:{
        type:String,
        required:true
    }
}))

module.exports = {
    Profile
}