const mongoose= require('mongoose');
const schema = mongoose.Schema;

const superAdminSchema = new schema({
  fullname:{
    type:String,
    require:true
  },
  surname:{
    type:String,
    require:true
  },
  roleupgradeBy:{
      type:String,
      ref:"SUPERADMIN"
  },
  role:{
      type:String,
      default:"admin",
      required:true
  },
  phoneNumber:{
    type:String
  },
  email:{
    type:String
  },
  username:{
    type:String
  },
  dob:{
    type:String
  },
  password:{
    type:String
  },
  address:{
    locality:{type:String},
    district:{type:String},
    state:{type:String},
    country:{type:String}
  },
  deleted:{
    type:Boolean,
    default:false
  }
},{timestamps:true})

const SUPERADMIN =  mongoose.model("SUPERADMIN",superAdminSchema);



module.exports = SUPERADMIN