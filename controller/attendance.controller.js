const { mark_student_attendace } = require("../services/attendance.services");
const { getSocketObject } = require("../utils/scoket_connection");

const mark_student_attendance_controller = (req,res)=>{
    try{
        if(req.userDetails.role === "student"){

        }
        else{
            return res.status(500).send({
                "message":"error",
                "error":"You are not authorized to mark attendance"
            })
        }
        const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress.split(".");
        const profileId = req.userDetails.profileId
        const sessionId = req.query.sessionId
        mark_student_attendace(profileId,sessionId,ipAddress,(error,result)=>{
            if(error){
                return res.status(error.status_code).send({
                    "message":"error",
                    "error": error.error
                })
            }
            const socket = getSocketObject()
            socket.emit('serverMessage',JSON.stringify(result))
            return res.status(200).send({
                "message":"success",
                "data":result
            })
        })
    }   
    catch(error){
        return res.status(500).send({
            "message":"error",
            "error":error.message
        })
    } 
}
module.exports = {mark_student_attendance_controller}