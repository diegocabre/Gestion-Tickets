module.exports = function addUserToLocals(req, res, next) {
  res.locals.user = req.user; // `req.user` se define en el middleware `isAuthenticated`
  next();
};
