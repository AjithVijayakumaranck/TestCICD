const { TWILIO_ACC_SSID, TWILIO_AUTH_ID, TWILIO_AUTHY_SERVICEID } = process.env
const client = require('twilio')(TWILIO_ACC_SSID , TWILIO_AUTH_ID)


//send otp to the pone number
const sentVerificationOtp = (Contact) => {
  client.verify.v2.services(TWILIO_AUTHY_SERVICEID)
    .verifications
    .create({ to: `+91${Contact}`, channel: 'sms' })
    .then(verification => console.log(verification.status))
    .catch(err => console.error(err))
}


//verify the sented otp
const verifyPhoneOtp = (Contact, otp) => {
  client.verify.v2.services(TWILIO_AUTHY_SERVICEID)
    .verificationChecks
    .create({ to: `+91${Contact}`, code: otp })
    .then(verification_check => console.log(verification_check.status))
    .catch(err => console.error(err))
}

module.exports = { sentVerificationOtp, verifyPhoneOtp }

