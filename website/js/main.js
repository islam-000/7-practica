(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Bottles (SVG, generated per flavor) ---------- */
  const BOTTLE_PATH =
    'M46 20 L74 20 C74 60 80 90 88 120 C96 150 98 172 94 200 C90 225 86 240 88 262 ' +
    'C92 292 98 312 98 342 L98 384 C98 393 92 398 84 398 L36 398 C28 398 22 393 22 384 ' +
    'L22 342 C22 312 28 292 32 262 C34 240 30 225 26 200 C22 172 24 150 32 120 C40 90 46 60 46 20 Z';

  const FLAVORS = {
    classic: { label: '#E41E2B', text: '#fff', cap: '#C8102E', sub: '' },
    zero:    { label: '#141414', text: '#fff', cap: '#111', sub: 'ZERO SUGAR', subColor: '#E41E2B' },
    cherry:  { label: '#8E1238', text: '#fff', cap: '#7a0f30', sub: 'CHERRY', subColor: '#f3c1d0' },
    vanilla: { label: '#E9D3AE', text: '#B5121B', cap: '#c9a46b', sub: 'VANILLA', subColor: '#7a4b1f' },
    // vintage lineup: pale glass, fuller toward the present
    v1: { glass: '#cfd9cf', liquid: '#3a2a1c', label: 'none', cap: '#9a9a8e', level: 160 },
    v2: { glass: '#c7d3c9', liquid: '#2e1b10', label: 'none', cap: '#a8a196', level: 120 },
    v3: { glass: '#b7c7bb', liquid: '#2a160b', label: '#e7e1d2', text: '#9b1b1b', cap: '#b3261e', level: 90 },
    v4: { glass: '#a9bba9', liquid: '#24110a', label: '#f0ece2', text: '#b5121b', cap: '#c8102e', level: 80 },
    v5: { glass: '#93a597', liquid: '#200d06', label: '#E41E2B', text: '#fff', cap: '#c8102e', level: 70 },
  };

  let uid = 0;
  function bottleSVG(kind) {
    const f = { liquid: '#2a0904', glass: '#5a1a0d', level: 64, ...FLAVORS[kind] };
    const id = 'bt' + (++uid);
    const label = f.label === 'none' ? '' : `
        <rect x="0" y="206" width="120" height="74" fill="${f.label}"/>
        <rect x="0" y="206" width="120" height="3" fill="rgba(255,255,255,.25)"/>
        <text x="60" y="${f.sub ? 248 : 254}" text-anchor="middle" font-family="Yellowtail, cursive"
              font-size="22" fill="${f.text}" textLength="56" lengthAdjust="spacingAndGlyphs">Coca-Cola</text>
        ${f.sub ? `<text x="60" y="267" text-anchor="middle" font-family="Unbounded, sans-serif"
              font-size="6" font-weight="700" letter-spacing=".6" fill="${f.subColor}">${f.sub}</text>` : ''}`;

    return `<svg class="bottle-svg" viewBox="0 0 120 400" aria-hidden="true">
      <defs>
        <clipPath id="${id}c"><path d="${BOTTLE_PATH}"/></clipPath>
        <linearGradient id="${id}s" x1="0" x2="1">
          <stop offset="0" stop-color="#000" stop-opacity=".55"/>
          <stop offset=".28" stop-color="#fff" stop-opacity=".12"/>
          <stop offset=".5" stop-color="#000" stop-opacity="0"/>
          <stop offset=".8" stop-color="#000" stop-opacity=".25"/>
          <stop offset="1" stop-color="#000" stop-opacity=".6"/>
        </linearGradient>
        <linearGradient id="${id}cap" x1="0" x2="1">
          <stop offset="0" stop-color="${f.cap}"/><stop offset=".35" stop-color="#fff" stop-opacity=".55"/>
          <stop offset=".55" stop-color="${f.cap}"/><stop offset="1" stop-color="#000" stop-opacity=".6"/>
        </linearGradient>
      </defs>
      <rect x="43" y="4" width="34" height="20" rx="3" fill="${f.cap}"/>
      <rect x="43" y="4" width="34" height="20" rx="3" fill="url(#${id}cap)"/>
      <g clip-path="url(#${id}c)">
        <rect width="120" height="400" fill="${f.glass}" opacity=".85"/>
        <rect y="${f.level}" width="120" height="${400 - f.level}" fill="${f.liquid}"/>
        <rect y="${f.level}" width="120" height="3" fill="#fff" opacity=".18"/>
        ${label}
        <rect width="120" height="400" fill="url(#${id}s)"/>
        <path d="M38 40 C36 90 30 140 34 200 C36 240 38 290 34 380" stroke="#fff" stroke-opacity=".35"
              stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M84 150 C88 190 86 230 84 260" stroke="#fff" stroke-opacity=".18"
              stroke-width="3" fill="none" stroke-linecap="round"/>
        <g fill="#fff" opacity=".35">
          <circle cx="50" cy="320" r="1.6"/><circle cx="70" cy="300" r="1.2"/><circle cx="62" cy="350" r="1.8"/>
          <circle cx="44" cy="170" r="1.4"/><circle cx="76" cy="140" r="1.1"/><circle cx="58" cy="110" r="1.5"/>
        </g>
      </g>
      <path d="${BOTTLE_PATH}" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="1.2"/>
    </svg>`;
  }

  document.querySelectorAll('[data-bottle]').forEach(el => {
    el.classList.add('bottle');
    el.innerHTML = bottleSVG(el.dataset.bottle);
  });

  /* ---------- Bubbles ---------- */
  document.querySelectorAll('[data-bubbles]').forEach(box => {
    if (reduceMotion) return;
    const n = +box.dataset.bubbles || 30;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < n; i++) {
      const b = document.createElement('span');
      const size = 3 + Math.random() * 14;
      b.style.cssText =
        `left:${Math.random() * 100}%;width:${size}px;height:${size}px;` +
        `animation-duration:${6 + Math.random() * 10}s;animation-delay:${-Math.random() * 16}s;` +
        `--drift:${(Math.random() - .5) * 80}px`;
      frag.appendChild(b);
    }
    box.appendChild(frag);
  });

  /* ---------- Optional photos from /assets (falls back to drawn art) ---------- */
  document.querySelectorAll('[data-photo]').forEach(el => {
    const img = new Image();
    img.onload = () => {
      el.style.backgroundImage = `url("${el.dataset.photo}")`;
      el.classList.add('has-photo');
    };
    img.src = el.dataset.photo;
  });

  /* ---------- Header ---------- */
  const header = document.querySelector('.header');
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  burger.addEventListener('click', () => {
    const open = header.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open);
    document.body.classList.toggle('no-scroll', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    header.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }));

  /* ---------- Reveal on scroll + counters ---------- */
  const animateCounter = el => {
    const to = +el.dataset.to;
    if (reduceMotion) { el.textContent = to; return; }
    const start = performance.now();
    const dur = 1600;
    const tick = now => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-visible');
      // drop the stagger once revealed so hover/tilt transitions stay snappy
      setTimeout(() => { e.target.style.transitionDelay = ''; }, 1300);
      e.target.querySelectorAll('.counter').forEach(animateCounter);
      io.unobserve(e.target);
    });
  }, { threshold: 0.18 });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 90}ms`;
    io.observe(el);
  });

  /* ---------- Parallax ---------- */
  const parallax = [...document.querySelectorAll('[data-parallax]')];
  if (!reduceMotion && parallax.length) {
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      parallax.forEach(el => {
        const r = el.getBoundingClientRect();
        const offset = (r.top + r.height / 2 - vh / 2) * +el.dataset.parallax;
        el.style.setProperty('--py', `${offset.toFixed(1)}px`);
      });
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------- 3D tilt on flavor cards ---------- */
  if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.flavor, .card').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        card.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`);
        card.style.setProperty('--ry', `${(x * 12).toFixed(2)}deg`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
