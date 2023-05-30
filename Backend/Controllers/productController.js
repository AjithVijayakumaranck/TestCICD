const { cloudUpload } = require("../utilities/cloudinary")
const path = require("path");
const PRODUCT = require("../Models/productModal");

module.exports = {
    addProduct :async (req,res)=>{
        console.log("iam here");
        try {
            const {title,description,address,contact,subcategory,category,userId} = req.body
            const Upload =  req.files.map((file)=>{
                let locaFilePath = file.path;
                console.log(locaFilePath,"file path");
                return(
                    cloudUpload(locaFilePath,title)
                )  
            })
            const results = await Promise.all(Upload);
            if(results){
                // fs.unlink('/uploads'+file, (err) => {
                //     if (err) {
                //       res.status(500).send({
                //         message: "Could not delete the file. " + err,
                //       });
                //     }
                
                //     res.status(200).send({
                //       message: "File is deleted.",
                //     });
                //   });
                console.log(...subcategory,"hellllo");
                const productTemplate = new PRODUCT({
                    title:title,
                    description:description,
                    address:{
                        locality:address.locality,
                        district:address.district,
                        state:address.state,
                        country:address.region
                      },
                    // location:{
                    //     type:"Point",
                    //     coordinates:[Number(longitude),Number(latitude)]
                    // },
                    contact:contact,
                    category:category,
                    SubCategory:subcategory,
                    images:[...results],
                    userId:userId
                })
                const SavedData = await productTemplate.save()
                if(SavedData){
                    console.log("saved");
                    res.status(200).json({message:'ad posted successfully'})
                }else{
                    console.log("eroorrr");
                    res.status(200).json({message:'add failed to post'})
                }
            }else{
                res.status(400).json({message:"something error with images"})
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"something went wrong"})
        } 
    },

    //get single products
    getSinlgeProduct : async (req,res)=>{
        try {
            const {productId} = req.query
            const productDetails = await PRODUCT.findOne({_id:productId,deleted:false})
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
            const productDetails = await PRODUCT.find({deleted:false})
            if(productDetails){
                res.status(200).json(productDetails)
            }else{
                res.status(404).json({messagge:"products not found"})
            }

        } catch (error) {
            res.status(500).json({message:"something went wrong"})
        }
    },

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




}