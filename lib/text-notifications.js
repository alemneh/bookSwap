
var twilloCred = require('../env/twillo');
var accountSid = twilloCred.accountSid;
var authToken = twilloCred.authToken;

var client = require('twilio')(accountSid, authToken);


function send(number) {

  client.messages.create({
    to: '+1' + number,
    from: '+16197710347',
    body: 'You have a new trade request! https://book-swap-meet.herokuapp.com',
  }, function (err, message) {
    if(err) console.log(err);
    console.log(message.sid);
  });

}


module.exports = {
  send: send
};
