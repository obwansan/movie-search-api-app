var express = require("express");
var app = express();
var request = require("request");

app.get('/results', function(req, res){
  request('http://www.omdbapi.com/?apikey=thewdb&s=california', function(error, response, body){
    if(!error && response.statusCode == 200) {
      var results = JSON.parse(body);
      res.send(results['Search'][0]['Title']);
    }
  })
});

// Set up server
app.listen(3000, function(){
  console.log('Movie app has started!!!');
});