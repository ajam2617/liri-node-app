console.log('this is loaded');

exports.spotify = {
   id: process.env.SPOTIFY_ID,
   secret: process.env.SPOTIFY_SECRET
 };

//one way to export to another file. Oject with keys and values
// module.exports= {id: process.env.SPOTIFY_ID, secret: process.env.SPOTIFY_SECRET}