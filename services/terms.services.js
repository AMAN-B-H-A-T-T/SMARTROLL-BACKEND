const { Terms } = require("../models/terms.model");

async function create_term (model,callback){
    try{
        const term_data = new Terms(model)
        term_data.save()
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

async function get_term(branch_id,callback){
    const filter = {"branch":branch_id}
    Terms.find(filter)
    .then((response)=>{
        if(response.length > 0){
            return callback(null,response)
        }
        else{
            return callback({"status_code":404,"error":"Terms Not Found"})
        }
    })
    .catch((error)=>{
        return callback({"status_code":500,"error":error.message})
    })
}

module.exports = {
    create_term,
    get_term
}