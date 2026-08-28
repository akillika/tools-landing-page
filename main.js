(() => {
  const LS_THEME = 'tools.theme';
  const root = document.documentElement;

  // Theme
  const stored = localStorage.getItem(LS_THEME);
  if (stored === 'light' || stored === 'dark') root.setAttribute('data-theme', stored);
  document.getElementById('themeToggle').addEventListener('click', () => {
    const cur = root.getAttribute('data-theme');
    const isDark = cur === 'dark' || (!cur && matchMedia('(prefers-color-scheme: dark)').matches);
    const next = isDark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem(LS_THEME, next);
  });

  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Live status pings ---------------------------------------------------
  // We fetch the favicon of each host. Loading = "up". Timeout/error = "down".
  // Favicon requests are opaque, so this survives CORS with no headers.
  const cards = Array.from(document.querySelectorAll('.card[data-host]'));
  const liveCount = document.getElementById('livecount');
  let up = 0, done = 0;

  cards.forEach((card) => {
    const host = card.dataset.host;
    const dot = card.querySelector('.status');
    if (!dot) return;
    let settled = false;
    const finish = (state) => {
      if (settled) return;
      settled = true;
      dot.setAttribute('data-status', state);
      done++;
      if (state === 'up') up++;
      if (done === cards.length && liveCount) liveCount.textContent = String(up);
    };
    // `no-cors` fetch resolves for any HTTP response (2xx-5xx) and only rejects
    // on real network failure — exactly the "is the host reachable" check we want.
    const controller = new AbortController();
    const timer = setTimeout(() => { controller.abort(); finish('down'); }, 5000);
    fetch(`https://${host}/?_wi=${Date.now()}`, {
      method: 'GET',
      mode: 'no-cors',
      cache: 'no-store',
      redirect: 'follow',
      signal: controller.signal,
    })
      .then(() => { clearTimeout(timer); finish('up'); })
      .catch(() => { clearTimeout(timer); finish('down'); });
  });
})();
