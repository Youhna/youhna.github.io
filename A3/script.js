// ================== Executed after the page loads ==================
document.addEventListener("DOMContentLoaded", () => {
  revealTimelineItems(); // Check timeline visibility on initial load
  initCarousel(); // Initialize the fan-shaped rotation gallery
});

// ================== The scrolling of the timeline simulates the experience of "gradually exploring memories" and increases the sense of interactivity：https://b23.tv/0bR8cq1 ==================
const timelineItems = document.querySelectorAll(".timeline-item");
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <=
    (window.innerHeight || document.documentElement.clientHeight) * 0.85
  );
}
function revealTimelineItems() {
  timelineItems.forEach((item) => {
    if (isInViewport(item)) {
      item.classList.add("visible");
    }
  });
}

// ================== Navigation scroll highlight + smooth scroll ==================
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").slice(1);
    document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
  });
});
window.addEventListener("scroll", () => {
  revealTimelineItems(); // Update timeline chapters while scrolling

  // Highlight current navigation
  const fromTop = window.scrollY + 80;
  navLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

// ================== Video autoplay control, do not automatically play upon entering the website, use the video button in the navigation bar, and consider the environment when the user is exploring the website ==================
const videoFrame = document.getElementById("film");
if (videoFrame) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        videoFrame.contentWindow.postMessage(
          entry.isIntersecting ? '{"method":"play"}' : '{"method":"pause"}',
          "*"
        );
      });
    },
    { threshold: 0.5 }
  );
  observer.observe(videoFrame);
}

// ================== Drag and scroll the gallery horizontally. Learning website: https://b23.tv/m5cV2yQ 
// Encourage users to actively participate in exploration rather than passively accept content, and strengthen interactivity rather than just display. ==================
const galleryTrack = document.querySelector(".gallery-track");
if (galleryTrack) {
  let isDown = false;
  let startX;
  let scrollLeft;
  // Start pulling
  galleryTrack.addEventListener("mousedown", (e) => {
    isDown = true;
    galleryTrack.classList.add("active-drag");
    startX = e.pageX - galleryTrack.offsetLeft;
    scrollLeft = galleryTrack.scrollLeft;
  });

  galleryTrack.addEventListener("mouseleave", () => {
    isDown = false;
    galleryTrack.classList.remove("active-drag");
  });
  // Pause pulling
  galleryTrack.addEventListener("mouseup", () => {
    isDown = false;
    galleryTrack.classList.remove("active-drag");
  });
  // Scroll while dragging
  galleryTrack.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - galleryTrack.offsetLeft;
    const walk = (x - startX) * 2;
    galleryTrack.scrollLeft = scrollLeft - walk;
  });
}
//  When you hold down the mouse and drag the track, you can scroll horizontally
const gallery = document.querySelector(".gallery-track");
const cards = gallery.querySelectorAll("img");

function updateTransforms() {
  const center = gallery.scrollLeft + gallery.offsetWidth / 2;

  cards.forEach((card) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const distance = cardCenter - center;
    const normalized = distance / card.offsetWidth; // Relative center offset

    let rotateY = Math.max(Math.min(normalized * 25, 45), -45); // Maximum rotation 45 degrees
    let scale = 1 - Math.min(Math.abs(normalized) * 0.1, 0.3); // 
    let zIndex = 100 - Math.abs(distance); // Center height
    // When the gallery is scrolled, the cards are rotated (rotateY) and scaled (scale).

    // Simulate the three-dimensional visual effect of a "rotating circular gallery" to enhance the artistic sense.
    card.style.transform = `rotateY(${rotateY}deg) scale(${scale})`;
    card.style.zIndex = Math.round(zIndex);
    card.style.filter = `brightness(${1 - Math.abs(normalized) * 0.3})`;
  });
}

gallery.addEventListener("scroll", updateTransforms);
window.addEventListener("load", updateTransforms);

// ================== Intro hover effect, add more interactive experience. Hovering over different words in the title triggers different pop-up effects of text or pictures. 
// Explore more colors: When the mouse hovers over Silence, the background turns blue, and the color returns to normal when the mouse leaves.==================
const hoverWords = document.querySelectorAll(".hover-word");
const hoverDisplay = document.getElementById("hover-display");

hoverWords.forEach((word) => {
  word.addEventListener("mouseenter", (e) => {
    const type = word.getAttribute("data-type");
    const content = word.getAttribute("data-content");

    if (type === "image") {
      hoverDisplay.innerHTML = `<img src="${content}" alt="Hover Image">`;
    } else {
      hoverDisplay.innerHTML = `<div style="color: #fff;">${content}</div>`;
    }

    hoverDisplay.style.display = "block";
  });

  word.addEventListener("mousemove", (e) => {
    hoverDisplay.style.left = e.pageX + 20 + "px";
    hoverDisplay.style.top = e.pageY + 20 + "px";
  });

  word.addEventListener("mouseleave", () => {
    hoverDisplay.style.display = "none";
  });

  const silenceWord = document.getElementById("silence-word");

  silenceWord.addEventListener("mouseenter", () => {
    document.body.style.backgroundColor = silenceWord.getAttribute("data-bg");
  });

  silenceWord.addEventListener("mouseleave", () => {
    document.body.style.backgroundColor = "#000";
  });
});
