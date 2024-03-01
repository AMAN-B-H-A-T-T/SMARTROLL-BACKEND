const { createSemester, get_semester_by_term } = require("../services/semester.services");
const moment = require('moment')

const create_semester_controller = (req, res) => {
    try {
        if (req.userDetails.role === "admin") {
            const model = {
                "term": req.body.term,
                "sem_no": req.body.sem_no,
                "status": parseInt(req.body.sem_no) % 2 == 0 ? "even" : "odd"
            }
            createSemester(model, (error, result) => {
                if (error) {
                    res.status(error.status_code).send({
                        "message": "error",
                        "error": error.error
                    })
                }
                res.status(200).send({
                    "message": "success",
                    "data": result
                })
            })
            
        }
        else{
            return res.status(500).send({
                "message":"error",
                "error":"You don't Allow to Create Semester"
            })
        }
        
    }
    catch (error) {
        return res.status(500).send({
            "message": "error",
            "error": error.message
        })
    }


}
const get_semester_by_batches_controller = (req, res) => {
    try {
        if (req.userDetails.role === "admin") {
            const termId = req.query.termId
            get_semester_by_term(termId, (error, result) => {
                if (error) {
                    return res.status(error.status_code).send({
                        "message": "error",
                        "error": error.error
                    })
                }
                return res.status(200).send({
                    "message": "success",
                    "data": result
                })
            })
        }
        else{
            return res.status(500).send({
                "message":"error",
                "error":"You don't Allow to Get Semester"
            })
        }
    }
    catch (error) {
        return res.status(500).send({
            "mesaage": "error",
            "error": error.message
        })
    }

}
module.exports = {
    create_semester_controller,
    get_semester_by_batches_controller
}