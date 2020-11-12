"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "answers",
      [
        {
          id: 1,
          answer: "Muis",
          answerImage:
            "https://www.thailandblog.nl/wp-content/uploads/olifant_1596648931.jpg",
          answerSound:
            "http://www.orangefreesounds.com/wp-content/uploads/2020/02/Meowing-cat-sound.mp3",
          quizId: 1,
          isCorrect: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          answer: "Hond",
          answerImage:
            "https://www.thailandblog.nl/wp-content/uploads/olifant_1596648931.jpg",
          answerSound:
            "http://www.orangefreesounds.com/wp-content/uploads/2020/02/Meowing-cat-sound.mp3",
          quizId: 1,
          isCorrect: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          answer: "Olifant",
          answerImage:
            "https://www.thailandblog.nl/wp-content/uploads/olifant_1596648931.jpg",
          answerSound:
            "http://www.orangefreesounds.com/wp-content/uploads/2020/02/Meowing-cat-sound.mp3",
          quizId: 1,
          isCorrect: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          answer: "Stier",
          answerImage:
            "https://www.thailandblog.nl/wp-content/uploads/olifant_1596648931.jpg",
          answerSound:
            "http://www.orangefreesounds.com/wp-content/uploads/2020/02/Meowing-cat-sound.mp3",
          quizId: 1,
          isCorrect: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          answer: "Koe",
          answerImage:
            "https://www.thailandblog.nl/wp-content/uploads/olifant_1596648931.jpg",
          answerSound:
            "http://www.orangefreesounds.com/wp-content/uploads/2020/02/Meowing-cat-sound.mp3",
          quizId: 2,
          isCorrect: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          answer: "Poes",
          answerImage:
            "https://www.thailandblog.nl/wp-content/uploads/olifant_1596648931.jpg",
          answerSound:
            "http://www.orangefreesounds.com/wp-content/uploads/2020/02/Meowing-cat-sound.mp3",
          quizId: 2,
          isCorrect: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          answer: "Vogel",
          answerImage:
            "https://www.thailandblog.nl/wp-content/uploads/olifant_1596648931.jpg",
          answerSound:
            "http://www.orangefreesounds.com/wp-content/uploads/2020/02/Meowing-cat-sound.mp3",
          quizId: 2,
          isCorrect: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 8,
          answer: "Egel",
          answerImage:
            "https://www.thailandblog.nl/wp-content/uploads/olifant_1596648931.jpg",
          answerSound:
            "http://www.orangefreesounds.com/wp-content/uploads/2020/02/Meowing-cat-sound.mp3",
          quizId: 2,
          isCorrect: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("answers", null, {});
  },
};
