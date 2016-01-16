var twitterKeys = require("./keys.js");
var spotify = require("spotify");
var fs = require("fs");
var request = require('request');

var params = process.argv.slice(2);


switch(params[1]) {
  case "my-tweets":
    tweetsCall();
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
  //var client = new Twitter(twitterkeys.twitterKeys);
  
  var client = new twitter({
    consumer_key: twitterKeys.twitterKeys.consumer_key,
    consumer_secret: twitterKeys.twitterKeys.consumer_secret,
    access_token_key: twitterKeys.twitterKeys.access_token_key,
    access_token_secret: twitterKeys.twitterKeys.access_token_secret})
  
  client.get('statuses/user_timeline', {screen_name: 'jmigsdesign'}, function (error, tweets, response){
    for(var i = 0; i < data.length; i++){
      console.log(data[i].text);
      console.log(data[i].created_at);
      console.log();
    };
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

 