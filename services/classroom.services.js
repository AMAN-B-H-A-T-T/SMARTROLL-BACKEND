const { Classroom } = require("../models/classroom.model")

async function create_classroom(model,callback){
    try{
        const classroom = Classroom(model)
        classroom.save()
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

module.exports = {create_classroom}