const express = require("express");
let RegistrationController = require('../controllers/registrations')

let router = express.Router();

router.get('/singup', RegistrationController.new);

router.route('/users').post(RegistrationController.create);


module.exports = router;
