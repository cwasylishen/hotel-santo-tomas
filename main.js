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

  // ── Live Weather — San José, Costa Rica ──────────────────────
  // Open-Meteo: free, no API key, CORS-safe. Fails silently.
  const weatherBadge = document.getElementById('weather-badge');
  if (weatherBadge) {
    const WMO_DESC = {
      0:'Clear Sky', 1:'Mostly Clear', 2:'Partly Cloudy', 3:'Overcast',
      45:'Foggy', 48:'Foggy',
      51:'Light Drizzle', 53:'Drizzle', 55:'Heavy Drizzle',
      61:'Light Rain', 63:'Rain', 65:'Heavy Rain',
      71:'Light Snow', 73:'Snow', 75:'Heavy Snow',
      77:'Snow Grains', 80:'Rain Showers', 81:'Rain Showers', 82:'Heavy Showers',
      85:'Snow Showers', 86:'Heavy Snow Showers',
      95:'Thunderstorm', 96:'Thunderstorm', 99:'Thunderstorm'
    };
    const WMO_EMOJI = {
      0:'☀️', 1:'🌤️', 2:'⛅', 3:'☁️',
      45:'🌫️', 48:'🌫️',
      51:'🌦️', 53:'🌦️', 55:'🌧️',
      61:'🌧️', 63:'🌧️', 65:'🌧️',
      80:'🌦️', 81:'🌧️', 82:'⛈️',
      95:'⛈️', 96:'⛈️', 99:'⛈️'
    };

    fetch('https://api.open-meteo.com/v1/forecast?latitude=9.9281&longitude=-84.0907&current=temperature_2m,weather_code&timezone=America%2FCosta_Rica&forecast_days=1')
      .then(r => r.json())
      .then(d => {
        const code  = d.current.weather_code;
        const tempC = Math.round(d.current.temperature_2m);
        const tempF = Math.round(tempC * 9 / 5 + 32);
        const emoji = WMO_EMOJI[code] || '🌤️';
        const desc  = WMO_DESC[code]  || 'Clear';
        weatherBadge.querySelector('#weather-text').textContent =
          `${emoji}  ${tempC}°C / ${tempF}°F  ·  ${desc}`;
        weatherBadge.classList.add('loaded');
      })
      .catch(() => { /* silently do nothing */ });
  }

});
