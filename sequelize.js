const Sequelize = require("sequelize");
const sequelize = new Sequelize("registry", "root", "root", {
  dialect: "mysql",
  host: "localhost"
});

module.exports = sequelize