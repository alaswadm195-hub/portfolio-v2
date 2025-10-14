// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// ===== LIGHT / DARK MODE (WITH SAVED STATE) =====
const modeToggle = document.getElementById('modeToggle');
const storedMode = localStorage.getItem('mode');

if (storedMode === 'light') {
  document.body.classList.add('light-mode');
  modeToggle.textContent = '🌙';
}

if (modeToggle) {
  modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const light = document.body.classList.contains('light-mode');
    modeToggle.textContent = light ? '🌙' : '☀️';
    localStorage.setItem('mode', light ? 'light' : 'dark');
  });
}

// ===== REVEAL ANIMATIONS =====
const revealEls = document.querySelectorAll('.reveal');
const ioReveal = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => ioReveal.observe(el));

// ===== CONTACT FORM (Send without redirect) =====
const form = document.getElementById('contactForm');
const msg = document.querySelector('.msg');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // يمنع الصفحة من التحديث أو الفتح التلقائي

    msg.textContent = "⏳ Sending...";
    msg.style.color = "#ccc";

    const formData = new FormData(form);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        msg.textContent = "✅ Thank you!";
        msg.style.color = "#00bcd4";
        form.reset();

        // إخفاء الرسالة بعد 5 ثواني بشكل ناعم
        setTimeout(() => {
          msg.textContent = "";
        }, 5000);

      } else {
        msg.textContent = "❌ Something went wrong while sending.";
        msg.style.color = "red";
      }
    } catch (error) {
      msg.textContent = "⚠️ Please check your internet connection.";
      msg.style.color = "orange";
    }
  });
}


// ===== TYPING EFFECT =====
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");
const textArray = ["AI Engineer", "Frontend Developer", "Embedded Systems Enthusiast"];
const typingDelay = 100;
const erasingDelay = 70;
const newTextDelay = 1000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 300);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

function setActiveLink() {
  let current = '';
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 140 && rect.bottom >= 140) current = sec.id;
  });
  navItems.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);
