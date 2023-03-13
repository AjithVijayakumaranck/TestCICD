const axios = require("axios");

const {OPEN_CAGE_KEY} = process.env

const getLocation = (searchQuery)=>{
    return new Promise ((resolve, reject)=>{
        const options = {
            method: 'GET',
            url: 'https://api.opencagedata.com/geocode/v1/json',
            params: {
                q: searchQuery,
                key: OPEN_CAGE_KEY}
          };
          axios.request(options).then(function (response) {
              console.log(response.data);
              resolve(response)
          }).catch(function (error) {
              console.error(error);
              reject(error)
          });
    })
}

const getReverseLocation = (longitude,latitude)=>{
    return new promise((resolve, reject) =>{
        const options = {
            method: 'GET',
            url: 'https://api.opencagedata.com/geocode/v1/json',
            params: {
                q: latitude+"+"+longitude,
                key: OPEN_CAGE_KEY}
          };
          axios.request(options).then(function (response) {
              console.log(response.data);
              resolve(response)
          }).catch(function (error) {
              console.error(error);
              reject(error)
          }); 
    })

}

module.exports = {getLocation,getReverseLocation} 