document.addEventListener("DOMContentLoaded", function () {
  // 时钟更新
  function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const clockEl = document.getElementById("flipClock");
    if (clockEl) {
      clockEl.textContent = `${hours}:${minutes}:${seconds}`;
    }
  }

  setInterval(updateClock, 1000);
  updateClock();

  // video跳转
  document.querySelectorAll(".music-card a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // 阻止默认跳转
      document.querySelector(".music-page").style.display = "none";
      document.getElementById("videoSection").style.display = "block";
    });
  });

  function closeVideo() {
    document.getElementById("videoSection").style.display = "none";
    document.querySelector(".music-page").style.display = "block";
  }

  // 视频按钮逻辑
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
    let isPlaying = true;
    let currentVideo = 1;

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
      isPlaying = !isPlaying;
    });

    let currentVideoIndex = 0;
    const videoSources = ["video1.mp4", "video2.mp4", "video3.mp4"];

    if (switchBtn && video) {
      switchBtn.addEventListener("click", () => {
        currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
        video.src = videoSources[currentVideoIndex];
        video.play(); // 确保切换后自动播放
      });
    }

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

    fullscreenBtn.addEventListener("click", () => {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    });
  }
});
