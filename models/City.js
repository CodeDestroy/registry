const { Model } = require("sequelize");
const sequelize = require('../sequelize')
const Sequelize = require("sequelize");

const City = sequelize.define("city", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    city_name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

module.exports = City;