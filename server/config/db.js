// config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false, // disable SQL logs in console
  dialectOptions: {
    ssl: {
      require: true, // Neon requires SSL
      rejectUnauthorized: false, // allow self-signed certs
    },
  },
});

module.exports = sequelize;
