/* ================================================================
   🍓 برای تو — Premium Romantic Interactive Website
   script.js — Vanilla ES2023 · modular · config-driven
   ================================================================ */
'use strict';

/* ================================================================
   1) CONFIG & DATA — edit everything here, nowhere else
   ================================================================ */

const CONFIG = {
  adminPassword: 'strawberry',   // 🔑 رمز پنل مدیریت — عوضش کن!
  storageKey: 'strawberry_love_answers',
  loaderMs: 1450,                // مدت نمایش صفحهی بارگذاری
  tapCountForAdmin: 5,           // چند بار لمس لوگو برای باز شدن قفل؟
  tapWindowMs: 4000,
};

/** سؤالها — همه متن آزاد؛ type = 'text' (پشتیبانی 'choice' و 'yesno' هم هست) */
const QUESTIONS = [
  {
    type: 'text',
    emoji: '💘',
    title: 'از چیِ من اول از همه خوشت اومد؟',
    placeholder: 'همین اولش... بگو 🥺',
  },
  {
    type: 'text',
    emoji: '😊',
    title: 'اولین حرف یا رفتاری که از من دیدی و لبخند آورد روی لبت چی بود؟',
    placeholder: 'اولین باری که خندیدی...',
  },
  {
    type: 'text',
    emoji: '🎨',
    title: 'اگه بخوای منو با یه رنگ توصیف کنی، چه رنگی‌ام؟',
    placeholder: 'مثلاً صورتیِ روشن 🌸',
  },
  {
    type: 'text',
    emoji: '🎵',
    title: 'اگه بخوای منو با یه آهنگ توصیف کنی، کدوم آهنگه؟',
    placeholder: 'اسم آهنگ یا یه تیکه ازش...',
  },
  {
    type: 'text',
    emoji: '✍️',
    title: 'اگر بخوای یه جمله درباره من بنویسی، چی می‌نویسی؟',
    placeholder: 'یه جمله‌ی کوتاه از خودت...',
  },
  {
    type: 'text',
    emoji: '🌌',
    title: 'فکر می‌کنی چرا قسمت شد همدیگه رو بشناسیم؟',
    placeholder: 'فکر می‌کنم یه چیزایی یه جوری رقم خورده...',
  },
  {
    type: 'text',
    emoji: '🏷️',
    title: 'دوست داری منو با چه لقبی صدا کنی؟',
    placeholder: 'هر چی دلت می‌خواد... 😄',
  },
  {
    type: 'text',
    emoji: '📸',
    title: 'اگه قرار باشه فقط یه خاطره از من و تو تا آخر عمرت یادت بمونه، دوست داری اون خاطره چی باشه؟',
    placeholder: 'اون لحظه رو برام نقاشی کن...',
  },
  {
    type: 'text',
    emoji: '✈️',
    title: 'اگه یه سفر دونفره بریم، دوست داری کجا باشه؟',
    placeholder: 'مقصد رویایی‌ات کجاست؟',
  },
  {
    type: 'text',
    emoji: '🌟',
    title: 'دلت می‌خواد اولین آرزویی که با هم برآورده می‌کنیم چی باشه؟',
    placeholder: 'بگو اولین آرزومون چی باشه...',
  },
  {
    type: 'text',
    emoji: '💞',
    title: 'به نظرت قشنگ‌ترین «ما»یی که می‌تونیم بسازیم چه شکلیه؟',
    placeholder: 'چی می‌بینی وقتی به ما فکر می‌کنی؟',
  },
  {
    type: 'text',
    emoji: '🕰️',
    title: 'دلت می‌خواد وقتی چند سال بعد به شروع رابطمون فکر می‌کنی، چی یادت بیاد؟',
    placeholder: 'چی از امروز یادت بمونه؟',
  },
  {
    type: 'text',
    emoji: '💌',
    title: 'اگر یه نامه از آینده برام بنویسی، اولین جمله‌ش چی می‌شه؟',
    placeholder: 'سلامِ تو از آینده...',
  },
];

