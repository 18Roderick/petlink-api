const express = require('express');

const router = express.Router();

router.use((req, res) => {
  res.status(404).render('error', {
    title: 'Pagina 404',
    message: 'Error 404',
    stack: `Pagina no encontrada ${req.protocol}://${req.hostname}${req.url}`
  });
});

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.render('error', {
    title: err.message,
    message: err.message,
    stack: err.stack
  });
});

module.exports = router;
