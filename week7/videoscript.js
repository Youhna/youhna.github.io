const myVideo = document.querySelector("#my-video");
console.log(myVideo);

//-------------------------------------------------------------
//my logic for playing video
//first I need to fetch the right button for play

const playButton = document.querySelector("#play-button");
console.log(playButton);

//then I will listen to the click events on that button
playButton.addEventListener("click", playVideo);

//whenever click happens, I will play the audio
function playVideo() {
    myVideo.play();
}
//-------------------------------------------------------------

//-------------------------------------------------------------
//my logic for playing video
//first I need to fetch the right button for pause

const pauseButton = document.querySelector("#pause-button");
console.log(pauseButton);

//then I will listen to the click events on that button
pauseButton.addEventListener("click", pauseVideo);

//whenever click happens, I will pause the video
function pauseVideo() {
  notifyAudio.pause();
}
//-------------------------------------------------------------

//-------------------------------------------------------------
//my logic for playing video
//first I need to fetch the right button for pause

const playPauseButton = document.querySelector("#play-pause-button");
console.log(playPauseButton);

//then I will listen to the click events on that button
playPauseButton.addEventListener("click", toggleVideo);

//whenever click happens, I will pause the video
function toggleVideo() {
    if(myVideo.pause||myVideo.ended){
        myVideo.play();
        playPauseImg.scr="https://img.icons8.com/ios-glyphs/30/play--v2.png";
    }else{
  myVideo.pause();
  playPauseImg.scr="https://img.icons8.com/ios-glyphs/30/play--v2.png";
    }
}
//-------------------------------------------------------------