const { Division } = require("../models/divisions.model");

async function create_division(model,callback){
    try{
        const division = new Division(model)
        division.save()
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
async function get_division(semesterId,callback){
    try{
        const filter = {"semester":semesterId}
        Division.find(filter)
        .then((response)=>{
            if(response.length > 0){
                return callback(null,response)
            }
            else{
                return callback({"status_code":404,"error":"Data Not Found"})
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

module.exports = {
    create_division,
    get_division
}