// Fade in soul-line elements on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.3
  });
  
  document.querySelectorAll('.soul-lines').forEach(el => observer.observe(el));
  
  // Change background color based on current section
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const color = entry.target.getAttribute('data-color');
        document.body.style.backgroundColor = color;
      }
    });
  }, {
    threshold: 0.5
  });
  
  document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
  });
  
  // Video play/pause control when video section enters/leaves viewport
  const videoSection = document.querySelector('.video-section');
  if (videoSection) {
    const iframe = document.getElementById('film');
    const player = new Vimeo.Player(iframe);
  
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          player.play();
        } else {
          player.pause();
        }
      });
    }, {
      threshold: 0.6
    });
  
    videoObserver.observe(videoSection);
  }
  