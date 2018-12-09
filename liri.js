//grab spotify keys
require("dotenv").config();

import { spotify } from "keys.js";

var spotify = new Spotify(keys.spotify);

//moment.js for date format from spotify moment("12-25-1995", "MM-DD-YYYY");
var moment = require('moment');
moment().format();

//4 commands
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

