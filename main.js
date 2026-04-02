document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile Menu ───────────────────────────────────────────────
  const btn  = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');

  if (btn && menu) {
    const iconMenu  = btn.querySelector('.icon-menu');
    const iconClose = btn.querySelector('.icon-close');

    btn.addEventListener('click', () => {
      const isOpen = !menu.classList.contains('hidden');
      if (isOpen) {
        menu.classList.add('hidden');
        if (iconMenu)  iconMenu.classList.remove('hidden');
        if (iconClose) iconClose.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        menu.classList.remove('hidden');
        if (iconMenu)  iconMenu.classList.add('hidden');
        if (iconClose) iconClose.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
      }
    });

    document.addEventListener('click', e => {
      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.add('hidden');
        if (iconMenu)  iconMenu.classList.remove('hidden');
        if (iconClose) iconClose.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
        if (iconMenu)  iconMenu.classList.remove('hidden');
        if (iconClose) iconClose.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });
  }

  // ── Footer Year ───────────────────────────────────────────────
  const yr = document.getElementById('current-year');
  if (yr) yr.textContent = new Date().getFullYear();

  // ── Header Shadow on Scroll ───────────────────────────────────
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 10
        ? '0 2px 24px rgba(0,0,0,0.10)'
        : '0 1px 20px rgba(0,0,0,0.04)';
    }, { passive: true });
  }

});
