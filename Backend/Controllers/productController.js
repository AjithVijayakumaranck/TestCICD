const { cloudUpload } = require("../utilities/cloudinary")
const path = require("path");
const PRODUCT = require("../Models/productModal");
const USER = require("../Models/userModel");

module.exports = {
    addProduct: async (req, res) => {
        try {
            const { title,
                    description,
                    otherDetails,
                    featured,
                    subcategory,
                    keywords, category,
                    userId,
                    price,
                    listedBy,
                    locality,
                    district,
                    state,
                    region 
                } = req.body
            const parsedDetails = JSON.parse(otherDetails);
            const Upload = req.files.map((file) => {
                let locaFilePath = file.path;
                return (
                    cloudUpload(locaFilePath, title)
                )
            })
            const results = await Promise.all(Upload);
            if (results) {
                const productTemplate = new PRODUCT({
                    title: title,
                    description: description,
                    locality: locality,
                    district: district,
                    state: state,
                    region: region,
                    listedBy: listedBy,
                    keywords:keywords,
                    featured:featured,
                    // location:{
                    //     type:"Point",
                    //     coordinates:[Number(longitude),Number(latitude)]
                    // },
                    category: category,
                    SubCategory: subcategory,
                    otherDetails: { ...parsedDetails },
                    images: [...results],
                    userId: userId,
                    price: price,
                })
                const SavedData = await productTemplate.save()
                if (SavedData) {
                    USER.findOne({_id:userId}).then((response)=>{
                        if(response.AdCount <= 0){
                            USER.updateOne({_id: userId},{
                              AdCount: 0
                            }).then((response)=>{
                                console.log(response)
                                res.status(200).json({ message: 'ad posted successfully' })
                            }).catch((err)=>{
                                res.status(400).json({message:"problem with updating user",error:err})
                            })
                        }else{
                            USER.updateOne({_id: userId},{
                                $inc: {AdCount: -1}
                            }).then((response)=>{
                                res.status(200).json({ message: 'ad posted successfully' })
                            })
                            .catch((err)=>{
                                res.status(400).json({message:"problem with updating user",error:err})
                            })
                        }
                    })
                } else {
                    res.status(200).json({ message: 'add failed to post' })
                }
            } else {
                res.status(400).json({ message: "something error with images" })
            }
        } catch (error) {
            res.status(500).json({ message: "something went wrong" ,error:error.message})
        }
    },

    //get single products
    getSinlgeProduct : async (req,res)=>{
        try {
            const {productId} = req.query
            const productDetails = await PRODUCT.findOne({_id:productId,deleted:false}).populate('userId')
            if(productDetails){
                res.status(200).json(productDetails)
            }else{
                res.status(404).json({messagge:"product not found"})
            }

        } catch (error) {
            res.status(500).json({message:"something went wrong"})
        }
    },

    //get all Product products
    getProducts : async (req,res)=>{
        try {

            const {page} = req.query
            const limit = 12
            const productDetails = await PRODUCT.find({deleted:false}).populate('userId').skip(page).limit(limit)
            if(productDetails){
                res.status(200).json(productDetails)
            }else{
                res.status(404).json({messagge:"products not found"})
            }

        } catch (error) {
            res.status(500).json({message:"something went wrong"})
        }
    },

    //block product
    blockProducts  : async (req,res)=>{
        try {
            const {productId} = req.params
            const productDetails = await PRODUCT.findOne({_id:productId,deleted:false})
            if(productDetails){
                PRODUCT.updateOne({_id:productDetails._id},{deleted:true}).then(()=>{
                    res.status(200).json(productDetails)
                }).catch(()=>{
                    res.status(404).json({messagge:"failed to block"})
                })
            }else{
                res.status(404).json({messagge:"products not found"})
            }
        } catch (error) {
            res.status(500).json({message:"something went wrong"})
        }
    },
    
    //specific products
    getUserProduct :async (req,res)=>{
        try {
            const {userId} = req.params
            const userProducts = await PRODUCT.find({ userId:userId})
            if(userProducts){
                res.status(200).json(userProducts) 
            }else{
                res.status(404).json({message:"products not found"})
            }
        } catch (error) {
            res.status(500).json({message:"something went wrong"})
        }
    }




}