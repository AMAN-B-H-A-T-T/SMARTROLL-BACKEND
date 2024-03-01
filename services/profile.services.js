const bcrypt = require('bcrypt')
const {Profile} = require('../models/profile.model')
const {Admin} = require('../models/adminProfile.model')
const { Teacher } = require('../models/teacherProfile.model')
const { generateAccessToken , generateRefreshToken , verifyToken } = require('../utils/jwthelper')
const { Student } = require('../models/student.model')

const saltRound = 10

async function create_profile(data,brachId,callback){
    const salt = bcrypt.genSaltSync(saltRound)
    const hashedPassword = bcrypt.hashSync(data.password,salt)
    data.password = hashedPassword
    const new_profile = new Profile(data)
    new_profile.save()
    .then((response)=>{
        if(data.role === "admin"){
            const admin_model = {
                "profile":response._id,
                "branch":brachId
            }

            const new_admin = new Admin(admin_model)
            new_admin.save()
            .then((response)=>{
                return callback(null,response)
            })
            .catch((error)=>{
                return callback(error)
            })
        }
        if(data.role === "teacher")
        {
            const teacher_profile = {
                "profile":response._id,
                "branch": brachId
            }
            const new_teacher = new Teacher(teacher_profile)
            new_teacher.save()
            .then((response)=>{
                return callback(null,response)
            })
            .catch((error)=>{
                return callback(error)
            })
        }
    })
    .catch((error)=>{
        return callback(error)
    })
}

async function getProfile(profileID,callback){
    const filter = {_id : profileID}
    Profile.find(filter)
    .then((response)=>{
        if(response.length === 0){
            return callback({"status_code":"404","error":"profile is not exist"})
        }
        else{
            const role_filter = {"profile": response[0]._id}
            if(response[0].role === "admin")
            {
                Admin.find(role_filter)
                .populate(["profile","branch"])
                .then((response)=>{
                    if(response.length > 0){
                        return callback(null,response[0])
                    }
                    else{
                        return callback({"status_code":"404","error":"profile is not exist"})
                    }
                })
                .catch((error)=>{
                    return callback({"status_code":"500","error":error})
                })
            }
            else if(response[0].role === "teacher")
            {
                Teacher.find(role_filter)
                .populate(["profile","branch"])
                .then((response)=>{
                    if(response.length > 0){
                        return callback(null,response[0])
                    }
                    else{
                        return callback({"status_code":"404","error":"profile is not exist"})
                    }
                })
                .catch((error)=>{
                    return callback({"status_code":"500","error":error})
                })
            }
            else if(response[0].role === "student"){

            }
        }
    })
    .catch((error)=>{
        return callback({"status_code":"500","error":error})
    })
}

async function user_login(data,callback){
    
    const filter = {"email":data.email}
    Profile.find(filter)
    .then((response)=>{
        if(response.length > 0 ){
            const password = response[0].password
            
            if(bcrypt.compareSync(data.password,password)){
                
                const role_filter = {profile:response[0]._id.toString()}
                console.log(role_filter)
                if(response[0].role === "admin"){
                    Admin.find(role_filter)
                    .populate(['profile','branch'])
                    .then((response)=>{
                        console.log(response)
                        const user = {
                            userId: response[0]._id.toString(),
                            profileId:response[0].profile._id.toString(),
                            name:response[0].profile.name,
                            email:response[0].profile.email,
                            branchId:response[0].branch._id.toString(),
                            branch:response[0].branch.branch_name,
                            role:response[0].profile.role
                        }
                        console.log(user)
                        const accessToken = generateAccessToken(user)
                        const refreshToken = generateRefreshToken(user)
                        return callback(null,{accessToken,refreshToken})
                    })
                    .catch((error)=>{
                        console.log(error.message)
                        return callback({"status_code":401,"error":"email and password are not match"})            
                    })
                }   
                else if(response[0].role === "teacher")
                {
                    Teacher.find(role_filter)
                    .populate(['profile','branch'])
                    .then((response)=>{
                        const user = {
                            userId: response[0]._id.toString(),
                            profileId:response[0].profile._id.toString(),
                            name:response[0].profile.name,
                            email:response[0].profile.email,
                            branchId:response[0].branch._id.toString(),
                            branch:response[0].branch.branch_name,
                            role:response[0].profile.role
                        }
                        const accessToken = generateAccessToken(user)
                        const refreshToken = generateRefreshToken(user)
                        return callback(null,{accessToken,refreshToken})
                    })
                    .catch((error)=>{
                        return callback({"status_code":401,"error":"email and password are not match"})            
                    })
                }
                else if(response[0].role === "student"){
                    Student.find(role_filter)
                    .populate(['profile','branch'])
                    .then((response)=>{
                        const user = {
                            userId: response[0]._id.toString(),
                            profileId:response[0].profile._id.toString(),
                            name:response[0].profile.name,
                            email:response[0].profile.email,
                            branchId:response[0].branch._id.toString(),
                            branch:response[0].branch.branch_name,
                            role:response[0].profile.role
                        }
                        const accessToken = generateAccessToken(user)
                        const refreshToken = generateRefreshToken(user)
                        return callback(null,{accessToken,refreshToken})
                    })
                    .catch((error)=>{
                        console.log(error.message)
                        return callback({"status_code":401,"error":"email and password are not match"})            
                    })
                }
            }
            else{
                console.log(error.message)
                return callback({"status_code":401,"error":"email and password are not match 1"})    
            }
        }
        else{
            return callback({"status_code":401,"error":"email and password are not match"})    
        }
    })
    .catch((error)=>{
        return callback({"status_code":401,"error":error})
    })
}

async function generate_refresh_token(data,callback){
    try{
        const accessToken = generateAccessToken(data)
        const refreshToken = generateRefreshToken(data)
        return callback(null,{accessToken,refreshToken})
    }
    catch(error){
        return callback({"status_code":500,"error":error})
    }

}
async function updateProfile(model,callback){
    try{
        Student.find({"enrollment":model.enrollment})
        .then((response)=>{
            if(response.length > 0){
                const profileId = response[0].profile.toString()
                const salt = bcrypt.genSaltSync(saltRound)
                model.password = bcrypt.hashSync(model.password,salt)
                console.log(profileId)
                Profile.updateOne( {_id : profileId},{$set:{"email":model.email,"password":model.password}})
                .then((response)=>{
                    return callback(null,response)
                })
                .catch((error)=>{
                    return callback({"status_code":404,error:error.message})    
                })
            }
            else{
                return callback({"status_code":404,error:"Student Dons't Found"})
            }
        })
        .catch((error)=>{
            return callback({"status_code":500,error:error.message})
        })
    }
    catch(error){
        return callback({"status_code":500,error:error.message})
    }
}
module.exports = {
    create_profile,
    getProfile,
    user_login,
    generate_refresh_token,
    updateProfile
}