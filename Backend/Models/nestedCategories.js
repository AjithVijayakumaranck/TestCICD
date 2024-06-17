const mongoose = require('mongoose')
const schema = mongoose.Schema;

const nestedCategories = new schema({
    nestedCat: {
        type: String,
        unique: true,
        require: true
    },
    subcategory: {
        type: String,
        ref: "subcategories"
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const NESTEDCAT = mongoose.model("nestedcategories", nestedCategories);

module.exports = NESTEDCAT