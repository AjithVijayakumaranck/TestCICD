const CATEGORY = require("../Models/categoryModel")
const PRODUCT = require("../Models/productModal")
const SUBCAT = require("../Models/subCategoryModel")

module.exports = {

    //CATEGORY CONTROLLERS

    //getting Categories

    getCategories: async (req,res)=>{
        try {
            console.log("get categories");
            const categories = await CATEGORY.find()
            console.log(categories);
            if(!categories){
                res.status(400).json({message:"Category not found"})
            }else{
                res.status(200).json(categories)
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message:"something went wrong"})
        }
    },

    //add new category
    addCategory: async (req, res) => {
        try {
            const { category } = req.body
            const categoryInfo = await CATEGORY.findOne({ categoryName: category })
            if (categoryInfo) {
                res.status(400).json({ message: "Category already exists" })
            } else {
                const categoryTemplate = new CATEGORY({
                    categoryName: category
                })

                categoryTemplate.save().then(() => {
                    res.status(200).json({ message: "Category successfully added" })
                }).catch(() => {
                    res.status(400).json({ message: "Category failed to be added" })
                })

            }
        } catch (error) {
            res.status(500).json({ message: "something went wrong" })
        }
    },

    //deleteCategory
    deleteCategory: async (req, res) => {
        try {
            const { categoryid } = req.query
            const categoryInfo = await CATEGORY.findOne({ _id: categoryid })
            if (categoryInfo) {
                CATEGORY.updateOne({ _id: categoryId }, { deleted: true }).then(() => {
                    PRODUCT.updateMany({ category: categoryId }, { deleted: true }, { upsert: true }).then(() => {
                        res.status(200).json({ message: "successfully deleted" })
                    }).catch((err) => {
                        res.status(500).json({ message: "Something went wrong" })
                    })
                })
            } else {
                res.status(404).json({ message: "category not found" })
            }
        } catch (error) {
            res.status(500).json({ message: "Something went wrong" })
        }
    },

    //updatecategory
    updateCategory: async (req, res) => {
        try {
            const { categoryId, CategoryDet } = req.query
            const categoryInfo = await CATEGORY.findOne({ _id: categoryId })
            if (categoryInfo) {
                CATEGORY.updateOne({ _id: categoryId }, { categoryName: CategoryDet }).then(() => {
                    res.status(200).json({ message: "Successfully updated category" })
                }).catch(() => {
                    res.status(500).json({ message: "something went wrong" })
                })
            } else {
                res.status(404).json({ message: "category not found" })
            }
        } catch (error) {
            res.status(500).json({ message: "something went wrong" })
        }
    },




    //Subcategory Management

    //add subcategory
     addSubcategory: async (req, res) => {
        try {
            const { categoryId, subcategory } = req.body
            const subCatinfo = await SUBCAT.findOne({ subcategory: subcategory })
            if (subCatinfo) {
                res.status(400).json({ message: "Subcategory already exists" })
            } else {
                const subCatTemplate = new SUBCAT({
                    subcategory: subCategory
                })
                subCatTemplate.save().then((response) => {
                    CATEGORY.updateOne({ _id: categoryId }, { $push: { subcategory: response._id } })
                    .then((response) => {
                        if (response.nMatched === 0) {
                            res.status(400).json({ message: "Category does not exist" })
                        } else {
                            res.status(200).json({ message: "Successfully added" })
                        }
                    }).catch(() => {
                        res.status(500).json({ message: "Something went wrong" })
                    })
                })
            }
        } catch (error) {
            res.status(500).json({ message: "Something went wrong" })
        }

    },

    //delete Subcategory

    deleteSubCategory :async (req,res)=>{
        try {
            const {categoryId,subcategoryId}= req.query
            const subCategoryInfo = await SUBCAT.findOne({_id:subcategoryId})
            if(subCategoryInfo){
                SUBCAT.updateOne({_id:subcategoryId},{deleted:true}).then(()=>{
                   CATEGORY.updateOne({_id:categoryId},{$pull:{subcategory:subcategoryId }}).then(()=>{
                    res.status(200).json({message:"successfylly deleted"})
                   }).catch((err)=>{
                    res.status(500).json({message:err.message});
                   })
                }).catch((err)=>{
                    res.status(500).json({message:err.message});
                   })
            }else{
                res.status(500).json({message:"Subcategory does not exist"});
            }
            
        } catch (err) {
            res.status(500).json({message:err.message});
        }
    },


    //update subcategory
    updateSubcategory: async (req,res)=>{
        try {
            const {subcategoryId,newInfo}=req.query 
            const subCategoryInfo = await SUBCAT.findOne({_id:subcategoryId}) 
            if(subCategoryInfo){
              SUBCAT.updateOne({_id:subcategoryId},{subCategory:newInf}).then(()=>{
                res.status(200).json({message:"Successfully updated"})
              }).catch((err)=>{
                res.status(500).json({message:"Error updating"})
              })
            }  else{
                res.status(404).json({message:"subcategory not found"})
            }
        } catch (error) {
            res.status(500).json({message:"Something went wrong"})

        }
    }
}