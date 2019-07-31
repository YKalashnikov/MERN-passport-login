const express = require("express");
const app = express();
const index = require("./routes/index");
const users = require("./routes/users");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const flash = require("connect-flash");
const session = require("express-session");
const passport = require('passport');
require('./config/passport')(passport)

mongoose
  .connect(db, { useNewUrParser: true })
  .then(() => console.log("Mongo is connected"))
  .catch(err => console.log(err));

app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "Secret",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});
app.use("/", index);
app.use("/users", users);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
