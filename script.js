// Navigation
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Remove active class from all links and pages
    navLinks.forEach(l => l.classList.remove('active'));
    pages.forEach(p => p.classList.remove('active'));
    
    // Add active class to clicked link
    link.classList.add('active');
    
    // Show corresponding page
    const pageId = link.getAttribute('data-page');
    document.getElementById(pageId).classList.add('active');
  });
});

// Breathing Animation
const breathText = document.getElementById('breath-text');
const breathCircle = document.getElementById('breath-circle');
const skipBtn = document.getElementById('skip-breath');
let breathInterval;

function startBreathing() {
  let isInhale = true;
  breathText.textContent = 'Inhale';
  
  breathInterval = setInterval(() => {
    isInhale = !isInhale;
    breathText.textContent = isInhale ? 'Inhale' : 'Exhale';
  }, 4000);
}

skipBtn.addEventListener('click', () => {
  clearInterval(breathInterval);
  breathText.textContent = 'Done';
  setTimeout(() => {
    startBreathing();
  }, 2000);
});

// Start breathing on page load
startBreathing();

// Refresh Article
function refreshArticle(btn) {
  const card = btn.closest('.article-card');
  card.style.opacity = '0.5';
  card.style.transform = 'scale(0.95)';
  
  setTimeout(() => {
    card.style.opacity = '1';
    card.style.transform = 'scale(1)';
    
    // Here you would normally fetch new content
    const categories = ['ML INSIGHT', 'MEDICAL STORY', 'TECH NEWS', 'INSPIRATION'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    card.querySelector('.category').textContent = randomCategory;
  }, 500);
}

// Task checkboxes
const taskCheckboxes = document.querySelectorAll('.task-item input[type="checkbox"]');
taskCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    const taskText = this.nextElementSibling;
    if (this.checked) {
      taskText.style.textDecoration = 'line-through';
      taskText.style.color = 'var(--text-secondary)';
    } else {
      taskText.style.textDecoration = 'none';
      taskText.style.color = 'var(--text-primary)';
    }
  });
});

// Video placeholder click
const videoFrame = document.querySelector('.video-frame');
if (videoFrame) {
  videoFrame.addEventListener('click', () => {
    alert('Video player would open here');
    // Here you would normally open a video player or iframe
  });
}

// Settings toggles
const toggles = document.querySelectorAll('.toggle input');
toggles.forEach(toggle => {
  toggle.addEventListener('change', function() {
    const setting = this.closest('.setting-item').querySelector('.setting-label').textContent;
    console.log(`${setting}: ${this.checked ? 'enabled' : 'disabled'}`);
  });
});

// Export data button
const exportBtn = document.querySelector('.btn-secondary');
if (exportBtn) {
  exportBtn.addEventListener('click', () => {
    alert('Data exported!');
  });
}

// Clear data button
const clearBtn = document.querySelector('.btn-danger');
if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all data?')) {
      alert('All data cleared!');
    }
  });
}

// Daily quotes
const quotes = [
  "Let yourself be silently drawn by the strange pull of what you really love. It will not lead you astray. — Rumi",
  "The only way to do great work is to love what you do. — Steve Jobs",
  "In the middle of difficulty lies opportunity. — Albert Einstein",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. — Winston Churchill"
];

function setDailyQuote() {
  const quoteElement = document.getElementById('daily-quote');
  if (quoteElement) {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteElement.textContent = randomQuote;
  }
}

setDailyQuote();
