"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  answer.init(
    {
      answer: { type: DataTypes.STRING, unique: true },
      answerImage: { type: DataTypes.STRING, unique: true },
      answerSound: { type: DataTypes.STRING, unique: true },
      quizId: { type: DataTypes.INTEGER, allowNull: false },
      isCorrect: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "answer",
    }
  );

  answer.associate = function (models) {
    answer.belongsTo(models.quiz);
  };
  return answer;
};
