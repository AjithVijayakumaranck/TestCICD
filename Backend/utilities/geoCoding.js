const axios = require("axios");

const {OPEN_CAGE_KEY,MAP_BOX_TOKEN} = process.env

// https://api.mapbox.com/geocoding/v5/{endpoint}/{search_text}.json

const getLocation = (searchQuery)=>{
    return new Promise ((resolve, reject)=>{
        const options = {
            method: 'GET',
            url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json`,
            params: {
                access_token:MAP_BOX_TOKEN,
               }
          };
          axios.request(options).then(function (response) {
              console.log(response.data);
              resolve(response.data)
          }).catch(function (error) {
              console.error(error);
              reject(error)
          });
    })
}

const getReverseLocation = (longitude,latitude)=>{
    return new Promise((resolve, reject) =>{
        const options = {
            method: 'GET',
            url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json`,
            params: {
                access_token:MAP_BOX_TOKEN,
               }
          };
          axios.request(options).then(function (response) {
              console.log(response.data);
              resolve(response.data)
          }).catch(function (error) {
              console.error(error);
              reject(error)
          }); 
    })

}

const getPolygon = (longitude,latitude) =>{
    return new Promise((resolve, reject) =>{
        const options = {
            method: 'GET',
            // ${76.6469,10.74}
            url: `https://api.mapbox.com/v4/mapbox.enterprise-boundaries-a0-v2/tilequery/76.6469,10.74.json?access_token=${MAP_BOX_TOKEN}`,
            // params: {
            //     access_token:MAP_BOX_TOKEN,
            //    }
          };
          axios.request(options).then(function (response) {
              console.log(response,"res");
              resolve(response)
          }).catch(function (error) {
              console.log(error.message,"error");
              reject(error)
          }); 
    })    
}

module.exports = {getLocation,getReverseLocation,getPolygon} 