/** متن نامه — هر آیتم یک پاراگراف */
const LETTER = [
  'سلام عزیزترینم،',
  'اگه داری این متن رو میخونی، یعنی تا همینجا باهام اومدی؛ و همین، برای من یعنی همهچیز.',
  'از همون روز اول، زندگیِ من یه رنگِ دیگه شد. تو بهم نشون دادی لطافت یعنی چی، عشق یعنی چی، و اینکه خندهی تو چطور میتونه بدترین روز من رو قشنگ کنه.',
  'بعضیوقتها فکر میکنم این همه خوششانسی از کجا... که توی این دنیای بزرگ، تو برای من اتفاق افتادی.',
  'قول میدم کنارت باشم؛ توی روزای خوب، توی روزای بد، توی روزایی که خورشید نمیتابه و روزایی که دلمون میخواد تا صبح بیدار بمونیم و فقط حرف بزنیم.',
  'میدونم زندگی همیشه گل و بلبل نیست. اما با تو، هر روزِ سخت هم ارزشِ زندهبودن داره. تو دلیلِ لبخند منی. 🍓',
  'خب... حالا نوبت یه سؤال خیلی مهمه. سؤالِ آخر. 🤍',
];

/** پیامهای بازیگوش دکمهی «نه» — به ترتیب نمایش */
const NO_MESSAGES = [
  'مطمئنی؟ 🥺',
  'یه بار دیگه فکر کن 🍓',
  'این گزینه خراب شده 😂',
  'نه قبول نیست 😤',
  'هنوزم نه؟ 😭',
  'داری اذیتم میکنی 😂',
  'خب... بازم نه؟ 🤨',
  'این دکمه داره کوچیک و کوچیکتر میشه 😂',
];

/** عناصر شناور پسزمینه */
const AMBIENT = [
  { emoji: '🍓', count: 4 },
  { emoji: '❤️', count: 3 },
  { emoji: '💗', count: 2 },
  { emoji: '✨', count: 4 },
  { emoji: '🌸', count: 3 },
];

/** گروههای ایموجی برای انفجارها */
const BURSTS = {
  hearts: ['❤️', '💖', '💗', '💓'],
  mini: ['❤️', '🍓', '✨'],
  laugh: ['😅', '🍓', '💨'],
  yes: ['❤️', '💖', '🍓', '✨', '💘'],
};

const CONFETTI_COLORS = ['#ff6b95', '#ff9db8', '#ffc6d6', '#ffffff', '#e0245a', '#ffd3a6'];

/* ================================================================
   2) UTILS
   ================================================================ */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const vibrate = (ms = 10) => {
  if (REDUCED_MOTION) return;
  navigator.vibrate?.(ms);
};

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const rand = (min, max) => min + Math.random() * (max - min);

const faDate = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'full' });
const faTime = new Intl.DateTimeFormat('fa-IR', { timeStyle: 'medium' });

/* ================================================================
   3) STORAGE — answers in LocalStorage
   ================================================================ */

const Storage = {
  read() {
    try {
      return JSON.parse(localStorage.getItem(CONFIG.storageKey)) ?? [];
    } catch {
      return [];
    }
  },

  write(list) {
    localStorage.setItem(CONFIG.storageKey, JSON.stringify(list));
  },

  /** ذخیرهی یک پاسخ: سؤال + جواب + تاریخ + ساعت */
  add(question, answer) {
    const now = new Date();
    const list = this.read();
    list.push({
      question,
      answer,
      date: faDate.format(now),
      time: faTime.format(now),
      ts: now.toISOString(),
    });
    this.write(list);
  },

  remove(ts) {
    this.write(this.read().filter((r) => r.ts !== ts));
  },

  clear() {
    this.write([]);
  },
};

