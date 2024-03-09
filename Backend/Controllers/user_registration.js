const OTP = require("../Models/otp");
const USER = require("../Models/userModel");
const { hashData, verifyHashedData } = require("../utilities/hashData");
const { sendOTP } = require("./otp/otp");
const moment = require("moment");
const { sentVerificationOtp, verifyPhoneOtp } = require("./otp/twilio");
const { Encrypt } = require("../utilities/encryption");

module.exports = {

    //sendOTP and Save user record as undefined
    userRegistration: async (req, res) => {
        try {
            let { email, fullname, lastname, phonenumber, username, dateOfbirth, password, locality, district, state, region } = req.body
            const userInfo = await USER.findOne({ email: email,googleVerified:false });
            if (!userInfo) {
                const hashedPassword = await hashData(password);
                console.log(hashedPassword,"passs");
                const userTemplate = new USER({
                    fullname: fullname,
                    surname: lastname,
                    phoneNumber: phonenumber,
                    username: username,
                    dob: dateOfbirth,
                    email: email,
                    address: {
                        locality: locality,
                        district: district,
                        state: state,
                        region: region,
                    },
                    password: hashedPassword,
                });
                console.log("passeeeees");
                userTemplate.save().then(async () => {
                    const createdOTP = await sendOTP({ email });

                    const passEncription = await Encrypt(password);
                    console.log(passEncription,"pass encription");
                    
                    res.status(200).json(createdOTP);
                })
                    .catch((error) =>
                        res.status(500).json({ message: "something went wrong" })
                    );
            } else {
                if (!userInfo.emailVerified) {
                    console.log("need verification");
                    const createdOTP = await sendOTP({ email });
                    res.status(200).json(createdOTP);
                } else {
                    console.log(userInfo,"userrr");
                    res.status(400).json({ message: "EmailId already used" });
                }
            }
        } catch (error) {
            console.log("error", error);
            res.status(400).json(error.message);
        }
    },


    //verify email otp
    verifyEmail: async (req, res) => {
        try {
            console.log("otp verification");
            console.log(req.body);
            const { email, otp } = req.body;
            const otpInfo = await OTP.findOne({email:email});
            if (otpInfo) {
                if (moment().diff(otpInfo.expireAt, "minutes") > 0) {
                    res.status(400).json({ message: "otp expired" });
                } else {
                    console.log(moment().diff(otpInfo.expireAt, "minutes"));
                    const verified = await verifyHashedData(otp, otpInfo.otp);
                    if (!verified) {
                        res.status(500).json({ message: "Invalid Otp" });
                    } else {
                        console.log(email, "verify email");
                        await USER.updateOne({$and : [{ email: email},{googleVerified:false}]}, { emailVerified: true });
                        res.status(200).json({ message: "User verified" });
                    }
                }
            } else {
                res.status(500).json({ message: "something went wrong" });
            }
        } catch (error) {
            console.log(error.message, "catch");
            res.status(500).json({ message: "something went wrong" })
        }
    },


    //userRegistration Mobile
    userRegistration_mobile: async (req, res) => {
        try {
            console.log(req.body,"req.body");
            const { email, fullname, surname, phonenumber, username, dateofbirth, password, locality, district, state, region } = req.body;
            const userInfo = await USER.findOne({ phoneNumber: phonenumber ,googleVerified:false });
            if (!userInfo) {
                const hashedPassword = await hashData(password);
                const userTemplate = new USER({
                    fullname: fullname,
                    surname: surname,
                    phoneNumber: phonenumber,
                    username: username,
                    dob: dateofbirth,
                    email:email,
                    address: {
                        locality: locality,
                        district: district,
                        state: state,
                        region: region,
                    },
                    password: hashedPassword,
                });
                userTemplate.save().then(async () => {
                    sentVerificationOtp(phonenumber).then(() => {
                        res.status(200).json("otp sented");
                    }).catch(() => {
                        res.status(500).json("something went wrong");
                    })

                })
                    .catch((error) =>
                        res.status(500).json({ message: "something went wrong" })
                    );
            } else {
                if (!userInfo.phoneVerified) {
                    sentVerificationOtp(phonenumber).then(async() => {
                        const passEncription = await Encrypt(password)
                        console.log(passEncription,"pass encription");
                        res.status(200).json("otp sented");
                    }).catch(() => {
                        res.status(500).json("something went wrong");
                    })
                } else {
                    res.status(400).json({ message: "PhoneNumber already used" });
                }
            }

        } catch (error) {
            console.log(error.message);
            res.status(400).json(error.message);
        }
    },

    //verifyPhone
    verifyphone: (req, res) => {
        try {
            const { phonenumber , otp } = req.body
            console.log(req.body);
            verifyPhoneOtp(phonenumber, otp).then(async() => {
                console.log("otp approved",phonenumber);
                await  USER.updateOne({$and : [{ phoneNumber: phonenumber },{googleVerified:false}]}, { phoneVerified: true });
                res.status(200).json({ message: "User verified" });
            }).catch(() => {
                console.log(verificationStatus);
                console.log("otp not approved");
                res.status(400).json({ message: "invalid otp" });
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "something went qrong" });
        }
    },
    
    registrationBothOtp:async (req,res)=>{
        try {
            let { email, fullname, lastname, phonenumber, username, dateOfbirth, password, locality, district, state, region } = req.body
            const userInfo = await USER.findOne(
                {
                    $or: [
                        {email: email},
                        {phoneNumber:phonenumber}
                    ]
                },
                {googleVerified:false});

            if (!userInfo) {
                const hashedPassword = await hashData(password);
                const userTemplate = new USER({
                    fullname: fullname,
                    surname: lastname,
                    phoneNumber: phonenumber,
                    username: username,
                    dob: dateOfbirth,
                    email: email,
                    address: {
                        locality: locality,
                        district: district,
                        state: state,
                        region: region,
                    },
                    password: hashedPassword,
                });
                userTemplate.save().then(async () => {
                    const createdOTP = await sendOTP({ email });
                    const passEncription = await Encrypt(password);      
                    res.status(200).json(createdOTP);
                })
                    .catch((error) =>
                        res.status(500).json({ message: "something went wrong" })
                    );
            } else {
                if (!userInfo.emailVerified) {
                    const createdOTP = await sendOTP({ email });
                    res.status(200).json({userInfo,emailVerified:false,message:"otp sent",phonenumber:userInfo.phoneNumber});
                } else if(!userInfo.phoneVerified){
                    sentVerificationOtp(userInfo.phoneNumber).then(() => {
                        res.status(200).json({mobileVerified:false,message:"otp sent",phonenumber:userInfo.phoneNumber});
                    }).catch(() => {
                        res.status(500).json("something went wrong");
                    })
                }else{
                    res.status(400).json({ message: "We already have user with one of these credentials" });
                }
            }
        } catch (error) {
            console.log("error", error);
            res.status(400).json(error.message);
        }
    },

    verifyEmailBoth:async(req,res)=>{
        try {
            const { email, otp } = req.body;
            const otpInfo = await OTP.findOne({email:email});
            if (otpInfo) {
                if (moment().diff(otpInfo.expireAt, "minutes") > 0) {
                    res.status(400).json({ message: "otp expired" });
                } else {
                    const verified = await verifyHashedData(otp, otpInfo.otp);
                    if (!verified) {
                        res.status(500).json({ message: "Invalid Otp" });
                    } else {
                        await USER.updateOne({$and : [{ email: email},{googleVerified:false}]}, { emailVerified: true });
                        const userInfo = await USER.findOne({email:email},{phoneVerified:false},{googleVerified:false})
                        if(userInfo){
                             sentVerificationOtp(userInfo.phoneNumber).then(() => {
                                res.status(200).json({mobileVerified:false,message:"otp sent",phonenumber:userInfo.phoneNumber});
                            }).catch(() => {
                                res.status(500).json("something went wrong");
                            })
                        }else{
                            res.status(200).json({ message: "User verified" });
                        }
                    }
                }
            } else {
                res.status(500).json({ message: "something went wrong" });
            }
        } catch (error) {
            console.log(error.message, "catch");
            res.status(500).json({ message: "something went wrong" })
        }
    }
};





