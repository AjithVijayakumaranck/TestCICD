const mongoose= require('mongoose');
const schema = mongoose.Schema;

const CATEGORYchema = new schema({

  categoryName:{
    type:String
  },
  subcategory:[{
    type:String,
    ref:"subcategory"
}],
  deleted:{
    type:Boolean,
    default:false
  }
},{timestamps:true})

const CATEGORY =  mongoose.model("category",CATEGORYchema);

module.exports = CATEGORY