const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");
const helpers = require("../lib/helpers");

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      const rows = await db.Family_Member.findOne({ where: { email } });

      if (rows) {
        const user = rows.dataValues;
        //console.log(user);

        const validPassword = await helpers.matchPassword(
          password,
          user.password
        );

        if (validPassword) {
          done(null, user);
        } else {
          done(null, false, req.flash("message", "Incorrect Password"));
        }
      } else {
        return done(
          null,
          false,
          req.flash("message", "Wrong email or you have not sing up")
        );
      }
    }
  )
);

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      userExist = await db.Family_Member.findOne({
        where: { email }
      });

      if (userExist) {
        done(
          null,
          false,
          req.flash("message", "That email is already register")
        );
      } else {
        const { family_name, name, role } = req.body;
        const newFamily = {
          family_name
        };

        const family = await db.Family.create(newFamily);
        const newUser = {
          name,
          email,
          password,
          role,
          admin: true,
          FamilyId: family.dataValues.id
        };
        newUser.password = await helpers.encryptPassword(password);
        const result = await db.Family_Member.create(newUser);
        //console.log(result);
        newUser.id = result.dataValues.id;
        return done(null, newUser);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await db.Family_Member.findOne({
    where: id
  });
  //console.log(rows);
  done(null, rows);
});
