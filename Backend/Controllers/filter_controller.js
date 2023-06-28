const PRODUCT = require("../Models/productModal");
const { getLocation, getReverseLocation, getPolygon } = require("../utilities/geoCoding");
const { fetchLocality, fetchLocation } = require("../utilities/localityFetch");



module.exports = {

    get_Revlocations: async (req, res) => {
        try {
            console.log("api here");
            const { longitude, latitude } = req.query
            console.log(longitude, latitude, "laty and long");
            const locationDetails = await getReverseLocation(longitude, latitude)
            console.log(locationDetails, "heee");
            res.status(200).json(locationDetails)
        } catch (error) {
            res.status(400).json(error.message)

        }
    },
    get_locations: async (req, res) => {
        try {
            const { location } = req.query
            console.log(location, "hello lopcatopmn");
            const locationDetails = await getLocation(location)
            console.log(locationDetails);
            res.status(200).json(locationDetails)
        } catch (error) {
            console.log(error, "error");
            res.status(400).json(error.message)
        }
    },


    //filtering functions
    getFiltered: async (req, res) => {
        try {
            const { polygon, category } = req.query
            if (category == "") {
                const Products = await PRODUCT.find({ location: { $geoIntersects: { $geometry: polygon.bbox } } }).toArray()
                if (Products) {
                    res.status(200).json(Products)
                } else {
                    res.status(400).json({ message: "Products not Found" })
                }
            } else {
                const Products = await PRODUCT.find({ $and: [{ location: { $geoIntersects: { $geometry: polygon.bbox } } }, { category: category }] }).toArray()
                if (Products) {
                    res.status(200).json(Products)
                } else {
                    res.status(400).json({ message: "Products not Found" })
                }
            }


        } catch (error) {
            res.status(500).json({ messasge: "something went wrong" })
        }
    },



    searchProducts: async (req, res) => {
        try {

            const { SearchQuery = "", district = "", state = "", category="" ,limit = 12 ,page = 0} = req.query

            console.log(SearchQuery, "serach qwu");


            if (!category) {
                const result = await PRODUCT.find({ $or: [{ title: { "$regex": SearchQuery, "$options": "i" } }, {description:{ "$regex": SearchQuery, "$options": "i" } },{"otherDetails.brand":SearchQuery}]}).populate('userId').skip(page).limit(limit)

                if (!result) {
                    res.status(400).json({ message: "No products found with this criteria" })
                } else {
                    res.status(200).json(result)
                }
            } else {
                console.log("ELSEEEEE",category,SearchQuery);
                const result = await PRODUCT.find({ $or: [{ title: { "$regex": SearchQuery, "$options": "i" } }, {description:{ "$regex": SearchQuery, "$options": "i" } },{"otherDetails.brand":SearchQuery}]}).populate('userId').skip(page).limit(limit)
                if (!result) {
                    res.status(400).json({ message: "No products found with this criteria" })
                } else {
                    res.status(200).json(result)
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "something went wrong" })
        }
    },

    searchLocality: async (req, res) => {
        try {
            const { state, district , village, subdistrict } = req.query
            console.log(district);
            const convDistrict =await district.toUpperCase()
            console.log(convDistrict);
            const locality = await fetchLocality(convDistrict)
            if (locality) {
                const newArray =await locality.reduce((result, element) => {       
                    const isDuplicate = result.some((item) => item.village_locality_name === element.village_locality_name);
                    
                    if (!isDuplicate) {
                      result.push(element);
                    }
                    
                    return result;
                  }, []);
                  console.log(newArray,"reduced");
                res.status(200).json(locality)
            } else {
                res.status(400).json({ message: "No products found with this criteria" })
            }
        } catch (error) {
            console.log(error.messasge);
            res.status(500).json({ message: "something went wrong" })
        }

    },
    

    searchStatesDistricts: async (req, res) => {
        try {
            const { districtCode } = req.query
            const locality = await fetchLocation(districtCode)
            if (locality) {
                res.status(200).json(locality)
            } else {
                res.status(400).json({ message: "No products found with this criteria" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "something went wrong" })
        }
    },


    //product filters
    
    // filter using location
    filterByLocation : async (req,res)=>{
        try {

            let {state,district,locality,max,min,page} = req.query    
            let query = [{deleted:false}]
            if(state){
                query.push({state:state})
            }
            if(district){
                query.push({district:district})
            }
            if(locality){
                query.push({locality:locality})
            }
            if(min){
                query.push({price:{$gte:min}})
            }if(max){
                query.push({price:{$lte:max}})
            }
            const limit = 12

            const productDetails = await PRODUCT.find({$and:query}).skip(page).limit(limit)
            if(productDetails){
                res.status(200).json(productDetails)
            }else{
                res.status(404).json({messagge:"products not found"})
            }

        } catch (error) {
            res.status(500).json({message:"something went wrong"})
        }

    },

    //filter product using categories and subcategories

    filterbyCategories : async (req,res)=>{
        try {

            let {subcategory,category,max,min,page} = req.query    
            let query = [{deleted:false}]
            if(category){
                query.push({category:category})
            }
            if(subcategory){
                query.push({SubCategory:subcategory})
            }
            if(min){
                query.push({price:{$gte:min}})
            }if(max){
                query.push({price:{$lte:max}})
            }
            const limit = 12

            const productDetails = await PRODUCT.find({$and:query}).skip(page).limit(limit)
            if(productDetails){
                res.status(200).json(productDetails)
            }else{
                res.status(404).json({messagge:"products not found"})
            }

        } catch (error) {
            res.status(500).json({message:"something went wrong"})
        }
    }

   




    // // filter with distance
    // filterDistance :async (req,res)=>{
    //     try {
    //         const {longitude,latitude,distance} = req.query
    //         const productDetails = await PRODUCT.find({location: { $geoWithin: { $centerSphere: [[longitude, latitude],distance / 3963.2 ]}}})
    //         if(productDetails){
    //            res.status(200).json(productDetails)
    //         }else{
    //            res.status(400).json({message:"No products with in this distance"})
    //         }
    //     } catch (error) {
    //         res.status(500).json({message:"something went wrong"})
    //     }
    // },

    // searchProducts:async(req,res)=>{

    //     try {
    //         const {SearchQuery="",district="",state=""} = req.query

    //         console.log(SearchQuery,category);


    //         if(category == ""){
    //             const result = await  PRODUCT.find({ name: { $regex: new RegExp(SearchQuery, 'i') }})
    //             if(!result){
    //                     res.status(400).json({message:"No products found with this criteria"})
    //                 }else{
    //                     res.status(200).json(result)
    //             }
    //         }else{
    //             const result = await  PRODUCT.find({ name: { $regex: new RegExp(SearchQuery, 'i') }})
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
}