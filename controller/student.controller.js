const { register_student } = require("../services/student.services")

const register_student_controller = (req,res)=>{
    const branchId = req.userDetails.branchId
    const divisionId = req.body.divisionId
    const fileName = req.file.originalname
    register_student(divisionId,fileName,branchId,(error,result)=>{
        if(error){
            // return res.status(error.status_code).send({
            // "message":"error",
            // "error":error.error
            // })
        }
        return res.status(200).send({
            "message":"success",
            "data":result
        })
    })
}

module.exports = {register_student_controller}