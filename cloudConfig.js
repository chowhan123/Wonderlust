const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


//code for Connecting BACKEND to CLOUDINARY storage
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});


// code helps us in CLOUDINARY, in which folder we store images
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wonderlust_DEV',   //in cloudianry account the "Wonderlust_DEV" folder images will stored
    allowedFormats: ["png","jpg","jpeg"],
  },
});


module.exports = {cloudinary,storage};

