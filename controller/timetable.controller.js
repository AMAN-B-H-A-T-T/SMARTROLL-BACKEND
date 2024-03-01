
const { create_timeTable  , create_lecture, get_Timetable_for_teacher, get_session_details, get_timetable_for_student} = require("../services/timetable.services")
const { getIoObject, initilizedSocket, getSocketObject } = require("../utils/scoket_connection")

const create_timetable_controller = (req,res)=>{
    const divisionId = req.body.division
    create_timeTable(divisionId,(error,result)=>{
        if(error){
            res.status(error.status_code).send({
                "message":"error",
                "error":error.error
            })
        }

        
        res.status(200).send({
            "message":"success",
            "data":result
        })
    })
}
const create_lecture_controller = (req,res)=>{
    try{
        if(req.userDetails.role === "admin"){
                const model = {
                    "schedule":req.body.schedule,
                    "classroom":req.body.classroom,
                    "batch":req.body.batch,
                    "subject":req.body.subject,
                    "teacher":req.body.teacher,
                    "start_time":req.body.start_time,
                    "end_time":req.body.end_time

                }
                create_lecture(model,(error,result)=>{
                    if(error){
                        return res.status(error.status_code).send({
                            "message":"error",
                            "error":error.error
                        })
                    }
                    return res.status(200).send({
                        "message":"success",
                        "data":result
                    })
                })
        }
        else{
            return res.status(500).send({
                "message":"error",
                "error":"You Don't Allow To Create Lecture"
            })    
        }
    }
    catch(error){
        return res.status(500).send({
            "message":"error",
            "error":error.message
        })
    }
}

const get_Timetable_for_teacher_controller = (req,res)=>{
    try{
        if(req.userDetails.role === "teacher"){
            const schedule = {1:"Mon",2:"Tues",3:"Wed",4:"Thu",5:"Thu",6:"Sat"}
            const day = new Date().getDay()
            const teacherId = req.userDetails.profileId
            get_Timetable_for_teacher(schedule[day],teacherId,(error,result)=>{
                if(error){
                    return res.status(error.status_code).send({
                        "message":"error",
                        "error":error.error
                    })
                }
                return res.status(200).send({
                    "message":"success",
                    "data":result
                })
            })
        }
        else{
            return res.status(500).send({
                "message":"error",
                "error":"You Don't have permission to get Schedule"
            })
        }        
    }
    catch(error){
        return res.status(500).send({
            "message":"error",
            "error":error.message
        })
    }
}

const get_timetable_for_student_controller = (req,res)=>{
    try{
        if(req.userDetails.role === "student"){
            const schedule = {1:"Mon",2:"Tues",3:"Wed",4:"Thu",5:"Thu",6:"Sat"}
            const day = new Date().getDay()
            const profileId = req.userDetails.profileId
            get_timetable_for_student(profileId,schedule[day],(error,result)=>{
                if(error){
                    return res.status(error.status_code).send({
                        "message":"error",
                        "error":error.error
                    })
                }
                return res.status(200).send({
                    "message":"success",
                    "data":result
                })
            })
        }
        else{
            return res.status(500).send({
                "message":"error",
                "error":"You are not authorized to access timetable"
            })
        }
    }
    catch(error){
        return res.status(500).send({
            "message":"error",
            "error":error.message
        })
    }
}

const get_session_details_controller = (req,res)=>{
    try{
        if(req.userDetails.role === 'teacher' || req.userDetails.role === "admin"){
            const sessionId = req.body.sessionId
            get_session_details(sessionId,(error,result)=>{
                if(error){
                    return res.status(error.status_code).send({
                        "message":"error",
                        "error":error.error
                    })
                }
                else{
                    const io = getIoObject()
                    initilizedSocket(io,result.session._id)
                    return res.status(200).send({
                        "message":"success",
                        "data":result
                    })
                }
            })
        }
        else{
            return res.status(500).send({
                "message":"error",
                "error":"You Don't Have Rights To Get Session Details"
            })    
        }
    }
    catch(error){
        return res.status(500).send({
            "message":"error",
            "error":error.message
        })
    }
}
module.exports = {create_timetable_controller,create_lecture_controller,get_Timetable_for_teacher_controller,get_session_details_controller,get_timetable_for_student_controller}