const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Connecting BACKEND to CLOUDINARY storage
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Logic for storing images in Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wonderlust_DEV',              // Folder name in Cloudinary
    allowedFormats: ["png","jpg","jpeg"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
  },
});


module.exports = { cloudinary, storage };

