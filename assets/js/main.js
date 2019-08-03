$(document).ready(function() {

    var artist;
    var track;

    // -----------------------------------------------------------------------------
    //table with row for top _____
    // The createRow function takes data returned by OMDB and appends the table data to the tbody
    var createRow = function(data) {
        // Create a new table row element
        var tRow = $("<tr>");

        // Methods run on jQuery selectors return the selector they we run on
        // This is why we can create and save a reference to a td in the same statement we update its text
        var titleTd = $("<td>").text(data.Title);
        var yearTd = $("<td>").text(data.Year);
        var actorsTd = $("<td>").text(data.Actors);

        // Append the newly created table data to the table row
        tRow.append(titleTd, yearTd, actorsTd);
        // Append the table row to the table body
        $("tbody").append(tRow);
    };

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

            var source = "https://www.musixmatch.com/lyrics/Taylor-Swift/Back-to-December/embed?theme=dark";
            // var source = "https://www.musixmatch.com/lyrics/" + q_artist + "/" + q_track + "/embed?theme=dark";

            //add source attribute to iframe tag
            var lyricsDiv = $('<iframe>').attr('src', source);

            //append source attribute to HTML
            $('.lyrics').append(lyricsDiv);
            // createRow();

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });

    // The search musixMatch function takes a movie, searches the musixMatch api for it, and then passes the data to createRow
    var searchArtist = function(artist) {
        $.ajax({
            type: "GET",
            data: {
                apikey: "65556a2efa1feefbbd18ccb3228569c4",
                // q_track: "back to december",
                q_artist: artist,
                f_has_lyrics: 1,
                format: "jsonp",
                callback: "jsonp_callback"
            },
            url: "http://api.musixmatch.com/ws/1.1/track.search",
            dataType: "jsonp",
            jsonpCallback: 'jsonp_callback',
            contentType: 'application/json',
            success: function(data) {
                console.log('artist search ', data);
                // console.log(data.message.body.track_list[0].track.artist_name);
                // var artistName = data.message.body.track_list[0].track.artist_name;
                // $('.artist').text(artistName);

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    };

    // Search the musixMatch API for the following artist
    // searchArtist(artist);
    //   searchArtist("Taylor Swift");
    //   searchArtist("The Lion King");



    // -----------------------------------------------------------------------------
    // user input events & functions
    // event listener that captures & stores user input into variables, updates html & resets input boxes
    $('#submit').on('click', function getUserInput(event) {
        event.preventDefault();

        artist = $('#artist-input').val().trim();
        track = $('#track-input').val().trim();

        // artist = artist.split(" ").join("%20")

        console.log(artist + ' ' + track);

        updatePage();
        resetInput();

    })

    function updatePage() {
        console.log('hit updatePage()');
        $('.artist').text(artist);
        $('.track').text(track);
    }

    function resetInput() {
        $('#artist-input').text('');
        $('#track-input').text('');
    }


});