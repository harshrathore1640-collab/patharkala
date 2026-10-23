// ==========================================================================
// PATHAR KALAA - HANDCRAFTED STONE CARVING APPLICATION LOGIC
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCreationsSlider();
  initReviewsSlider();
  initFaqAccordion();
  initContactForm();
  initLightbox();
});

// --------------------------------------------------------------------------
// 1. Navbar & Mobile Menu
// --------------------------------------------------------------------------
function initNavbar() {
  const header = document.querySelector('.site-header');
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }
}

// --------------------------------------------------------------------------
// 2. Creations Section: 15-Image Manual Slider
// --------------------------------------------------------------------------
function initCreationsSlider() {
  const track = document.getElementById('creations-track');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const counterCurrent = document.getElementById('slider-current');
  const counterTotal = document.getElementById('slider-total');

  if (!track || !prevBtn || !nextBtn) return;

  const cards = track.querySelectorAll('.creation-slide-card');
  const totalCards = cards.length;
  if (counterTotal) counterTotal.textContent = String(totalCards).padStart(2, '0');

  let currentIndex = 0;

  function updateSlider() {
    if (cards.length === 0) return;
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 24; // 1.5rem
    const moveAmount = (cardWidth + gap) * currentIndex;

    track.style.transform = `translateX(-${moveAmount}px)`;

    if (counterCurrent) {
      counterCurrent.textContent = String(currentIndex + 1).padStart(2, '0');
    }

    prevBtn.disabled = currentIndex === 0;
    const containerWidth = track.parentElement.getBoundingClientRect().width;
    const visibleCount = Math.floor(containerWidth / (cardWidth + gap)) || 1;
    const maxIndex = Math.max(0, totalCards - visibleCount);

    nextBtn.disabled = currentIndex >= maxIndex;
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  nextBtn.addEventListener('click', () => {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 24;
    const containerWidth = track.parentElement.getBoundingClientRect().width;
    const visibleCount = Math.floor(containerWidth / (cardWidth + gap)) || 1;
    const maxIndex = Math.max(0, totalCards - visibleCount);

    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSlider();
    }
  });

  // Touch Swipe Support
  let startX = 0;
  let isSwiping = false;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (!isSwiping) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextBtn.click();
      } else {
        prevBtn.click();
      }
    }
    isSwiping = false;
  }, { passive: true });

  window.addEventListener('resize', updateSlider);
  updateSlider();
}

// --------------------------------------------------------------------------
// 3. Reviews Slider
// --------------------------------------------------------------------------
const reviewsData = [
  {
    headline: '“Exquisite Jaisalmer Golden Sandstone Carving for our Haveli.”',
    quote: 'Pathar Kalaa delivered authentic Jaisalmer yellow sandstone jharokhas and carved jali screens for our heritage villa. The level of hand-chiseled detail and warm golden glow of the stone is unmatched. Truly handcrafted with love!',
    author: 'Pathar Kalaa Master Sculptors',
    role: 'Artisan Workshop • Kishanghat, Jaisalmer'
  },
  {
    headline: '“Mastery in All Types of Stone Carving & Lattice Jalis.”',
    quote: 'We commissioned custom fluted stone pillars and floral lattice screens for a luxury resort project. The shipment arrived safely packaged in wooden crates from Jaisalmer to our site. Absolute perfection in measurements and finish.',
    author: 'Vikramaditya Rathore',
    role: 'Heritage Hotel Architect & Collector'
  },
  {
    headline: '“Authentic Jaisalmer Stone Art Direct from the Source.”',
    quote: 'Finding genuine Jaisalmer stone artisans who can execute intricate CAD designs into hand-carved stone panels is rare. Pathar Kalaa provided transparent pricing, regular workshop progress videos, and impeccable quality.',
    author: 'Ar. Rajesh Shekhawat',
    role: 'Conservation Architect & Designer'
  }
];

function initReviewsSlider() {
  let rIndex = 0;
  const prevBtn = document.getElementById('review-prev');
  const nextBtn = document.getElementById('review-next');
  const headlineEl = document.getElementById('review-headline');
  const quoteEl = document.getElementById('review-quote');
  const authorEl = document.getElementById('review-author');
  const roleEl = document.getElementById('review-role');

  if (!prevBtn || !nextBtn || !headlineEl) return;

  function renderReview(idx) {
    const item = reviewsData[idx];
    if (!item) return;

    headlineEl.style.opacity = '0.3';
    quoteEl.style.opacity = '0.3';

    setTimeout(() => {
      headlineEl.textContent = item.headline;
      quoteEl.textContent = item.quote;
      authorEl.textContent = item.author;
      roleEl.textContent = item.role;

      headlineEl.style.opacity = '1';
      quoteEl.style.opacity = '1';
    }, 150);
  }

  prevBtn.addEventListener('click', () => {
    rIndex = (rIndex - 1 + reviewsData.length) % reviewsData.length;
    renderReview(rIndex);
  });

  nextBtn.addEventListener('click', () => {
    rIndex = (rIndex + 1) % reviewsData.length;
    renderReview(rIndex);
  });
}

// --------------------------------------------------------------------------
// 4. FAQ Accordion
// --------------------------------------------------------------------------
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(other => other.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// --------------------------------------------------------------------------
// 5. Contact Form WhatsApp Submission
// --------------------------------------------------------------------------
function initContactForm() {
  const form = document.getElementById('contact-form');
  const chips = document.querySelectorAll('.chip-option');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('c-name').value;
      const phone = document.getElementById('c-phone').value;
      const location = document.getElementById('c-location').value;
      const details = document.getElementById('c-details').value;

      const selected = Array.from(document.querySelectorAll('.chip-option.selected'))
        .map(c => c.textContent.trim());

      const elements = selected.length > 0 ? selected.join(', ') : 'Stone Carving Inquiry';

      const message = `Namaste Pathar Kalaa team! I am interested in Handcrafted Jaisalmer Stone Carving.
*Name:* ${name}
*Phone:* ${phone}
*Project Location:* ${location}
*Elements Needed:* ${elements}
*Requirements:* ${details}

Please share catalog, availability and custom quote.`;

      const encoded = encodeURIComponent(message);
      const url = `https://wa.me/916350200339?text=${encoded}`;
      window.open(url, '_blank');
    });
  }
}

// --------------------------------------------------------------------------
// 6. Lightbox Image Viewer
// --------------------------------------------------------------------------
function initLightbox() {
  const triggerCards = document.querySelectorAll('.gallery-six-card, .creation-slide-card, .about-featured-card');
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');

  if (!modal || !modalImg) return;

  triggerCards.forEach(card => {
    const img = card.querySelector('img');
    if (!img) return;

    card.addEventListener('click', () => {
      modalImg.src = img.src;
      modal.classList.add('active');
    });
  });

  modal.addEventListener('click', () => {
    modal.classList.remove('active');
  });
}
