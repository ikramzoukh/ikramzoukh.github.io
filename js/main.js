
document.addEventListener('DOMContentLoaded', function() {
  // Language Toggle
  const langToggle = document.getElementById('langToggle');
  const html = document.documentElement;
  let currentLang = localStorage.getItem('ti-lang') || 'en';

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('ti-lang', lang);
    html.setAttribute('lang', lang);
    if (lang === 'ar') {
      html.setAttribute('dir', 'rtl');
    } else {
      html.setAttribute('dir', 'ltr');
    }

    // Update all elements with data-en and data-ar
    document.querySelectorAll('[data-en][data-ar]').forEach(el => {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = el.getAttribute('data-' + lang);
      } else if (el.closest('.project-copy, .definition-copy')) {
        el.innerHTML = el.getAttribute('data-' + lang);
      } else {
        el.textContent = el.getAttribute('data-' + lang);
      }
    });

    // Update button text
    if (langToggle) {
      langToggle.textContent = lang === 'en' ? 'العربية' : 'English';
    }
  }

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      setLanguage(currentLang === 'en' ? 'ar' : 'en');
    });
  }

  // Initialize
  setLanguage(currentLang);

  // Mobile Menu
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Quiz Functionality
  document.querySelectorAll('.quiz-options').forEach(quiz => {
    const buttons = quiz.querySelectorAll('button');
    const feedback = quiz.parentElement.querySelector('.quiz-feedback');
    const correctIndex = quiz.dataset.correct;

    buttons.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        // Reset all
        buttons.forEach(b => {
          b.classList.remove('correct', 'incorrect');
          b.disabled = true;
        });

        if (String(idx) === correctIndex) {
          btn.classList.add('correct');
          if (feedback) {
            feedback.className = 'quiz-feedback show correct';
            feedback.textContent = feedback.getAttribute('data-correct') || 'Correct!';
          }
        } else {
          btn.classList.add('incorrect');
          buttons[correctIndex].classList.add('correct');
          if (feedback) {
            feedback.className = 'quiz-feedback show incorrect';
            feedback.textContent = feedback.getAttribute('data-incorrect') || 'Incorrect. The correct answer is highlighted.';
          }
        }
      });
    });
  });

  // Active Nav Link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
});
