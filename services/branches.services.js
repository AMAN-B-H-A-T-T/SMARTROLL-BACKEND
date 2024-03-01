const { Terms } = require("../models/terms.model")
const {Branch}  = require("../models/branch.model")
const { Semester } = require("../models/semester.model")

async function createBranch(model,callback){
   try{
       const new_branch = new Branch(model)
       new_branch.save()
       .then((response)=>{
           callback(null,response)
       })
       .catch((error)=>{
           callback(error)
       })
   }
   catch(error){
    return callback({"status_code":500,"error":error.message})
   }

}
async function get_all_branch_details(branchId,callback){
    try{
        const filter = {_id:branchId}
        let final_response = {}
        const branch = await Branch.find(filter)
        if(branch.length != 0 ){
            final_response.bracnchDetails = branch[0]
            const filter = {branch:branchId}
            const batch = await Terms.find(filter)
            if(batch.length != 0){
                
                final_response.bracnchDetails['hello']="hello"
                console.log(final_response.bracnchDetails)
                final_response.BatchDetails = batch
            }
            else{
                return callback({"status_code":404,"error":"Branch is not found"})    
            }
            return callback(null,final_response)
        }
        else{
            return callback({"status_code":404,"error":"Branch is not found"})
        }

    }
    catch(error){
        
        return callback({"status_code":500,"error":error.message})
    }
}
module.exports = {
    createBranch,
    get_all_branch_details
}