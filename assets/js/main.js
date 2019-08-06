$(document).ready(function() {

    var response;
    var artist;
    var track;
    var artistName, trackName;

    // $('.topResults').hide();
    // $('.resultsContainer').hide();

    //event listener for table row
    $('.clickable').on('click', function redirect() {
        console.log('hit row class=clickable!');
    });

    // event listener that captures & stores user input into global variables,
    //getUserInput function will test input to make sure it's not empty
    $('#submit').on('click', function getUserInput(event) {

        //stops it from doing it's default function
        event.preventDefault();

        //remove whitespace & then set value to a global variable
        artist = $('#artist-input').val().trim();
        track = $('#track-input').val().trim();

        //declare local variable, call a function that passes 2 parameters to its function definition
        //function will return a value and set it to local varialbe
        var test = testInput(artist, track);

        //conditional statement
        if (test == false) {
            console.log('hit inside test == false');
            //call function to reset HTML textbox input boxes to blank
            resetInput();
        } else {
            // console.log('hit inside test == true');
            console.log(artist + ' , ' + track);

            // Search the musixMatch API for the following artist
            // search1(artist, track);
            //search2(artist, track);

            //call function to update profile page
            updatePage();

            //call function to reset HTML textbox input boxes to blank
            resetInput();

            window.location.href = "./profile.html"
                //show topResults div
            $('.topResults').show();
            $('.resultsContainer').show();

        }
        // console.log('hit outside  of if/else conditional');

        //call function to reset HTML textbox input boxes to blank
        resetInput();



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
            response = data;
            console.log(response);

            //declare & initialize local variables for easier way to reference data wanted 
            artistName = response.message.body.track_list[0].track.artist_name;
            trackName = response.message.body.track_list[0].track.track_name;
            var trackShare = response.message.body.track_list[0].track.track_share_url;
            console.log('track_share_url ' + trackShare)

            //writing or appending to HTML
            $('.artist').text(artist);
            $('.track').text(track);

            //url for artist & track lyrics
            var source = "https://www.musixmatch.com/lyrics/Taylor-Swift/Back-to-December/embed?theme=dark";
            // var source = "https://www.musixmatch.com/lyrics/" + artist + "/" + track + "/embed?theme=dark";

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


    // function createRow function takes data returned by musixMatch and appends the table data to the tbody
    // for loop that adds rows to a table on HTML that shows top 10 results that match search query
    function createRow(response) {
        for (var x = 0; x < 10; x++) {
            // Create a new table row element with a class=select
            var tRow = $("<tr>").addClass("clickable").attr("data-url", "./profile.html");

            // var aRow = $('<a>').addClass("clickable").attr("href", "./profile.html");
            // tRow.append(aRow);

            //declare local variables & set values
            var artistTd = $("<td>").text(response.message.body.track_list[x].track.artist_name);
            var trackTd = $("<td>").text(response.message.body.track_list[x].track.track_name);

            //append variables to the row
            tRow.append(artistTd, trackTd);

            //append row to table body on HTML
            $("tbody").append(tRow);
        }
    }

    //defining function that passes 2 parameter values & tests if they're empty strings or not
    //function will return a boolean value
    function testInput(artist, track) {
        if (artist == "" || track == "") {
            // alert("Fields can not be empty");
            return false;
        } else {
            return true;
        }
    }
    // functions to capture user input & reset textboxes
    function updatePage() {
        // console.log('hit updatePage()');
        $('.artist').text(artist);
        $('.track').text(track);
    }

    function resetInput() {
        // console.log('hit resetInput()');
        $('.artist-control').val('');
        $('.track-control').val('');
    }

    //-----------------------------------------Not Working ajax------------------------------------------------------
    // -----------------------------functions trying to call musixMatch API--------------------------
    function search1(artist, track) {

        var artist = encodeURI(artist);
        var track = encodeURI(track);

        $.ajax({
            type: "GET",
            data: {
                apikey: "65556a2efa1feefbbd18ccb3228569c4",
                q_track: track,
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

                //url for artist & track lyrics
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
    }

    //Need to work on this function if time permits
    // The search musixMatch function takes a , searches the musixMatch api for it, and then passes the data to createRow
    var search2 = function(artist, track) {

        //reformat artist variable so it can be put into ajax url properly
        // artist = encodeURI(artist);
        // track = encodeURI(track);

        console.log(artist);
        console.log(track);


        //ajax complex response web adddress (artist, track)
        //http://api.musixmatch.com/ws/1.1/track.search?callback=jsonp_callback&apikey=65556a2efa1feefbbd18ccb3228569c4&q_track=back%20to%20december&q_artist=taylor%2520swift&f_has_lyrics=1&format=jsonp&callback=jsonp_callback&_=1564850523557
        //ajax simple response web address (artist, track)
        //http://api.musixmatch.com/ws/1.1/track.search?&apikey=65556a2efa1feefbbd18ccb3228569c4&q_track=back%20to%20december&q_artist=taylor%2520swift

        var queryUrl = "http://api.musixmatch.com/ws/1.1/track.search?callback=jsonp_callback&apikey=65556a2efa1feefbbd18ccb3228569c4&q_track=" +
            track + "&q_artist=" + artist + "&f_has_lyrics=1&format=jsonp&callback=jsonp_callback&_=1564850523557";

        console.log(encodeURI(queryUrl));

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response) {
            console.log(response);
        });
    };


});