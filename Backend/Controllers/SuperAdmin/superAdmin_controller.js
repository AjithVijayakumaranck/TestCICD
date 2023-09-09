const OTP = require("../../Models/otp")
const SUPERADMIN = require("../../Models/superadminProfileModel")
const { verifyHashedData, hashData } = require("../../utilities/hashData")
const jwt = require('jsonwebtoken')
const { sendOTP } = require("../otp/otp")
const USER = require("../../Models/userModel")

module.exports = {
    // superAdminLogin : async (req,res)=>{
    //     try {
    //         const {userId,password} = req.body
    //         const superAdminDetails =await SUPERADMIN.findOne({email:userId, deleted:false})
    //         if(!superAdminDetails){
    //             res.status(404).json({message:"User not found"})
    //         }else{
    //             const verified = await verifyHashedData(password,superAdminDetails.password)
    //             if(!verified){
    //                 res.status(401).json({message:"UserId or Password is wrong"})
    //             }else{
    //                 const token = await jwt.sign({ ...superAdminDetails }, process.env.JWT_SECRET_KEY)
    //                 res.status(200).json({superAdminDetails,message:"Welcome Administrator",token})
    //             }
    //         }
    //     } catch (error) {
    //         res.status(500).json({message:"Something went wrong"})
    //     }
    // },

    // forgotPassword:async (req,res)=>{
    //     try {
    //         const {email} = req.body
    //         const adminInfo = await SUPERADMIN.findOne({ email: email })
    //         if (adminInfo) {
    //             const createdOTP = await sendOTP({ email });
    //             console.log(createdOTP);
    //             res.status(200).json({ message: "otp Sented", adminInfo: adminInfo })
    //         } else {
    //             res.status(400).json({ message: "User not found" })
    //         }
    //     } catch (error) {
    //         res.status(500).json({message:"Something went wrong"})
    //     }
    // },

     
    verifyOtp: async (req, res) => {

        try {
            const { otp, email } = req.body
            console.log(req.body);
            const otpInfo = await OTP.findOne({ email: email })
            if (otpInfo) {
                const verified = await verifyHashedData(otp, otpInfo.otp)
                if (verified) {
                    OTP.deleteOne({email:email}).then(()=>{
                        res.status(200).json({ message: "otp verified" })
                    }).catch(()=>{
                        res.status(500).json({ message: "something wrong" })
                    })
                } else {
                    res.status(400).json({ message: "Invalid otp" })
                }
            } else {
                res.status(400).json({ message: "otp not found" })
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).son({ message: "Something went wrong" })
        }
    },

    resetPassword: async (req,res)=>{
        try {
            const { data, password } = req.body
            const hashedPassword = await hashData(password);
            const adminInfo = await USER.findOne({email:data})
            if (adminInfo) {
                USER.updateOne({email:data}, { password: hashedPassword }).then((response) => {
                    console.log("password Updated");
                    res.status(200).json({ message: "passwords updated successfully" })
                }).catch((error) => {
                    console.log("Update error");
                    res.status(400).json({ message: "update password failed" })
                })
            } else {
                console.log("admin not found");
                res.status(404).json({ message: "user not found" })
            }
        } catch (error) {
            console.log("userUpdate error update");
            console.log(error);
            res.status(500).json({ message: "something went wrong" })
        }
    },

    createAdmin: async (req,res)=>{
        try {
            const {fullName,surName,email,password,locality,district,state,region,role} = req.body
            console.log(req.body);
            const hashedPassword = await hashData(password)
            USER.create({
                fullname:fullName,
                surname:surName,
                email:email,
                role:role,
                password:hashedPassword,
                address:{
                  locality:locality,
                  district:district,
                  state:state,
                  region:region
                },
            }).then((response)=>{
                res.status(200).json({message:"Admin add successfully"})
            }).catch((err)=>{
                console.log(err,"error");
                res.status(500).json({err,message:"something went wrong"})
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error,message: "something went wrong"})
        }
    },

    upgradeRole : async (req,res)=>{
        try {
            const{superAdminId,password,adminId,role} = req.body
            const superAdminDetails = await USER.findById(superAdminId)
            if(!superAdminDetails || superAdminDetails.role === "admin"){
                res.status(404).json({message:"verification failed"})
            }else{
                const verified = await verifyHashedData(password,superAdminDetails.password)
                if(!verified){
                    res.status(401).json({message:"verification failed"})
                }else{
                    USER.updateOne({_id:adminId},{role:role , roleupgradeBy: superAdminId}).then(()=>{
                        res.status(200).json({message:"role updated successfully"})
                    }).catch((err)=>{
                        console.log(err,"error");
                        res.status(500).json({err,message:"something went wrong"})
                    })
                }
            }
        } catch (error) {
            res.status(500).json({message:"something went wrong"})   
        }
    },

    getAdmin :async (req,res)=>{
        try {
            const adminDetails = await USER.find({deleted:false ,role:"admin"})
            if(adminDetails){
                res.status(200).json(adminDetails);
            }else{
                res.status(404).json({message:"admins not found"})
            }
        } catch (error) {
            res.status(500).json({message:"something went wrong"})
        }
    },

    getSuperAdmin :async (req,res)=>{
        try {
            const superAdminDetails = await USER.find({deleted:false ,role:"superadmin"})
            if(superAdminDetails){
                res.status(200).json(superAdminDetails);
            }else{
                res.status(404).json({message:"admins not found"})
            }
        } catch (error) {
            res.status(500).json({message:"something went wrong"})
        }
    },

    updateProfile : async (req,res)=>{
        try {
            const {profileId , fullname ,surname , username ,email, dob ,locality,district,state,region } = req.body
            const superAdminDetails = await USER.findById(profileId)
            if(!superAdminDetails){
                res.status(404).json({message:"profile not found"})
            }else{
                USER.updateOne({_id:profileId},{
                   $set:{
                    fullname:fullname,
                    surname:surname,
                    username:username,
                    email:email,
                    dob:dob,
                    address:{
                        locality:locality,
                        district:district,
                        state:state,
                        region:region
                    }
                   }
                },{
                    new:true
                }).then(()=>{
                    res.status(200).json({message:"profile updated successfully"})
                }).catch((err)=>{
                    console.log(err,"error");
                    res.status(500).json({err,message:"something went wrong"})
                })
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message:"something went wrong"})
        }
    },

    getProfile:(req,res)=>{
        try {
            const {adminId} = req.query
            USER.findById(adminId).then((adminDetails)=>{
                res.status(200).json(adminDetails)
            }).catch((error)=>{
                res.status(400).json(error.message)
            })
        } catch (error) {
            res.status(500).json({message:"something went wrong"})
        }
    },

    updatePassword: async (req,res)=>{
      try {
        const {profileId,currentPassword,newPassword} = req.body
        const profileDetails = await USER.findById(profileId)
        if(!profileDetails){
            res.status(404).json({message:"profile not found"})
        }else{
            const verified =await verifyHashedData(currentPassword,profileDetails.password)
            if(verified){
                hashedPassword =await hashData(newPassword)
                USER.updateOne({_id:profileId},{
                    password:hashedPassword
                }).then((response)=>{
                    if(response.matchedCount == 0){
                        res.status(400).json({message:"password updated failed"})
                    }else{
                        res.status(200).json({message:"password updated"})
                    }
                }).catch((error)=>{
                    res.status(500).json({message:error.message})
                }) 
            }else{
                res.status(401).json({message:"current password is incorrect"})
            }
        }
      } catch (error) {
        res.status(500).json({message:error.message})
      }
    },

    uniqueUserName :async (req,res)=>{
        try {
            const {userName} = req.query
            const usernameExist = await USER.findOne({username:/^userName$/i})
            if(usernameExist){
                res.status(200).json(false)
            }else{
                res.status(200).json(true)
            }
        } catch (error) {
            res.status(500).json({message:"something went wrong"})
        }
    }
}