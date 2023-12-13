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

//delete local files
async function deleteFile(filePath) {
    try {
      await fs.unlinkSync(filePath);
      console.log(`Deleted ${filePath}`);
    } catch (error) {
        console.log(error);
      console.error(`Got an error trying to delete the file: ${error.message}`);
    }
  }


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
        const options2 = {
            height:200,
            quality: 'auto',
            format: 'jpg',
        };
        try {
            console.log(Image, "image ");
            const res = cloudinary.uploader.upload(Image, { folder: folderName })
            res.then(async (data) => {
                const transformedURL = await cloudinary.url(data.public_id, options)
                const  aspect_ratio = await cloudinary.url(data.public_id, options2)
                data.compressedUrl = transformedURL
                data.aspectUrl = aspect_ratio
                console.log(data, "traaa");
                deleteFile(Image)
                resolve(data)
            }).catch((err) => {
                reject(err)
            });

        } catch (err) {
            console.log(err,"error");
            throw (err)
        }
    })
}

const cloudDelete = (publicId) => {
    return new Promise((resolve, reject) => {
        try {
            const res = cloudinary.uploader.destroy(publicId)
            res.then(async (data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            });

        } catch (err) {
            throw (err)
        }
    })
}


module.exports = { cloudUpload ,cloudDelete }


// // Generate
// const url = cloudinary.url("olympic_flag", {
//   width: 100,
//   height: 150,
//   Crop: 'fill'
// });



// The output url
// console.log(url);
// https://res.cloudinary.com/<cloud_name>/image/upload/h_150,w_100/olympic_flag