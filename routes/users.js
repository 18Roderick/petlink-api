const router = require('express').Router();
const { upload: imageUploader } = require('../utils/imageUploader');
const { Usuario, Imagenes, Producto } = require('../models');
const { isAuthenticated } = require('../middleware/isAuthenticated');

router.use(isAuthenticated);

router.get('/petlinker', (req, res) => {
  res.render('petlinker', { title: 'Petlinker' });
});

router.get('/store', async (req, res) => {
  res.render('store', { title: 'Tienda' });
});
router.get('/profile', async (req, res) => {
  try {
    const user = await Usuario.findById(req.user._id);
    user.foto = await Imagenes.findOne({ usuario: user._id });

    res.render('profile', { title: user.nombre, user });
  } catch (error) {
    res.json(error);
  }
});

router.get('/profile/update', (req, res) => {
  res.render('profile/update');
});

router.('/profile/update');

router.post('/images/profile', imageUploader.single('profile'), async (req, res) => {
  console.log(req.file, req.files);
  res.json(req.file);
});
router.put('/images/profile', imageUploader.single('profile'), async (req, res) => {
  
});

// registro del perro
router.get('/dog', (req, res) => {});
router.post('/dog', async (req, res) => {});
router.put('/dog', async (req, res) => {});

router.delete('/images/dog/:id', (req, res) => {
  res.json({ id: req.params.id });
});

router.post('/images/dog', async (req, res) => {
  try {
    const server = imageUploader.array('dog', 3);
    server(req, res, err => {
      if (err) res.json({ ...err, message: 'solo puede subir 3 imagenes por vez' });
      else {
        const files = req.files.map(file => {
          return {
            nombre: file.filename,
            path: `/galeria/${file.filename}`
          };
        });
        res.json(files);
      }
    });
  } catch (error) {
    res.json({ error, message: 'solo se permiten 3 imagenes por perro' });
  }
});

module.exports = router;
