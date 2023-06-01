const cloudinary = require('cloudinary').v2;
const { log } = require('console');
const fs = require('fs');

const { CLOUD_API_KEY, CLOUD_API_SECRET } = process.env


// Configuration 
cloudinary.config({
    cloud_name: "dnzi1ioil",
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET
}); 


// Upload

const cloudUpload = (Image, folderName) => {
    return new Promise((resolve, reject) => {

        
const options = {
    width: 200,
    height: 200,
    crop: 'fill',
    gravity: 'face',
    quality: 'auto',
    format: 'jpg',
  };
        try{
            console.log(Image,"image ");
             const res = cloudinary.uploader.upload(Image, { folder: folderName})
             res.then(async (data) => {
                const transformedURL =await cloudinary.url(data.public_id, options)
                console.log(transformedURL,"transformedUrl");
                data.compressedUrl = transformedURL
                console.log(data,"traaa");
                resolve(data)
             }).catch((err) => {
                 reject(err)
             });
   
    }catch(err){
       throw(err)
    }
    })
}


module.exports = {cloudUpload}


// // Generate
// const url = cloudinary.url("olympic_flag", {
//   width: 100,
//   height: 150,
//   Crop: 'fill'
// });



// The output url
// console.log(url);
// https://res.cloudinary.com/<cloud_name>/image/upload/h_150,w_100/olympic_flag