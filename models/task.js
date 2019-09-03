module.exports = function(sequelize, DataTypes) {
  const Task = sequelize.define("Task", {
    task_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Task.associate = function(models) {
    Task.hasMany = (models.To_Do,
    {
      onDelete: "cascade"
    });
  };

  return Task;
};
