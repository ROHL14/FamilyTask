const router = require("express").Router();
const db = require("../models");
const { isLoggedIn } = require("../lib/out");

router.get("/edit/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const task = await db.To_Do.findOne({
    where: {
      id
    }
  });
  res.render("pages/edit", { task: task.dataValues });
});

router.post("/edit/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  /*const updateFamily = {
    family_name,
    email,
    password
  };*/
  await db.To_Do.update({ name }, { where: { id } });
  req.flash("success", "Task updated");
  res.redirect("/list");
});

module.exports = router;
