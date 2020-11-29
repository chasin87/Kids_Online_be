("use strict");
module.exports = (sequelize, DataTypes) => {
  const gebruiker = sequelize.define(
    "gebruiker",
    {
      userName: { type: DataTypes.STRING, unique: true, allowNull: false },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      level: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  gebruiker.associate = function (models) {};
  return gebruiker;
};
