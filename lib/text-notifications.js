
var twilloCred;

if( process.env.NODE_ENV == 'development') {
  twilloCred = require('../env/twillo');
} else {
  twilloCred = process.env;
}
var accountSid = twilloCred.accountSid || process.env.accountSid;
var authToken = twilloCred.authToken   || process.env.authToken;

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
