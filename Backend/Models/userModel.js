const mongoose = require('mongoose');
const schema = mongoose.Schema;

const USERschema = new schema({
  fullname: {
    type: String,
    require: true
  },
  googleId: {
    type: String
  },
  profilePicture: {
    type: Object
  },
  surname: {
    type: String,
    require: true
  },
  phoneNumber: {
    type: String
  },
  email: {
    type: String
  },
  username: {
    type: String
  },
  dob: {
    type: String
  },
  password: {
    type: String
  },
  address: {
    locality: { type: String },
    district: { type: String },
    state: { type: String },
    region: { type: String }
  },
  totalrating: {
    type: String,
    default: 0,
  },
  ratings: [
    {
      star: Number,
      comment: String,
      postedby: { type: schema.Types.ObjectId, ref: "USER" },
      reply: [{
        content: String,
        repliedBy: { type: schema.Types.ObjectId, ref: "USER" },
        repliedAt: { type: Date, default: Date.now }
      }],
      reviewedAt: { type: Date, default: Date.now }
    },
  ],
  subscription: {
    plan: {
      type: String,
      default: "Basic",
      ref:"subcription"
    },
    subscribedAt: {
      type: Date, default: Date.now
    }
  },
  premiumuser: {
    type: Boolean,
    default: false
  },
  role:{
    type: String,
    enum:["admin","superadmin","user"],
    default:"user"
  },
  roleupgradeBy:{
    type:String,
    enum:["admin","superadmin"],
},
  AdCount:{
    type:Number,
    default:"20"
  },
  ImageCount:{
    type:Number,
    default:"10"
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  phoneVerified: {
    type: Boolean,
    default: false
  },
  showName: {
    type: Boolean,
    default: true
  },
  showDob: {
    type: Boolean,
    default: true
  },
  showAddress: {
    type: Boolean,
    default: false
  },
  pseudoName:{
    type:String
  },
  showEmail: {
    type: Boolean,
    default: false
  },
  showPhonenumber: {
    type: Boolean,
    default: false
  },

  googleVerified: {
    type: Boolean,
    default: false
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

const USER = mongoose.model("USER", USERschema);

module.exports = USER