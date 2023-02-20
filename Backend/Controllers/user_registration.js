const OTP = require("../Models/otp");
const USER = require("../Models/userModel");
const { hashData, verifyHashedData } = require("../utilities/hashData");
const { sendOTP } = require("./otp/otp");
const moment = require("moment");
const { sentVerificationOtp, verifyPhoneOtp } = require("./otp/twilio");

module.exports = {

    //sendOTP and Save user record as undefined
    userRegistration: async (req, res) => {
        try {
            console.log(req.body);
            const {
                email,
                fullname,
                surname,
                phonenumber,
                username,
                dateofbirth,
                password,
                locality,
                district,
                state,
                region,
            } = req.body;
            const userInfo = await USER.findOne({
                $or: [{ email: email }, { phoneNumber: phonenumber }],
            });
            if (!userInfo) {
                const hashedPassword = await hashData(password);
                const userTemplate = new USER({
                    fullname: fullname,
                    surname: surname,
                    phoneNumber: phonenumber,
                    username: username,
                    dob: dateofbirth,
                    address: {
                        locality: locality,
                        district: district,
                        state: state,
                        region: region,
                    },
                    password: hashedPassword,
                });
                userTemplate
                    .save()
                    .then(async () => {
                        const createdOTP = await sendOTP({ email });
                        res.status(200).json(createdOTP);
                    })
                    .catch((error) =>
                        res.status(500).json({ message: "something went wrong" })
                    );
            } else {
                if (!userInfo.emailVerified || !userInfo.phoneVerified) {
                    console.log("need verification");
                    const createdOTP = await sendOTP({ email });
                    res.status(200).json(createdOTP);
                } else {
                    res.status(400).json({ message: "EmailId or PhoneNumber already used" });
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
            const { email, otp } = req.body;
            const otpInfo = await OTP.findOne({ email: email });
            if (otpInfo) {
                if (moment().diff(otpInfo.expireAt, "minutes") > 0) {
                    res.status(400).json({ message: "otp expired" });
                } else {
                    console.log(moment().diff(otpInfo.expireAt, "minutes"));
                    const verified = await verifyHashedData(otp, otpInfo.otp);
                    if (!verified) {
                        res.status(500).json({ message: "Invalid Otp" });
                    } else {
                        await USER.updateOne({ email: email }, { emailVerified: true });
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
    userRegistration_mobile: async(req,res)=>{
      try {
        sentVerificationOtp(9746882953)
      } catch (error) {
        console.log(error.message);
      }
    },

    //verifyPhone
    verifyphone: async(req,res)=>{
       try{
        verifyPhoneOtp(9746882953,406537)
       }catch (error) {
        console.log(error);
       }
    }
};



