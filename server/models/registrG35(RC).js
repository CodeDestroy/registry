const { Model } = require("sequelize");
const sequelize = require('../sequelize')
const Sequelize = require("sequelize");

const City = require('./City')
const Course = require('./Course')
const PITRS = require('./PITRS')
const Polyclinic = require('./Polyclinic')


const RegistrG35 = sequelize.define("registrG35", {
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
    birthDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    cityId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'cities',
            key: 'id'
        }
    },
    addressFact: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    polyclinicId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'polyclinics',
            key: 'id'
        }
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true
    },
    invalid: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    coureId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'courses',
            key: 'id'
        }

    },
    edss: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    pitrsId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'pitrs',
            key: 'id'
        }

    },
    therapy: {
        type: Sequelize.STRING,
        allowNull: true
    },
    diagnozDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    mrt: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    vipiski: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    comments: {
        type: Sequelize.TEXT,
        allowNull: true
    }
  });

module.exports = RegistrG35;
