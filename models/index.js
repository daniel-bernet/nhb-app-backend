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
const Event = require("./event")(sequelize, DataTypes);
const Answer = require("./answer")(sequelize, DataTypes);
const Option = require("./option")(sequelize, DataTypes);
const Poll = require("./poll")(sequelize, DataTypes);
const PollQuestionJoin = require("./pollquestionjoin")(sequelize, DataTypes);
const Question = require("./question")(sequelize, DataTypes);
const QuestionOptionJoin = require("./questionoptionjoin")(
  sequelize,
  DataTypes
);
const Sentiment = require("./sentiment")(sequelize, DataTypes);
const Type = require("./type")(sequelize, DataTypes);

const models = {
  Account,
  GroupMember,
  Group,
  Band,
  Event,
  Answer,
  Option,
  Poll,
  PollQuestionJoin,
  Question,
  QuestionOptionJoin,
  Sentiment,
  Type,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
