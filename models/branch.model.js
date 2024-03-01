const mongoose = require('mongoose')
const {Shema} = mongoose.Schema()

const Branch = mongoose.model("Branch",mongoose.Schema({
    branch_name :{
        type : String,
        required:true
    },
    branch_code : {
        type : String,
        required : true
    }
}))

module.exports = {
    Branch
}