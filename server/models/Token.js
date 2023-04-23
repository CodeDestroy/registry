
const { Model } = require("sequelize");
const sequelize = require('../sequelize')
const Sequelize = require("sequelize");

const Token = sequelize.define("token", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    token: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
          model: 'users',
          key: 'id'
      }
    },
  });

module.exports = Token;