// Initialize Video Slider
const videoSwiper = new Swiper('.video-slider .swiper', {
  loop: true,
  autoplay: {
    delay: 7000,
    disableOnInteraction: false,
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  pagination: {
    el: '.video-slider .swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.video-slider .swiper-button-next',
    prevEl: '.video-slider .swiper-button-prev',
  },
  on: {
    init: function() {
      // Play the first video
      const firstVideo = document.querySelector('.video-slider .swiper-slide-active video');
      if (firstVideo) {
        firstVideo.play().catch(error => {
          console.log('Autoplay prevented:', error);
        });
      }
    },
    slideChange: function() {
      // Pause all videos
      document.querySelectorAll('.video-slider video').forEach(video => {
        video.pause();
      });
      // Play the current slide's video
      const currentVideo = document.querySelector('.video-slider .swiper-slide-active video');
      if (currentVideo) {
        currentVideo.currentTime = 0;
        currentVideo.play().catch(error => {
          console.log('Autoplay prevented:', error);
        });
      }
    }
  }
});

// Ensure videos play on mobile devices
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.video-bg').forEach(video => {
    video.play().catch(error => {
      console.log('Video autoplay prevented:', error);
    });
  });
});

// ... (rest of your existing JavaScript remains the same) ...