/* ================================================================
   4) FX ENGINE — bursts, confetti, ambient float, ripple
   ================================================================ */

const FX = {
  layer: null,
  floatLayer: null,
  confetti: null,
  ambientSpawned: false,

  init() {
    this.layer = $('#fx-layer');
    this.floatLayer = $('#float-layer');
    this.confetti = new ConfettiEngine($('#confetti-canvas'));
    this.spawnAmbient();
    this.wireRipples();
  },

  /** پاشیدن ایموجی از یک نقطه — برای لحظهی پاسخ دادن */
  burst(x, y, kind, count = 10, power = 1) {
    if (REDUCED_MOTION || !this.layer) return;
    const set = BURSTS[kind] ?? BURSTS.mini;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      el.className = 'fx-emoji';
      el.textContent = pick(set);
      const angle = Math.random() * Math.PI * 2;
      const dist = rand(60, 150) * power;
      el.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
      el.style.setProperty('--dy', `${Math.sin(angle) * dist - 40}px`);
      el.style.setProperty('--rot', `${rand(-120, 120)}deg`);
      el.style.setProperty('--dur', `${rand(500, 1050)}ms`);
      el.style.fontSize = `${rand(14, 26)}px`;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      this.layer.appendChild(el);
      el.addEventListener('animationend', () => el.remove(), { once: true });
    }
  },

  /** باران قلب در لحظهی جشن */
  heartRain(count = 16) {
    if (REDUCED_MOTION) return;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      el.className = 'rain-heart';
      el.textContent = pick(['❤️', '💖', '💗', '💕', '🍓']);
      el.style.left = `${rand(4, 96)}%`;
      el.style.fontSize = `${rand(16, 34)}px`;
      el.style.setProperty('--dur', `${rand(1800, 3200)}ms`);
      el.style.setProperty('--delay', `${rand(0, 1400)}ms`);
      el.style.setProperty('--rot', `${rand(-50, 50)}deg`);
      document.body.appendChild(el);
      el.addEventListener('animationend', () => el.remove(), { once: true });
    }
  },

  /** عناصر شناور پسزمینه — یک بار ساخته میشوند */
  spawnAmbient() {
    if (this.ambientSpawned || REDUCED_MOTION) return;
    this.ambientSpawned = true;
      AMBIENT.forEach((group) => {
      for (let i = 0; i < group.count; i++) {
        const outer = document.createElement('span');
        outer.className = 'float-outer';
        outer.style.left = `${rand(2, 96)}%`;
        outer.style.fontSize = `${rand(13, 27)}px`;
        outer.style.setProperty('--dur', `${rand(18, 30)}s`);      // rise duration
        outer.style.setProperty('--delay', `${rand(-30, 0)}s`);    // negative = mid-flight at load
        outer.style.setProperty('--dur-s', `${rand(3, 6)}s`);      // sway duration
        outer.style.setProperty('--drift', `${rand(-46, 46)}px`);

        const inner = document.createElement('span');
        inner.className = 'float-inner';
        inner.textContent = group.emoji;

        outer.appendChild(inner);
        this.floatLayer.appendChild(outer);
      }
    });
  },

  /** افکت موج لمس روی همهی دکمهها */
  wireRipples() {
    document.addEventListener(
      'pointerdown',
      (e) => {
        const btn = e.target.closest('.btn');
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 1.3;
        const rip = document.createElement('span');
        rip.className = 'ripple';
        rip.style.width = rip.style.height = `${size}px`;
        rip.style.left = `${e.clientX - rect.left - size / 2}px`;
        rip.style.top = `${e.clientY - rect.top - size / 2}px`;
        btn.appendChild(rip);
        rip.addEventListener('animationend', () => rip.remove(), { once: true });
      },
      { passive: true }
    );
  },
};

