const PRODUCT = require("../Models/productModal");
const { getLocation, getReverseLocation } = require("../utilities/geoCoding")



module.exports = {

    get_Revlocations : async (req,res)=>{
        try {
            console.log("api here");
            // const {longitude,latitude} = req.params
            const locationDetails = await getReverseLocation(-73.989,40.733)
            console.log(locationDetails,"heee");
            res.status(200).json(locationDetails) 
        } catch (error) {
            res.status(400).json(error.message)
            
        }
    },
    get_locations : async (req,res)=>{
        try {
            const {location} = req.query
            console.log(location,"hello lopcatopmn");
            const locationDetails = await getLocation(location)
            console.log(locationDetails);
            res.status(200).json(locationDetails) 
        } catch (error) {
            console.log(error,"error");
            res.status(400).json(error.message)     
        }
    },


    //filtering functions
    getFiltered : async (req,res)=>{
     try {
        const {polygon,category} = req.query
        if(category==""){
            const Products =  await PRODUCT.find({location: { $geoIntersects: { $geometry: polygon.bbox }}}).toArray()
            if(Products){
                res.status(200).json(Products)
            }else{
                res.status(400).json({message:"Products not Found"})
            }
        }else{
            const Products =  await PRODUCT.find({$and:[{location: { $geoIntersects: { $geometry: polygon.bbox }}},{category:category}]}).toArray()
            if(Products){
                res.status(200).json(Products)
            }else{
                res.status(400).json({message:"Products not Found"})
            }
        }


     } catch (error) {
        res.status(500).json({messasge:"something went wrong"})
     }
    },
    

    // filter with distance
    filterDistance :async (req,res)=>{
        try {
            const {longitude,latitude,distance} = req.query
            const productDetails = await PRODUCT.find({location: { $geoWithin: { $centerSphere: [[longitude, latitude],distance / 3963.2 ]}}})
            if(productDetails){
               res.status(200).json(productDetails)
            }else{
               res.status(400).json({message:"No products with in this distance"})
            }
        } catch (error) {
            res.status(500).json({message:"something went wrong"})
        }
    }
}