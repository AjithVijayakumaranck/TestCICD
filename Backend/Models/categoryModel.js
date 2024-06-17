const mongoose= require('mongoose');
const schema = mongoose.Schema;

const CATEGORYschema = new schema({

  categoryName:{
    type:String
  },
  icon:{
    type:Object
  },
  subcategory:[{
    type:String,
    ref:"subcategory"
}],
filters: [{
  type: schema.Types.Mixed
}],
  deleted:{
    type:Boolean,
    default:false
  },
  clicks:[String]
},{timestamps:true})

const CATEGORY =  mongoose.model("category",CATEGORYschema);

module.exports = CATEGORY