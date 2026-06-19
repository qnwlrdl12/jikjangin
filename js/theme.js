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

  // Favicon 자동 주입
  function injectFavicon() {
    if (document.querySelector('link[rel*="icon"]')) return;
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💼</text></svg>";
    document.head.appendChild(link);
  }

  // footer에 정책 링크 자동 주입
  function injectFooterLinks() {
    const footer = document.querySelector('footer');
    if (!footer || footer.querySelector('.footer-policy-links')) return;
    const base = window.location.pathname.includes('/pages/') ? '.' : 'pages';
    const wrap = document.createElement('p');
    wrap.className = 'footer-policy-links';
    wrap.style.cssText = 'margin-top:8px;font-size:0.78rem;opacity:0.55;display:flex;gap:16px;justify-content:center;flex-wrap:wrap;';
    const links = [
      { href: base + '/about.html',   label: '사이트 소개' },
      { href: base + '/contact.html', label: '문의하기' },
      { href: base + '/privacy.html', label: '개인정보처리방침' },
    ];
    wrap.innerHTML = links.map(l => '<a href="' + l.href + '" style="color:inherit;text-decoration:none;">' + l.label + '</a>').join('');
    footer.appendChild(wrap);
  }

  function init() {
    buildButton();
    injectFavicon();
    injectFooterLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
