'use strict';

module.exports = (mongoose, models) => {
  let Schema = mongoose.Schema;
  const tradeSchema = new mongoose.Schema({
    requesteeBook: [{type: Schema.Types.ObjectId, ref: 'Book'}],
    requesterBook: [{type: Schema.Types.ObjectId, ref: 'Book'}],
    requesteeEmail: String,
    requesteeBookTitle: String,
    requesterBookTitle: String,
    requesterName: String,
    requesteeName: String,
    requesteeImgUrl: String,
    requesterImgUrl: String
  },{
    timestamps: true
  });

  const Trade = mongoose.model('Trade', tradeSchema);
  models.Trade = Trade;
};
