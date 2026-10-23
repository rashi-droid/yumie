/* YUMIÉ site: data + small components. No framework; each component is a function that owns one section. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Set to a real endpoint (e.g. a mailing-list form URL) to send sign-ups. Left empty, the form only validates.
  const NEWSLETTER_ENDPOINT = '';

  /* ---------------- data ---------------- */
  const FLAVOURS = [
    { key: 'berry', name: 'Berry Blush', label: 'STRAWBERRY × RASPBERRY', tint: 'var(--t-berry)', accent: 'var(--a-berry)', desc: 'Sweet strawberry meets a bright raspberry ripple. Fruity, creamy and dressed for the spotlight.', swirl: 'Strawberry frozen yogurt, raspberry ripple', toppings: 'Strawberries, raspberries, strawberry drizzle', cup: 'Cream and lavender, berry seal', builder: 'berry' },
    { key: 'pistachio', name: 'Pistachio Cloud', label: 'PISTACHIO × VANILLA', tint: 'var(--t-pistachio)', accent: 'var(--a-pistachio)', desc: 'A smooth, nutty daydream with a delicate vanilla finish and a little pistachio crunch.', swirl: 'Pistachio frozen yogurt with vanilla', toppings: 'Chopped pistachios, white drizzle', cup: 'Cream and lavender, pistachio seal', builder: 'pistachio' },
    { key: 'fudge', name: 'Midnight Fudge', label: 'CHOCOLATE × FUDGE', tint: 'var(--t-fudge)', accent: 'var(--a-fudge)', desc: 'Deep chocolate flavour, silky fudge ribbons and chocolate curls. For the beautifully extra.', swirl: 'Chocolate frozen yogurt, fudge ribbon', toppings: 'Chocolate curls, fudge pieces, fudge sauce', cup: 'Cream and lavender, espresso seal', builder: 'fudge' },
    { key: 'mango', name: 'Mango Mellow', label: 'MANGO × PASSION FRUIT', tint: 'var(--t-mango)', accent: 'var(--a-mango)', desc: 'A sunny mango swirl with tropical fruit notes and a tangy passion-fruit finish.', swirl: 'Mango frozen yogurt with a peach twist', toppings: 'Mango cubes, passion-fruit drizzle', cup: 'Cream and lavender, peach seal', builder: null },
    { key: 'blueberry', name: 'Blueberry Daydream', label: 'BLUEBERRY × VANILLA', tint: 'var(--t-blueberry)', accent: 'var(--a-blueberry)', desc: 'A berry-bright swirl with a mellow vanilla note and a little granola crunch.', swirl: 'Blueberry frozen yogurt, vanilla twist', toppings: 'Blueberries, golden granola', cup: 'Cream and lavender, blueberry seal', builder: null },
    { key: 'matcha', name: 'Matcha Muse', label: 'MATCHA × WHITE CHOCOLATE', tint: 'var(--t-matcha)', accent: 'var(--a-matcha)', desc: 'Earthy matcha-inspired flavour meets delicate white-chocolate sweetness.', swirl: 'Matcha frozen yogurt, white chocolate twist', toppings: 'White chocolate curls, matcha dust', cup: 'Cream and lavender, sage seal', builder: null },
  ];
  const SWIRLS = [
    { key: 'berry', name: 'Berry Blush', color: '#E9B3BB', tint: 'var(--t-berry)' },
    { key: 'vanilla', name: 'Vanilla Daydream', color: '#F6EDD9', tint: '#FBF0E4' },
    { key: 'pistachio', name: 'Pistachio Cloud', color: '#BCCD8E', tint: 'var(--t-pistachio)' },
    { key: 'fudge', name: 'Midnight Fudge', color: '#6E4A3B', tint: 'var(--t-fudge)' },
  ];
  const TOPPINGS = [
    { key: 'strawberry', name: 'Fresh strawberries', thumb: 'f-strawberry-whole', word: 'fresh strawberries' },
    { key: 'blueberry', name: 'Blueberries', thumb: 'f-blueberry', word: 'blueberries' },
    { key: 'mango', name: 'Mango cubes', thumb: 'f-mango', word: 'mango cubes' },
    { key: 'curls', name: 'Chocolate curls', thumb: 'f-curl', word: 'chocolate curls' },
    { key: 'cookie', name: 'Cookie crumble', thumb: 'f-cookie', word: 'cookie crumble' },
    { key: 'granola', name: 'Granola crunch', thumb: 'f-granola', word: 'granola crunch' },
    { key: 'pistachio', name: 'Roasted pistachios', thumb: 'f-pistachio', word: 'roasted pistachios' },
    { key: 'sprinkles', name: 'Rainbow sprinkles', thumb: 'f-sprinkles', word: 'rainbow sprinkles' },
  ];
  const SAUCES = [
    { key: 'chocolate', name: 'Chocolate sauce', color: '#3A1D16' },
    { key: 'strawberry', name: 'Strawberry sauce', color: '#A8324A' },
    { key: 'caramel', name: 'Salted caramel sauce', color: '#C98536' },
  ];
  const SIZES = [
    { key: 'little', name: 'Little Swirl', note: 'A little treat', scale: 0.8 },
    { key: 'happy', name: 'Happy Swirl', note: 'Our signature cup', scale: 0.9 },
    { key: 'big', name: 'Big Mood', note: 'Made for sharing', scale: 1 },
  ];
  const MOODS = [
    { key: 'all', name: 'All', line: 'Six signature swirls. Tap a mood to narrow it down.', keys: null },
    { key: 'fruity', name: 'Fruity', line: 'Bright flavours. Fresh energy. A very good day.', keys: ['berry', 'mango'] },
    { key: 'comfort', name: 'Comfort', line: 'Soft swirls and chocolatey comfort, one spoonful at a time.', keys: ['fudge'] },
    { key: 'fancy', name: 'Fancy', line: 'A little unexpected. A little elevated. Entirely delicious.', keys: ['pistachio', 'matcha'] },
    { key: 'crunch', name: 'Crunch', line: 'More texture, more layers, more reasons to take another bite.', keys: ['blueberry'] },
  ];
  const svgUse = (id) => `<svg aria-hidden="true"><use href="#${id}"/></svg>`;

  /* ---------------- page load + logo reveal ---------------- */
  const root = document.documentElement;
  if (!reduce) {
    root.classList.add('is-loading');
    const go = () => requestAnimationFrame(() => { root.classList.remove('is-loading'); root.classList.add('is-loaded'); });
    // never hold content back: reveal on first paint of fonts or after a short cap
    Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise((r) => setTimeout(r, 900))]).then(go);
  }

  /* ---------------- navigation ---------------- */
  function Navigation() {
    const nav = $('#nav'), toggle = $('#menuToggle'), menu = $('#mobileMenu');
    const setOpen = (open) => {
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.setAttribute('aria-hidden', String(!open));
      menu.inert = !open;
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) $('a', menu).focus();
    };
    toggle.addEventListener('click', () => setOpen(!document.body.classList.contains('menu-open')));
    $$('a', menu).forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && document.body.classList.contains('menu-open')) { setOpen(false); toggle.focus(); } });
    matchMedia('(min-width: 1081px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
    const onScroll = () => nav.classList.toggle('is-stuck', scrollY > 40);
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    // current section highlight
    const links = $$('.nav__links a');
    const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { links.forEach((l) => l.classList.remove('is-current')); map.get(en.target.id)?.classList.add('is-current'); } }), { rootMargin: '-45% 0px -50% 0px' });
    map.forEach((_, id) => { const el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* ---------------- hero: gentle pointer drift on the photograph ---------------- */
  function HeroMotion() {
    const img = $('#heroImg'); if (!img || reduce || !finePointer) return;
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const tick = () => { x += (tx - x) * 0.07; y += (ty - y) * 0.07; img.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px`; raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.01 ? requestAnimationFrame(tick) : 0; };
    const hero = $('.hero');
    hero.addEventListener('pointermove', (e) => { const r = hero.getBoundingClientRect(); tx = ((e.clientX - r.left) / r.width - 0.5) * -10; ty = ((e.clientY - r.top) / r.height - 0.5) * -6; if (!raf) raf = requestAnimationFrame(tick); });
    hero.addEventListener('pointerleave', () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(tick); });
  }

  /* ---------------- flavour cards ---------------- */
  function FlavourCards() {
    const grid = $('#flavourGrid');
    grid.innerHTML = FLAVOURS.map((f, i) => `
      <li class="fcard" data-key="${f.key}" style="--tint:${f.tint};--accent:${f.accent}">
        <div class="fcard__frame">
          <img src="img/flavour-${f.key}.webp" width="800" height="960" loading="lazy" alt="${f.name} frozen yogurt in its YUMIÉ cup">
          <span class="fcard__num" aria-hidden="true">Nº ${String(i + 1).padStart(2, '0')}</span>
          <p class="fcard__detail" aria-hidden="true"><b>TOPPED WITH</b>${f.toppings}</p>
        </div>
        <div class="fcard__body">
          <p class="fcard__label">${f.label}</p>
          <h3>${f.name}</h3>
          <p class="fcard__desc">${f.desc}</p>
          <button class="textlink" type="button" data-flavour="${f.key}"><span>Meet ${f.name}</span>${svgUse('i-arrow')}</button>
        </div>
      </li>`).join('');
    // mood filter: dims the cards outside the chosen mood
    const chips = $('#moodChips'), line = $('#moodLine');
    chips.innerHTML = MOODS.map((m, i) => `<button class="chip" type="button" data-mood="${m.key}" aria-pressed="${i === 0}">${m.name}</button>`).join('');
    line.textContent = MOODS[0].line;
    chips.addEventListener('click', (e) => {
      const c = e.target.closest('[data-mood]'); if (!c) return;
      const m = MOODS.find((x) => x.key === c.dataset.mood);
      $$('.chip', chips).forEach((b) => b.setAttribute('aria-pressed', String(b === c)));
      $$('.fcard', grid).forEach((card) => card.classList.toggle('is-dim', !!m.keys && !m.keys.includes(card.dataset.key)));
      line.textContent = m.line;
    });
    const dlg = $('#flavourDialog');
    grid.addEventListener('click', (e) => {
      const b = e.target.closest('[data-flavour]'); if (!b) return;
      const f = FLAVOURS.find((x) => x.key === b.dataset.flavour);
      dlg.style.setProperty('--tint', f.tint);
      $('#fdImg').src = `img/flavour-${f.key}.webp`; $('#fdImg').alt = `${f.name} frozen yogurt`;
      $('#fdLabel').textContent = f.label; $('#fdTitle').textContent = f.name; $('#fdDesc').textContent = f.desc;
      $('#fdSwirl').textContent = f.swirl; $('#fdTop').textContent = f.toppings; $('#fdCup').textContent = f.cup;
      const build = $('#fdBuild');
      build.textContent = f.builder ? `Build a ${f.name} cup` : 'Build your own cup';
      build.dataset.swirl = f.builder || '';
      dlg.showModal ? dlg.showModal() : dlg.setAttribute('open', '');
    });
    $('[data-close]', dlg).addEventListener('click', () => dlg.close());
    dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
    $('#fdBuild').addEventListener('click', (e) => { const k = e.currentTarget.dataset.swirl; dlg.close(); if (k) window.yumieBuilder?.setFlavour(k); });
  }

  /* ---------------- cup builder ---------------- */
  function CupBuilder() {
    const state = { flavour: 'berry', toppings: new Set(), sauce: null, size: 'happy' };
    const defaults = () => ({ flavour: 'berry', toppings: new Set(), sauce: null, size: 'happy' });
    const opt = (type, name, v, label, extra = '', checked = false) => `
      <div class="opt"><input type="${type}" name="${name}" id="${name}-${v}" value="${v}" ${checked ? 'checked' : ''}>
      <label for="${name}-${v}">${extra}<span>${label}</span><span class="tick">${svgUse('i-tick')}</span></label></div>`;
    $('#optFlavour').innerHTML = SWIRLS.map((s) => opt('radio', 'flavour', s.key, s.name, `<span class="sw" style="background:${s.color}"></span>`, s.key === state.flavour)).join('');
    $('#optToppings').innerHTML = TOPPINGS.map((t) => opt('checkbox', 'topping', t.key, t.name, `<img class="thumb" src="img/${t.thumb}.webp" width="400" height="400" alt="" loading="lazy">`)).join('');
    $('#optSauce').innerHTML = SAUCES.map((s) => opt('radio', 'sauce', s.key, s.name, `<span class="sw" style="background:${s.color}"></span>`)).join('');
    $('#optSize').innerHTML = SIZES.map((s) => opt('radio', 'size', s.key, `${s.name}<small>${s.note}</small>`, '', s.key === state.size)).join('');

    // preview layers: sauce under toppings, toppings in a fixed order
    const layerWrap = $('#pvLayers');
    layerWrap.innerHTML = SAUCES.map((s) => `<img class="pv-layer" data-layer="sauce-${s.key}" src="img/b-sauce-${s.key}.webp" width="800" height="900" alt="" loading="lazy">`).join('') +
      TOPPINGS.map((t) => `<img class="pv-layer" data-layer="top-${t.key}" src="img/b-top-${t.key}.webp" width="800" height="900" alt="" loading="lazy">`).join('');
    // warm the base images so flavour switches are instant
    SWIRLS.forEach((s) => { const i = new Image(); i.src = `img/b-base-${s.key}.webp`; });

    const form = $('#builderForm'), base = $('#pvBase'), cup = $('#pvCup');
    const nameOf = (arr, k) => arr.find((x) => x.key === k)?.name;
    const listWords = (w) => w.length < 2 ? w.join('') : `${w.slice(0, -1).join(', ')} and ${w[w.length - 1]}`;
    function summary() {
      const tops = TOPPINGS.filter((t) => state.toppings.has(t.key)).map((t) => t.word);
      if (!tops.length && !state.sauce) return 'A little creamy. A little crunchy. Completely yours.';
      let s = `${nameOf(SWIRLS, state.flavour)}`;
      if (tops.length) s += ` with ${listWords(tops)}`;
      if (state.sauce) s += `${tops.length ? ',' : ''} finished with ${nameOf(SAUCES, state.sauce).toLowerCase()}`;
      return s + '.';
    }
    function render() {
      const sw = state.flavour;
      if (!base.src.endsWith(`b-base-${sw}.webp`)) { base.style.opacity = 0.3; const img = new Image(); img.onload = () => { base.src = img.src; base.style.opacity = 1; }; img.src = `img/b-base-${sw}.webp`; }
      base.alt = `Preview: ${nameOf(SWIRLS, sw)} in a ${nameOf(SIZES, state.size)} cup`;
      $$('.pv-layer', layerWrap).forEach((l) => {
        const k = l.dataset.layer;
        l.classList.toggle('on', k === `sauce-${state.sauce}` || (k.startsWith('top-') && state.toppings.has(k.slice(4))));
      });
      cup.style.transform = `scale(${SIZES.find((s) => s.key === state.size).scale})`;
      $('#preview').style.setProperty('--pv-tint', SWIRLS.find((s) => s.key === sw).tint);
      $('#pvSize').textContent = nameOf(SIZES, state.size);
      $('#pvSummary').textContent = summary();
      const chips = [[`Swirl`, nameOf(SWIRLS, sw)], ...TOPPINGS.filter((t) => state.toppings.has(t.key)).map((t) => ['Topping', t.name]), ...(state.sauce ? [['Drizzle', nameOf(SAUCES, state.sauce)]] : []), ['Size', nameOf(SIZES, state.size)]];
      const picked = $('#pvPicked'); if (picked) picked.innerHTML = chips.map(([a, b]) => `<li><b>${a}</b>${b}</li>`).join('');
      $('#topCount').textContent = state.toppings.size ? `${state.toppings.size} selected` : 'Pick as many as you like';
    }
    function syncInputs() {
      $$('input', form).forEach((i) => {
        if (i.name === 'flavour') i.checked = i.value === state.flavour;
        if (i.name === 'size') i.checked = i.value === state.size;
        if (i.name === 'sauce') i.checked = i.value === state.sauce;
        if (i.name === 'topping') i.checked = state.toppings.has(i.value);
      });
    }
    form.addEventListener('change', (e) => {
      const i = e.target;
      if (i.name === 'flavour') state.flavour = i.value;
      if (i.name === 'size') state.size = i.value;
      if (i.name === 'sauce') state.sauce = i.value;
      if (i.name === 'topping') i.checked ? state.toppings.add(i.value) : state.toppings.delete(i.value);
      $('#confirm').hidden = true;
      render();
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const n = state.toppings.size;
      const nick = n >= 4 ? 'The Everything Swirl' : n === 0 && !state.sauce ? 'The Purist' : state.sauce === 'caramel' ? 'The Golden Hour' : state.toppings.has('sprinkles') ? 'The Party Cup' : state.flavour === 'fudge' ? 'The Midnight Snack' : 'The Happy Place';
      $('#confirmTitle').textContent = `Meet “${nick}”.`;
      $('#confirmText').textContent = `${nameOf(SIZES, state.size)}: ${summary()} Screenshot it, share it, and bring the idea to the counter when YUMIÉ opens.`;
      $('#confirm').hidden = false;
      burst();
    });
    $('#resetBtn').addEventListener('click', () => { Object.assign(state, defaults()); syncInputs(); $('#confirm').hidden = true; render(); });
    function burst() {
      if (reduce) return;
      const b = $('#burst'); b.innerHTML = '';
      const cols = ['#E4DBF5', '#7D639A', '#F9D4C0', '#F8E1E4', '#E0907A', '#FFF8F2'];
      for (let i = 0; i < 26; i++) { const s = document.createElement('i'); s.style.background = cols[i % cols.length]; s.style.setProperty('--x', `${(Math.random() - 0.5) * 360}px`); s.style.setProperty('--y', `${120 + Math.random() * 220}px`); s.style.setProperty('--r', `${(Math.random() - 0.5) * 720}deg`); s.style.animationDelay = `${Math.random() * 0.15}s`; b.appendChild(s); }
      setTimeout(() => { b.innerHTML = ''; }, 1800);
    }
    render();
    window.yumieBuilder = { setFlavour(k) { state.flavour = k; syncInputs(); render(); } };
  }

  /* ---------------- scroll reveals (only for content below the first screen) ---------------- */
  function Motion() {
    const els = $$('.rv, .rv-tiles, #finalImg');
    if (reduce || !('IntersectionObserver' in window)) return;
    const vh = innerHeight;
    const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.remove('is-hidden'); en.target.classList.add('is-shown'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    els.forEach((el) => {
      // only animate what starts below the first screen; the first frame is always complete
      if (el.getBoundingClientRect().top > vh * 0.92) { el.classList.add('is-hidden'); io.observe(el); }
      else el.classList.add('is-shown');
    });
  }

  /* ---------------- share + newsletter ---------------- */
  function Share() {
    const btn = $('#shareBtn'), toast = $('#shareToast');
    btn.addEventListener('click', async () => {
      const text = '@yumie.swirls';
      try { await navigator.clipboard.writeText(text); toast.textContent = 'Copied @yumie.swirls. Tag us in your swirl.'; }
      catch { toast.textContent = 'Tag @yumie.swirls in your swirl.'; const h = $('.handle'); const sel = getSelection(); const r = document.createRange(); r.selectNodeContents(h); sel.removeAllRanges(); sel.addRange(r); }
      setTimeout(() => { toast.textContent = ''; }, 4000);
    });
  }
  function Newsletter() {
    const form = $('#newsForm'), input = $('#newsEmail'), msg = $('#newsMsg');
    const valid = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    input.addEventListener('input', () => { if (input.getAttribute('aria-invalid') === 'true' && valid(input.value.trim())) { input.removeAttribute('aria-invalid'); msg.textContent = ''; msg.className = 'news__msg'; } });
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const v = input.value.trim();
      if (!v) return fail('Pop your email address in first.');
      if (!valid(v)) return fail('That email doesn’t look quite right. Check it has an @ and a domain, like name@example.com.');
      input.removeAttribute('aria-invalid');
      if (NEWSLETTER_ENDPOINT) {
        try { const r = await fetch(NEWSLETTER_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: v }) }); if (!r.ok) throw new Error(); ok('You’re in. Watch your inbox for something sweet.'); form.reset(); }
        catch { fail('We couldn’t reach the mailing list just now. Please try again in a moment.'); }
      } else {
        ok(`Looks good! Sign-ups open when the YUMIÉ mailing list launches, so ${v} hasn’t been added to anything yet.`);
      }
    });
    function fail(t) { input.setAttribute('aria-invalid', 'true'); msg.className = 'news__msg err'; msg.textContent = t; input.focus(); }
    function ok(t) { msg.className = 'news__msg ok'; msg.textContent = t; }
  }

  Navigation(); HeroMotion(); FlavourCards(); CupBuilder(); Motion(); Share(); Newsletter();
})();
