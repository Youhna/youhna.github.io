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

  // video跳转（如果页面中有这个按钮）
  const goBtn = document.getElementById("goToVideoBtn");
  if (goBtn) {
    goBtn.addEventListener("click", function () {
      window.location.href = "white-noise-video.html";
    });
  }

  // 视频按钮逻辑
  const video = document.getElementById("studyVideo");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const playIcon = document.getElementById("playIcon");
  const switchBtn = document.getElementById("switchBtn");
  const muteBtn = document.getElementById("muteBtn");
  const muteIcon = document.getElementById("muteIcon");

  if (video && playPauseBtn && playIcon && switchBtn && muteBtn && muteIcon) {
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

    switchBtn.addEventListener("click", () => {
      currentVideo = currentVideo === 1 ? 2 : 1;
      video.src = `video/study${currentVideo}.mp4`;
      video.play();
      isPlaying = true;
      playIcon.src = "image/icon6.png";
      playIcon.alt = "Pause";
    });

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
  }
});
