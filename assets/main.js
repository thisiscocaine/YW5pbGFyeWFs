// Set hero background (image or video)
function setHeroBackground() {
    const heroBg = document.querySelector('.hero-bg');
    
    // Choose between image or video (change to false for video)
    const useImage = true;
    
    if (useImage) {
        const img = document.createElement('img');
        img.src = 'img/1236524789.jpg?';
        img.alt = 'Luxury Background';
        heroBg.appendChild(img);
    } else {
        const video = document.createElement('video');
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        
        const source = document.createElement('source');
        source.src = 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4';
        source.type = 'video/mp4';
        
        video.appendChild(source);
        heroBg.appendChild(video);
    }
}

// Navigation Scroll Effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// Gallery Items (would be loaded from server in real implementation)
const galleryItems = [
    {
        type: 'image',
        src: 'img/12365247810.jpg?iid=12365247811',
        title: '',
        description: 'When snow falls nature listens.'
    },

    {
        type: 'video',
        src: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
        title: '',
        description: ''
    },

    {
        type: 'image',
        src: 'img/12365247811.jpg?iid=12365247811',
        title: '',
        description: 'Beautiful view from Niluwa, Galkot.'
    },
   
    {
        type: 'image',
        src: 'img/12365247814.jpg?iid=12365247811',
        title: '',
        description: ''
    },
    {
        type: 'video',
        src: 'video/13246929_360_640_30fps.mp4',
        title: '',
        description: ''
    },
    {
        type: 'image',
        src: 'img/12365247812.jpg?iid=12365247811',
        title: '',
        description: ''
    },
    {
        type: 'image',
        src: 'img/12365247815.jpg?iid=12365247811',
        title: '',
        description: ''
    },
    
    {
        type: 'image',
        src: 'img/12365247811.jpg?iid=12365247811',
        title: '',
        description: ''
    },

    {
        type: 'image',
        src: 'img/12365247813.jpg?iid=12365247811',
        title: '',
        description: ''
    }
];

// Load Gallery Items
const galleryContainer = document.querySelector('.gallery-container');

galleryItems.forEach((item, index) => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.dataset.index = index;
    
    if (item.type === 'image') {
        galleryItem.innerHTML = `
            <img src="${item.src}" alt="${item.title}" loading="lazy">
            <div class="overlay">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
    } else if (item.type === 'video') {
        galleryItem.innerHTML = `
            <video loop muted>
                <source src="${item.src}" type="video/mp4">
            </video>
            <div class="overlay">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        
        // Auto-play video on hover
        const video = galleryItem.querySelector('video');
        galleryItem.addEventListener('mouseenter', () => {
            video.play();
        });
        galleryItem.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    }
    
    galleryContainer.appendChild(galleryItem);
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-media');
const lightboxVideo = document.getElementById('lightbox-video');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxIndicators = document.getElementById('lightbox-indicators');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentLightboxIndex = 0;
let autoSlideInterval;

// Create indicators
galleryItems.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.className = 'lightbox-indicator';
    indicator.dataset.index = index;
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToSlide(index));
    lightboxIndicators.appendChild(indicator);
});

function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Start auto-slide
    startAutoSlide();
}

function updateLightbox() {
    const item = galleryItems[currentLightboxIndex];
    
    // Hide both media elements first
    lightboxImg.style.display = 'none';
    lightboxVideo.style.display = 'none';
    
    if (item.type === 'image') {
        lightboxImg.src = item.src;
        lightboxImg.alt = item.title;
        lightboxImg.style.display = 'block';
    } else {
        lightboxVideo.src = item.src;
        lightboxVideo.style.display = 'block';
        lightboxVideo.play();
    }
    
    lightboxCaption.textContent = `${item.title} - ${item.description}`;
    
    // Update indicators
    document.querySelectorAll('.lightbox-indicator').forEach((indicator, i) => {
        if (i === currentLightboxIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function goToSlide(index) {
    currentLightboxIndex = index;
    updateLightbox();
    
    // Reset auto-slide timer
    resetAutoSlide();
}

function nextSlide() {
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryItems.length;
    updateLightbox();
}

function prevSlide() {
    currentLightboxIndex = (currentLightboxIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightbox();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Event listeners for gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const index = parseInt(this.dataset.index);
        openLightbox(index);
    });
});

// Lightbox controls
lightboxClose.addEventListener('click', function() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
    stopAutoSlide();
    
    // Pause video when closing
    if (lightboxVideo.style.display === 'block') {
        lightboxVideo.pause();
    }
});

lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
        stopAutoSlide();
        
        // Pause video when closing
        if (lightboxVideo.style.display === 'block') {
            lightboxVideo.pause();
        }
    }
});

lightboxPrev.addEventListener('click', function(e) {
    e.stopPropagation();
    prevSlide();
    resetAutoSlide();
});

lightboxNext.addEventListener('click', function(e) {
    e.stopPropagation();
    nextSlide();
    resetAutoSlide();
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (lightbox.classList.contains('active')) {
        e.preventDefault();
        
        switch(e.key) {
            case 'ArrowLeft':
                prevSlide();
                resetAutoSlide();
                break;
            case 'ArrowRight':
                nextSlide();
                resetAutoSlide();
                break;
            case 'Escape':
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
                stopAutoSlide();
                
                // Pause video when closing
                if (lightboxVideo.style.display === 'block') {
                    lightboxVideo.pause();
                }
                break;
        }
    }
});

// Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setHeroBackground();
});
