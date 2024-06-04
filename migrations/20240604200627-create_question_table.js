'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Questions', {
      QuestionID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      Question: {
        allowNull: false,
        type: Sequelize.STRING(128)
      },
      Date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      Duration: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      Description: {
        allowNull: false,
        type: Sequelize.STRING(512)
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
    await queryInterface.dropTable('Questions');
  }
};
