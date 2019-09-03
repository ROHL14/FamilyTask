const db = require("../models");

module.exports = {
  build: function() {
    db.Category.bulkCreate([
      { name: "Pets" },
      { name: "Studies" },
      { name: "Kitchen" }
    ]);
    db.Task.bulkCreate([
      { task_name: "Walk the dogs", CategoryId: "1" },
      { task_name: "Feed the cats", CategoryId: "1" },
      { task_name: "Feed the dogs", CategoryId: "1" },
      { task_name: "Study tech", CategoryId: "2" },
      { task_name: "Programming practice", CategoryId: "2" },
      { task_name: "Cook breakfast", CategoryId: "3" }
    ]);
  }
};
