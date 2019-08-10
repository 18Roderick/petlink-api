const cloudinary = require('cloudinary');
const config = require('../config/cloudinary');

cloudinary.config(config);

const uploads = async file => {
  try {
    const data = await cloudinary.uploader.upload(file, {
      resource_type: 'auto'
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const deleteImage = async id => {
  try {
    const messsage = await cloudinary.uploader.destroy(id);
    return messsage;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  uploads,
  deleteImage
};
