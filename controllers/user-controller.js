'use strict';
const jwtAuth = require('../lib/auth.js');

const UserRoutes = require('../routes/user-routes');
module.exports = (userRouter, models) => {


  userRouter.route('/signup')
    .post((req, res) => { UserRoutes.signUp(req, res); });



  userRouter.get('/users', (req, res) => { UserRoutes.getAllUsers(req, res); });


  userRouter.route('/users/:id')
    .get(jwtAuth, (req, res)    => { UserRoutes.getOneUser(req, res); })
    .put(jwtAuth, (req, res)    => { UserRoutes.updateUser(req, res); })
    .delete(jwtAuth, (req, res) => { UserRoutes.deleteUser(req, res); });


  userRouter.route('/users/:id/books')
    .get(jwtAuth, (req, res)    => { UserRoutes.getUserBooks(req, res); })
    .post(jwtAuth, (req, res)   => { UserRoutes.addAbook(req, res); });


  userRouter.route('/users/:id/bookings/:bookId')
    .delete(jwtAuth, (req, res) => { UserRoutes.delete_a_booking(req, res); });




};
