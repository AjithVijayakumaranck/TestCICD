const axios = require("axios");
const querystring = require('querystring')

const {LOCALITY_API_KEY,LOCALITY_FETCH_API} = process.env

const fetchLocality= (state,district,subdistrict,village)=>{
    console.log('state',state)
    const baseURL = `${LOCALITY_FETCH_API}?api-key=${LOCALITY_API_KEY}&limit=10&format=json`;
    let url = baseURL;
    return new Promise ((resolve, reject)=>{
        if (typeof district !== 'undefined') {
            url += `&filters%5Bdistrictname%5D=${district}`;
          }
          
          if (typeof village !== 'undefined') {
            url += `&filters%5Bvillage_locality_name%5D=${village}`;
          }
          
          if (typeof state !== 'undefined') {
            url += `&filters%5Bstatename%5D=${state}`;
          }
          
          if (typeof subdistrict !== 'undefined') {
            url += `&filters%5Bsub_distname%5D=${subdistrict}`;
          }

        const options = {
            method: 'GET',
            url:url,
          };
          axios.request(options).then(function (response) {
            console.log(response.data,"outpuiuu");
              resolve(response.data)
          }).catch(function (error) {
              console.error(error);
              reject(error)
          });
    })
}

module.exports = fetchLocality


