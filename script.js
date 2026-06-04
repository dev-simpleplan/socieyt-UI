

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

  const splide = new Splide(el, {
    perPage: 2,
    gap: '20px',
    pagination: false,
    arrows: true,
    breakpoints: {
      500: {
        perPage: 1
      }
    }
  });

  splide.mount();
  splideInstances[index] = splide;

  const arrows = el.querySelector('.splide__arrows');

  function toggleArrows() {
    const totalSlides = splide.length;
    const perPage = splide.options.perPage;

    arrows.style.display = totalSlides <= perPage ? 'none' : 'flex';
  }

  toggleArrows();

  splide.on('updated resized', toggleArrows);

  const prev = el.querySelector('.splide__arrow--prev');
  const next = el.querySelector('.splide__arrow--next');

  if (prev) {
    prev.addEventListener('click', () => splide.go('<'));
  }

  if (next) {
    next.addEventListener('click', () => splide.go('>'));
  }
}

// Initialize first tab
initSplide(0);

document.querySelectorAll('.tab-item').forEach(tab => {
  function activate() {
    const idx = parseInt(tab.dataset.tab);

    document.querySelectorAll('.tab-item').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });

    document.querySelectorAll('.tab-content').forEach(c => {
      c.classList.remove('active');
    });

    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    const content = document.getElementById('tab-content-' + idx);

    if (content) {
      content.classList.add('active');
    }

    initSplide(idx);
  }

  tab.addEventListener('click', activate);

  tab.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      activate();
    }
  });
});




document.addEventListener('DOMContentLoaded', function () {
  new Splide('#approach_splide', {
    perPage: 3,
    perMove: 1,
    gap: "30px",
    padding: { left: 150, right: 0 },
    pagination: false,
  }).mount();
});





gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Initial state
gsap.set(".point", {
    opacity: 0,
    y: 20
});

const orbitProgress = document.querySelector("#orbitPathGradient");
const pathLength = orbitProgress.getTotalLength();
gsap.set(orbitProgress, {
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength
});


// Timeline
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".outcomes_section_in",
        start: "top -50px",
        end: "+=4000",
        scrub: true,
        pin: true,
        anticipatePin: 1,
        markers: false
    }
});

tl.to("#orbitPathGradient", {
    strokeDashoffset: 0,
    ease: "none",
    duration: 1
}, 0);

// Move dot around full circle
tl.to("#movingDot", {
    motionPath: {
        path: "#orbitPath",
        align: "#orbitPath",
        alignOrigin: [0.5, 0.5],
        autoRotate: false
    },
    ease: "none",
    duration: 1
}, 0);


tl.addLabel("point1", 0);
tl.addLabel("point2", 0.25);
tl.addLabel("point3", 0.5);
tl.addLabel("point4", 0.75);

// Text Visible -------------
tl.to(".point-1", {
    opacity: 1,
    y: 0,
    duration: 0.05
}, "point1");
tl.to(".point-2", {
    opacity: 1,
    y: 0,
    duration: 0.05
}, "point2");
tl.to(".point-3", {
    opacity: 1,
    y: 0,
    duration: 0.05
}, "point3");
tl.to(".point-4", {
    opacity: 1,
    y: 0,
    duration: 0.05
}, "point4");

// Dot Color Change --------
tl.to(".dot-1", {
    fill: "url(#dotGradient)"
}, "point1");
tl.to(".dot-2", {
    fill: "url(#dotGradient)"
}, "point2");
tl.to(".dot-3", {
    fill: "url(#dotGradient)"
}, "point3");
tl.to(".dot-4", {
    fill: "url(#dotGradient)"
}, "point4");





// ====== TEXT REVEAL ANIMATE =====

gsap.utils.toArray(".reveal-up").forEach((element) => {

    gsap.to(element, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",

        scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });

});




// ==== STEPS SECTION CARD ANIMATE ======

gsap.to(".process-card", {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",

    stagger: {
        each: 0.25
    },

    scrollTrigger: {
        trigger: ".steps_section_in",
        start: "top 50%",
    }
});



// ==== BANNER IMAGE & CONTENT ANIMATE ======

gsap.from(".hero_section_img", {
  scale: 1.2,
  filter: "blur(20px)",
  duration: 2,
  ease: "power3.out",
})

gsap.from(".hero_content_wrap", {
  y: 50,
  opacity: 0,
  duration: 1.5,
  ease: "power3.out",
  delay: 1
})





