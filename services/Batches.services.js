const { Batch } = require("../models/batch.mode")


async function create_batch(data,callback){
      try{
        const new_batch = new Batch(data)
        new_batch.save()
        .then((response)=>{
            return callback(null,response)
        })
        .catch((error)=>{
            return callback({"status_code":500,"error":error})
        })
      }
      catch(error){
        return callback({"status_code":500,"error":error.message})
      }
}   
async function get_batch(divisionId,callback){
    try{
        const filter = {"division":divisionId}
        Batch.find(filter)
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
    create_batch,
    get_batch
}