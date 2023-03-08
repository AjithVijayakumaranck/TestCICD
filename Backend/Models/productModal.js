const mongoose= require('mongoose');
const schema = mongoose.Schema;

const PRODUCTschema = new schema({

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
      }
 
},{timestamps:true})

PRODUCTschema.index({ location: '2dsphere' });
const PRODUCT =  mongoose.model("PRODUCT",PRODUCTschema);

module.exports = PRODUCT