const mongoose = require('mongoose');
const SubCategory = require('./subCategoryModel');
const schema = mongoose.Schema;

const PRODUCTschema = new schema({

  title: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  discription: {
    type: String,
  },
  contact: {
    type: String
  },
  images: [String]
  ,
  deleted:{
    type: Boolean,
    default:false
  },
  category:{
    type:String,
    ref:'category'
  },
  SubCategory:[{
    type:String,
    ref:'subcategory'
  }]

}, { timestamps: true })

PRODUCTschema.index({ location: '2dsphere' });
const PRODUCT = mongoose.model("products", PRODUCTschema);

module.exports = PRODUCT