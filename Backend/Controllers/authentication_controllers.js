const USER = require("../Models/userModel")
const { verifyHashedData } = require("../utilities/hashData")

module.exports={

    //login with email
    loginWithEmail: async(req,res)=>{
        try {
            const {email,passowrd}=req.body
            const userInfo = await USER.findOne({email:email,emailVerified:true,googleVerified:false})
            const verified = await verifyHashedData(password,userInfo.password)
            if(!verified){
                const token =await jwt.sign(userInfo,JWT_SECRET_KEY)
                res.status(200).json({token:token,user:userInfo})
            }else{
                res.status(401).json({message:"email or password is wrong"})
            }  
        } catch (error) {
            res.status(500).json({message:"something went wrong"})
        }

    },

    //login with phonenumber
  loginWithPhone: async(req,res)=>{
    try {
        const {email,passowrd}=req.body
        const userInfo = await USER.findOne({phonenumber:phonenumber,phoneVerified:true,googleVerified:false})
        const verified = await verifyHashedData(password,userInfo.password)
        if(!verified){
            const token =await jwt.sign(userInfo,JWT_SECRET_KEY)
            res.status(200).json({token:token,user:userInfo})
        }else{
            res.status(401).json({message:"phonenumber or password is wrong"})
        }  
    } catch (error) {
        res.status(500).json({message:"something went wrong"})
    }

},
}