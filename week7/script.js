const notifyAudio = document.querySelector("#notify-audio");
console.log(notifyAudio);

//-------------------------------------------------------------
//my logic for playing sound
//first I need to fetch the right button for play

const playButton = document.querySelector("#play-button");
console.log(playButton);

//then I will listen to the click events on that button
playButton.addEventListener("click", playAudio);

//whenever click happens, I will play the audio
function playAudio() {
  notifyAudio.play();
}
//-------------------------------------------------------------

//-------------------------------------------------------------
//my logic for playing sound
//first I need to fetch the right button for pause

const pauseButton = document.querySelector("#play-button");
console.log(pauseButton);

//then I will listen to the click events on that button
pauseButton.addEventListener("click", pauseAudio);

//whenever click happens, I will play the audio
function pauseAudio() {
  notifyAudio.pause();
}
//-------------------------------------------------------------

//-------------------------------------------------------------
//my logic for playing sound
//first I need to fetch the right button for pause

const popButton = document.querySelector("#pop-button");
console.log(pauseButton);

const popSound = document.querySelector("#pop-button");
console.log(popSound);

//then I will listen to the click events on that button
popButton.addEventListener("click", popAudio);

//whenever click happens, I will play the audio
function popAudio() {
  popAudio.play();
}
//-------------------------------------------------------------
