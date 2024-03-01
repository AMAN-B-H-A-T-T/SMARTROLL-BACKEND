const { create_batch, get_batch } = require("../services/Batches.services");

const create_batch_controller = async(req,res)=>{
    try{
        if(req.userDetails.role === "admin"){
            const model = {
                "division":req.body.division,
                "batch_name":req.body.batch_name,
            }
            create_batch(model,(error,result)=>{
                if(error){
                    return res.status(error.status_code).send({
                        "message":"error",
                        "error":error.error
                    })
                }
                return res.status(200).send({
                    "message":"success",
                    "data":result
                })
            })
        }
        else{
            return res.status(500).send({
                "message":"Error",
                "error":"You Don't Have Permission To Create Batch"
            })
        }
    }
    catch(error){
        return res.status(500).send({
            "message":"error",
            "error":error.message
        })
    }   
}

const get_batch_controller = (req,res)=>{
    try{
        if(req.userDetails.role === "admin"){
            const divisionId  = req.query.divisionId
            console.log(divisionId)
            get_batch(divisionId,(error,result)=>{
                if(error){
                    return res.status(error.status_code).send({
                        "message":"Error",
                        "error":error.error
                    })
                }
                return res.status(200).send({
                    "message":"success",
                    "data":result
                })
            })
        }
        else{
            return res.status(500).send({
                "message":"Error",
                "error":"You Don't Have Permission To Read Batch"
            })
        }
    }
    catch(error){
        return res.status(500).send({
            "message":"error",
            "error":error.message
        })
    }
}
module.exports = {
    create_batch_controller,
    get_batch_controller
}