const mongoose = require("mongoose")
const schema = mongoose.Schema;

const feedbackschema = new schema({

    email:{
        type:String
    },
    read:{
        type:Boolean,
        default:false
    },
    message:{
        type:String,
    },
    deleted:{
        type:Boolean
    }
    },{timestamps:true})

    const FEEDBACK =  mongoose.model("feedback",feedbackschema);

module.exports = FEEDBACK
