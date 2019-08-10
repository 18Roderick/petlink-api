module.exports = (req, res, next) => {
  res.locals.message_succes = req.flash('message_succes');
  res.locals.message_error = req.flash('message_error');
  res.locals.welcome = req.flash('welcome');
  res.locals.errors = req.flash('errors');
  res.locals.user = req.user || null;
  next();
};
