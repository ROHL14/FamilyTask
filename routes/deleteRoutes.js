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
  req.flash("success", "Task done");
  res.redirect("/to_dos");
});

router.get("/deleteTask/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  await db.Task.destroy({
    where: {
      id
    }
  })
    .then(task => {
      //res.json({ success: true, family: family });
      //req.flash("success", "Task added");
      req.flash("success", "Task deleted");
      res.redirect("/Tasks");
    })
    .catch(err => {
      //res.json({ success: false, error: err });
      req.flash(
        "message",
        "You can't deleted because someone is doing the task"
      );
      res.redirect("/Tasks");
    });
});

router.get("/deleteMember/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  await db.Family_Member.destroy({
    where: {
      id
    }
  });
  req.flash("success", "Family member deleted");
  res.redirect("/family");
});

module.exports = router;
