(() => {
  'use strict';

  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#primary-navigation');

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const isOpen = navigation.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.querySelector('.sr-only').textContent = isOpen ? 'Chiudi menu' : 'Apri menu';
    });

    navigation.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navigation.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.querySelector('.sr-only').textContent = 'Apri menu';
      });
    });
  }

  let previousScroll = window.scrollY;
  window.addEventListener('scroll', () => {
    if (!header) return;
    const currentScroll = window.scrollY;
    header.classList.toggle('hidden', currentScroll > previousScroll && currentScroll > 120);
    previousScroll = currentScroll;
  }, { passive: true });

  document.querySelectorAll('[data-slider]').forEach((slider) => {
    const input = slider.querySelector('[data-slider-input]');
    const after = slider.querySelector('.after-image');
    const divider = slider.querySelector('.slider-divider');
    if (!input || !after || !divider) return;

    const setImageWidth = () => {
      slider.style.setProperty('--slider-width', `${slider.clientWidth}px`);
    };
    const updateSlider = () => {
      const value = `${input.value}%`;
      after.style.width = value;
      divider.style.left = value;
    };
    input.addEventListener('input', updateSlider);
    window.addEventListener('resize', setImageWidth);
    setImageWidth();
    updateSlider();
  });

  const galleryImage = document.querySelector('[data-gallery-main]');
  const galleryThumbs = document.querySelectorAll('[data-gallery-thumb]');
  galleryThumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      if (!galleryImage) return;
      galleryThumbs.forEach((item) => item.classList.remove('is-active'));
      thumb.classList.add('is-active');
      galleryImage.src = decodeURI(thumb.dataset.image);
      galleryImage.alt = thumb.dataset.alt || 'Lavoro CENTACOLORI';
    });
  });

  document.querySelectorAll('.faq-question').forEach((question) => {
    question.addEventListener('click', () => {
      const answer = document.getElementById(question.getAttribute('aria-controls'));
      const isExpanded = question.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.faq-question[aria-expanded="true"]').forEach((openQuestion) => {
        if (openQuestion !== question) {
          const openAnswer = document.getElementById(openQuestion.getAttribute('aria-controls'));
          openQuestion.setAttribute('aria-expanded', 'false');
          if (openAnswer) openAnswer.style.maxHeight = '0';
        }
      });

      question.setAttribute('aria-expanded', String(!isExpanded));
      if (answer) answer.style.maxHeight = isExpanded ? '0' : `${answer.scrollHeight}px`;
    });
  });

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
