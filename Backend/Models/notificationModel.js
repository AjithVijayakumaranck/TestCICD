const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId


const NOTIFICATION_SCHEMA =  new mongoose.Schema({
senderId:{
    type:String,
    ref:"USER"
},
recieverId:{
    type:String,
    ref:"USER"
},
notification:{
    type:String
},
broadcast:{
    type:Boolean    
},
read:{
    type:Boolean,
    default:false
}

},{ timestamps: true })

const NOTIFICATION=mongoose.model('notification',NOTIFICATION_SCHEMA)
module.exports={NOTIFICATION};