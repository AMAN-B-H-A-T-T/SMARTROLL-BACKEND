const { response } = require("express");
const { Subject } = require("../models/subject.model");

async function create_subject(data,callback){
    try{
        const filter = {code:data.code}
        Subject.find(filter)
        .then((response)=>{
            if(response.length == 0){
                const new_subject = new Subject(data)
                new_subject.save()
                .then((response)=>{
                    return callback(null,response)
                })
                .catch((error)=>{
                    console.log(error)
                    return callback({'status_code':500,'error':error.message})
                })
            }
            else{
                return callback({'status_code':409,'error':`subject with ${data.code} is already exist`})
            }
        })
        .catch((error)=>{
            return callback({'status_code':500,'error':error.message})
        })
    }
    catch(error){
        console.log(error,"catch")
        return callback({'status_code':500,'error':error.message})
    }
}
async function get_subject_by_semester(semesterId,callback){
    const filter = {semester:semesterId}
    Subject.find(filter)
    .then((response)=>{
        if(response.length != 0){
            return callback(null,response)
        }
        else{
            return callback({"status_code":404,'error':"Data Not Found"})
        }
    })
    .catch((error)=>{
            console.log(error.message)
            return callback({"status_code":500,"error":error.message})
    })
}
module.exports  = {
     create_subject,
     get_subject_by_semester
}