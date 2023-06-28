const mongoose = require('mongoose')
const schema = mongoose.Schema;

const subscriptionSchema = new schema({

    plan_name: {
        type: String,
        require: true
    },
    plan_duration: {
        type: String,
        require: true
    },
    extra_ads :{
        type :String,
        default:"10"
    },
    extra_images: {
        type: String,
        default:"10"
    },
    discount: {
        type: String
    },
    Features: [String],
    monthly_pricing: {
        type: String,
        require: true
    },
    yearly_pricing: {
        type: String,
        require: true
    },
    subscriptions: {
        type: String,
        default: 0
    },
    active_status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

const SUBSCRIPTION = mongoose.model('subcription', subscriptionSchema)

module.exports = SUBSCRIPTION