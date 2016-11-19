'use strict';
const jwtAuth = require('../lib/auth.js');
const models = require('../models');

const Book = models.Book;
const User = models.User;

let UserRoutes = {

  signUp: function(req, res) {
    User.findOne({name: req.body.name}, (err, user) => {
      if(err) throw err;
      if(!user) {
        var newUser = new User(req.body);
        newUser.save((err, user) => {
          res.json({
            data: user,
            token: user.generateToken()
          });
        });
      } else {
        res.json({status: 'failure', message: 'Username taken!'});
      }
    });
  },

  getAllUsers: function(req, res) {
    User.find({}, (err, users) => {
      if(err) throw err;
      res.status(200).json({ users });
    });
  },

  getOneUser: function(req, res) {
    User.findOne({_id:req.params.id}, (err, user) => {
      if(err) throw err;
      res.json({data: user});
    });
  },

  updateUser: function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if(err) throw err;
      res.json({message: 'Update successful!'});
    });
  },

  deleteUser: function(req, res) {
    User.findById(req.params.id).exec()
      .then((user) => {
        user.books.forEach((bookId) => {
          Book.findById(bookId).remove().exec();
        });
        user.remove();
        res.json({message: 'user removed'});
      })
      .catch((err) => {
        throw err;
      });
  },

  getUserBooks: function(req, res) {
    User.findOne({_id: req.params.id})
      .populate('books')
      .exec((err, user) => {
        if(err) throw err;
        res.status(200).json({data: user.books});
      });
  },

  addAbook: function(req, res) {

    User.findOne({_id: req.params.id})
      .populate('books').exec()
      .then((user) => {
        let books = user.books.filter((book) => {
          return req.body.title == book.title;
        });
        if(books.length > 0) {
          res.json({message: 'book already exist!'});
          console.log('aborted promise');
          throw new Error('book already exist!');
        } else {
          let newBook = new Book(req.body);
          newBook._owner.push(user._id);
          newBook.save();
          user.books.push(newBook._id);
          user.save();
          res.json({message: 'book added!'});
        }
      })
      .catch((err) => {
        if(err.message == 'book already exist!') {
          // abort promise
        } else {
          throw err;
        }
      });

  },

  removeABook: function(req, res) {

    User.findById(req.params.id).exec()
     .then((user) => {
       if(user.books.indexOf(req.params.bookId) == -1) {
         res.json({message: 'book does not exist'});
         console.log('aborted promise');
         throw new Error('book does not exist');
       } else {
         user.books.pull(req.params.bookId);
         user.save();
         Book.findById(req.params.bookId).remove();
         res.json({message: 'book removed!'})
       }
     })
     .catch((err) => {
       if(err.message == 'book does not exist') {
         // aborted promise
       } else {
         throw err;
       }
     });

  }

};

module.exports = UserRoutes;
