const PRODUCT = require("../Models/productModal");
const { getLocation, getReverseLocation, getPolygon } = require("../utilities/geoCoding");
const fetchLocality = require("../utilities/localityFetch");



module.exports = {

    get_Revlocations : async (req,res)=>{
        try {
            console.log("api here");
            const {longitude,latitude} = req.query
            console.log(longitude,latitude,"laty and long");
            const locationDetails = await getReverseLocation(longitude,latitude)
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
    },

        //searching Function
        // searchProducts:async(req,res)=>{
        //     try {
        //         // const {polygon}= req.body
        //        getPolygon()
        //     } catch (error) {
        //         console.log(error.message);
        //         res.status(500).json({message:"something went wrong"})
        //     }
        // }


        //uses co ordinates to search

        // searchProducts:async(req,res)=>{
        //     try {
        //         const {SearchQuery,category,polygon} = req.body
                
        //         console.log(SearchQuery,category,polygon);

    
        //         if(category == ""){
        //             const result = await  PRODUCT.find({$and:[{location: { $geoIntersects: { $geometry: polygon.bbox }}},{ name: { $regex: new RegExp(SearchQuery, 'i') }}]})
        //             if(!result){
        //                     res.status(400).json({message:"No products found with this criteria"})
        //                 }else{
        //                     res.status(200).json(result)
        //             }
        //         }else{
        //             const result = await  PRODUCT.find({$and:[{location: { $geoIntersects: { $geometry: polygon.bbox }}},{category:category},{ name: { $regex: new RegExp(SearchQuery, 'i') }}]})
        //             if(!result){
        //                 res.status(400).json({message:"No products found with this criteria"})
        //             }else{
        //                 res.status(200).json(result)
        //         }
        //         }
        //     } catch (error) {
        //         console.log(error);
        //         res.status(500).json({message:"something went wrong"})
        //     }
        // },

        searchProducts:async(req,res)=>{
            try {
                const {SearchQuery="",district="",state=""} = req.query
                
                console.log(SearchQuery,category,polygon);

    
                if(category == ""){
                    const result = await  PRODUCT.find({ name: { $regex: new RegExp(SearchQuery, 'i') }})
                    if(!result){
                            res.status(400).json({message:"No products found with this criteria"})
                        }else{
                            res.status(200).json(result)
                    }
                }else{
                    const result = await  PRODUCT.find({ name: { $regex: new RegExp(SearchQuery, 'i') }})
                    if(!result){
                        res.status(400).json({message:"No products found with this criteria"})
                    }else{
                        res.status(200).json(result)
                }
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({message:"something went wrong"})
            }
        }, 
        searchLocality :async (req,res)=>{
            try {
               const locality = await fetchLocality(state,village,subdistrict,village)
            } catch (error) {
                console.log(error);
                res.status(500).json({message:"something went wrong"})
            }
        }
}