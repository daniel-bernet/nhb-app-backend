'use strict';

const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const config = require('./config/config');

const app = express();
const PORT = config.development.backendport;

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
    port: config.development.port,
    logging: false
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    app.use(cors());
    app.use(express.json());

    // Account endpoints
    const accountRoutes = require('./routes/account');
    app.use('/account', accountRoutes);

    // Group endpoints
    const groupRoutes = require('./routes/group');
    app.use('/group', groupRoutes);

    app.get('/', (req, res) => { //test route, remove for production!!!!!
      res.status(200).send('Hello World!');
    });

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
