module.exports = function(squelize, DataTypes) {
  const Family_Member = squelize.define("Family_Member", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      key: true,
      validate: { isEmail: true },
      index: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: 0
    }
  });

  Family_Member.associate = function(models) {
    Family_Member.hasMany = (models.To_Do,
    {
      onDelete: "cascade"
    });

    Family_Member.belongsTo(models.Family, {
      foreingKey: { allowNull: false }
    });
  };

  return Family_Member;
};
