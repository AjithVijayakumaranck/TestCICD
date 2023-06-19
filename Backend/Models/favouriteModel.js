const mongoose= require('mongoose');
const schema = mongoose.Schema;

const WISHLISTschema = new schema({

    userId:{
        type:String,
        unique:true,
        require:true
    },
   wishlist:[{

    type:String,
    ref:"products"
    
   }]
 
},{timestamps:true})
const WISHLIST =  mongoose.model("wishlist",WISHLISTschema);

module.exports = WISHLIST