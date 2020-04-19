const Task = require("../models").Task;
const User = require('../models').User;

module.exports = {
  /*  home: function (req,res) {
    Task.findAll().then(function(tasks) {
      // console.log(tasks);
      res.render('tasks/index',{tareas:tasks});
    });
  } */

  // IMPORTANTE para todos los elementos
  // index: function (req, res) {
  //   Task.findAll().then((tasks) => {
  //     res.render("tasks/index", { tasks: tasks });
  //   });
  // },

  index: function (req, res) {
    Task.findAll().then((tasks) => {
      res.render("tasks/index", { tasks: req.user.tasks });
    });
  },
  create: function (req, res) {
    Task.create({
      description: req.body.description,
      userId: req.user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    })
      .then((result) => {
        // res.json(result);
        res.redirect('/tasks');
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
  new: function (req, res) {
    res.render("tasks/new");
  },
  show: function (req, res) {
    // Task.findAll({where:{id: req.params.id}}).then(function (task) {
    //   res.json(task);
    // });

    Task.findByPk(req.params.id,{
      include:[
        // modelo
        // {model: User, as: 'user'}
        'user'
      ]
    }).then(function (task) {
      res.render("tasks/show", { task });
    });
  },
  update: function (req, res) {
    msj = true;
    Task.update(
      { description: req.body.description },
      {
        where: { id: req.params.id },
      }
    ).then(function (response) {
      res.redirect("/tasks/" + req.params.id);
    });
  },
  edit: function (req, res) {
    Task.findByPk(req.params.id).then(function (task) {
      res.render("tasks/edit", { task });
    });
  },
  destroy: function (req, res) {

    Task.destroy({
      where: {
        id: req.params.id },
    }).then(function (contadorElementosEliminados) {
      res.redirect('/tasks');
    });
  },
};
