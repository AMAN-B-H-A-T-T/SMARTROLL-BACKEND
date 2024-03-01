const { verifyToken } = require("./jwthelper");

const verifyRefreshToken = (req,res,next)=>{
    let token = req.headers['authorization']
    token = token.replace("Bearer ","")
    data = verifyToken(token,process.env.REFRESH_SECRET_KEY)
    if(!data.error){
        req.refreshData = data.data.userId
        next()
    }
    else{
        return res.status(401).send({
            "message":"error",
            "error":data.error
        })
    }
}
module.exports = {verifyRefreshToken}