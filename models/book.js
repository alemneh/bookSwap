'use strict';

module.exports = (mongoose, models) => {
  let Schema = mongoose.Schema;
  const bookSchema = new mongoose.Schema({
    _owner: [{type: Schema.Types.ObjectId, ref: 'User'}],
    title: String,
    imgUrl: String,
    owner: String,
    isPendingTrade: { type: Boolean, default: false }
  });

  const Book = mongoose.model('Book', bookSchema);
  models.Book = Book;
};
