document.addEventListener("DOMContentLoaded", function () {
  // clock
  function updateClock() {
    const now = new Date(); //Get the current system time
    const hours = now.getHours().toString().padStart(2, "0"); //Clock zero padding
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const clockEl = document.getElementById("flipClock"); //Display time change
    if (clockEl) {
      clockEl.textContent = `${hours}:${minutes}:${seconds}`;
    }
  }

  setInterval(updateClock, 1000); //Call updateClock every 1 second (1000 milliseconds) to form a real-time clock
  updateClock();

  // Click the icon of the music card to enter the video playback page
  //Because I want to play the video (no audio) while playing the audio, but Video and Music are not in the same interface system, so I created a new video interface in the Music interface to realize this idea.
  //Page Jump - .music-card a - Click to jump to #videoSection and hide .music-page page

  document.querySelectorAll(".music-card a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default redirection.After jumping to the interface, hide the music page and display the video playback area
      document.querySelector(".music-page").style.display = "none";
      document.getElementById("videoSection").style.display = "block";
    });
  });

  //Close the video page and return to the music selection page. Link to the "Back" button
  function closeVideo() {
    document.getElementById("videoSection").style.display = "none";
    document.querySelector(".music-page").style.display = "block";
  }

  // Video Button
  //Bind the DOM reference of the video element and the control button, and make sure the naming is the same as the HTML. The naming should be clear.
  //Play/Pause - playPauseBtn, video - click to switch the playback status and update the icon
  //Video Switch - switchButton, videoSource - switches the video source in the array, updates video.src and plays automatically
  //Mute control - muteBtn, muteIcon - toggle the video.muted property and switch the mute/unmute icon
  //Fullscreen playback - fullscreenBtn - call video.requestFullscreen() to enter fullscreen
  const video = document.getElementById("studyVideo");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const playIcon = document.getElementById("playIcon");
  const switchBtn = document.getElementById("switchBtn");
  const muteBtn = document.getElementById("muteBtn");
  const muteIcon = document.getElementById("muteIcon");
  const fullscreenBtn = document.getElementById("fullscreenBtn");
  const fullscreenIcon = document.getElementById("fullscreenIcon");

  if (
    video &&
    playPauseBtn &&
    playIcon &&
    switchBtn &&
    muteBtn &&
    muteIcon &&
    fullscreenBtn &&
    fullscreenIcon
  ) {
    let isPlaying = true; //Current playback status
    let currentVideo = 1; //Current video number
    //Play/Pause button interaction
    playPauseBtn.addEventListener("click", () => {
      if (isPlaying) {
        video.pause();
        playIcon.src = "image/icon2.png";
        playIcon.alt = "Play";
      } else {
        video.play();
        playIcon.src = "image/icon6.png";
        playIcon.alt = "Pause";
      }
      isPlaying = !isPlaying; //playback status flip
    });
    //Multiple video switching
    let currentVideoIndex = 0;
    const videoSources = [
      "video1.mp4",
      "video2.mp4",
      "video3.mp4",
      "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/miac.mp4",
    ];

    if (switchBtn && video) {
      switchBtn.addEventListener("click", () => {
        currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
        video.src = videoSources[currentVideoIndex];
        video.play(); // Make sure to play automatically after switching
      });
    }
    //Mute/Unmute
    muteBtn.addEventListener("click", () => {
      video.muted = !video.muted;
      if (video.muted) {
        muteIcon.src = "image/icon4.png";
        muteIcon.alt = "Mute";
      } else {
        muteIcon.src = "image/icon5.png";
        muteIcon.alt = "Unmute";
      }
    });
    //fullscreen
    fullscreenBtn.addEventListener("click", () => {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    });
  }
});
