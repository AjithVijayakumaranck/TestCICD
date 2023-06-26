const mongoose = require('mongoose');
const schema = mongoose.Schema;

const carousalSchema = new schema({
    image:{
        type:schema.Types.Mixed,
        required:true
    },
    active:{
        type:Boolean,
        default:true
    },
    deleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const CAROUSAL =  mongoose.model("carousal",carousalSchema);

module.exports = CAROUSAL