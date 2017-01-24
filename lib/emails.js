'use strict';

let mailgunCreds;

if( process.env.NODE_ENV == 'development') {
  mailgunCreds = require('../env/mailgunCreds');
}

const api_key = mailgunCreds.API_KEY || process.env.MAILGUN_API_KEY;
const domain =  mailgunCreds.DOMAIN  || process.env.MAILGUN_DOMAIN;
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });
const mailcomposer = require('mailcomposer');

module.exports = (trade) => {
  let html = '<!DOCTYPE html>' +
  '<html>' +
  '<head>' +
  	'<title>My Website</title>' +
  	'<meta charset="UTF-8" />' +
  	'<style type="text/css">' +
          'body {text-align: center; }' +
  	    '.float {float: left;margin: 10px;}' +
          'a {font-size: 40px;    }' +
         'footer {height: 120px; width: 100%; float: left; }' +
          '.four { font-size: 120px; margin-top: 80px; }' +
          '.trade { width: 400px; height: 300px; margin: 0 auto; }' +
  	'</style>' +
  '</head>' +
  '<body>' +
      '<h1>This trade is waiting for you!</h1>' +
      '<hr />' +
      '<div class="trade">' +
  	  '<div class="float">' +
          '<h3>Owner: ' + trade.requesteeName +'</h3>' +
          '<img src="' + trade.requesteeImgUrl + '" />' +
  	  '</div>' +
        '<div class="float four"><span>4</span></div>' +
        '<div class="float">' +
          '<h3>Owner: ' + trade.requesterName +'</h3>' +
          '<img src="' + trade.requesterImgUrl + '">' +
        '</div>' +
      '</div>' +
      '<footer>' +
            '<a href="https://book-swap-meet.herokuapp.com">View Trade</a>' +
      '</footer>'
  '</body>' +
  '</html>';

console.log(html);
  const mail = mailcomposer({
    from: 'Book-Swap <notifications@book-swap-meet.com>',
    to: 'alemneh@hotmail.com',
    subject: 'You Have a Pending Trade Request!',
    text: 'Alemneh wants to trade...',
    html: html
  });

  mail.build(function(mailBuildError, message) {

    var dataToSend = {
      to: 'alemneh@hotmail.com',
      message: message.toString('ascii')
    };

    mailgun.messages().sendMime(dataToSend, function(sendError, body) {
      if(sendError) {
        console.log(sendError);
        return;
      }
      console.log(body);
    });
  });

};
