$(document).ready(function() {

    var response;
    var artist;
    var track;
    var artistName, trackName;

    // event listener that captures & stores user input into variables, updates html & resets input boxes
    $('#submit').on('click', function getUserInput(event) {
        event.preventDefault();

        artist = $('#artist-input').val().trim();
        track = $('#track-input').val().trim();

        // artist = artist.split(" ").join("%20")
        if(artist == "") {
            alert("Name must be filled out");
        }
        else if(track == "") {
            alert("Track must be filled out");
        }
        else {
        console.log(artist + ' ' + track);

        updatePage();
        resetInput();
    }
    });

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
            response = data;
            console.log(response);

            //declare & initialize local variables for easier way to reference data wanted 
            artistName = response.message.body.track_list[0].track.artist_name;
            trackName = response.message.body.track_list[0].track.track_name;
            var trackShare = response.message.body.track_list[0].track.track_share_url;
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
            createRow(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });

    //Need to work on this function if time permits
    // The search musixMatch function takes a movie, searches the musixMatch api for it, and then passes the data to createRow
    var search = function(artist) {
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
    // search(artist);

    // function createRow function takes data returned by musixMatch and appends the table data to the tbody
    // for loop that adds rows to a table on HTML that shows top 10 results that match search query
    function createRow(response) {
        for (var x = 0; x < 10; x++) {
            // Create a new table row element
            var tRow = $("<tr>");

            //declare local variables & set values
            var artistTd = $("<td>").text(response.message.body.track_list[x].track.artist_name);
            var trackTd = $("<td>").text(response.message.body.track_list[x].track.track_name);

            //append variables to the row
            tRow.append(artistTd, trackTd);

            //append row to table body on HTML
            $("tbody").append(tRow);
        }
    }

    // functions to capture user input & reset textboxes
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