/** موتور کانفتی با Canvas — سبک و روان (60fps) */
class ConfettiEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.parts = [];
    this.running = false;
    this.raf = 0;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = innerWidth * dpr;
    this.canvas.height = innerHeight * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  spawn(n = 8, fromTop = false) {
    if (REDUCED_MOTION) return;
    for (let i = 0; i < n; i++) {
      this.parts.push({
        x: rand(0, innerWidth),
        y: fromTop ? rand(-20, innerHeight * 0.5) : rand(-20, 0),
        vx: rand(-1.6, 1.6),
        vy: rand(1.2, 3.2),
        g: 0.16,
        rot: rand(0, Math.PI * 2),
        vr: rand(-0.18, 0.18),
        size: rand(5, 10),
        color: pick(CONFETTI_COLORS),
        shape: Math.random() < 0.25 ? 'circle' : 'rect',
      });
    }
    if (!this.running) this.loop();
  }

  loop() {
    this.running = true;
    const step = () => {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      this.parts = this.parts.filter((p) => p.y < innerHeight + 30);
      for (const p of this.parts) {
        p.vy += p.g;
        p.vx += Math.sin(p.y * 0.02) * 0.06; // sway
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        }
        ctx.restore();
      }
      if (this.parts.length === 0) {
        this.running = false;
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        return;
      }
      this.raf = requestAnimationFrame(step);
    };
    this.raf = requestAnimationFrame(step);
  }

  /** بارش پیوسته برای مدتی مشخص */
  rain(durationMs, everyMs = 110, n = 7) {
    if (REDUCED_MOTION) return;
    const end = Date.now() + durationMs;
    const timer = setInterval(() => {
      if (Date.now() > end) return clearInterval(timer);
      this.spawn(n, true);
    }, everyMs);
  }
}

/* ================================================================
   5) 3D MOTION ENGINE — tilt cards + background parallax
   ================================================================ */

const Motion3D = {
  items: [],
  blobs: [],
  floatLayer: null,
  nx: 0, ny: 0,       // normalized pointer position (-1 .. 1)
  lx: 0, ly: 0,       // lerped (smooth) pointer position
  MAX_TILT: 7,

  init() {
    if (REDUCED_MOTION) return;
    this.floatLayer = $('#float-layer');
    this.blobs = $$('.blob-move');

    // کارتهای .tilt — با کشیدن انگشت یا موس میچرخند
    $$('.tilt').forEach((el) => {
      const item = { el, rx: 0, ry: 0, tx: 0, ty: 0 };
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0) return;
        item.tx = ((e.clientY - r.top) / r.height - 0.5) * -2 * this.MAX_TILT;
        item.ty = ((e.clientX - r.left) / r.width - 0.5) * 2 * this.MAX_TILT;
      });
      el.addEventListener('pointerleave', () => {
        item.tx = 0;
        item.ty = 0;
      });
      this.items.push(item);
    });

    window.addEventListener('pointermove', (e) => {
      this.nx = (e.clientX / innerWidth - 0.5) * 2;
      this.ny = (e.clientY / innerHeight - 0.5) * 2;
    }, { passive: true });

    this.loop();
  },

  loop() {
    const lerp = (a, b, t) => a + (b - a) * t;

    for (const it of this.items) {
      it.rx = lerp(it.rx, it.tx, 0.12);
      it.ry = lerp(it.ry, it.ty, 0.12);
      const idle = Math.abs(it.rx) < 0.05 && Math.abs(it.ry) < 0.05;
      it.el.style.transform = idle
        ? 'perspective(900px)'
        : `perspective(900px) rotateX(${it.rx.toFixed(2)}deg) rotateY(${it.ry.toFixed(2)}deg) scale3d(1.02, 1.02, 1)`;
    }

    // پارالاکس نرم پسزمینه — بلابها و عناصر شناور
    this.lx = lerp(this.lx, this.nx, 0.06);
    this.ly = lerp(this.ly, this.ny, 0.06);
    const bx = this.lx * 14;
    const by = this.ly * 10;
    for (const b of this.blobs) b.style.transform = `translate(${bx.toFixed(1)}px, ${by.toFixed(1)}px)`;
    if (this.floatLayer) {
      this.floatLayer.style.transform = `translate(${(this.lx * 9).toFixed(1)}px, ${(this.ly * 7).toFixed(1)}px)`;
    }

    requestAnimationFrame(() => this.loop());
  },
};

