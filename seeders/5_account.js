'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Accounts', [{
      AccountID: uuidv4(),
      FirstName: 'test',
      LastName: 'test',
      Email: 'test@test.com',
      PasswordHash: '$2b$10$yrPyPLB8MruPaoktknEMSuCuU17O2x99VkynvclDVLELlJB7wgCn6',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Accounts', null, {});
  }
};
