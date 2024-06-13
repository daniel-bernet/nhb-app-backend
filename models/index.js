const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config");

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  config.development
);

const Account = require("./account")(sequelize, DataTypes);
const GroupMember = require("./groupmember")(sequelize, DataTypes);
const Group = require("./group")(sequelize, DataTypes);
const Band = require("./band")(sequelize, DataTypes);
//const Event = require("./event")(sequelize, DataTypes);

const models = {
  Account,
  GroupMember,
  Group,
  Band,
//  Event,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
