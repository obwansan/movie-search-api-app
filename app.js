var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get('/results', function(req, res){
  request('http://www.omdbapi.com/?apikey=thewdb&s=moon', function(error, response, body){
    if(!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      // The render method looks in the views folder for a file with the same name as the passed parameter.
      // Pass an object with the data variable as a value of the data key.
      res.render("results", {data: data});
    }
  })
});

// Set up server
app.listen(3000, function(){
  console.log('Movie app has started!!!');
});