/* ================================================================
   6) SCREEN MANAGER
   ================================================================ */

const Screen = {
  go(id) {
    document.querySelectorAll('.screen').forEach((s) => {
      const show = s.id === id;
      s.classList.toggle('active', show);
    });
    const scrollables = document.querySelectorAll('.screen-letter');
    scrollables.forEach((el) => el.scrollTo?.({ top: 0 }));
  },
};

const UI = {
  topbar: null,
  progress: null,
  progressFill: null,
};

/* ================================================================
   7) LOADER & HERO
   ================================================================ */

function initLoader() {
  setTimeout(() => {
    $('#loader').classList.add('hide');
    UI.topbar.classList.add('show');
    document.body.classList.add('ready'); // ورود پلکانی عناصر قهرمان
    setTimeout(() => $('#loader').remove(), 800);
  }, CONFIG.loaderMs);
}

function initHero() {
  const card = $('#hero-card');

  const start = (e) => {
    vibrate(12);
    const r = card.getBoundingClientRect();
    FX.burst(e?.clientX ?? r.left + r.width / 2, e?.clientY ?? r.top + r.height / 2, 'hearts', 12);
    Screen.go('screen-questions');
    UI.progress.classList.remove('hidden');
    startQuestions();
  };

  // همهی کارت قهرمان لمسپذیر است — دکمهای وجود ندارد
  card.addEventListener('click', start);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') start(e);
  });
}

/* ================================================================
   8) QUESTIONS — یک سؤال در لحظه، پیکربندیشده از QUESTIONS
   ================================================================ */

const Quiz = {
  index: 0,
  locked: false,

  start() {
    this.index = 0;
    this.render();
  },

  render() {
    const q = QUESTIONS[this.index];
    const card = $('#q-card');
    const body = $('#q-body');

    $('#q-emoji').textContent = q.emoji ?? '🍓';
    $('#q-title').textContent = q.title;
    $('#progress-fill').style.width = `${((this.index + 1) / QUESTIONS.length) * 100}%`;

    body.innerHTML = '';

    if (q.type === 'choice' || q.type === 'yesno') {
      const wrap = document.createElement('div');
      wrap.className = 'options';
      if (q.type === 'choice' && q.options.length <= 2) wrap.classList.add('two');

      q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'opt';
        btn.textContent = opt;
        btn.style.animationDelay = `${0.1 + i * 0.07}s`;
        btn.addEventListener('click', () => this.answer(opt, btn));
        wrap.appendChild(btn);
      });

      body.appendChild(wrap);
    } else if (q.type === 'text') {
      const form = document.createElement('form');
      form.className = 'text-form';
      form.innerHTML = `
        <input id="q-input" class="input" type="text" maxlength="200"
               placeholder="${q.placeholder ?? 'هر چی دوست داری بنویس...'}" autocomplete="off" />
        <button class="btn btn-primary btn-block" type="submit">
          <span class="btn-label">بفرست 💌</span>
          <span class="btn-shine" aria-hidden="true"></span>
        </button>`;
      body.appendChild(form);

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = $('#q-input');
        const value = input.value.trim() || 'نمیدونم، خودت حدس بزن 😄';
        this.answer(value, $('.btn', form), true);
      });

      setTimeout(() => $('#q-input')?.focus({ preventScroll: true }), 350);
    }

    // ریاستارت انیمیشن ورود کارت + اسپارکلهای خوشآمد
    card.classList.remove('enter', 'leave', 'answered');
    void card.offsetWidth;
    card.classList.add('enter');
    const cr = card.getBoundingClientRect();
    FX.burst(cr.left + cr.width / 2, cr.top + 46, 'mini', 6, 0.8);
  },

  answer(value, el, echoMode = false) {
    if (this.locked) return;
    this.locked = true;

    const rect = el.getBoundingClientRect();
    FX.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 'hearts', 10);
    vibrate(8);

    Storage.add(QUESTIONS[this.index].title, value);

    const card = $('#q-card');
    card.classList.add('answered', 'leave');

    // برای جواب‌های متنی، جوابش مثل پیامک قشنگ نمایش داده میشه
    const delay = echoMode ? 1150 : 700;
    if (echoMode) {
      const echo = document.createElement('div');
      echo.className = 'answer-echo';
      echo.textContent = value;
      $('#q-body').replaceChildren(echo);
    }

    setTimeout(() => {
      card.classList.remove('answered');
      this.locked = false;
      this.index++;

      if (this.index >= QUESTIONS.length) {
        Screen.go('screen-letter');
        UI.progress.classList.add('hidden');
        typeLetter();
      } else {
        this.render();
      }
    }, delay);
  },
};

