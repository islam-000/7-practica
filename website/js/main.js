(() => {
  'use strict';

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
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

  const escapeXML = s => s.replace(/[<>&"']/g, c => `&#${c.charCodeAt(0)};`);

  let uid = 0;
  function bottleSVG(kind, name) {
    const f = { liquid: '#2a0904', glass: '#5a1a0d', level: 64, ...FLAVORS[kind] };
    const id = 'bt' + (++uid);
    let label = '';
    if (f.label !== 'none') {
      const logoY = name ? 232 : (f.sub ? 248 : 254);
      label = `
        <rect x="0" y="206" width="120" height="74" fill="${f.label}"/>
        <rect x="0" y="206" width="120" height="3" fill="rgba(255,255,255,.25)"/>
        <text x="60" y="${logoY}" text-anchor="middle" font-family="Yellowtail, cursive"
              font-size="${name ? 15 : 22}" fill="${f.text}" textLength="${name ? 38 : 56}"
              lengthAdjust="spacingAndGlyphs">Coca-Cola</text>`;
      if (name) {
        const n = escapeXML(name.toUpperCase());
        const fit = Math.min(58, Math.max(16, name.length * 7.5));
        label += `<text x="60" y="258" text-anchor="middle" font-family="Unbounded, sans-serif"
              font-size="13" font-weight="800" fill="${f.text}" textLength="${fit}"
              lengthAdjust="spacingAndGlyphs">${n}</text>`;
      } else if (f.sub) {
        label += `<text x="60" y="267" text-anchor="middle" font-family="Unbounded, sans-serif"
              font-size="6" font-weight="700" letter-spacing=".6" fill="${f.subColor}">${f.sub}</text>`;
      }
    }

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

  const renderBottle = el => {
    el.classList.add('bottle');
    el.innerHTML = bottleSVG(el.dataset.bottle, el.dataset.name);
  };
  $$('[data-bottle]').forEach(renderBottle);

  /* ---------- Preloader ---------- */
  const preloader = $('#preloader');
  const hidePreloader = () => preloader && preloader.classList.add('is-done');
  const t0 = performance.now();
  window.addEventListener('load', () => setTimeout(hidePreloader, Math.max(0, 1100 - (performance.now() - t0))));
  setTimeout(hidePreloader, 3000); // never block the page if fonts hang

  /* ---------- Bubbles ---------- */
  $$('[data-bubbles]').forEach(box => {
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
  $$('[data-photo]').forEach(el => {
    const img = new Image();
    img.onload = () => {
      el.style.backgroundImage = `url("${el.dataset.photo}")`;
      el.classList.add('has-photo');
    };
    img.src = el.dataset.photo;
  });

  /* ---------- Header, progress, to-top ---------- */
  const header = $('.header');
  const burger = $('#burger');
  const nav = $('#nav');
  const progress = $('#progress');
  const totop = $('#totop');

  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle('is-scrolled', y > 40);
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    totop.classList.toggle('is-visible', y > window.innerHeight);
    totop.style.setProperty('--spin', `${y / 4}deg`);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  totop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

  const closeMenu = () => {
    header.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  };
  burger.addEventListener('click', () => {
    const open = header.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open);
    document.body.classList.toggle('no-scroll', open);
  });
  $$('a', nav).forEach(a => a.addEventListener('click', closeMenu));

  /* ---------- Reveal on scroll + counters ---------- */
  const fmt = new Intl.NumberFormat('ru-RU');
  const animateCounter = el => {
    const to = +el.dataset.to;
    const plain = to >= 1000 && to < 3000; // years shouldn't get a thousands space
    const show = v => { el.textContent = plain ? String(v) : fmt.format(v); };
    if (reduceMotion) { show(to); return; }
    const start = performance.now();
    const dur = 1800;
    const tick = now => {
      const p = Math.min((now - start) / dur, 1);
      show(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-visible');
      $$('.counter', e.target).forEach(animateCounter);
      // drop the stagger once revealed so hover/tilt transitions stay snappy
      setTimeout(() => { e.target.style.transitionDelay = ''; }, 1300);
      io.unobserve(e.target);
    });
  }, { threshold: 0.15 });

  $$('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 90}ms`;
    io.observe(el);
  });

  // the hero ribbon draws itself on load
  $$('.ribbon-draw path').forEach(p => {
    const len = p.getTotalLength();
    p.style.strokeDasharray = len;
    p.style.strokeDashoffset = reduceMotion ? 0 : len;
    requestAnimationFrame(() => p.closest('svg').classList.add('is-drawn'));
  });

  /* ---------- Parallax ---------- */
  const parallax = $$('[data-parallax]');
  if (!reduceMotion && parallax.length && window.matchMedia('(min-width: 821px)').matches) {
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

  /* ---------- 3D tilt ---------- */
  if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
    $$('.flavor, .card, .era').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        card.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`);
        card.style.setProperty('--ry', `${(x * 12).toFixed(2)}deg`);
        card.style.setProperty('--mx', `${((x + .5) * 100).toFixed(1)}%`);
        card.style.setProperty('--my', `${((y + .5) * 100).toFixed(1)}%`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }

  /* ---------- Fizz burst on buttons ---------- */
  const fizz = (x, y, color = '#fff', count = 14) => {
    if (reduceMotion) return;
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.className = 'fizz';
      const a = Math.random() * Math.PI * 2;
      const d = 30 + Math.random() * 60;
      const size = 4 + Math.random() * 8;
      s.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px;` +
        `--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d - 30}px;border-color:${color}`;
      document.body.appendChild(s);
      s.addEventListener('animationend', () => s.remove());
    }
  };
  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn, .round, .swatch, .tag');
    if (btn) fizz(e.clientX, e.clientY, getComputedStyle(btn).color);
  });

  /* ---------- Toast ---------- */
  const toast = $('#toast');
  let toastTimer;
  const showToast = msg => {
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3200);
  };

  /* ---------- Flavor explorer ---------- */
  const EXPLORER = {
    classic: {
      title: 'Original Taste', word: 'ORIGINAL', c: '#E41E2B', c2: '#7A0A10',
      desc: 'Тот самый вкус с 1886 года: карамельные ноты, лёгкая пряность и бодрящие пузырьки.',
      notes: ['Карамель', 'Ваниль', 'Цитрус', 'Пряности'], kcal: 42, sugar: 10.6, caf: 10,
    },
    zero: {
      title: 'Zero Sugar', word: 'ZERO', c: '#2a2a2a', c2: '#050505',
      desc: 'Знакомый вкус классики — без сахара и без компромиссов. Для тех, кто следит за балансом.',
      notes: ['0 сахара', 'Классический вкус', 'Лёгкость'], kcal: 0.3, sugar: 0, caf: 12,
    },
    cherry: {
      title: 'Cherry', word: 'CHERRY', c: '#A3173F', c2: '#3c0518',
      desc: 'Классика, в которую добавили сочную вишню. Ярко, сладко и немного дерзко.',
      notes: ['Спелая вишня', 'Карамель', 'Ягодная свежесть'], kcal: 45, sugar: 11.2, caf: 10,
    },
    vanilla: {
      title: 'Vanilla', word: 'VANILLA', c: '#C99A5B', c2: '#5a3416',
      desc: 'Мягкая сливочная ваниль обнимает узнаваемый вкус. Как десерт, только с пузырьками.',
      notes: ['Ваниль', 'Сливки', 'Мягкая карамель'], kcal: 44, sugar: 11, caf: 10,
    },
  };
  const explorer = $('#explorer');
  const exBottle = $('#exBottle');
  const num = (v, unit) => `${String(v).replace('.', ',')} ${unit}`;
  const setFlavor = key => {
    const d = EXPLORER[key];
    explorer.style.setProperty('--c', d.c);
    explorer.style.setProperty('--c2', d.c2);
    $('#exTitle').textContent = d.title;
    $('#exWord').textContent = d.word;
    $('#exDesc').textContent = d.desc;
    $('#exNotes').innerHTML = d.notes.map(n => `<li>${n}</li>`).join('');
    $('#exKcal').textContent = num(d.kcal, 'ккал');
    $('#exSugar').textContent = num(d.sugar, 'г');
    $('#exCaf').textContent = num(d.caf, 'мг');
    $('#exKcalBar').style.width = `${(d.kcal / 50) * 100}%`;
    $('#exSugarBar').style.width = `${(d.sugar / 12) * 100}%`;
    $('#exCafBar').style.width = `${(d.caf / 15) * 100}%`;
    exBottle.classList.remove('is-swapping');
    void exBottle.offsetWidth; // restart the swap animation
    exBottle.classList.add('is-swapping');
    exBottle.dataset.bottle = key;
    renderBottle(exBottle);
    $$('.explorer__tabs button').forEach(b => {
      const on = b.dataset.flavor === key;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on);
    });
  };
  $$('.explorer__tabs button').forEach(b => b.addEventListener('click', () => setFlavor(b.dataset.flavor)));
  $$('[data-pick]').forEach(card => card.addEventListener('click', () => {
    setFlavor(card.dataset.pick);
    explorer.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  }));
  setFlavor('classic');

  /* ---------- Name bottle ---------- */
  const nameBottle = $('#nameBottle');
  const nameInput = $('#nameInput');
  const updateName = () => {
    nameBottle.dataset.name = nameInput.value.trim() || 'ТЫ';
    renderBottle(nameBottle);
  };
  nameInput.addEventListener('input', updateName);
  $$('.swatch').forEach(s => s.addEventListener('click', () => {
    $$('.swatch').forEach(x => x.classList.toggle('is-active', x === s));
    nameBottle.dataset.bottle = s.dataset.label;
    nameBottle.classList.remove('is-spin');
    void nameBottle.offsetWidth;
    nameBottle.classList.add('is-spin');
    updateName();
  }));
  $$('.name__chips .tag').forEach(t => t.addEventListener('click', () => {
    nameInput.value = t.dataset.name;
    updateName();
  }));

  const confetti = $('#confetti');
  $('#nameShare').addEventListener('click', () => {
    const who = nameInput.value.trim();
    showToast(who ? `Бутылка «${who}» готова — осталось вручить!` : 'Впиши имя — и бутылка готова!');
    if (!who) { nameInput.focus(); return; }
    if (reduceMotion) return;
    const colors = ['#E41E2B', '#fff', '#ffd166', '#141414', '#8E1238'];
    for (let i = 0; i < 40; i++) {
      const p = document.createElement('i');
      p.style.cssText = `left:${50 + (Math.random() - .5) * 30}%;background:${colors[i % colors.length]};` +
        `--x:${(Math.random() - .5) * 420}px;--r:${Math.random() * 720}deg;animation-delay:${Math.random() * .2}s`;
      confetti.appendChild(p);
      p.addEventListener('animationend', () => p.remove());
    }
  });

  /* ---------- Eras carousel ---------- */
  const track = $('#erasTrack');
  const step = () => (track.querySelector('.era')?.offsetWidth || 300) + 24;
  $('#erasPrev').addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  $('#erasNext').addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  // drag to scroll with the mouse
  let drag = null;
  track.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse') return;
    drag = { x: e.clientX, left: track.scrollLeft, moved: false };
    track.classList.add('is-dragging');
  });
  window.addEventListener('pointermove', e => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (Math.abs(dx) > 4) drag.moved = true;
    track.scrollLeft = drag.left - dx;
  });
  window.addEventListener('pointerup', () => {
    drag = null;
    track.classList.remove('is-dragging');
  });

  /* ---------- Subscribe ---------- */
  $('#subForm').addEventListener('submit', e => {
    e.preventDefault();
    const email = $('#subEmail');
    if (!/^\S+@\S+\.\S+$/.test(email.value)) {
      email.classList.add('is-error');
      showToast('Проверь e-mail — кажется, в нём опечатка');
      return;
    }
    email.classList.remove('is-error');
    email.value = '';
    showToast('Готово! Первое письмо уже в пути ✦');
  });

  $('#year').textContent = new Date().getFullYear();
})();
