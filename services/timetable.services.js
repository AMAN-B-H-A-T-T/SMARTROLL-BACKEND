const { Timetable } = require("../models/timeTable.model");
const { Schedule } = require("../models/schedule.model");
const { Lecture } = require("../models/lecture.model");
const { Session } = require("../models/session.model");
const { Student } = require("../models/student.model");
const { Attendance } = require("../models/attendance.model");

async function create_timeTable(divisionId, callback) {
    try {
        Timetable.find({ "division": divisionId })
            .then((response) => {
                if (response.length == 0) {
                    const timetable = new Timetable({ "division": divisionId })
                    timetable.save()
                        .then((response) => {
                            
                            const timetableId = response._id
                            const days = [{ "timetable": timetableId, day: "Mon" }, { "timetable": timetableId, day: "Tue" }, { "timetable": timetableId, day: "Wed" }, { "timetable": timetableId, day: "Thu" }, { "timetable": timetableId, day: "Fri" }, { "timetable": timetableId, day: "Sat" }]
                            Schedule.insertMany(days)
                                .then((response) => {
                                    return callback(null, response)
                                })
                                .catch((error) => {
                                    return callback({ "status_code": 500, "error": error.message })
                                })
                        })
                        .catch((error) => {
                            return callback({ "status_code": 500, "error": error.message })
                        })
                }
                else {
                    
                    get_timetable(divisionId, (error, result) => {
                        if (error) {
                            return callback(error)
                        }
                        return callback(null, result)
                    })
                }
            })
            .catch((error) => {
                return callback({ "status_code": 500, "error": error.message })
            })
    }
    catch (error) {
        return callback({ "status_code": 500, "error": error.message })
    }
}

async function create_lecture(model,callback){
    try{
        const lecture = new Lecture(model)
        lecture.save()
        .then((response)=>{
            return callback(null,response)
        })
        .catch((error)=>{
            return callback({"status_code":500,"error":error.message})
        })
    }
    catch(error){
        return callback({"status_code":500,"error":error.message})
    }
}

async function create_lecture_service(){
    try{
        const lecture_list = await Lecture.find({}).populate('schedule')
    const days = {
        "Mon":1,
        "Tue":2,
        "Wed":3,
        "Thu":4,
        "Fri":5,
        "Sat":6
    }
    
    lecture_list.map((lecture,inxdex)=>{
        const date = new Date()
        date.setDate(date.getDate() + days[lecture.schedule.day])
        const model = {
            "lecture":lecture._id.toString(),
            "active":"pre",
            "created_at":date.toLocaleString(),
            "day":date.toGMTString().split(",")[0]
        }    
        const session = new Session(model)
        session.save()
        .then((response)=>{
                const sessionId = response._id
                Session.find({lecture:response.lecture})
                .populate("lecture")
                .then((response)=>{
                    const batches  = response[0].lecture.batch
                    batches.map((batch,index)=>{
                        Student.find({batch:batch})
                        .then((response)=>{
                            response.map((student,index)=>{
                                const model = {
                                    "session":sessionId,
                                    "student":student.profile,
                                    "is_present":false,
                                    "marking_ip":"-",
                                }
                                const attendance = new Attendance(model)
                                attendance.save()
                                .then((response)=>{

                                })
                                .catch((error)=>{
                                    console.log(error.message)
                                })
                            })
                        })
                        .catch((error)=>{
                            console.log(error.message)
                        })
                    })
                    console.log("all session created")
                })  
                .catch((error)=>{
                    console.log(error.message)
                })
        })
        .catch((error)=>{
            console.log(error.message)
        })
    })
    }
    catch(error){
        console.log(error.message)
    }
    
}

async function get_timetable(divisionId, callback) {
    try {
        let response_Data = {};
        const timetable = await Timetable.findOne({ "division": divisionId }).populate({
            path: "division", populate: {
                path: 'semester',
                model: 'Semester'
            }
        });

        if (!timetable) {
            return callback({ "status_code": 401, "error": "not exist" });
        }

        response_Data["timetable"] = timetable;

        const schedules = await Schedule.find({ timetable: timetable._id });
        const schedule_lect = await Promise.all(schedules.map(async (schedule) => {
            const lecture = await Lecture.find({ schedule: schedule._id }).populate(["schedule","classroom","batch","subject","teacher"]);
            // Include the lecture array as a property of the schedule object
            return { ...schedule.toObject(), lecture };
        }));

        response_Data["Schedules"] = schedule_lect
        return callback(null, response_Data);
    }
    catch (error) {
        return callback({ "status_code": 500, "error": error.message })
    }
}

async function get_Timetable_for_teacher(Schedule,teacherId,callback){
    try{
         
         const lectures = await Lecture.find({teacher:teacherId})
         .populate(["schedule","classroom","batch","subject","teacher"])
         const lecture_session = await Promise.all(lectures.map(async(lecture,index)=>{
            const session = await Session.find({lecture:lecture._id,day:Schedule})
            if(session.length > 0){
                return {...lecture.toObject(),session}
            }
            return("")
            
         }))
         return callback(null,lecture_session)
    }
    catch(error){
        return callback({"status_code":500,"error":error.message})
    }
    
}

async function get_timetable_for_student(profileId,Schedule,callback){
    try{
        const student = await Student.find({profile:profileId})
        if(student.length > 0){
            Session.find({day:Schedule})
            .populate({
            path: "lecture", populate: [
                {path: 'schedule',model: 'Schedule'},
                {path: 'classroom',model: 'Classroom'},
                {path: 'batch',model: 'Batch'},
                {path: 'subject',model: 'Subject'},
                {path: 'teacher',model:'Teacher'}
            ]
            })
            .then((response)=>{
                
                // const data = response.filter(lecture => lecture.batch.some(batch => batch._id.toString()  === student.batch.toString()))
                // console.log(data)
                return callback(null,response)
            })
            .catch((error)=>{
                return callback({"status_code":500,"error":error.message})
            })
            
        }
        else{
            return callback({"status_code":500,"error":error.message})
        }
    }
    catch(error){
        return callback({"status_code":500,"error":error.message})
    }
}
async function get_session_details(sessionId,callback){
    try{
        const response_obj = {}
        const filter = {_id:sessionId}
        Session.find(filter)
        .populate({
            path: "lecture", populate: [
                {path: 'schedule',model: 'Schedule'},
                {path: 'classroom',model: 'Classroom'},
                {path: 'batch',model: 'Batch'},
                {path: 'subject',model: 'Subject'},
                {path: 'teacher',model:'Teacher'}
            ]
        })
        .then((response)=>{
            if(response.length > 0){
                response_obj["session"] = response[0]
                const filter = {
                    "session":sessionId,
                    "is_present":true
                }
                Attendance.find(filter)
                .then((response)=>{
                    response_obj["attendance"] = response
                    return callback(null,response_obj)
                })
                .catch((error)=>{
                    return callback({"status_code":500,"error":error.message})
                })

                
            }
            else{
                
                return callback({"status_code":500,"error":"Sesion Details Not Found"})
            }
        })
        .catch((error)=>{
            
            return callback({"status_code":500,"error":error.message})
        })
    }
    catch(error){
        return callback({"status_code":500,"error":error.message})
    }
} 
module.exports = { create_timeTable , create_lecture ,get_Timetable_for_teacher , create_lecture_service, get_session_details,get_timetable_for_student}