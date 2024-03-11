const USER = require("../Models/userModel")
const jwt = require("jsonwebtoken")
const { verifyHashedData, hashData } = require("../utilities/hashData")
const { sendOTP } = require("./otp/otp")
const OTP = require("../Models/otp")
const { verifyPhoneOtp, sentVerificationOtp } = require("./otp/twilio")
const { Encrypt } = require("../utilities/encryption")



module.exports = {

    //login
    login: async (req, res) => {
        try {
            const { data, password } = req.body
            console.log(data,password);
            const userInfo = await USER.findOne({
                $and: [{
                    $or: [
                        { email: data },
                        { phoneNumber: data }
                    ]
                },
                {
                    $or: [
                        { $and: [{ phoneVerified: true }, { emailVerified: true }] },
                        { role: "admin" },
                        { role: "superadmin" }
                    ]
                },
                { googleVerified: false }
                ]
            });


            // ----------------------------------------------------------------

            // if(userInfo.phoneVerified === false || userInfo.emailVerified === false){
            //     if(userInfo.emailVerified === false){
            //         console.log("email not verified");
            //         const createdOTP = await sendOTP({ email : userInfo.email });    
            //         res.status(200).json(createdOTP);
            //     }else if(userinfo.phoneVerified === false){
            //         sentVerificationOtp(userInfo.userInfo.phoneNumber).then(() => {
            //             res.status(200).json({mobileVerified:false,message:"otp sent",phonenumber:userInfo.phoneNumber});
            //         }).catch(() => {
            //             res.status(500).json("something went wrong");
            //         })
            //     }
            // }else{
            //     const verified = await verifyHashedData(password, userInfo.password)
            //     if (verified) {
            //         const token = await jwt.sign({ ...userInfo}, process.env.JWT_SECRET_KEY)
            //         res.status(200).json({ token: token, user: userInfo })
            //     } else {
            //         res.status(401).json({ message: "email or password is wrong" })
            //     }
            // }

            // ----------------------------------------------------------------

            if (userInfo) {
                const verified = await verifyHashedData(password, userInfo.password)
                if (verified){
                    const token = await jwt.sign({ ...userInfo }, process.env.JWT_SECRET_KEY)
                    res.status(200).json({ token: token, user: userInfo })
                }else{
                    res.status(401).json({ 
                        message: "Credentials are invalid" 
                    })
                }
            } else {
                const verificationCheck = await USER.findOne({
                    $and: [{
                        $or: [
                            { email: data },
                            { phoneNumber: data }
                        ]
                    },
                    {
                        role: "user" 
                    },
                    { googleVerified: false }
                    ]
                });
                if(verificationCheck){
                    const verified = await verifyHashedData(password, verificationCheck.password)
                   if(verified){  
                    if (verificationCheck.emailVerified === false && verificationCheck.phoneVerified === false) {
                        const createdOTP = await sendOTP({ email:verificationCheck.email });
                        res.status(401).json({
                            message: "user registered not verified , otp sented to email",
                            email:verificationCheck.email,
                            phoneNumber:verificationCheck.phoneNumber,
                            emailStatus: verificationCheck.emailVerified,
                            phoneStatus: verificationCheck.phoneVerified
                        })
                    }

                    else if (verificationCheck.emailVerified === false && verificationCheck.phoneVerified === true) {
                        const createdOTP = await sendOTP({ email:verificationCheck.email });
                        res.status(401).json({
                            message: "user registered email not verified , otp sented to email",
                            email:verificationCheck.email,
                            emailStatus: verificationCheck.emailVerified,
                            phoneStatus: verificationCheck.phoneVerified
                        })    
                    }

                    else {
                        sentVerificationOtp(verificationCheck.phoneNumber).then(() => {
                            res.status(401).json({
                                message: "user registered phonenumber not verified",
                                phoneNumber:verificationCheck.phoneNumber,
                                emailStatus: verificationCheck.emailVerified,
                                phoneStatus: verificationCheck.phoneVerified
                            }) 
                        }).catch(() => {
                            res.status(400).json("invalid otp");
                        })
                    
                    }
                   }
                }else{
                    res.status(401).json({ 
                        message: "Credentials are invalid" 
                    })
                }
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "something went wrong" })
        }

    },

    //login with phonenumber
    loginWithPhone: async (req, res) => {
        try {
            const { email, password } = req.body
            const userInfo = await USER.findOne({ phonenumber: phonenumber, phoneVerified: true, googleVerified: false })
            const verified = await verifyHashedData(password, userInfo.password)
            if (!verified) {
                const token = await jwt.sign(userInfo, JWT_SECRET_KEY)
                res.status(200).json({ token: token, user: userInfo })
            } else {
                res.status(401).json({ message: "phonenumber or password is wrong" })
            }
        } catch (error) {
            res.status(500).json({ message: "something went wrong" })
        }

    },


    //Otpsend
    email_otpSent: async (req, res) => {
        try {
            const { email } = req.body
            const userInfo = await USER.findOne({ email: email })
            if (userInfo) {
                const createdOTP = await sendOTP({ email });
                res.status(200).json({ message: "otp Sented", userInfo: userInfo })
            } else {
                res.status(400).json({ message: "User not found" })
            }
        } catch (e) {
            res.status(500).json({ message: "some thing went wrong" })
        }
    },

    //verifyOtp

    verifyOtp: async (req, res) => {
        try {
            const { otp, userData } = req.body
            console.log(req.body);
            const otpInfo = await OTP.findOne({ email: userData })
            if (otpInfo) {
                const verified = await verifyHashedData(otp, otpInfo.otp)
                if (verified) {
                    res.status(200).json({ message: "otp verified" })
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


    sendphoneOtp: async (req, res) => {
        try {
            const { phonenumber } = req.body
            const userInfo = await USER.findOne({ phoneNumber: phonenumber })
            if (userInfo) {
                sentVerificationOtp(phonenumber).then(() => {
                    res.status(200).json({
                        message: "otp sented", userInfo: userInfo
                    });
                }).catch(() => {
                    res.status(400).json("invalid otp");
                })
            } else {
                res.status(400).json({ message: "user not found" })
            }

        } catch (error) {
            console.log(error.message);
            res.status(500).json("something went wrong")
        }
    },


    verificationPhoneOtp: (req, res) => {
        try {
            const { userData, otp } = req.body
            verifyPhoneOtp(userData, otp).then(() => {
                res.status(200).json({ message: "otp verified" })
            }).catch(() => {
                res.status(400).son({ message: "invalid otp" })
            })

        } catch (error) {
            res.status(500).json({ message: "something went wrong" })
        }

    },

    //reset password 
    resetPassword: async (req, res) => {
        try {
            const { data, password } = req.body
            const hashedPassword = await hashData(password);
            const userInfo = await USER.findOne({ $or: [{ email: data }, { phoneNumber: data }], googleVerified: false })
            if (userInfo) {
                USER.updateOne({ $or: [{ email: data }, { phoneNumber: data }], googleVerified: false }, { password: hashedPassword }).then((response) => {
                    console.log("userUpdated");
                    res.status(200).json({ message: "passwords updated successfully" })
                }).catch((error) => {
                    console.log("userUpdate error");
                    res.status(400).json({ message: "update password failed" })
                })
            } else {
                console.log("user not dfound");
                res.status(404).json({ message: "user not found" })
            }
        } catch (error) {
            console.log("userUpdate error update");
            console.log(error);
            res.status(500).json({ message: "something went wrong" })
        }
    },
}
