const { Semester } = require("../models/semester.model");

async function createSemester(data,callback){
    try{
        const new_sem = new Semester(data)
        new_sem.save()
        .then((response)=>{
            return callback(null,response)
        })
        .catch((error)=>{
            return callback({"status_code":500,"error":error})
        })
    }
    catch(error){
        console.log(error)
    }
}
async function get_semester_by_term(termId,callback){
    try{
        const filter = {term:termId}
        Semester.find(filter)
        .then((response)=>{
            if(response.length != 0){
                return callback(null,response)
            }
            return callback({"status_code":404,"error":"data not found"})
        })
        .catch((error)=>{
            return callback({"status_code":500,error})    
        })
    }
    catch(error){
        return callback({"status_code":500,"error":error.message})
    }
}
module.exports = {
    createSemester,
    get_semester_by_term
}