(() => {
  const header = document.querySelector('[data-header]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  let lastFocusedElement = null;

  const closeNav = () => {
    if (!navToggle || !nav) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menú');
    navToggle.querySelector('.sr-only').textContent = 'Abrir menú';
    nav.classList.remove('is-open');
    nav.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('nav-open');
    if (lastFocusedElement && window.matchMedia('(max-width: 980px)').matches) {
      lastFocusedElement.focus();
    }
  };

  navToggle?.addEventListener('click', () => {
    const willOpen = navToggle.getAttribute('aria-expanded') !== 'true';
    if (willOpen) lastFocusedElement = document.activeElement;
    navToggle.setAttribute('aria-expanded', String(willOpen));
    navToggle.setAttribute('aria-label', willOpen ? 'Cerrar menú' : 'Abrir menú');
    navToggle.querySelector('.sr-only').textContent = willOpen ? 'Cerrar menú' : 'Abrir menú';
    nav?.classList.toggle('is-open', willOpen);
    nav?.setAttribute('aria-hidden', String(!willOpen));
    document.body.classList.toggle('nav-open', willOpen);
    if (willOpen) nav?.querySelector('a')?.focus();
  });

  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
  document.addEventListener('click', (event) => {
    if (!nav?.classList.contains('is-open') || nav.contains(event.target) || navToggle?.contains(event.target)) return;
    closeNav();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNav();
  });

  const desktopViewport = window.matchMedia('(min-width: 981px)');
  const closeNavOnDesktop = (event) => {
    if (event.matches) closeNav();
  };
  desktopViewport.addEventListener?.('change', closeNavOnDesktop);

  const setHeaderState = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  const mainWhatsApp = document.querySelector('[data-wa-main]');
  const interestButtons = document.querySelectorAll('[data-wa-interest]');
  const whatsappBase = 'https://wa.me/5492665064431?text=';

  interestButtons.forEach((button) => {
    button.addEventListener('click', () => {
      interestButtons.forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');
      const interest = button.dataset.waInterest;
      const message = `Hola, vi la página de Estudio Violeta y quería pedir un presupuesto para ${interest}.`;
      if (mainWhatsApp) mainWhatsApp.href = `${whatsappBase}${encodeURIComponent(message)}`;
      mainWhatsApp?.focus();
    });
  });

  document.querySelectorAll('[data-interest]').forEach((link) => {
    link.addEventListener('click', () => {
      const target = [...interestButtons].find((button) => button.dataset.waInterest === link.dataset.interest);
      target?.click();
    });
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
})();
