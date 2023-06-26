const axios = require("axios");
const querystring = require('querystring')

const {LOCALITY_API_KEY,LOCALITY_FETCH_API,LOCATION_FETCHING_URL} = process.env

const fetchLocality= (district)=>{
    console.log('district',district)
    const baseURL = `${LOCALITY_FETCH_API}?api-key=${LOCALITY_API_KEY}&limit=1000&format=json`;
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
              resolve(response.data.records)
          }).catch(function (error) {
              console.error(error.message);
              reject(error)
          });
    })
}


//fuction fetches the states and districts
const fetchLocation = (districCode)=>{
  console.log("hello");
  return new Promise((resolve, reject) =>{
    if(!districCode){
        axios.get(`${LOCATION_FETCHING_URL}/states`).then((response)=>{
          console.log(response.data.states,"hello states");
          resolve(response.data)
        }).catch((err)=>{
          reject(err)
        })
    }else{
      axios.get(`${LOCATION_FETCHING_URL}/districts/${districCode}`).then((response)=>{
        console.log(response.data.states,"hello states");
        resolve(response.data)
      }).catch((err)=>{
        reject(err)
      })
    }
  })
  
}

module.exports = {fetchLocality,fetchLocation}


