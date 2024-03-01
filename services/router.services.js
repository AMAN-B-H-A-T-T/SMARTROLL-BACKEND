const { response } = require("express")
const { Router } = require("../models/router.model")

async function create_router_address(model,callback){
    try{
        const router = new Router(model)
        router.save()
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

module.exports = {
    create_router_address
}