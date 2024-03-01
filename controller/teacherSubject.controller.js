const { set_teacher_subject , get_teacher } = require("../services/teacherSubject.services");

const set_teacher_subject_controller = (req,res)=>{
    const teacherId = req.query.teacherId
    const subjectList = req.body.subject_list
    set_teacher_subject(teacherId,subjectList,(error,result)=>{
        if(error){
            return res.status(error.status_code).message({
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
const get_teacher_contrroller  = (req,res)=>{
    const teacherId = req.query.teacherId
    get_teacher(teacherId,(error,result)=>{
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
    set_teacher_subject_controller,
    get_teacher_contrroller
}