var apiKey = “65556 a2efa1feefbbd18ccb3228569c4”;
var queryURL = "https://api.musixmatch.com/ws/1.1/";
var artist_id = $(‘#searchTerm).val().trim(); //search artist object
//search for a text string among song titles,artist names and lyrics.
var q;

var queryURL = "https://api.musixmatch.com/ws/1.1/" + apiKey + artist_id;


// Make the AJAX request to the API - GETs the JSON data at the queryURL.
// The data then gets passed as an argument to the updatePage function
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
});