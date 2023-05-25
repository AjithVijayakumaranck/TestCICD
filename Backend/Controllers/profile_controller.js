const USER = require("../Models/userModel");
const { verifyHashedData, hashData } = require("../utilities/hashData");
const { sendOTP } = require("./otp/otp");
const { sentVerificationOtp } = require("./otp/twilio");
const { verifyEmail } = require("./user_registration");

module.exports = {

    //get profile function
    getProfile: async (req,res)=>{
        try {
            const {userId} = req.params
            const profileDetails = await USER.findOne({_id:userId})
            if(profileDetails){
                 res.status(200).json(profileDetails)
                }else{
                 res.status(400).json({message:"user not found"})
            }
        } catch (error) {
            res.status(500).json({messgae:"something went wrong"})
        }
    },
    

    //profile updateFunction
    updateProfile: async (req,res)=>{
        try {
            const {userDetails} = req.body
            const profileDetails = await USER.findOne({_id:userDetails._id})
            if(!profileDetails){
             res.status(404).json({message:"user not found"})
            }else{
               USER.updateOne({_id:profileDetails._id},{
                $set:{
                    fullname:userDetails.fullname,
                    surname:userDetails.surname,
                    username:userDetails.username,
                    dob:userDetails.dob,
                    address:{
                        locality:userDetails.address.locality,
                        district:userDetails.address.district,
                        state:userDetails.address.state,
                        region:userDetails.address.region,
                    }
                }
               }).then(async(response)=>{
                const updatedDetails = await USER.findOne({_id:userDetails._id})
                if(!updatedDetails){
                    res.status(400).json({message:"error occured after updating"})
                }else{
                    res.status(200).json({  profileDetails:updatedDetails, message:"Successfully updated" })
                }
               }).catch((error)=>{
                res.status(400).json({message:"Error updating"})
               })
            }
        } catch (error) {
            res.status(500).json({messgae:"something went wrong"})
        }
    },
   

    //email update
    updateEmail: async (req,res)=>{
        try {
            const {currentEmail,updatingEmail} = req.body
            const profileDetails = await  USER.findOne({email:currentEmail,googleVerified:false})
            if(!profileDetails){
                res.status(404).json({message:"user not found"})
            }else{
                const createdOTP = await sendOTP({ updatingEmail });
                res.status(200).json({message:"OTP sented "})
            }
        } catch (error) {
            res.status(500).json({messsage:"something went wrong"})
        }
    },
    
    //update email verification
    updateEmailVerification : async (req,res)=>{
      try {
        const {otp,currentEmail,updatingEmail} = req.body
        const profileDetails = await USER.findOne({email:currentEmail,googleVerified:false})
        if(!profileDetails){
           res.status(404).json({message:"user not found"})
        }else{
            const otpInfo = await OTP.findOne({email:updatingEmail});
            if(!otpInfo){
               res.status(400).json({message:"OTP is invalid"})
            }else{
                const verified = await verifyHashedData(otp, otpInfo.otp)
                if(verified){
                   res.status(400).json({message:"invalid OTP"})
                }else{
                  USER.updateOne({_id:profileDetails._id},{
                    $set : {
                        email:updatingEmail
                    }
                  },{upsert:true}).then(()=>{
                    res.status(200).json({message:"email updated successfully"})
                }).catch(()=>{
                    res.status(400).json({message:"email updating failed"})
                  })
                }
            }
            
        }
      } catch (error) {
        res.status(500).json({messsage:"something went wrong"})
      }
    },


    //add or update new phonenumber
    addPhoneNumber : async (req,res)=>{
        try {
            const {phonenumber,userId} = req.body

            const userDetails = await USER.findOne({_id:userid})

            if(!userDetails){
                  res.status(404).json({message:"user not found"})
            }else{
                sentVerificationOtp(phonenumber).then(()=>{
                        res.status(200).json({message:"OTP sented successfully"})
                }).catch(()=>{
                        res.status(400).json({message:"OTP not sented"})
                })
            }

        } catch (error) {
            res.status(500).json({message:"something went wrong"})
        }
    },


    //verfication and updating phonenumber
    addPhoneNumberVerification : async (req,res)=>{
        try {
            const {phoneNumber,otp,userId} = req.body
            verifyPhoneOtp(phoneNumber, otp).then(async() => {
                console.log("otp approved",phonenumber);
                await  USER.updateOne({$and : [{ _id:userId},{googleVerified:false}]},{ phoneNumber:phoneNumber},{upsert:true});
                res.status(200).json({ message: "Phonenumber Updated" });
            }).catch(() => {
                res.status(400).json({ message: "invalid otp" });
            })
        } catch (error) {
            res.status(500).json({message:"something went wrong"})
        }
    },


    //update password
    updatePassword :async (req,res) => {
        try {
            const {currentPassword,newPassword,userId} = req.body 

            const userDetails = await USER.findOne({_id:userId})

            if(!userDetails) {
                    res.status(404).json({message:"User not found"})
            }else{
              const verified = await  verifyHashedData(currentPassword,userDetails.password)
              
              if(!verified){
                        res.status(400).json({message:"Password is incorrect"})
              }else{
                const HashedPassword = hashData(newPassword)
                USER.updateOne({_id:userDetails._id},{password:HashedPassword}).then(()=>{
                        res.status(200).json({messagge:"password updated"})
                    }).catch(()=>{
                        res.status(400).json({messagge:"password not updated"})
                    })
              }
            }
        } catch (error) {
            res.status(500).json({message:"something went wrong"})
        }
    },

    //softdeleting profile
    deleteProfile: async (req,res)=>{
        try {
            const {Id} = req.params
            const userDetails = await USER.findOne({_id:Id})
 
            if(!userDetails){
                    res.status(404).json({message:"user not found"})
            }else{
                    USER.updateOne({_id:Id},{deleted:true}).then(()=>{
                        res.status(200).json({message:"User details"})
                    }).catch(()=>{
                        res.status(400).json({message:"Failed to delete"})
                    })
            }

        } catch (error) {
            res.status(500).json({message:"something went wrong"})
        }
    }
}