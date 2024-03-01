const { create_term , get_term } = require("../services/terms.services");

const create_term_controller = async(req,res)=>{
    try{
        if (req.userDetails.role === "admin"){
            const branch = req.userDetails.branchId
            
            
    const model = {
        "branch":branch,
        "activation" : parseInt(req.body.start_year) - new Date().getFullYear()   == 0 ? true : false,
        "start_year" : req.body.start_year,
        "end_year":req.body.end_year
    }
    create_term(model,(error,result)=>{
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
            "message":"Error",
            "error":error.message
        })
    }
    
}

const get_term_controller = (req,res)=>{
    try{
        if(req.userDetails.role === "admin"){
            const branch_id = req.userDetails.branchId
            get_term(branch_id,(error,result)=>{
                if(error)
                {
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
    }
    catch(error){
        return res.status(500).send({
            "message":"error",
            "error":error.message
        })
    }
    
}

module.exports = {
    create_term_controller,
    get_term_controller
}