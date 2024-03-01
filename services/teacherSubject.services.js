const { Teacher } = require("../models/teacherProfile.model");

async function set_teacher_subject(teacherId,subject_list,callback){
    try{
        const filter = {_id:teacherId}   
    Teacher.updateOne(filter,{$set:{subject_list:subject_list}})
    .then((response)=>{
        return callback(null,response)
    })
    .catch((error)=>{
        return callback({"status_code":404,"error":error.message})
    })
    }
    catch(error){
        return callback({"status_code":500,"error":error.message})
    }   
}
async function get_teacher(teacherId,callback){
    try{
        const filter = {_id:teacherId}
        Teacher.find(filter)
        .populate(subject_list)
        .then((response)=>{
            if(response.length > 0 ){
                return callback(null,response)
            }
            return callback({"status_code":404,"error":"teacher data is not available"})
        })
        .catch((error)=>{
            return callback({"status_code":500,"error":error.message})
        })
    }
    catch(error){
        return callback({"status_code":500,"error":error.message})
    }
}

module.exports = {
    set_teacher_subject,
    get_teacher
}