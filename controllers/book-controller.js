'use strict';

const BookRoutes= require('../routes/book-routes.js');

module.exports = (bookRouter, models) => {

  bookRouter.get('/books', (req, res) => {BookRoutes.getAllBooks(req, res); });

};
