(function () {
  const html = document.documentElement;

  // Ensure stored theme is applied (FOUC inline script may have already done this)
  const saved = localStorage.getItem('theme') || 'dark';
  html.classList.toggle('light', saved === 'light');

  function buildButton() {
    const nav = document.querySelector('nav');
    if (!nav || document.getElementById('themeToggle')) return;

    const btn = document.createElement('button');
    btn.id = 'themeToggle';
    btn.className = 'theme-toggle-btn';
    btn.title = '라이트 / 다크 모드 전환';
    btn.setAttribute('aria-label', '라이트 / 다크 모드 전환');
    btn.textContent = html.classList.contains('light') ? '🌙' : '☀️';

    btn.addEventListener('click', function () {
      const goLight = !html.classList.contains('light');
      html.classList.toggle('light', goLight);
      localStorage.setItem('theme', goLight ? 'light' : 'dark');
      btn.textContent = goLight ? '🌙' : '☀️';
    });

    nav.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildButton);
  } else {
    buildButton();
  }
})();
