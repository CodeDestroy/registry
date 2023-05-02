const { Model } = require("sequelize");
const sequelize = require('../sequelize')
const Sequelize = require("sequelize");

const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    secondName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    patronomicName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    role: {
        type: Sequelize.STRING,
        allowNull: true
    },
    district: {
        type: Sequelize.STRING,
        allowNull: true
    },
    login: {
        type: Sequelize.STRING,
        allowNull: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true
    }
  });

module.exports = User;