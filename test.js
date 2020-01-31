var request = require("request");

var options = { method: 'POST',
  url: 'http://localhost:3000/questions/',
  headers: 
   { 
     'cache-control': 'no-cache',
     authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTMxODQ3OWJhZWM5MTMxMzQwOTExN2QiLCJpYXQiOjE1ODAzNzQ5MDAsImV4cCI6MTU4MDM3ODUwMH0.0yItCB4DP_V3Dcauwg9ohvIc2vthMve-A1Hy_a_YpK8',
     'content-type': 'application/json' },
  body: { question: 'this a question to check if it is added into user one more ' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
