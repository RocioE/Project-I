//copy & pasted code from https://developers.google.com/youtube/iframe_api_reference#Requirements
//to get a working example of the video player up & running.
//Need to adjust the code by turning the value of var videoId to a variable that 
//represents the video id.

//both of these lines of code made the video player creash?
// $(document.ready(function() {
// document.onload(function() {
// document.load(function() {

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'M7lc1UVf-VE',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}

function stopVideo() {
    player.stopVideo();
}

// function callYouTube() {
//     $.ajax({
//         type: "GET",
//         data: {
//             apikey: "65556a2efa1feefbbd18ccb3228569c4",
//             videoId: 'QUwxKWT6m7U', //taylor swift - back to december,

//         },
//         url: "https://www.youtube.com/iframe_api",

//         success: function(response) {
//             var data = response;
//             console.log(data);
//         },
//         error: function(jqXHR, textStatus, errorThrown) {
//             console.log(jqXHR);
//             console.log(textStatus);
//             console.log(errorThrown);
//         }
//     });
// }

// });