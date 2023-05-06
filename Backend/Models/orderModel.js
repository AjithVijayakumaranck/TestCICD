const mongoose= require('mongoose');
const schema = mongoose.Schema;

const ORDERschema = new schema({
    userId:{
        type:String,
        unique:true,
        require:true
    },
   wishlist:[String]

 
},{timestamps:true})
const ORDER =  mongoose.model("order",ORDERschema);

module.exports = ORDER