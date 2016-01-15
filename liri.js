var liri = require("./keys.js");
var spotify = require("spotify");
var fs = require("fs");
var request = require('request');

var params = process.argv.slice(2);


switch(params[1]) {
  case "my-tweets":
    tweetsCall(params[0]);
    break;
  case "spotify-this-song":
    if(params[1]){
      spotifyCall(params[1]);
    }else {
      spotifyCall("What\'s my age again")
    }
    break;
  case "movie-this":
  if(params[1]){
      movieCall(params[1]);
    }else {
      movieCall("Mr. Nobody")
    }
    break;
  case "do-what-it-says":
    saysCall(params[1]);
    break;
}

function tweetsCall(){
  var client = new Twitter(liri.twitterKeys);
  var params = {screen_name: 'jmigsdesign'};
  client.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error) {
      console.log(tweets);
    }
  });
}



function spotifyCall (arg) {
  spotify.search({ type: 'track', query: arg }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    var albumInfo = data.tracks.items[0];
    

    console.log("Artist: " + albumInfo.artists[0].name + "\r\n" +
                "Track Name: " + albumInfo.name + "\r\n" + 
                "Preview Link: " + albumInfo.preview_url + "\r\n" +
                "Album: " + albumInfo.album.name);
  });
}

function movieCall () {
  var omdbApi = 'http://www.omdbapi.com/?t=';
  var query = params[1];
  var jsonEnd = '&y=&plot=short&r=json&tomatoes=true';
  
  request(omdbApi+query+jsonEnd, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("Title: "+ JSON.parse(body)["Title"]+ "\r\n" +
                  "Year: "+ JSON.parse(body)["Year"]+ "\r\n" +
                  "IMDB Rating: "+ JSON.parse(body)["imdbRating"]+ "\r\n" +
                  "Country: "+ JSON.parse(body)["Country"]+ "\r\n" +
                  "Language: "+ JSON.parse(body)["Language"]+ "\r\n" +
                  "Plot: "+ JSON.parse(body)["Plot"]+ "\r\n" +
                  "Actors: "+ JSON.parse(body)["Actors"]+ "\r\n" +
                  "Rotten Tomatoes Rating: "+ JSON.parse(body)["tomatoRating"]);
    }
  });
}

function saysCall (){
  //Take "spotify-this-song" out of random.txt and use it to class "I want it that way"
  fs.readFile("random.txt", "utf8", function(err, data){
    data = data.split(',');
    spotifyCall(data[1]) 
  });
};

 