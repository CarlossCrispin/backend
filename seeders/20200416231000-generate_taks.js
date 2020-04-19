'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    // Add altering commands here.
    // Return a promise to correctly handle asynchronicity.

    // Example:
    return queryInterface.bulkInsert('tasks', [{
      id: 1,
      description: 'Curso de Backend',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      description: 'Curso de laravel',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      description: 'Curso de Gatsby   ',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('tasks', null, {});
  }
};
