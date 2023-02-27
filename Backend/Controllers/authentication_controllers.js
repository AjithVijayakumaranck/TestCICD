const USER = require("../Models/userModel")
const jwt = require("jsonwebtoken")
const { verifyHashedData } = require("../utilities/hashData")



module.exports={

    //login with email
    login: async(req,res)=>{
        try {
            const {data,password}=req.body
            console.log(data,password);
            const userInfo = await USER.findOne({$or:[{email:data},{phoneNumber:data}], $or:[{phoneVerified:true},{emailVerified:true}],googleVerified:false})
            console.log(userInfo,"userdata");
            const verified = await verifyHashedData(password,userInfo.password)
            console.log(verified,"verification sTATUIS");
            if(verified){
                console.log(userInfo,"helll");
                const token =await jwt.sign({...userInfo},process.env.JWT_SECRET_KEY)
                res.status(200).json({token:token,user:userInfo})
            }else{
                res.status(401).json({message:"email or password is wrong"})
            }  
        } catch (error) {
            console.log(error);
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