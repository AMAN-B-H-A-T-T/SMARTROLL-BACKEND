const mongoose = require('mongoose')
const { Lecture_Session_CronJpb } = require('./cronjob')

const connectDB = () =>{
    mongoose.connect("mongodb+srv://amansevak123:WUW5PmW3sS1YhoCT@smartroll.ddgu0ft.mongodb.net/smartroll?retryWrites=true&w=majority&appName=smartRoll")
    .then((response)=>{
        console.log("connected")
        Lecture_Session_CronJpb()
    })
    .catch((error)=>{console.log(error)})
}

module.exports = {
    connectDB
}

