'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Bands', [{
            BandID: uuidv4(),
            Description: 'NoHeadBand',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Bands', null, {});
    }
};
