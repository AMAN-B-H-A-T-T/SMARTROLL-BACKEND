const { create_division , get_division } = require("../services/division.services");

const create_division_controller = (req,res)=>{
    try{
        if(req.userDetails.role === "admin"){
            const model = {
                "semester":req.body.semester,
                "division_name": req.body.division_name
            }
            create_division(model,(error,result)=>{
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
                "message":"error",
                "error":"Yoy Don't Have Permission To Create Division"
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

const get_division_controller = (req,res)=>{
    try{
        if(req.userDetails.role === "admin"){
            const semesterId = req.query.semesterId
            get_division(semesterId,(error,result)=>{
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
                "message":"error",
                "error":"Yoy Don't Have Permission To Create Division"
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
    get_division_controller,
    create_division_controller
}