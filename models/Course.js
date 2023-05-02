const { Model } = require("sequelize");
const sequelize = require('../sequelize')
const Sequelize = require("sequelize");

const Course = sequelize.define("course", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    course_name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

module.exports = Course;