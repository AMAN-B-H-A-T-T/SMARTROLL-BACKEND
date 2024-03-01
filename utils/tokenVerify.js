const { verifyToken } = require("./jwthelper")

const token_verify = (req,res,next)=>{
    let token = req.headers['authorization']
    token = token.replace("Bearer ","")
    const data = verifyToken(token,process.env.SECRET_KEY)
    if(!data.error){
        req.userDetails = data.data.userId
        next()
    }
    else{
        return res.status(401).send({
            "message":"error",
            "error":data.error
        })
    }
}

module.exports = {
    token_verify
}