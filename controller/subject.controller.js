const { create_subject, get_subject_by_semester } = require("../services/subject.services");

const create_subject_controller = async (req,res)=>{
    console.log(req.body)
    const model = {
        semester:req.body.semester,
        code:req.body.code,
        credit:req.body.credit,
        subject_name:req.body.subject_name
    }
    create_subject(model,(error,result)=>{
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
const get_subject_by_semester_controller = (req,res)=>{
    const semesterId = req.query.semesterId
    get_subject_by_semester(semesterId,(error,result)=>{
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
    create_subject_controller,
    get_subject_by_semester_controller
}