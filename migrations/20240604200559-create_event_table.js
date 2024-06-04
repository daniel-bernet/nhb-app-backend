'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      EventID: {
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
      TypeID: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Types',
          key: 'TypeID'
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
      Location: {
        allowNull: false,
        type: Sequelize.STRING(64)
      },
      Date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      Duration: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Events');
  }
};
