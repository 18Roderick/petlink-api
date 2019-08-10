const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('message_error', 'No estas autorizados, Necesitas inciar sesion para acceder');
    res.redirect('/login/signin');
  }
};

const isAdmin = (req, res, next) => {
  if (req.isAuthenticated && req.user.roll === 'admin') next();
  res.redirect('/admin/signin');
};

module.exports = { isAuthenticated, isAdmin };
