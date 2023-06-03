const mongoose= require('mongoose');
const schema = mongoose.Schema;

const USERschema = new schema({
  fullname:{
    type:String,
    require:true
  },
  googleId:{
     type: String
  },
  profilePicture:{
    type:Object
  },
  surname:{
    type:String,
    require:true
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
    region:{type:String}
  },
  emailVerified:{
    type:Boolean,
    default:false
  },
  phoneVerified:{
    type:Boolean,
    default:false
  },
  googleVerified:{
    type:Boolean,
    default:false
  },
  deleted:{
    type:Boolean,
    default:false
  }
},{timestamps:true})

const USER =  mongoose.model("USER",USERschema);

module.exports = USER