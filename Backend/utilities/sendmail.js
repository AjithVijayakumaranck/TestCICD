const nodemailer = require('nodemailer')

const { AUTH_EMAIL, AUTH_PASS } = process.env


//creating transporter
let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
        user:AUTH_EMAIL,
        pass:AUTH_PASS 
    },
    tls: {
        rejectUnauthorized: false
    }
    
})

//test transporter
transporter.verify((error, success) => {
    if (error) {
        console.log(AUTH_EMAIL,AUTH_PASS);
        console.log(error.message);
        throw error
    } else {
        console.log(AUTH_EMAIL,AUTH_PASS);
        console.log("transporter working fine");
    }
});


//send email
const sendEmail = async (mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        return;
    } catch (error) {
        console.log(error,"hellosss");
        throw error;
    }
}

module.exports = { sendEmail };

