const express = require('express')
const { connectDB } = require('./utils/dbconnection')
const http  = require('http')
const { initilizedSocket, setSocketObject } = require('./utils/scoket_connection')
const socketIo = require('socket.io')


const app = express()

const PORT = 4000

const Server = http.createServer(app)
const io = socketIo(Server)

try{
    connectDB()
    //initilizedSocket(io)
    setSocketObject(io)
    app.use(express.json())

    app.use("/api/profile",require("./routes/profile.route"))
    app.use("/api/manage",require('./routes/batches.route'))
    app.use("/api/manage",require('./routes/semester.route'))
    app.use("/api/manage",require('./routes/subject.route'))
    app.use("/api/manage",require('./routes/branch.route'))
    app.use("/api/manage",require('./routes/teacher_subject.rote'))
    app.use("/api/manage",require('./routes/timetable.route'))
    app.use("/api/manage",require('./routes/terms.routes'))
    app.use("/api/manage",require('./routes/division.route'))
    app.use("/api/manage",require('./routes/router.route'))
    app.use("/api/manage",require('./routes/classroom.route'))
    app.use("/api/manage",require('./routes/student.route'))
    app.use("/api/manage",require('./routes/attendance.route'))
}

catch(error){
    console.log("error:", error)
}


Server.listen({
    port: PORT,
    host: '0.0.0.0',
},()=>{
    console.log("http://localhost:4000")
})

module.exports = io