// Intersect Shape Code
function intersect(){
  const svg = document.getElementById('vs');
  const ns  = 'http://www.w3.org/2000/svg';

  // ── Geometry (scaled to 680px wide container) ──
  // Full width from left-circle leftmost point to right-circle rightmost point = 680px
  // So: cx1 - r = 0  →  cx1 = r
  //     cx2 + r = 680 →  cx2 = 680 - r
  // We want circles to overlap nicely, picking r=200
  const r   = 200;
  const cy  = 180;
  const cx1 = 200;
  const cx2 = 480;

  // Intersection points
  const ix        = (cx1 + cx2) / 2;          // 340
  const iy_offset = Math.sqrt(r*r - (ix-cx1)*(ix-cx1));
  const iy_top    = cy - iy_offset;
  const iy_bot    = cy + iy_offset;

  const tx = ix.toFixed(2);
  const ty = iy_top.toFixed(2);
  const by = iy_bot.toFixed(2);

  const lensD = `M ${tx},${ty} A ${r},${r} 0 0,0 ${tx},${by} A ${r},${r} 0 0,0 ${tx},${ty} Z`;

  function mkEl(tag, attrs) {
    const el = document.createElementNS(ns, tag);
    for (const [k,v] of Object.entries(attrs)) el.setAttribute(k, v);
    return el;
  }

  // ── Circle fills ──
  // const fillL = mkEl('circle',{ cx:cx1, cy, r, fill:'rgba(55,18,110,0.22)' });
  // const fillR = mkEl('circle',{ cx:cx2, cy, r, fill:'rgba(55,18,110,0.22)' });
  // svg.appendChild(fillL);
  // svg.appendChild(fillR);

  // ── Lens gradient fill ──
  const lensFill = mkEl('path',{ d:lensD, fill:'url(#lg)', opacity:'0' });
  svg.appendChild(lensFill);

  // ── Lens sheen ──
  const lensSheen = mkEl('path',{ d:lensD, fill:'url(#sheen)', opacity:'0' });
  svg.appendChild(lensSheen);

  // ── Lens glow (hidden until trigger) ──
  const lensGlow = mkEl('path',{ d:lensD, fill:'url(#lg)', filter:'url(#glow-lens)', opacity:'0' });
  svg.insertBefore(lensGlow, lensFill);

  // ── Circle strokes ──
  const strokeL = mkEl('circle',{
    cx:cx1, cy, r, fill:'none',
    stroke:'rgba(130,90,210,0.5)', 'stroke-width':'0.7', id:'strokeL'
  });
  const strokeR = mkEl('circle',{
    cx:cx2, cy, r, fill:'none',
    stroke:'rgba(130,90,210,0.5)', 'stroke-width':'0.7', id:'strokeR'
  });
  svg.appendChild(strokeL);
  svg.appendChild(strokeR);

  const lineStartY = iy_top - 80;
  const lineEndY   = iy_top;

  const lineTrack = mkEl('line',{
    x1:tx, y1:lineStartY.toFixed(2),
    x2:tx, y2:lineStartY.toFixed(2),  // initially zero length
    stroke:'rgba(180,140,255,0.55)',
    'stroke-width':'1',
    'stroke-linecap':'round',
    opacity:'0'
  });
  svg.appendChild(lineTrack);

  // ── Animation state ──
  let triggered = false;

  function runAnimation() {
    if (triggered) return;
    triggered = true;

    const wrap = document.getElementById('venn-wrap');
    wrap.classList.add('triggered');

    // Step 1: Show line instantly, then animate it downward over 900ms
    lineTrack.setAttribute('opacity','1');

    const duration = 900;
    const startTime = performance.now();
    const startY = parseFloat(lineStartY.toFixed(2));
    const endY   = parseFloat(iy_top.toFixed(2));

    function animateLine(now) {
      const t = Math.min((now - startTime) / duration, 1);
      // ease-in-out cubic
      const ease = t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
      const curY2 = startY + (endY - startY) * ease;
      lineTrack.setAttribute('y2', curY2.toFixed(2));

      if (t < 1) {
        requestAnimationFrame(animateLine);
      } else {
        // Line reached the lens top point — trigger glow
        onLineTouchLens();
      }
    }
    requestAnimationFrame(animateLine);
  }

  function onLineTouchLens() {
    // 1. Fade line out
    lineTrack.style.transition = 'opacity 0.4s ease';
    lineTrack.style.opacity = '0';

    // 2. Reveal lens with fade
    lensFill.style.transition  = 'opacity 0.5s ease';
    lensSheen.style.transition = 'opacity 0.5s ease';
    lensFill.setAttribute('opacity','1');
    lensSheen.setAttribute('opacity','1');

    // 3. Circle glow burst then settle
    setTimeout(() => {
      strokeL.setAttribute('filter','url(#glow-left)');
      strokeR.setAttribute('filter','url(#glow-right)');
      lensGlow.setAttribute('opacity','0.35');

      // Settle after 600ms
      setTimeout(() => {
        strokeL.setAttribute('stroke','rgba(140,95,230,0.65)');
        strokeR.setAttribute('stroke','rgba(140,95,230,0.65)');
        strokeL.setAttribute('stroke-width','0.7');
        strokeR.setAttribute('stroke-width','0.7');
        lensGlow.setAttribute('opacity','0.15');

        // 4. Show ∞ symbol
        inf.style.transition = 'fill 0.5s ease';
        inf.setAttribute('fill','rgba(255,255,255,0.92)');
      }, 600);
    }, 300);
  }

  // ── Intersection Observer to trigger on scroll into view ──
  const root = document.getElementById('venn-root');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { runAnimation(); observer.disconnect(); } });
  }, { threshold: 0.4 });
  observer.observe(root);

  // Also trigger immediately if already visible (in-chat preview)
  setTimeout(() => {
    const rect = root.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) runAnimation();
  }, 400);


};

intersect();