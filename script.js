

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
        trigger: ".outcomes_section_in", // parent section
        start: "top -50px",
        end: "+=4000",
        scrub: true,
        pin: true,
        anticipatePin: 1,
        markers: false // remove later
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

// Point 1 visible immediately
tl.to(".point-1", {
    opacity: 1,
    y: 0,
    duration: 0.05
}, "point1");

// Point 2 visible at 25%
tl.to(".point-2", {
    opacity: 1,
    y: 0,
    duration: 0.05
}, "point2");

// Point 3 visible at 50%
tl.to(".point-3", {
    opacity: 1,
    y: 0,
    duration: 0.05
}, "point3");

// Point 4 visible at 75%
tl.to(".point-4", {
    opacity: 1,
    y: 0,
    duration: 0.05
}, "point4");
// Point 1 reached
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