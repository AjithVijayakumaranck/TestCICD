const mongoose = require('mongoose')
const schema = mongoose.Schema;

const policySchema = new schema({
    policy: [{
        type: schema.Types.Mixed
    }],
    deleted: {
        type: Boolean,
        default: false
    },
    active:{
        type:Boolean,
        default:true
    }
}, { timestamps: true })
const POLICY = mongoose.model("terms and conditions", policySchema);

module.exports = POLICY