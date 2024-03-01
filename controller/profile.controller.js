const { create_profile , getProfile , user_login , generate_refresh_token, updateProfile } = require("../services/profile.services");

const create_profile_controller = async(req,res)=>{
    const model = {
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password,
        role:req.body.role
    }
    create_profile(model,req.body.branch,(error,result)=>{
        if (error){
            return res.status(500).send({
                "message" : "error",
                "error":error
            })
        }
         return res.status(200).send({
            "message":"success",
            "data":result
        })
    })
}
const get_profile_controller = async(req,res)=>{
    const profileId = req.query.profileId
    getProfile(profileId,(error,result)=>{
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
const user_login_controller = async(req,res)=>{
    const model = {
        "email":req.body.email,
        "password":req.body.password
    }
    user_login(model,(error,result)=>{
        if(error)
        {
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
const refresh_token_controller = (req,res)=>{
    const model = req.refreshData
    generate_refresh_token(model,(error,result)=>{
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
const updateProfile_controller = (req,res)=>{
    const model = {
        "email":req.body.email,
        "password":req.body.password,
        "enrollment":req.body.enrollment
    }
    updateProfile(model,(error,result)=>{
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
    create_profile_controller,
    get_profile_controller,
    user_login_controller,
    refresh_token_controller,
    updateProfile_controller
}
