
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId


const CONVERSATION_SCHEMA =  new mongoose.Schema({

member:{
    type:Array,
},
// read:{
//     type:Boolean,
//     default:false,
// },

read:[{
    type:String
}],
product:{
 type:ObjectId,
 required:true,
 ref:"products"
}

},{ timestamps: true })

const CONVERSATION=mongoose.model('Conversation',CONVERSATION_SCHEMA)
module.exports={CONVERSATION};