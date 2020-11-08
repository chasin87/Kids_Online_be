"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "quizzes",
      [
        {
          id: 0,
          question: "Wat rijmt er op vogel?",
          questionImage:
            "https://www.thailandblog.nl/wp-content/uploads/olifant_1596648931.jpg",
          questionCategory: "Rijmen",
          questionLevel: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("quizzes", null, {});
  },
};
