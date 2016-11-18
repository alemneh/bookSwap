'use strict';
const LoginController = require('../controllers/login-controller');

module.exports = (loginRouter, models) => {

  loginRouter.route('/login')
    .get((req, res) => {
      LoginController.logIn(req, res); });

};
