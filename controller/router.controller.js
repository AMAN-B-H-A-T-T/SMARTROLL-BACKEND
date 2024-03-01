const { create_router_address } = require("../services/router.services")

const create_router_controller = (req,res)=>{
    try{
        if(req.userDetails.role === "admin"){
            const model = {
                "network_addr":req.body.network_addr
            }
            create_router_address(model,(error,result)=>{
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
        else{
            return res.status(500).send({
                "message":"error",
                "error":"You Don't Allow To Add Network Address"
            })    
        }
    }
    catch(error){
        return res.status(500).send({
            "message":"error",
            "error":error.message
        })
    }
}

module.exports = {create_router_controller}