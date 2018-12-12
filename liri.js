//grab spotify keys
require("dotenv").config();

//adding required dependents
var moment = require('moment');
var request = require("request");
var inquirer = require("inquirer");
var axios = require("axios");
var secretKeys = require("./keys.js");
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: secretKeys.spotify.id,
    secret: secretKeys.spotify.secret
});

//4 commands- use Switch Case
//I'm going to try to make the choices a function and then separate the switch method into another function to see if that will allow my app to work as intended 

inquirer.prompt([
    {
        type: "rawlist",
        name: "start",
        choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"]
    }
]).then(function (UserChoice) {
    switch (UserChoice) {
        case "concert-this":
            runConcert();
            break;

        case "spotify-this-song":
            searchSpotify();
            break;

        case "movie-this":
            runMovie();
            break;

        // case "do-what-it-says":
        //     doWhat();
        //     break;
    }
})

//concert-this <artists name> using bands in town api
//"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
//returns
//name of venue
//venue location
//date of event using moment MM/DD/YYY
function runConcert() {
    inquirer.prompt([
        {
            type: "input",
            name: "artist",
            message: "Type in a band or artist"
        }
    ]).then(function(userInput){
        var band = (userInput.artist);
        var queryUrl = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp"
        request(queryUrl, function(err, response, body){
            if (err) {
                return console.log(err);
            } else {
                var event = JSON.parse(body);
                for (var i = 0; i < event.length; i++) {
                    console.log("THE BAND IS IN TOWN!")
                    console.log("Venue name: " + event[i].venue.name);
                    console.log("Venue location: " + event[i].venue.city + event[i].venue.region);

                    //have not tested if this works. My app stopped working after first question prompt
                    var date = event[i].datetime;
                    var day = moment(date).format("MM-DD-YYYY")
                    console.log(day);
                }
            }
        })
    })
}

//spotify-this-song "<song name here>" using node-spotify-api. Using prompt to get user input, and switch function
// searchSpotify();

    //returns
    //Artist(s)
    //Song Name
    //preview link of the song
    //album the song is from
    //if no song provided, default "The Sign" Ace of Base
function searchSpotify() {
    inquirer.prompt([
        {
            type: "input",
            name: "song",
            message: "Type in a song name"
        }
    ]).then(function (userInput) {
        var song = (userInput.song);
        spotify.search({ type: 'track', query: song }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            } else {
                console.log("Artists: " + data.tracks.items[0].artists[0].name);
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log("Preview: " + data.tracks.items[0].album.href);
                console.log("Song: " + userInput.song);
            }

        });
    });

}


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
   function runMovie () {
       inquirer.prompt([
           {
               type: "input",
               name: "movie",
               message:"Type in a movie"
           }
       ]).then(function (userInput) {
           var movie= (userInput.movie); 
           var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
            for (var j=2; j <movie.length; j++) {
                if (j>2 && i<movie.length) {
                    movie = movie + "+" + movie[i];
                }
                else {
                    movie+=movie[i];
                }
            }
            axios.get(queryUrl).then (function(response){
                console.log(response.data)
            })
       }
   }     

//do-what-it-says using fs node package
        //take text inside random.txt=="I want it that Way"





//movie-this
//do-what-it-says

