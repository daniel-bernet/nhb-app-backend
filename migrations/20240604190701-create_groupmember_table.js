'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GroupMembers', {
      GroupMemberID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      GroupID: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Groups',
          key: 'GroupID'
        },
        onDelete: 'CASCADE'
      },
      AccountID: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Accounts',
          key: 'AccountID'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('GroupMembers');
  }
};
