module.exports = function(sequelize, DataTypes) {
  const To_Do = sequelize.define("To_Do", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    assign_member: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_todo: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    time_todo: {
      type: DataTypes.TIME,
      allowNull: true
    }
  });

  To_Do.associate = function(models) {
    To_Do.belongsTo(models.Family_Member, {
      foreignKey: {
        allowNull: false
      }
    });

    To_Do.belongsTo(models.Task, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return To_Do;
};
