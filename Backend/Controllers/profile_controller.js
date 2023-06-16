const OTP = require("../Models/otp");
const USER = require("../Models/userModel");
const { cloudUpload } = require("../utilities/cloudinary");
const { verifyHashedData, hashData } = require("../utilities/hashData");
const { sendOTP } = require("./otp/otp");
const { sentVerificationOtp, verifyPhoneOtp } = require("./otp/twilio");
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
    updateProfile: async (req, res) => {
        try {
            const { userData } = req.body
            console.log(userData,"update profile userdetails");
            const userDetails = JSON.parse(userData);
            const profileDetails = await USER.findOne({ _id: userDetails._id })
            if (!profileDetails) {
                res.status(404).json({ message: "user not found" })
            } else {
                const File = req.file.path
                cloudUpload(File, "Profiles").then((result) => {
                    console.log(result.compressedUrl, "hello");
                    USER.updateOne({ _id: profileDetails._id }, {
                        $set: {
                            fullname: userDetails.fullname,
                            surname: userDetails.surname,
                            username: userDetails.username,
                            dob: userDetails.dob,
                            address: {
                                locality: userDetails.address.locality,
                                district: userDetails.address.district,
                                state: userDetails.address.state,
                                region: userDetails.address.region,
                            },
                            profilePicture: result,
                        }
                    }).then(async (response) => {
                        const updatedDetails = await USER.findOne({ _id: userDetails._id })
                        console.log(updatedDetails,"updated details");
                        if (!updatedDetails) {
                            res.status(400).json({ message: "error occured after updating" })
                        } else {
                            res.status(200).json({ profileDetails: updatedDetails, message: "Successfully updated" })
                        }
                    }).catch((error) => {
                        console.log(error);
                        res.status(400).json({ message: "Error updating" })
                    })
                })

            }
        } catch (error) {
            console.log(error, "errorrrr");
            res.status(500).json({ messgae: "something went wrong" })
        }
    },
   

    //email update
    updateEmail: async (req,res)=>{
        try {
            const {userId,currentEmail,updatingEmail} = req.body
            const profileDetails = await  USER.findOne({_id:userId,googleVerified:false})
            // const profileDetails = await  USER.findOne({_id:userId})
            if(!profileDetails ){
                res.status(404).json({message:"user not found"})
            }else{
                const emailUsed = await USER.findOne({email:updatingEmail,googleVerified:false})
                if(emailUsed){
                    res.status(500).json({message:"Email already used"})
                }else{
                    const createdOTP = await sendOTP(updatingEmail);
                    res.status(200).json({message:"OTP sented "})
                }
            }
        } catch (error) {
            res.status(500).json({messsage:"something went wrong"})
        }
    },
    
    //update email verification
    updateEmailVerification : async (req,res)=>{
      try {
        const {otp ,updatingEmail,userId} = req.body
        const profileDetails = await USER.findOne({_id:userId,googleVerified:false})
        if(!profileDetails){
           res.status(404).json({message:"user not found"})
        }else{
            const otpInfo = await OTP.findOne({email:updatingEmail});
            if(!otpInfo){
               res.status(400).json({message:"OTP is invalid"})
            }else{
                const verified = await verifyHashedData(otp, otpInfo.otp)
                if(!verified){
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
                const HashedPassword =await hashData(newPassword)
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
    },
    
    getAllProfiles :async (req,res)=>{
        try {
             const allProfiles = await USER.find({deleted:false})
             if(!allProfiles){
                 console.log(err);
                 res.status(404).json({message:""})
                }else{
                    res.status(200).json(allProfiles)
                }
        } catch (error) {
            res.status(500).json({message:"something went Wrong"})
        }
    },


    //rating function
    profileRating: async (req,res)=>{
        try {
            console.log("Iam here");
            const {userId = "646ca82602c3b676a3224f24",ratingId ="6481c467a5d1d3f751d79175",star ="5",comment = "Hello not bad"} = req.body
            const userDetails =await USER.findOne({_id:userId})

            if(!userDetails){  
                console.log("responseee");   
                res.status(404).json({message:"user Not found"})
            }else{
                console.log("ressss",userDetails);

                let alreadyRated = await userDetails.ratings.find(
                    (userId) => userId.postedby.toString() === _id.toString()
                  )

                  if(alreadyRated){
                     console.log("already rated");
                      const updateRating = await USER.updateOne(
                          {
                            ratings: { $elemMatch: alreadyRated },
                          },
                          {
                            $set: { "ratings.$.star": star, "ratings.$.comment": comment },
                          },
                          {
                            new: true,
                          }
                        );
                  }else{
                    console.log("not rated rated");
                    const rateProfile = await USER.findByIdAndUpdate(
                        userId,
                        {
                          $push: {
                            ratings: {
                              star: star,
                              comment: comment,
                              postedby: ratingId,
                            },
                          },
                        },
                        {
                          new: true,
                        }
                      );
                  }
                
            }
            const getallratings = await USER.findById(prodId);
            let totalRating = getallratings.ratings.length;
            let ratingsum = getallratings.ratings
              .map((item) => item.star)
              .reduce((prev, curr) => prev + curr, 0);
            let actualRating = Math.round(ratingsum / totalRating);
            USER.findByIdAndUpdate(
              prodId,
              {
                totalrating: actualRating,
              },
              { new: true }
            ).then((response)=>{
                console.log(response,"hello response");
                res.status(200).json(finalUser);
            }).catch((err)=>{
                res.status(400).json(err)
            })
        } catch (error) {
            res.status(400).json(error)
        }
    },
    
    //reply rating
    ratingReplay :async (req,res)=>{
        try {
            const {reviewerId="646ca82602c3b676a3224f24",senderId = "6481c467a5d1d3f751d79175",reply="hekllo buuddd"} = req.body
            const userProfile =await USER.findById(reviewerId)
            if(!userProfile){
                
                    res.status(404).json({message:"review not found"})

            }else{   

                let ratedReview  = await userProfile.ratings.find(
                    (eachRating) => eachRating.postedby.toString() === senderId.toString()
                  )

                  console.log(ratedReview,"fff");

                if(!ratedReview){
                    res.status(404).json({message:"review not found"})
                }else{
                    const replyData = {
                        content: reply,
                        repliedBy: senderId // Replace with the actual user ID
                      };
                    const updateRating = await USER.updateOne(
                        {
                          ratings: { $elemMatch: ratedReview },
                        },
                        {
                          $push: { 
                            "ratings.$.reply": replyData,
                        },
                        },
                        {
                          new: true,
                        }
                      );

                      res.status(200).json({message:"replied successfully",updateRating})
                }
                
            }
        } catch (error) {
            console.log(error);
             res.status(500).json({error})
        }
    },
    getReviews : (req,res)=>{
        
    }
}