const { Model } = require("sequelize");
const sequelize = require('../sequelize')
const Sequelize = require("sequelize");

const PITRS = sequelize.define("PITRS", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    PITRS_name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

module.exports = PITRS;