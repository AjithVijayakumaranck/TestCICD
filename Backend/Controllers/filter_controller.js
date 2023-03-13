const { getLocation, getReverseLocation } = require("../utilities/geoCoding")



module.exports = {

    get_Revlocations : async (req,res)=>{
        try {
            const {longitude,latitude} = req.params
            const locationDetails = await getLocation(longitUDE,latitude)
            console.log(locationDetails.data.results,);
            res.status(200).json(locationDetails.data.results) 
        } catch (error) {
            res.status(400).json(error.message)
            
        }
    },
    get_locations : async (req,res)=>{
        try {
            const locationDetails = await getReverseLocation()
            console.log(locationDetails.data.results);
            res.status(200).json(locationDetails.data.results) 
        } catch (error) {
            res.status(400).json(error.message)
            
        }
    },
    
}