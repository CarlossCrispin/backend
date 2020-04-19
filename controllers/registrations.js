const User = require('../models').User;
module.exports = {

  new: function (req, res) {
    res.render('registration/new');
  },

  create: function (req, res) {
    let data = {
      email: req.body.email,
      password: req.body.password
    }

    User.create(data).then(result=>{
      res.redirect('/sessions');
    }).catch(err=>{
      res.json(err);
    });
  }
}
