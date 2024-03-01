const { createBranch, get_all_branch_details } = require("../services/branches.services")



const create_branch_Controller = (req,res) =>{
    const model = {
        branch_name : req.body.branch_name,
        branch_code : req.body.branch_code
    } 
    createBranch(model,(error,result)=>{
        if(error){
            return res.status(error.status_code).send({
                "message":"error",
                "error" : error.error
            })
        }
        return res.status(200).send({
            "message":"success",
            "data":result
        })
    })
}
const get_all_branch_details_controller = (req,res)=>{
    const branchId = req.userDetails.branchId
    get_all_branch_details(branchId,(error,result)=>{
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
module.exports = {
    create_branch_Controller,
    get_all_branch_details_controller
}