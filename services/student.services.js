const dfd = require("danfojs-node");
const { Batch } = require("../models/batch.mode")
const { read } = require("xlsx");
const { Profile } = require("../models/profile.model");
const { Student } = require("../models/student.model");
const { response } = require("express");

function isNumeric(str) {
    // Use parseFloat or parseInt to attempt parsing the string to a number
    // If the result is NaN, it means the string is not a valid number
    return !isNaN(parseFloat(str)) && !isNaN(str - 0);
}
async function read_excel_file(fileName) {
    const df = await dfd.readExcel(`public/files/${fileName}`)
    const values = df.values;
    let current_batch = ""
    let student_list = []
    for (let i = 0; i < values.length; i++) {
        let obj = {}
        if (i > 1) {
            if (isNumeric(df.values[i][1])) {
                obj["SR"] = df.values[i][0]
                obj["batch"] = current_batch
                obj["enrollment"] = df.values[i][1]
                obj["name"] = df.values[i][2]
                obj["gender"] = df.values[i][3]

            }
            else {
                current_batch = df.values[i][1]
                obj["SR"] = df.values[i][0]
                obj["batch"] = current_batch
                obj["enrollment"] = df.values[i][2]
                obj["name"] = df.values[i][3]
                obj["gender"] = df.values[i][4]
            }
            student_list.push(obj)
        }
    }
    const final_student_list = student_list.filter(item => item.name != null)

    return final_student_list
}


async function register_student(divisionId, fileName, branchId, callback) {
    try {

        const batch = await Batch.find({ division: divisionId })
        const batch_list = {}
        batch.map((item, index) => {
            batch_list[item.batch_name] = item._id.toString()
        })
        const student_list = await read_excel_file(fileName)
        student_list.map((student, index) => {
            let model = {
                "name": student.name,
                "role": "student"
            }
            const new_profile = new Profile(model)
            new_profile.save()
                .then((response) => {
                    console.log(response)
                    let student_model = {
                        "profile":response._id,
                        "enrollment":student.enrollment,
                        "batch":batch_list[student["batch"]],
                        "branch": branchId,
                    }
                    const stud_obj = new Student(student_model)
                    stud_obj.save()
                    .then((response)=>{
                        console.log(response)
                    })
                    .catch((error)=>{
                        console.log(error)
                        return callback({ "status_code": 500, "error": error.message })    
                    })
                })
                .catch((error) => {
                    console.log(error)
                    return callback({ "status_code": 500, "error": error.message })
                })
        })
        return callback(null, `${student_list.length} Register SuccessFully`)
    }
    catch (error) {
        return callback({ "status_code": 500, "error": error.message })
    }







}
module.exports = {
    register_student
}