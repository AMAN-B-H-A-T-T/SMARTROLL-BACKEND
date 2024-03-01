const { create_classroom } = require("../services/classroom.services")

const create_classroom_controller = (req,res)=>{
    try{
        if(req.userDetails.role === "admin")
        {
            const model = {
                "branch":req.userDetails.branchId,
                "router":req.body.router,
                "class_name":req.body.class_name
            }
            create_classroom(model,(error,result)=>{
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
    }
    catch(error){
        return res.status(500).send({
            "message":"eror",
            "error":error.message
        })
    }
}

module.exports = {create_classroom_controller}