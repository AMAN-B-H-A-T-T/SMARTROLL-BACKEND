const { Attendance } = require("../models/attendance.model")
const { Session } = require("../models/session.model")
const { Student } = require("../models/student.model")

async function mark_student_attendace(profileId,sessionId,userIp,callback){
    try{

        Session.find({_id:sessionId})
        .populate({
            path: "lecture", populate: [
                {path: 'classroom',
                    populate:{
                        path:'router',
                        model:'Router'
                    }
                },
                {path: 'batch',model: 'Batch'},
            ]
        })
        .then((response)=>{
            // const network_address = response[0].lecture.classroom.router.network_addr.split(".")
            // const network_bit = response[0].lecture.classroom.router.network_bits / 8
            // for(i=0;i<network_bit;i++){
            //     if(userIp[i] != network_address[i]){
            //         console.log(userIp[i])
            //         console.log(network_address[i])
            //         return callback({"status_code":500,"error":"Ip Not Match"})
            //     }
            // }
            const filter = {
                "session":sessionId,
                "student":profileId
            }
            Attendance.find(filter)
            .then((response)=>{
                if(!response[0].is_present){
                    Attendance.updateOne(filter,{$set:{"is_present":true,"marking_ip":userIp.join("."),"marking_time":new Date()}},{ returnDocument: 'after' })
                    .then(async(response)=>{
                           if(response.modifiedCount == 1){
                            const response_obj = {}
                            const attendance = await Attendance.find(filter)
                            response_obj["attendance"] = attendance[0]
                            const student_details = await Student.find({profile:profileId}).populate("profile")
                            response_obj["student"] = student_details[0]
                            return callback(null,response_obj)
                           }
                    })
                    .catch((error)=>{
                        return callback({"status_code":500,"error":error.message})
                    })
                }
                else{
                    return callback({"status_code":500,error:"Your attendace has beeb already Marked"})
                }
            })
            
            
        })
        .catch((error)=>{
            return callback({"status_code":500,"error":error.message})
        })

    }
    catch(error){
        return callback({"status_code":500,"error":error.message})
    }
}
module.exports = {mark_student_attendace}