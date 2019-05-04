var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  // renders the HTML in search.ejs in /views
  res.render("search");
});

app.get('/results', function(req, res){
  var query = req.query.search; // the word searched for
  var url = 'http://www.omdbapi.com/?apikey=thewdb&s=' + query;
  // The body argument is just response.body
  request(url , function(error, response, body){
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

 /**
  * The user enters a search term in the form and clicks submit / hits Enter.
  * 
  * The search query is sent, using a GET request (i.e. a query string in the URL), to the /results route.
  * (The user is automagically redirected to the /results page when they click Submit).
  * 
  * When the search query is sent to the /results route, the callback function passed to the route is called. 
  * 
  * The GET request comprises a request object, containing a query object, containing a search property
  * (i.e. the name attribute of the form input element), holding the search term entered by the user. 
  * 
  * This request object is passed into the /results route's callback function, and so the search term (query)
  * can be pulled off it and appended to the API GET request URL. This URL is then used in the API GET request.
  * (When request() is called with the URL, it must receive the error, response and body objects as part of the response from the OMDB API).
  * 
  * The response object's render method then sends the movie data (parsed from JSON into an object) to results.ejs, which loops over the movie objects and renders out the movie titles and years.
  */