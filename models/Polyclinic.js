

const { Model } = require("sequelize");
const sequelize = require('../sequelize')
const Sequelize = require("sequelize");

const Polyclinic = sequelize.define("polyclinic", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    polyclinic_name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

module.exports = Polyclinic;