

// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);






// HEALTH SYSTEM TAB SCRIPT -------------------------->

const splideInstances = {};

function initSplide(index) {
  if (splideInstances[index]) return;
  const el = document.getElementById('splide-' + index);
  if (!el) return;
  splideInstances[index] = new Splide(el, {
    perPage: 2,
    gap: '12px',
    pagination: false,
    arrows: false,
    breakpoints: { 500: { perPage: 1 } }
  }).mount();

  const prev = el.querySelector('.splide__arrow--prev');
  const next = el.querySelector('.splide__arrow--next');
  if (prev) prev.addEventListener('click', () => splideInstances[index].go('<'));
  if (next) next.addEventListener('click', () => splideInstances[index].go('>'));
}

initSplide(0);

document.querySelectorAll('.tab-item').forEach(tab => {
  function activate() {
    const idx = parseInt(tab.dataset.tab);
    document.querySelectorAll('.tab-item').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    tab.setAttribute('aria-selected','true');
    const content = document.getElementById('tab-content-' + idx);
    if (content) content.classList.add('active');
    initSplide(idx);
  }
  tab.addEventListener('click', activate);
  tab.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); } });
});
