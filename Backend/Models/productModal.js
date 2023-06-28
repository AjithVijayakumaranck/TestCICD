const mongoose = require('mongoose');
const SubCategory = require('./subCategoryModel');
const schema = mongoose.Schema;




const productSchema = new schema({

  title: {
    type: String,
    required: true
  },
  // location: {
  //   type: {
  //     type: String,
  //     default: 'Point'
  //   },
  //   coordinates: [Number]
  // },
  // location:{
  //   locality:{type:String},
  //   district:{type:String},
  //   state:{type:String},
  //   country:{type:String}
  // },
  
  locality: {
    type: String,
  },
  district: {
    type: String,
  },
  pin:{
    type:String
  },
  state: {
    type: String,
  },
  country: {
    type: String,
    default:"india"
  },
  description: {
    type: String,
  },
  otherDetails:{
    type:Object
  },
  contact: {
    type: String
  },
  featured:{
    type:Boolean,
    default:false
  },
  images: [{
    type: schema.Types.Mixed
  }]
  ,
  deleted: {
    type: Boolean,
    default: false
  },
  userId: {
    type: String,
    required: true,
    ref: "USER"
  },
  category: {
    type: String,
    ref: 'category'
  },
  keyword:[String], 
  price:{
    type:String,
    required:true
  },
  SubCategory: { type: String, ref: 'subcategory'}

}, { timestamps: true })

// productSchema.index({ location: '2dsphere' });
const PRODUCT = mongoose.model("products", productSchema);

module.exports = PRODUCT