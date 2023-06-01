const mongoose = require("mongoose")
const schema = mongoose.Schema;

const feedback_schema = new schema({

    senderId:{
        type:String
    },
    read:{
        type:Boolean,
        default:false
    }
    },{timestamps:true})

    const FEEDBACK =  mongoose.model("feedback",feedback_schema);

module.exports = FEEDBACK