function startQuestions() {
  Quiz.start();
}

/* ================================================================
   9) LOVE LETTER — typewriter + smooth scroll
   ================================================================ */

async function typeLetter() {
  const envelopeWrap = $('#envelope-wrap');
  const envelope = $('#envelope');
  const letter = $('#letter');
  const body = $('#letter-body');
  const btn = $('#btn-letter-next');
  const scrollEl = $('.screen-letter');
  let skip = false;

  // ---- فاز پاکت‌نامه: با یک لمس باز میشود ----
  envelopeWrap.hidden = false;
  letter.hidden = true;
  scrollEl.scrollTo({ top: 0 });

  const openEnvelope = () => {
    envelope.classList.add('open');
    vibrate(10);
  };

  await new Promise((resolve) => {
    const open = () => {
      openEnvelope();
      envelope.removeEventListener('keydown', key);
      resolve();
    };
    const key = (e) => {
      if (e.key === 'Enter' || e.key === ' ') open();
    };
    envelope.addEventListener('click', open, { once: true });
    envelope.addEventListener('keydown', key);
  });

  await sleep(950);                 // باز شدن درپوش + بیرون آمدن نامه
  envelopeWrap.classList.add('gone');
  await sleep(520);                 // محو شدن پاکت
  envelopeWrap.hidden = true;
  letter.hidden = false;

  // ---- فاز تایپ نامه ----
  body.innerHTML = '';
  btn.classList.remove('hidden');
  btn.className = 'btn btn-ghost btn-block';
  btn.querySelector('.btn-label').textContent = 'نمایش کامل ✨';

  // کلیک روی دکمه = نمایش آنی کل متن
  btn.onclick = () => {
    skip = true;
    if (btn.querySelector('.btn-label').textContent.startsWith('نمایش')) {
      btn.className = 'btn btn-primary btn-block';
      btn.querySelector('.btn-label').textContent = 'ادامه 🍓';
    }
  };

  for (let i = 0; i < LETTER.length; i++) {
    const p = document.createElement('p');
    p.classList.add('typing');
    body.appendChild(p);
    scrollEl.scrollTo({ top: scrollEl.scrollHeight, behavior: 'smooth' });

    if (skip) {
      p.textContent = LETTER[i];
    } else {
      for (const ch of LETTER[i]) {
        if (skip) {
          p.textContent = LETTER[i];
          break;
        }
        p.textContent += ch;
        await sleep(22);
      }
    }
    p.classList.remove('typing');
    await sleep(160);
  }

  // امضای پای نامه
  const sign = document.createElement('div');
  sign.className = 'letter-sign';
  sign.innerHTML = '<div class="sign-line"></div><p class="sign-text">با تمام عشق، برای تو 🍓</p>';
  body.appendChild(sign);
  scrollEl.scrollTo({ top: scrollEl.scrollHeight, behavior: 'smooth' });

  btn.onclick = () => Screen.go('screen-final');
  btn.className = 'btn btn-primary btn-block';
  btn.querySelector('.btn-label').textContent = 'ادامه 🍓';
  btn.classList.add('pulse-cta');
}

