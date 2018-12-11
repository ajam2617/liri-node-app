//grab spotify keys
require("dotenv").config();

//adding required dependents
var moment = require('moment');
var request = require("request");
var inquirer = require("inquirer");

//import code not working. Commented it out
// import {spotify} from "./keys.js";

//one way to import an object from another file
var secretKeys = require("./keys.js");

// console.log(spotify.id);

var Spotify = require('node-spotify-api');
//did npm install node-spotify-api but don't understand the response

var spotify = new Spotify({
    id: secretKeys.spotify.id,
    secret: secretKeys.spotify.secret
});

//moment.js for date format from bands in town moment("12-25-1995", "MM-DD-YYYY");
// var moment = require('moment');
// moment().format();

//require request-not sure how to use with ombd. We used axios in class



//4 commands- use Switch Case
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

        // case "movie-this":
        //     runMovie();
        //     break;

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
    ]).then(function(userChoice){
        var band = (userChoice.artist);
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
                    var date = event[i].datetime;
                    var day = moment(date).format("MM-DD-YYYY")
                    console.log(day);
                }
            }
        })
    })
}

//spotify-this-song "<song name here>" using node-spotify-api. Using prompt to get user input, and switch function
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
// searchSpotify();

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

