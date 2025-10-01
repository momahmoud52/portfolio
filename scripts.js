// scripts.js

// تحديث السنة تلقائيًا في التذييل
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

// تأثير الآلة الكاتبة مع دعم مؤثرات إضافية
class Typewriter {
  constructor(element, phrases, delay = 100, pause = 2000) {
    this.element = element;
    this.phrases = phrases;
    this.delay = delay;
    this.pause = pause;
    this.index = 0;
    this.text = "";
    this.isDeleting = false;
    this.type();
  }

  type() {
    const currentPhrase = this.phrases[this.index % this.phrases.length];

    this.text = this.isDeleting
      ? currentPhrase.substring(0, this.text.length - 1)
      : currentPhrase.substring(0, this.text.length + 1);

    this.element.textContent = this.text;

    let typingSpeed = this.isDeleting ? this.delay / 2 : this.delay;

    if (!this.isDeleting && this.text === currentPhrase) {
      typingSpeed = this.pause;
      this.isDeleting = true;
    } else if (this.isDeleting && this.text === "") {
      this.isDeleting = false;
      this.index++;
      typingSpeed = this.delay;
    }

    setTimeout(() => this.type(), typingSpeed);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const typewriterEl = document.getElementById("typewriter");
  if (typewriterEl) {
    const phrases = JSON.parse(typewriterEl.dataset.phrases);
    new Typewriter(typewriterEl, phrases);
  }
});

// تأثير Slide-up عند الظهور في الشاشة مع IntersectionObserver
function handleSlideUp() {
  const cards = document.querySelectorAll(".card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, delay);
        }
      });
    },
    { threshold: 0.2 }
  );

  cards.forEach((card) => observer.observe(card));
}

window.addEventListener("DOMContentLoaded", handleSlideUp);

// Smooth Scroll
const navLinks = document.querySelectorAll(".main-nav a");
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    if (link.hash !== "") {
      e.preventDefault();
      const target = document.querySelector(link.hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});

// خلفية متحركة باستخدام Canvas
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
document.getElementById("bg-canvas").appendChild(canvas);

const particles = [];
const numParticles = 80;

for (let i = 0; i < numParticles; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.7,
    vy: (Math.random() - 0.5) * 0.7,
    size: Math.random() * 2 + 1,
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
    gradient.addColorStop(0, "rgba(6,245,255,0.9)");
    gradient.addColorStop(1, "rgba(0,119,255,0)");
    ctx.fillStyle = gradient;
    ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();

// ✅ Lightbox مع التنقل بين الصور
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");
const prevBtn = document.getElementById("lightbox-prev");
const nextBtn = document.getElementById("lightbox-next");

let currentGallery = [];
let currentIndex = 0;

document.querySelectorAll(".project-gallery").forEach(gallery => {
  const images = gallery.querySelectorAll("img");

  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentGallery = [...images];
      currentIndex = index;
      showImage();
      lightbox.classList.add("active");
    });
  });
});

function showImage() {
  lightboxImg.src = currentGallery[currentIndex].src;
}

// إغلاق
lightboxClose.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

// تنقل بالأسهم
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % currentGallery.length;
  showImage();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  showImage();
});

// إغلاق بالضغط بالخارج
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("active");
  }
});

// دعم أسهم الكيبورد
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;
  if (e.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    showImage();
  }
  if (e.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    showImage();
  }
  if (e.key === "Escape") {
    lightbox.classList.remove("active");
  }
});
