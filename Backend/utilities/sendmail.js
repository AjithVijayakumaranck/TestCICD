const nodemailer = require('nodemailer')
const path = require('path')
var hbs = require('nodemailer-express-handlebars');

const { AUTH_EMAIL, AUTH_PASS } = process.env


//creating transporter
let transporter = nodemailer.createTransport({
    // host: "smtp-mail.outlook.com",
    host: "mail.dealnbuy.co.in",
    auth: {
        user:AUTH_EMAIL,
        pass:AUTH_PASS 
    },
    tls: {
        rejectUnauthorized: false
    }
    
})

//handlebars options
const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve('./Views'),
      defaultLayout: false,
    },
    viewPath: path.resolve('./Views'),
    extName: ".handlebars",
  } 
  transporter.use('compile', hbs(handlebarOptions));


//test transporter
transporter.verify((error, success) => {
    if (error) {
        console.log(error.message);
        throw error
    } else {
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

