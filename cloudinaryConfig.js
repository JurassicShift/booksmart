const  cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');    
require('dotenv').config();
 
const cloudinaryConfig = { 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_KEY, 
  api_secret: process.env.CLOUD_SECRET 
};

cloudinary.config(cloudinaryConfig);

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
  folder: "bookSmartUser",
  }
})

//  const uploadCloudinary = (path, folder) => {
//   return cloudinary.uploader.upload(path, {
//     folder
//   }).then(data => {
//     return {url: data.url, public_id: data.public_id};
//   }).catch(error=> {
//     console.log(error);
//   })
// }

// const removeCloudinary = async (public_id) => {
//   await cloudinary.uploader.destroy(public_id, function (error, result) {
//     console.log(result, error)
//   })
// }

module.exports = {
  cloudinary,
  storage,
  // uploadCloudinary, 
  // removeCloudinary
}

