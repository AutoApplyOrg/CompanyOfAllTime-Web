// Landing page behavior (ported from the Claude Design export).
const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// "applied while you were scrolling" ticker
let count = 127;
const countEl = document.getElementById('applied-count');
setInterval(() => { countEl.textContent = ++count; }, 1400);

function setupMotion() {
  // hover wobble on tilted stickers
  document.querySelectorAll('[style*="rotate("]').forEach(el => {
    if (el.closest('h1') || el.offsetWidth > 700 || el.dataset.wob) return;
    el.dataset.wob = 1;
    el.addEventListener('mouseenter', () => el.animate([{ rotate: '0deg', translate: '0 0' }, { rotate: '-2.5deg', translate: '0 -6px' }, { rotate: '1.5deg', translate: '0 -6px' }, { rotate: '0deg', translate: '0 -5px' }], { duration: 420, easing: 'ease-out', fill: 'forwards' }));
    el.addEventListener('mouseleave', () => el.animate([{ translate: '0 -5px' }, { translate: '0 0' }], { duration: 260, easing: 'ease-out', fill: 'forwards' }));
  });
  // headline letters repel from cursor
  const h1 = document.querySelector('h1');
  const letters = [];
  if (h1 && !h1.dataset.split) {
    h1.dataset.split = 1;
    h1.querySelectorAll(':scope > span').forEach(sp => {
      const txt = sp.textContent; sp.textContent = '';
      [...txt].forEach(ch => { const l = document.createElement('span'); l.textContent = ch; l.style.cssText = 'display:inline-block;transition:translate .35s cubic-bezier(.2,.8,.2,1.4),rotate .35s'; sp.appendChild(l); letters.push(l); });
    });
  }
  let raf = 0;
  const move = e => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => letters.forEach((l, i) => {
      const r = l.getBoundingClientRect(), dx = r.left + r.width / 2 - e.clientX, dy = r.top + r.height / 2 - e.clientY, d = Math.hypot(dx, dy), R = 150;
      if (d < R) { const f = (1 - d / R) * 26 / (d || 1); l.style.translate = `${dx * f}px ${dy * f}px`; l.style.rotate = `${(i % 2 ? 1 : -1) * (1 - d / R) * 14}deg`; }
      else if (l.style.translate) { l.style.translate = ''; l.style.rotate = ''; }
    }));
  };
  window.addEventListener('mousemove', move);
  // sections fly in, off-kilter
  const show = s => { s.style.opacity = 1; s.style.translate = '0 0'; s.style.rotate = '0deg'; s.dataset.shown = 1; };
  const pending = [];
  document.querySelectorAll('section').forEach((s, i) => {
    show(s);
    if (s.getBoundingClientRect().top < innerHeight * 0.9) return;
    s.style.transition = 'opacity .7s ease, translate .9s cubic-bezier(.2,.9,.25,1.15), rotate .9s cubic-bezier(.2,.9,.25,1.15)';
    s.style.opacity = 0; s.style.translate = '0 70px'; s.style.rotate = (i % 2 ? 2 : -2) + 'deg'; delete s.dataset.shown;
    pending.push(s);
  });
  const check = () => pending.forEach(s => { if (!s.dataset.shown && s.getBoundingClientRect().top < innerHeight * 0.9) show(s); });
  window.addEventListener('scroll', check, { passive: true, capture: true });
  window.addEventListener('resize', check);
  setTimeout(() => pending.forEach(show), 15000);
}

function burst(el) {
  if (still || !el) return;
  const r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  const bits = ['HIRED', '★', 'lol', 'OFFER!', '✓', '★', 'yay', '✂', 'CEO?', '★'];
  const cols = ['#c6f432', '#f5c518', '#2340ff', '#f4ecd8', '#111'];
  for (let i = 0; i < 28; i++) {
    const b = document.createElement('div'), c = cols[i % cols.length];
    b.textContent = bits[i % bits.length];
    b.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;z-index:999;pointer-events:none;font-family:'Bagel Fat One';font-size:${14 + (i % 3) * 6}px;padding:3px 8px;border:2px solid #111;background:${c};color:${c === '#111' || c === '#2340ff' ? '#f4ecd8' : '#111'}`;
    document.body.appendChild(b);
    const a = Math.random() * Math.PI * 2, v = 160 + Math.random() * 260, dx = Math.cos(a) * v, dy = Math.sin(a) * v - 120, rot = (Math.random() - .5) * 540;
    b.animate([{ transform: 'translate(-50%,-50%) scale(.3)', opacity: 1 }, { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${rot / 2}deg) scale(1)`, opacity: 1, offset: .55 }, { transform: `translate(calc(-50% + ${dx * 1.2}px), calc(-50% + ${dy + 260}px)) rotate(${rot}deg) scale(.9)`, opacity: 0 }], { duration: 1500 + Math.random() * 600, easing: 'cubic-bezier(.15,.7,.4,1)', fill: 'forwards' }).onfinish = () => b.remove();
  }
}

// waitlist form (no backend yet: just celebrates and swaps in the confirmation)
const form = document.getElementById('waitlist');
form.addEventListener('submit', e => {
  e.preventDefault();
  burst(form);
  form.hidden = true;
  document.getElementById('waitlist-done').hidden = false;
});

if (!still) setTimeout(setupMotion, 300);
