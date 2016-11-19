'use strict';
const models = require('../models');

const Book = models.Book;

let BookRoutes = {

  getAllBooks: function(req, res) {
    Book.find({}, (err, books) => {
      if(err) throw err;
      res.json({
        books
      });
    });
  }

};


module.exports = BookRoutes;
