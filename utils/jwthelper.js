const jwttoken = require('jsonwebtoken')
require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY


const generateAccessToken = (userId)=>{
    try{
        const token =  jwttoken.sign({userId},SECRET_KEY,{expiresIn:'1d'})
        return token
    }
    catch(error){
        console.log(error)
    }
}
const generateRefreshToken = (userID)=>{
    try{
        const token =  jwttoken.sign({userID},REFRESH_SECRET_KEY,{expiresIn:'2d'})
        return token
    }
    catch(error){
        console.log(error)
    }
    
}
const verifyToken = (token,secret)=>{
    try{
        const decode =  jwttoken.verify(token,secret)
        return {"error":false,"data":decode}
    }
    catch(error){
        return {"error":true,"error":error}
    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken
}