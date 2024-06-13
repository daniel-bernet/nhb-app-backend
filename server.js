"use strict";

const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");
const config = require("./config/config");

const app = express();
const PORT = config.development.backendport;

// Initialize Sequelize with connection settings
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
    port: config.development.port,
    logging: false,
  }
);

(async () => {
  try {
    // Authenticate and log the successful connection
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

//    // Import models and associate them
//    const models = require("./models");
//    Object.keys(models).forEach((modelName) => {
//      if (models[modelName].associate) {
//        models[modelName].associate(models);
//      }
//    });

    // Sync models with the database
    await sequelize.sync({ alter: true });
    console.log("Database & tables created! API ready for interaction!");

    // Middlewares
    app.use(cors());
    app.use(express.json());

    // Dynamically load routes
    const routes = require("./routes"); // Ensure you have an index.js in routes folder to manage this
    app.use(routes);

    // Default route
    app.get("/", (req, res) => {
      res.status(200).send("Hello World!");
    });

    // Start the server
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
