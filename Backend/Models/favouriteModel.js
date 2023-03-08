const mongoose= require('mongoose');
const schema = mongoose.Schema;

const WISHLISTschema = new schema({
    userId:{
        type:String,
        unique:true,
        require:true
    },
   wishlist:[String]

 
},{timestamps:true})
const WISHLIST =  mongoose.model("WISHLIST",WISHLISTschema);

module.exports = WISHLIST