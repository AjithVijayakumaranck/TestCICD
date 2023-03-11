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
        try{
                        console.log("image waitng for upoload");
                        const res = cloudinary.uploader.upload(Image, { folder: folderName})
                        res.then((data) => {
                            console.log("sucess upload");
                            console.log(data);
                            console.log(data.secure_url);
                            resolve(data)
                        }).catch((err) => {
                            console.log("failed upload");
                            console.log(err);
                            reject(err)
                        });
   
    }catch(err){
       console.log(err,"cloudinary error");
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