/* ================================================================
   10) FINAL QUESTION — YES grows, NO runs away (playfully)
   ================================================================ */

const Final = {
  noClicks: 0,

  init() {
    $('#btn-yes').addEventListener('click', () => this.onYes());
    $('#btn-no').addEventListener('click', () => this.onNo());
  },

  onNo() {
    this.noClicks++;
    const i = Math.min(this.noClicks - 1, NO_MESSAGES.length - 1);
    const msg = $('#final-msg');
    msg.textContent = NO_MESSAGES[i];
    msg.classList.remove('show');
    void msg.offsetWidth;
    msg.classList.add('show');
    vibrate(6);

    const yes = $('#btn-yes');
    const no = $('#btn-no');
    const wrap = $('#no-wrap');

    // آره بزرگتر و درخشانتر میشود...
    const yesScale = Math.min(1 + this.noClicks * 0.13, 1.85);
    yes.style.scale = yesScale;
    if (this.noClicks >= 3) yes.classList.add('big-glow');

    // نه کوچکتر میشود — اما همیشه بالای «آره» و قابل کلیک میماند
    const noScale = Math.max(1 - this.noClicks * 0.09, 0.5);
    no.style.scale = noScale;

    // و توی ستون خودش جستوخیز میکند — هرگز به «آره» نمیچسبد
    const hopX = rand(-14, 14);
    const hopY = rand(-22, 22);
    wrap.style.transform = `translate(${hopX.toFixed(1)}px, ${hopY.toFixed(1)}px)`;

    wrap.classList.remove('wobble');
    void wrap.offsetWidth;
    wrap.classList.add('wobble');

    const r = no.getBoundingClientRect();
    FX.burst(r.left + r.width / 2, r.top + r.height / 2, 'laugh', 6, 0.7);
  },

  onYes() {
    const btn = $('#btn-yes');
    const r = btn.getBoundingClientRect();
    FX.burst(r.left + r.width / 2, r.top + r.height / 2, 'yes', 18, 1.3);
    vibrate(30);

    Storage.add('سؤال آخر: میخوای همیشه کنارم بمونی؟', 'آره میمونم ❤️');

    Screen.go('screen-celebration');
    startCelebration();
  },
};

/* ================================================================
   11) CELEBRATION — emotional peak
   ================================================================ */

function startCelebration() {
  FX.confetti.rain(2600, 100, 8);
  FX.heartRain(18);

  // انفجارهای پیاپی در کل صحنه
  let explosions = 0;
  const timer = setInterval(() => {
    explosions++;
    if (explosions > 12) return clearInterval(timer);
    FX.burst(rand(innerWidth * 0.1, innerWidth * 0.9), rand(innerHeight * 0.15, innerHeight * 0.85), 'yes', 8, 1);
  }, 220);

  $('#btn-replay').addEventListener('click', () => location.reload(), { once: true });
}

/* ================================================================
   12) HIDDEN ADMIN PANEL
   ================================================================ */

