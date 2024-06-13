const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Group extends Model { }

  Group.init({
    GroupID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    BandID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Bands',
        key: 'BandID'
      },
    },
    Name: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING(512),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Group',
    tableName: 'Groups'
  });

  Group.associate = function (models) {
    this.belongsTo(models.Band, {
      foreignKey: 'BandID',
      as: 'band'
    });
//    this.hasMany(models.Event, {
//      foreignKey: 'GroupID',
//      as: 'events'
//    });
//    this.hasMany(models.Poll, {
//      foreignKey: 'GroupID',
//      as: 'polls'
//    });
    this.belongsToMany(models.Account, {
      through: models.GroupMember,
      foreignKey: 'GroupID',
      otherKey: 'AccountID',
      as: 'members'
    });
    this.hasMany(models.GroupMember, {
      foreignKey: 'GroupID',
      as: 'groupMembers'
    });
  };

  return Group;
};
