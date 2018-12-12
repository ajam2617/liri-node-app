//grab spotify keys
require("dotenv").config();

//adding required dependents
var moment = require('moment');
var request = require("request");
var inquirer = require("inquirer");
var secretKeys = require("./keys.js");
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: secretKeys.spotify.id,
    secret: secretKeys.spotify.secret
});

//4 commands- use Switch Case
//I'm going to try to make the choices a function and then separate the switch method into another function to see if that will allow my app to work as intended 
function liriBot() {
    console.log("                    *****************");
    console.log("               ******               ******");
    console.log("           ****                           ****");
    console.log("      ****                                 ***");
    console.log("      ***                                       ***");
    console.log("     **           ***               ***           **");
    console.log("   **           *******           *******          ***");
    console.log("  **            *******           *******            **");
    console.log(" **             *******           *******             **");
    console.log(" **               ***               ***               **");
    console.log("**                                                     **");
    console.log("**       *                                     *       **");
    console.log("**      **                                     **      **");
    console.log(" **   ****                                     ****   **");
    console.log(" **      **                                   **      **");
    console.log("  **       ***                             ***       **");
    console.log("   ***       ****                       ****       ***");
    console.log("     **         ******             ******         **");
    console.log("      ***            ***************            ***");
    console.log("        ****                                 ****");
    console.log("           ****                           ****");
    console.log("               ******               ******");
    console.log("                    *****************");

    inquirer.prompt([
        {
            type: "rawlist",
            name: "start",
            choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"]
        },
        {
            type: "input",
            name: "title",
            message: "What band, or song title, or movie would you like to search?"
        }
    ]).then(function (answer) {
        liriSwitch(answer.start, answer.title);

    });
};

liriBot();

function liriSwitch(choice, title) {
    switch (choice) {
        case "concert-this":
            runConcert();
            break;
        case "spotify-this-song":
            searchSpotify();
            break;

        case "movie-this":
            runMovie();
            break;
    }
}

//case "do-what-it-says":
//     doWhat();
//     break;


//concert-this <artists name> using bands in town api
//"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
//returns
//name of venue
//venue location
//date of event using moment MM/DD/YYY
function runConcert(band) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp"
    request(queryUrl, function (err, response, body) {
        if (err) {
            return console.log(err);
        } else {
            var event = JSON.parse(body);
            for (var i = 0; i < event.length; i++) {
                console.log("THE BAND IS IN TOWN!")
                console.log("Venue name: " + event[i].venue.name);
                console.log("Venue location: " + event[i].venue.city + ", " + event[i].venue.region);

                //have not tested if this works. My app stopped working after first question prompt
                var date = event[i].datetime;
                var day = moment(date).format("MM/DD/YYYY")
                console.log(day);
            }
        }
    });
};


//spotify-this-song "<song name here>" using node-spotify-api. Using prompt to get user input, and switch function
// searchSpotify();
//returns
//Artist(s)
//Song Name
//preview link of the song
//album the song is from
//if no song provided, default "The Sign" Ace of Base
function searchSpotify(song) {
    if (!song) {
        song = "The Sign"
    }
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            console.log("Artists: " + data.tracks.items[0].artists[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Preview: " + data.tracks.items[0].album.href);
            console.log("Song: " + data.tracks.items[0].name);
        }

    });
};

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
function runMovie(movie) {
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(err, response, body) {
        var data = JSON.parse(body);

        if(data.length === 0) {
            console.log("Sorry, never heard of it. You should watch Mr. Nobody.")
        } else {
            console.log("Title: " + data.Title);
            console.log("Released: " + data.Year);
            console.log("IMDb rating: " + data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + data.Ratings[1].Value);
            console.log("Country: " + data.Country);
            console.log("Language: " + data.language);
            console.log("Plot: " + data.Plot);
            console.log("Actors: " + data.Actors);
        }
    })
};
        
//do-what-it-says using fs node package
        //take text inside random.txt=="I want it that Way"





//movie-this
//do-what-it-says
