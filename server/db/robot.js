const db = require("./database");
const Sequelize = require("sequelize");

const Robot = db.define("robot", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  fuelType: {
    type: Sequelize.STRING,
    defaultValue: "electric",
    validate: {
      isIn: [["gas", "diesel", "electric"]],
    },
  },
  fuelLevel: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 100,
    validate: {
      isDecimal: true,
      min: 0,
      max: 100,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FRobot&psig=AOvVaw0GSZ4q0-DX_n7LvhxaO3tI&ust=1634764060099000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJivpeuw1_MCFQAAAAAdAAAAABAD",
  },
});

module.exports = Robot;
