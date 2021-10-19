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
    defaultValue: "https://upload.wikimedia.org/wikipedia/commons/0/05/HONDA_ASIMO.jpg",
  },
});

module.exports = Robot;
