const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const mysqlStore = require("express-mysql-session");
const passport = require("passport");

// initializations
const app = express();
require("./lib/passport");

// settings
const PORT = process.env.PORT || 4000;
app.set("port", PORT);
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars")
  })
);
app.set("view engine", ".hbs");

// database
const db = require("./models");

// Middlewares
app.use(
  session({
    secret: "task-family-session",
    resave: true,
    saveUninitialized: true
  })
);

app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.message = req.flash("message");
  app.locals.user = req.user;
  //console.log(app.locals.user);
  next();
});

// Routes

app.use(require("./routes/getRoutes"));
app.use(require("./routes/postRoutes"));
app.use(require("./routes/deleteRoutes"));
app.use(require("./routes/authentication"));
app.use(require("./routes/developerRoute"));
app.use(require("./routes/updateRoutes"));

// Public
app.use(express.static(path.join(__dirname, "/public")));
//app.use(express.static("public"));

// Starting server
/*app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});*/

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
});
