const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport")

router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }
  if (password != password2) {
    errors.push({ msg: "Password does not match" });
  }
  if (password.length < 5) {
    errors.push({ msg: "Please make password more then 5 characters" });
  }
  if (errors.length > 0) {
    res.render("register", { errors, name, email, password, password2 });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: "Email already exists" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const user = new User({
          name,
          email,
          password,
          password2
        });
        
         bcrypt.genSalt(10, (err, salt)=>{
             bcrypt.hash(user.password, salt, (err, hash)=> {
                 if(err) throw err;
                 user.password = hash;
                 user.save()
                 .then(user => {
                    req.flash(
                        'success_msg',
                        'You are now registered and can log in'
                      );
                    res.redirect('/users/login')
                 })
                 .catch(err => console.log(err))

             })
         })

        console.log(hashedPassword);
        res.send({ user: email });
      }
    });
  }
});
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
})
module.exports = router;
