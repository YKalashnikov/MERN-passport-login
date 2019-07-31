 const Authenticated= (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("err_msg", "Please log in");
    res.redirect("/users/login");
  }
  module.exports = Authenticated;
