const router = require("express").Router();
const db = require("../models");

router.post("/addCategory", (req, res) => {
  const { name } = req.body;
  const newCategory = {
    name
    //id: req.user.id
  };
  db.Category.create(newCategory)
    .then(category => {
      //res.json({ success: true, family: family });
      req.flash("success", `Category added`);
      res.redirect("/category");
    })
    .catch(err => {
      res.json({ success: false, error: err });
    });
});

router.post("/addTask", (req, res) => {
  const { task_name, CategoryId } = req.body;
  const newTask = {
    task_name,
    CategoryId
    //id: req.user.id
  };
  db.Task.create(newTask)
    .then(task => {
      //res.json({ success: true, family: family });
      req.flash("success", `Task added`);
      res.redirect("/task");
    })
    .catch(err => {
      res.json({ success: false, error: err });
    });
});

module.exports = router;
