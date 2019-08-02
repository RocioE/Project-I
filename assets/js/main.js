$(document).ready(function() {

    var artist;
    var track;

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
            console.log(data.message.body.track_list[0].track.artist_name);
            var artistName = data.message.body.track_list[0].track.artist_name;
            $('.artist').text(artistName);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });

    // The search musixMatch function takes a movie, searches the musixMatch api for it, and then passes the data to createRow
    var searchMusixMatch = function(artist) {

    };

    // Search the musixMatch API for the following artist
    searchMusixMatch();
    //   searchMusixMatch("Taylor Swift");
    //   searchMusixMatch("The Lion King");

    $('#submit').on('click', function getUserInput(event) {
        event.preventDefault();

        artist = $('#artist-input').val().trim();
        track = $('#track-input').val().trim();

        console.log(artist + ' ' + track);

        updatePage();
        resetInput();

    })

    function updatePage() {
        console.log('hit updatePage()');
        $('.artist').text(artist);
        $('.track').append(track);
    }

    function resetInput() {
        $('#artist-input').text('');
        $('#track-input').text('');
    }


});