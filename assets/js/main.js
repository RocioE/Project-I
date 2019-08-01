$.ajax({
    type: "GET",
    data: {
        apikey: "65556a2efa1feefbbd18ccb3228569c4",
        q_track: "back to december",
        q_artist: "taylor%20swift",
        f_has_lyrics: 1,
        format: "jsonp",
        callback: "jsonp_callback"
    },
    url: "http://api.musixmatch.com/ws/1.1/track.search",
    dataType: "jsonp",
    jsonpCallback: 'jsonp_callback',
    contentType: 'application/json',
    success: function(data) {
        console.log(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }
});
var q_artist = ['taylor%20swift', 'beyonce'];

$('#submit').on('click', function getArtist(event) {
    event.preventDefault();

    artist = $('#artist-input').val().trim();
    // track = $('#track-input’).val().trim();

    //push artist to artist array
    q_artist.push(artist);

    updatePage();
})

function updatePage() {

}