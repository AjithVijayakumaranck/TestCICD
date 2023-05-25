const SUPERADMIN = require("../../Models/superadminProfileModel")
const { verifyHashedData } = require("../../utilities/hashData")

module.exports = {
    superAdminLogin : async (req,res)=>{
        try {
            const {userId,password} = req.body
            const superAdminDetails = SUPERADMIN.findOne({userId:userId})
            if(!superAdminDetails){
                res.status(404).json({message:"User not found"})
            }else{
                const verified = await verifyHashedData(password,superAdminDetails.password)
                if(!verified){
                    res.status(401).json({message:"UserId or Password is wrong"})
                }else{
                    res.status(200).json({superAdminDetails,message:"Welcome Administrator"})
                }
            }
        } catch (error) {
            res.status(500).json({message:"Something went wrong"})
        }
    }
}