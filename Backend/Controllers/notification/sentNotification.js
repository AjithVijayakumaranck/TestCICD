const OTP = require("../../Models/otp")
const generateOtp = require("../../utilities/generateOtp")
const { hashData } = require("../../utilities/hashData")
const {sendEmail} = require("../../utilities/sendmail")
const moment = require("moment")

const { AUTH_EMAIL } = process.env

const sendNotification = async ({ email, subject="", notification="" , link = "" ,product = ""}) => {
    try {
        console.log(email);
        if (!(email)) {
            throw Error("Provide proper email")
        }


        //send email
        const mailOptions ={
            from: AUTH_EMAIL,
            to: email,
            subject,
            template:'notification',
            context:{
               content: notification,
               product,
               link

            }
        }

        await sendEmail(mailOptions)
        console.log("await done");
        return;


    } catch (error) {
        console.log('error send otp',error.message);
        throw error
    }
}

module.exports = { sendNotification };