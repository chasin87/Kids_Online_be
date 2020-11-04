"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "quizzes",
      [
        {
          id: 1,
          question: "Wat rijmt er op vogel?",
          questionImage:
            "https://www.thailandblog.nl/wp-content/uploads/olifant_1596648931.jpg",
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
