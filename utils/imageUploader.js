const path = require('path');
const multer = require('multer');
const uuid = require('uuid/v4');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../galeria'));
  },
  filename: (req, file, cb) => {
    cb(null, `${uuid()}.${file.originalname.split('.')[1]}`);
  }
});

const upload = multer({ storage });

const singleUpload = (req, res, field) => {
  const server = upload.single(field);
  server(req, res, err => {
    if (err) throw new Error('no se pudo subir imagen');
    else {
      const file = {
        nombre: req.file.filename,
        path: `/galeria/${req.file.filename}`
      };
      return file;
    }
  });
};

module.exports = { upload };
