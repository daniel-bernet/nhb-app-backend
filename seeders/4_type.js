'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Types', [{
            TypeID: uuidv4(),
            Label: 'gig',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            TypeID: uuidv4(),
            Label: 'rehearsal',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            TypeID: uuidv4(),
            Label: 'stamm',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            TypeID: uuidv4(),
            Label: 'meeting',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            TypeID: uuidv4(),
            Label: 'unspecified',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Types', null, {});
    }
};
