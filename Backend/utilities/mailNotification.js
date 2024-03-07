
const generateOtp = require("../../utilities/generateOtp")
const { hashData } = require("../../utilities/hashData")
const {sendEmail} = require("../../utilities/sendmail")
const moment = require("moment")

const { AUTH_EMAIL } = process.env

const sendNotification = async ({ email, subject="", message="", duration = 1 }) => {
    try {
        
        if (!(email)) {
            throw Error("Provide proper email")
        }

        //send email
        const mailOptions = {
            from: AUTH_EMAIL,
            to: email,
            subject,
            html: `<p style = "color:blue">SignUp Otp</p><p style = "color:red;font-size:25px;letter-spacing:2px;"><b>${generatedPin}</b></p><p>
            This otp will expire in ${duration} minutes</p>`
        }

        await sendEmail(mailOptions)
   
    } catch (error) {
        console.log('error send otp',error.message);
        throw error
    }
}

module.exports = { sendNotification };