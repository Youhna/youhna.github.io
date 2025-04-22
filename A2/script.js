function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('flipClock').textContent = `${hours}:${minutes}:${seconds}`;
  }
  
  setInterval(updateClock, 1000); // 每秒刷新
  updateClock(); // 初始化
  
  //video跳转
  
  document.getElementById("goToVideoBtn").addEventListener("click", function () {
    window.location.href = "white-noise-video.html";
  });
  
