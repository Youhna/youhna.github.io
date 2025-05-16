// ================== 页面加载后执行 ==================
document.addEventListener("DOMContentLoaded", () => {
    revealTimelineItems(); // 初始加载就检测时间线可见性
    initCarousel();        // 初始化扇形旋转画廊
  });
  
  // ================== 时间线滚动显现 ==================
  const timelineItems = document.querySelectorAll('.timeline-item');
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85;
  }
  function revealTimelineItems() {
    timelineItems.forEach(item => {
      if (isInViewport(item)) {
        item.classList.add('visible');
      }
    });
  }
  
  // ================== 导航滚动高亮 + 平滑滚动 ==================
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
  });
  window.addEventListener('scroll', () => {
    revealTimelineItems(); // 滚动时检测时间线
  
    // 高亮当前导航
    const fromTop = window.scrollY + 80;
    navLinks.forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));
      if (
        section.offsetTop <= fromTop &&
        section.offsetTop + section.offsetHeight > fromTop
      ) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });
  
  // ================== 视频自动播放控制 ==================
  const videoFrame = document.getElementById('film');
  if (videoFrame) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          videoFrame.contentWindow.postMessage(
            entry.isIntersecting ? '{"method":"play"}' : '{"method":"pause"}',
            '*'
          );
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(videoFrame);
  }
  
  // ================== 横向拖拽滚动画廊 ==================
  const galleryTrack = document.querySelector('.gallery-track');
  if (galleryTrack) {
    let isDown = false;
    let startX;
    let scrollLeft;
  
    galleryTrack.addEventListener('mousedown', (e) => {
      isDown = true;
      galleryTrack.classList.add('active-drag');
      startX = e.pageX - galleryTrack.offsetLeft;
      scrollLeft = galleryTrack.scrollLeft;
    });
  
    galleryTrack.addEventListener('mouseleave', () => {
      isDown = false;
      galleryTrack.classList.remove('active-drag');
    });
  
    galleryTrack.addEventListener('mouseup', () => {
      isDown = false;
      galleryTrack.classList.remove('active-drag');
    });
  
    galleryTrack.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - galleryTrack.offsetLeft;
      const walk = (x - startX) * 2;
      galleryTrack.scrollLeft = scrollLeft - walk;
    });
  }
  

const gallery = document.querySelector('.gallery-track');
const cards = gallery.querySelectorAll('img');

function updateTransforms() {
  const center = gallery.scrollLeft + gallery.offsetWidth / 2;

  cards.forEach((card) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const distance = cardCenter - center;
    const normalized = distance / card.offsetWidth; // 相对中心偏移

    let rotateY = Math.max(Math.min(normalized * 25, 45), -45); // 最大旋转45度
    let scale = 1 - Math.min(Math.abs(normalized) * 0.1, 0.3); // 缩放范围：1 到 0.7
    let zIndex = 100 - Math.abs(distance); // 中心高 z-index

    card.style.transform = `rotateY(${rotateY}deg) scale(${scale})`;
    card.style.zIndex = Math.round(zIndex);
    card.style.filter = `brightness(${1 - Math.abs(normalized) * 0.3})`;
  });
}

gallery.addEventListener('scroll', updateTransforms);
window.addEventListener('load', updateTransforms);

