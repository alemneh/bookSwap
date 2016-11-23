'use strict';
const jwtAuth = require('../lib/auth.js');
const models = require('../models');

const Book = models.Book;
const User = models.User;
const Trade = models.Trade;

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
         res.json({message: 'book removed!'});
       }
     })
     .catch((err) => {
       if(err.message == 'book does not exist') {
         // aborted promise
       } else {
         throw err;
       }
     });

  },

  requestATrade: function(req, res) {
    let newTrade = new Trade(req.body);
    User.findById(req.params.id).exec()
      .then((requesterUser) => {
        requesterUser.pendingTrade.push(newTrade._id);
        requesterUser.save();
        return User.findById(req.body.requesteeId).exec();
      })
      .then((requesteeUser) => {
        requesteeUser.tradeRequest.push(newTrade._id);
        requesteeUser.save();
        newTrade.save();
        res.json({message: 'trade request sent!'});
      })
      .catch((err) => {
        throw err;
      });
  },

  getUserTrades: function(req, res) {
    User.findById(req.params.id)
      .populate('tradeRequest pendingTrade')
      .exec((err, user) => {
        if(err) throw err;
        res.json({
          tradeRequest: user.tradeRequest,
          pendingTrade: user.pendingTrade
        });
      });
  },

  acceptTrade: function(req, res) {
    var requesterId, requesteeId,
      requesterBook, requesteeBook;

    Trade.findById(req.params.tradeId)
      .populate('requesterBook requesteeBook')
      .exec()
      .then((trade) => {

        // store vars for book and user ids
        requesterBook = trade.requesterBook[0],
        requesteeBook = trade.requesteeBook[0];
        requesterId = requesterBook._owner[0];
        requesteeId = requesteeBook._owner[0];

        //swap owners of requesteebook
        requesteeBook._owner.pull(requesteeId);
        requesteeBook._owner.push(requesterId);

        //swap owners of requesterbook
        requesterBook._owner.pull(requesterId);
        requesterBook._owner.push(requesteeId);
        requesteeBook.save();
        requesterBook.save();

        //remove trade from db
        trade.remove();

        return User.findById(requesterId).exec();
      })
      .then((requesterUser) => {

        // swicth bookId of requester with requestee bookId
        requesterUser.books.pull(requesterBook._id);
        requesterUser.books.push(requesteeBook._id);

        // remove tradeId
        requesterUser.pendingTrade.pull(req.params.tradeId);
        requesterUser.save();

        return User.findById(requesteeId).exec();
      })
      .then((requesteeUser) => {

        // swicth bookId of requestee with requester bookId
        requesteeUser.books.pull(requesteeBook._id);
        requesteeUser.books.push(requesterBook._id);

        // remove tradeId
        requesteeUser.tradeRequest.pull(req.params.tradeId);
        requesteeUser.save();
        res.json({message: 'trade successful!'});
      })
      .catch((err) => {
        throw err;
      });
  }

};

module.exports = UserRoutes;
