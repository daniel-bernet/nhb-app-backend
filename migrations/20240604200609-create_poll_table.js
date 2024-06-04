'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Polls', {
      PollID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      TypeID: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Types',
          key: 'TypeID'
        },
        onDelete: 'CASCADE'
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
      Title: {
        allowNull: false,
        type: Sequelize.STRING(64)
      },
      Description: {
        allowNull: false,
        type: Sequelize.STRING(512)
      },
      IsClosed: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('Polls');
  }
};
