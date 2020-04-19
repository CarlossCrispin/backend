// const Tasks = require('../models').Task;

'use strict';

const socket = require('../realtime/client');
// const socket = require('socket.io-client');

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    description: DataTypes.TEXT
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User,{
      as: 'user'
    });

    Task.belongsToMany(models.Category, {
      through: 'TaskCategories',
      as: 'categories'
    });
  };

  Task.afterCreate(function(task,options) {
    socket.emit('new_task', task);
    console.log("\n\nenviando\n\n");
  });


  return Task;
};
