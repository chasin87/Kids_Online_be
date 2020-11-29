"use strict";
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constants");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "gebruikers",
      [
        {
          id: 1,
          userName: "gebruiker1",
          email: "yasinyuksek87@gmail.com",
          password: bcrypt.hashSync("1234", SALT_ROUNDS),
          level: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("gebruikers", null, {});
  },
};
