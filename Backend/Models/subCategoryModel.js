const mongoose = require('mongoose')
const schema = mongoose.Schema;

const SubCategoryschema = new schema({
    subcategory:{
        type:String,
        unique:true,
        require:true
    },
    category:{
        type:String,
        ref:"category"
    },
    formInputs : [ {
        type:String
    }]
},{timestamps:true})
const SUBCAT =  mongoose.model("subcategory",SubCategoryschema);

module.exports = SUBCAT