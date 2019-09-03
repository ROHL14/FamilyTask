const router = require("express").Router();
const db = require("../models");
const { isLoggedIn, isSignIn } = require("../lib/out");

router.post("/add", isLoggedIn, async (req, res) => {
  const { task_name, assign_member, date_todo, time_todo } = req.body;
  const Task = await db.Task.findOne({
    where: { task_name }
  });

  const newTask = {
    name: task_name,
    assign_member,
    date_todo,
    time_todo,
    FamilyMemberId: req.user.id,
    TaskId: Task.dataValues.id
  };
  await db.To_Do.create(newTask)
    .then(task => {
      //res.json({ success: true, family: family });
      //req.flash("success", "Task added");
      res.redirect("/to_dos");
    })
    .catch(err => {
      res.json({ success: false, error: err });
    });
});

/*router.post("/add", (req, res) => {
  db.Family.create(req.body)
    .then(family => {
      console.log(family);
      res.json({ success: true, family: family });
    })
    .catch(err => {
      console.log(err);
      res.json({ success: false, error: err });
    });
});*/

/*router.post("/addCategory", (req, res) => {
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
});*/

router.post("/addTask", (req, res) => {
  const { task_name } = req.body;
  const newTask = {
    task_name
    //id: req.user.id
  };
  db.Task.create(newTask)
    .then(task => {
      //res.json({ success: true, family: family });
      req.flash("success", `Task added`);
      res.redirect("/tasks");
    })
    .catch(err => {
      res.json({ success: false, error: err });
    });
});

router.post("/addFamily", async (req, res) => {
  const { name, email, role, check } = req.body;

  userExist = await db.Family_Member.findOne({
    where: { email }
  });

  if (userExist) {
    req.flash("message", "That email is already register");
    res.redirect("/family");
  } else {
    if (check) {
      admin = true;
    } else {
      admin = false;
    }
    const newFamilyMember = {
      name,
      email,
      password: req.user.password,
      role,
      admin,
      FamilyId: req.user.FamilyId
    };
    db.Family_Member.create(newFamilyMember).then(() => {
      //req.flash("success", "New Family member added");
      res.redirect("/family");
    });
  }
  //res.send(req.body);
});

module.exports = router;
