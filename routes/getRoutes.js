const router = require("express").Router();
const db = require("../models");
const { isLoggedIn, isSignIn } = require("../lib/out");
//const { build } = require("../lib/build");

router.get("/", isSignIn, (req, res) => {
  //build();
  res.render("index");
});

/*router.get("/add", (req, res) => {
  res.render("family/add");
});*/

/*router.get("/list", isLoggedIn, async (req, res) => {
  const family = await db.Family.findOne({
    where: { id: req.user.id }
  });
  //res.json(family);
  res.render("pages/lists", { family });
});*/

router.get("/to_dos", isLoggedIn, async (req, res) => {
  let ToDos = [];
  const Family = await db.Family_Member.findAll({
    where: { FamilyId: req.user.FamilyId }
  });

  const Task = await db.Task.findAll({});
  //console.log(Family);

  for (i = 0; i < Family.length; i++) {
    const ToDo = await db.To_Do.findAll({
      where: { FamilyMemberId: Family[i].id }
    });
    //console.log(Task);
    if (ToDo != "") {
      if (ToDo[0].FamilyMemberId === Family[i].id) {
        ToDo[0].dataValues.Member = Family[i].name;
        //console.log(Task[0].dataValues);
      }
    }

    ToDos[i] = ToDo;
  }

  const Data = { Family, Task, ToDos };

  //console.log(Tasks[0][0].dataValues);
  res.render("pages/todos", { Data });
  //res.send(Tasks);
});

/*router.get("/assignTask/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  //console.log(req.params);

  const Task = await db.Task.findAll({});
  //console.log(Task);

  const Member = await db.Family_Member.findOne({ where: { id } });
  //console.log(Member);

  const Data = { Task, Member };
  //res.send(Data);
  res.render("pages/assignTask", { Data });
});*/

router.get("/tasks", isLoggedIn, async (req, res) => {
  //res.send(Data);
  const Task = await db.Task.findAll({});
  console.log(Task);
  res.render("pages/addTask", { Task });
});

/*router.get("/category", (req, res) => {
  res.render("developer/addCategory");
});

router.get("/task", (req, res) => {
  res.render("developer/addTask");
});*/

router.get("/family", isLoggedIn, async (req, res) => {
  const Family = await db.Family_Member.findAll({
    where: { FamilyId: req.user.FamilyId }
  });
  //res.send(req.user);
  res.render("pages/family", { Family });
});

/*router.get("/newMember", isLoggedIn, (req, res) => {
  res.render("pages/addFamily");
});*/

router.get("/edit/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const data = await db.Family_Member.findOne({ where: { id } });
  res.render("pages/editProfile", { data });
});

module.exports = router;
