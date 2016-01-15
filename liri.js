var liri = require("./keys.js");
var spotify = require("spotify");
var fs = require("fs");

var params = process.argv.slice(2);


switch(params[0]) {
  case "my-tweets":
    tweetsCall(params[1]);
    break;
  case "spotify-this-song":
    if(params[1]){
      spotifyCall(params[1]);
    }else {
      spotifyCall("What\'s my age again")
    }
    break;
  case "movie-this":
    movieCall(params[1]);
    break;
  case "do-what-it-says":
    saysCall(params[1]);
    break;
  }



function spotifyCall (arg) {

  spotify.search({ type: 'track', query: arg }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    var albumInfo = data.tracks.items[0];
    console.log("Artist: " + albumInfo.artists[0].name);
    console.log("Track Name: " + albumInfo.name);
    console.log("Preview Link: " + albumInfo.preview_url);
    console.log("Album: " + albumInfo.album.name);
  });
}