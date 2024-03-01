const mongoose = require('mongoose')
const { Lecture_Session_CronJpb } = require('./cronjob')

const connectDB = () =>{
    mongoose.connect("mongodb://127.0.0.1:27017/smartRoll")
    .then((response)=>{
        console.log("connected")
        Lecture_Session_CronJpb()
    })
    .catch((error)=>{console.log(error)})
}

module.exports = {
    connectDB
}

