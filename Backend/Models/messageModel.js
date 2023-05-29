const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId


const MESSAGE_SCHEMA =  new mongoose.Schema({

conversationId:{
    type:String,
},
sender:{
    type:String 
},
text:{
    type:String
},
file:{
    type:String
},
offerMade:{
    type:Boolean,
    default:false
}

},{ timestamps: true })

const MESSAGE=mongoose.model('messages',MESSAGE_SCHEMA)
module.exports={MESSAGE};