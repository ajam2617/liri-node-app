//grab spotify keys
require("dotenv").config();

//process.env.<the name of element> 
console.log(process.env.SPOTIFY_ID)

// import {spotify} from "./keys.js";

//one way to import an object from another file
var secretKeys = require("./keys.js");
// console.log(spotify.id);

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: secretKeys.spotify.id,
  secret: secretKeys.spotify.secret
});
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});

//moment.js for date format from spotify moment("12-25-1995", "MM-DD-YYYY");
// var moment = require('moment');
// moment().format();

//require request-not sure how to use with ombd. We used axios in class



//4 commands- use Switch Case
//concert-this <artists name> using bands in town api
    //"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
        //returns
        //name of venue
        //venue location
        //date of event using moment MM/DD/YYY

//spotify-this-song "<song name here>" using node-spotify-api
    //returns
    //Artist(s)
    //Song Name
    //preview link of the song
    //album the song is from
    //if no song provided, default "The Sign" Ace of Base
 
//movie-this "<movie name here" using in class "trilogy" api Key
    //var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        //returns
        //* Title of the movie.
        //Year the movie came out.
        //IMDB Rating of the movie.
        //Rotten Tomatoes Rating of the movie.
        //Country where the movie was produced.
        //Language of the movie.
        //Plot of the movie.
        //Actors in the movie.
        //if no movie, default Mr Nobody

//do-what-it-says using fs node package
        //take text inside random.txt=="I want it that Way"





//movie-this
//do-what-it-says

