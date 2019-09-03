const router = require("express").Router();
const db = require("../models");
const { isLoggedIn } = require("../lib/out");

router.get("/delete/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  await db.To_Do.destroy({
    where: {
      id
    }
  });
  req.flash("success", "Task deleted");
  res.redirect("/list");
});

module.exports = router;
