'use strict';
const LoginRoutes = require('../routes/login-routes');

module.exports = (loginRouter, models) => {

  loginRouter.route('/login')
    .get((req, res) => {
      LoginRoutes.logIn(req, res); });

};
