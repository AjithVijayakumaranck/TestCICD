const mongoose = require('mongoose')
const schema = mongoose.Schema;

const SubCategoryschema = new schema({
    subcategory: {
        type: String,
        unique: true,
        require: true
    },
    category: {
        type: String,
        ref: "category"
    },
    nestedCategories:[{
        type:String,
        ref:"nestedcategories"
    }],
    formInputs: [{
        type: schema.Types.Mixed
    }],
    deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })
const SUBCAT = mongoose.model("subcategory", SubCategoryschema);

module.exports = SUBCAT