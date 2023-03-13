const { cloudUpload } = require("../utilities/cloudinary")
const path = require("path");
const { log } = require("console");
const PRODUCT = require("../Models/productModal");

module.exports = {
    addProduct :async (req,res)=>{
        try {
            const {title,description,longitude,latitude,contact,subcategory,category,userId} = req.body
            console.log(req.body,"hello body");
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
                    location:{
                        type:"Point",
                        coordinates:[Number(longitude),Number(latitude)]
                    },
                    contact:contact,
                    category:category,
                    SubCategory:[...subcategory],
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
    }
}