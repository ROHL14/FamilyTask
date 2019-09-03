module.exports = function(sequelize, DataTypes) {
  const Family = sequelize.define("Family", {
    family_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Family.associate = function(models) {
    Family.hasMany = (models.Family_Member,
    {
      onDelete: "cascade"
    });
  };

  return Family;
};
