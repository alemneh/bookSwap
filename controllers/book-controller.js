'use strict';

const BookRoutes= require('../routes/book-routes.js');

module.exports = (bookRouter, models) => {

  bookRouter.get('/books4trade', (req, res) => {BookRoutes.getAllBooks(req, res); });

};
