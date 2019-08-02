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

            //declare & initialize local variables for easier way to reference data wanted 
            var artistName = data.message.body.track_list[0].track.artist_name;
            var trackName = data.message.body.track_list[0].track.track_name;
            var trackShare = data.message.body.track_list[0].track.track_share_url;
            console.log('track_share_url ' + trackShare)

            //writing or appending to HTML
            $('.artist').text(artistName);
            $('.track').text(trackName);
            // $('.lyrics').append('<div><iframe src="//www.musixmatch.com/lyrics/Taylor-Swift/Back-to-December/embed?theme=dark" style="border:none;background:transparent;" width="100%" height="380" border=0></iframe><a href="https://www.musixmatch.com/lyrics/Taylor-Swift/Back-to-December">View Back to December Lyrics by Taylor Swift</a> at <a href="https://www.musixmatch.com/">Musixmatch</a></div>');
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


    // -----------------------------------------------------------------------------
    // user input events & functions
    // event listener that captures & stores user input into variables, updates html & resets input boxes
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