const Admin = {
  tapCount: 0,
  tapTimer: null,

  init() {
    $('#admin-trigger').addEventListener('click', () => this.onTap());
    $('#btn-pass-ok').addEventListener('click', () => this.unlock());
    $('#btn-pass-cancel').addEventListener('click', () => this.closeLock());
    $('#btn-admin-close').addEventListener('click', () => this.closePanel());
    $('#btn-export').addEventListener('click', () => this.export());
    this.wireClearButton();

    const passInput = $('#admin-pass');
    passInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.unlock();
      if (e.key === 'Escape') this.closeLock();
    });

    // میانبر مخفی از طریق آدرس: index.html#admin
    if (location.hash === '#admin') {
      try {
        history.replaceState(null, '', location.pathname);
      } catch { /* file:// may throw — ignore */ }
      this.openLock();
    }
  },

  /** ۵ بار لمس سریع لوگو → قفل باز میشود */
  onTap() {
    this.tapCount++;
    clearTimeout(this.tapTimer);
    this.tapTimer = setTimeout(() => (this.tapCount = 0), CONFIG.tapWindowMs);
    if (this.tapCount >= CONFIG.tapCountForAdmin) {
      this.tapCount = 0;
      this.openLock();
    }
  },

  openLock() {
    const lock = $('#admin-lock');
    lock.hidden = false;
    const card = $('.lock-card', lock);
    card.classList.remove('shake');
    setTimeout(() => $('#admin-pass').focus(), 300);
  },

  closeLock() {
    $('#admin-lock').hidden = true;
    $('#admin-pass').value = '';
    $('#admin-error').hidden = true;
  },

  unlock() {
    if ($('#admin-pass').value === CONFIG.adminPassword) {
      this.closeLock();
      this.render();
      $('#admin-panel').hidden = false;
    } else {
      const err = $('#admin-error');
      err.hidden = false;
      const card = $('.lock-card', $('#admin-lock'));
      card.classList.remove('shake');
      void card.offsetWidth;
      card.classList.add('shake');
      $('#admin-pass').select();
    }
  },

  closePanel() {
    $('#admin-panel').hidden = true;
  },

  render() {
    const list = Storage.read();
    $('#admin-stats').textContent = `${list.length} پاسخ ثبت شده`;

    const box = $('#admin-list');
    box.innerHTML = '';

    if (list.length === 0) {
      box.innerHTML = '<p class="admin-empty">هنوز پاسخی ثبت نشده 🍃</p>';
      return;
    }

    list
      .slice()
      .reverse()
      .forEach((item, i) => {
        const row = document.createElement('div');
        row.className = 'admin-item';
        row.style.animationDelay = `${Math.min(i * 0.04, 0.4)}s`;
        row.innerHTML = `
          <div class="ai-main">
            <div class="ai-q">${escapeHtml(item.question)}</div>
            <div class="ai-a">${escapeHtml(item.answer)}</div>
            <div class="ai-time">${item.date} — ${item.time}</div>
          </div>
          <button class="ai-del" type="button" aria-label="حذف">🗑</button>`;
        row.querySelector('.ai-del').addEventListener('click', () => {
          Storage.remove(item.ts);
          this.render();
        });
        box.appendChild(row);
      });
  },

  wireClearButton() {
    const btn = $('#btn-clear');
    let armed = false;
    let timer = null;
    btn.addEventListener('click', () => {
      if (!armed) {
        armed = true;
        btn.textContent = 'مطمئنی؟ دوباره بزن';
        timer = setTimeout(() => {
          armed = false;
          btn.textContent = 'حذف همه';
        }, 2500);
        return;
      }
      clearTimeout(timer);
      armed = false;
      btn.textContent = 'حذف همه';
      Storage.clear();
      this.render();
    });
  },

  export() {
    const list = Storage.read();
    const blob = new Blob([JSON.stringify(list, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `answers-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },
};

/** جلوگیری از خراب شدن HTML توسط پاسخهای متنی */
function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

/* ================================================================
   13) INIT
   ================================================================ */

function init() {
  UI.topbar = $('#topbar');
  UI.progress = $('#progress');
  UI.progressFill = $('#progress-fill');

  FX.init();
  Motion3D.init();
  initLoader();
  initHero();
  Final.init();
  Admin.init();

  // بستن پنلها با کلید Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      Admin.closeLock();
      Admin.closePanel();
    }
  });
}

init();
