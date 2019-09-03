const router = require("express").Router();
const db = require("../models");
const { isLoggedIn, isSignIn } = require("../lib/out");

router.post("/save/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { name, role } = req.body;
  const newData = {
    name,
    role
  };
  db.Family_Member.update({ name: name, role: role }, { where: { id } });

  res.redirect("/profile");
});

module.exports = router;
