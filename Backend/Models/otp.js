const mongoose= require('mongoose');
const schema = mongoose.Schema;

const OTPschema = new schema({
    email:{
        type:String,
        unique:true,
        require:true
    },
    otp:{
        type:String,
        require:true
    },
    expireAt:Date
},{timestamps:true})

const OTP =  mongoose.model("OTP",OTPschema);

module.exports = OTP