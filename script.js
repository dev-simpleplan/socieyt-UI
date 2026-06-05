// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on("scroll", ScrollTrigger.update);

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

  const el = document.getElementById("splide-" + index);
  if (!el) return;

  const splide = new Splide(el, {
    perPage: 2,
    gap: "20px",
    pagination: false,
    arrows: true,
    breakpoints: {
      500: {
        perPage: 1,
      },
    },
  });

  splide.mount();
  splideInstances[index] = splide;

  const arrows = el.querySelector(".splide__arrows");

  function toggleArrows() {
    const totalSlides = splide.length;
    const perPage = splide.options.perPage;

    arrows.style.display = totalSlides <= perPage ? "none" : "flex";
  }

  toggleArrows();

  splide.on("updated resized", toggleArrows);

  const prev = el.querySelector(".splide__arrow--prev");
  const next = el.querySelector(".splide__arrow--next");

  if (prev) {
    prev.addEventListener("click", () => splide.go("<"));
  }

  if (next) {
    next.addEventListener("click", () => splide.go(">"));
  }
}

// Initialize first tab
initSplide(0);

document.querySelectorAll(".tab-item").forEach((tab) => {
  function activate() {
    const idx = parseInt(tab.dataset.tab);

    document.querySelectorAll(".tab-item").forEach((t) => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });

    document.querySelectorAll(".tab-content").forEach((c) => {
      c.classList.remove("active");
    });

    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

    const content = document.getElementById("tab-content-" + idx);

    if (content) {
      content.classList.add("active");
    }

    initSplide(idx);
  }

  tab.addEventListener("click", activate);

  tab.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      activate();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  new Splide("#approach_splide", {
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
  y: 20,
});

const orbitProgress = document.querySelector("#orbitPathGradient");
const pathLength = orbitProgress.getTotalLength();
gsap.set(orbitProgress, {
  strokeDasharray: pathLength,
  strokeDashoffset: pathLength,
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
    markers: false,
  },
});

tl.to(
  "#orbitPathGradient",
  {
    strokeDashoffset: 0,
    ease: "none",
    duration: 1,
  },
  0,
);

// Move dot around full circle
tl.to(
  "#movingDot",
  {
    motionPath: {
      path: "#orbitPath",
      align: "#orbitPath",
      alignOrigin: [0.5, 0.5],
      autoRotate: false,
    },
    ease: "none",
    duration: 1,
  },
  0,
);

tl.addLabel("point1", 0);
tl.addLabel("point2", 0.25);
tl.addLabel("point3", 0.5);
tl.addLabel("point4", 0.75);

// Text Visible -------------
tl.to(
  ".point-1",
  {
    opacity: 1,
    y: 0,
    duration: 0.05,
  },
  "point1",
);
tl.to(
  ".point-2",
  {
    opacity: 1,
    y: 0,
    duration: 0.05,
  },
  "point2",
);
tl.to(
  ".point-3",
  {
    opacity: 1,
    y: 0,
    duration: 0.05,
  },
  "point3",
);
tl.to(
  ".point-4",
  {
    opacity: 1,
    y: 0,
    duration: 0.05,
  },
  "point4",
);

// Dot Color Change --------
tl.to(
  ".dot-1",
  {
    fill: "url(#dotGradient)",
  },
  "point1",
);
tl.to(
  ".dot-2",
  {
    fill: "url(#dotGradient)",
  },
  "point2",
);
tl.to(
  ".dot-3",
  {
    fill: "url(#dotGradient)",
  },
  "point3",
);
tl.to(
  ".dot-4",
  {
    fill: "url(#dotGradient)",
  },
  "point4",
);

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
      toggleActions: "play none none none",
    },
  });
});

// ==== STEPS SECTION CARD ANIMATE ======
gsap.to(".process-card", {
  y: 0,
  opacity: 1,
  duration: 1,
  ease: "power3.out",

  stagger: {
    each: 0.25,
  },

  scrollTrigger: {
    trigger: ".steps_section_in",
    start: "top 50%",
  },
});


// =========================================
// ==== BANNER IMAGE & CONTENT ANIMATE ======

gsap.from(".hero_section_img", {
  scale: 1.2,
  filter: "blur(20px)",
  duration: 2,
  ease: "power3.out",
});

gsap.from(".hero_content_wrap", {
  y: 50,
  opacity: 0,
  duration: 1.5,
  ease: "power3.out",
  delay: 1,
});




// ===========================================================
// ------- Difference Section Intersect Shape Code ------------
function intersect() {
  const svg = document.getElementById("vs");
  const ns = "http://www.w3.org/2000/svg";

  // ── Geometry — all values in viewBox units (680×440) ──
  const r = 200;
  const cy = 220; // vertically centred in 440px viewBox
  const cx1 = 200;
  const cx2 = 480;

  const ix = (cx1 + cx2) / 2; // 340
  const iy_offset = Math.sqrt(r * r - (ix - cx1) * (ix - cx1));
  const iy_top = cy - iy_offset;
  const iy_bot = cy + iy_offset;

  const tx = ix.toFixed(2);
  const ty = iy_top.toFixed(2);
  const by = iy_bot.toFixed(2);
  const tyF = parseFloat(ty); // numeric — used for math below

  const lensD = `M ${tx},${ty} A ${r},${r} 0 0,0 ${tx},${by} A ${r},${r} 0 0,0 ${tx},${ty} Z`;

  function mkEl(tag, attrs) {
    const el = document.createElementNS(ns, tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    return el;
  }

  // ── Defs (already in HTML, just get reference) ──
  const defs = svg.querySelector("defs");

  // ── Inner glow radialGradients ──
  const igL = mkEl("radialGradient", {
    id: "inner-glow-l",
    cx: "50%",
    cy: "50%",
    r: "50%",
    fx: "50%",
    fy: "50%",
    gradientUnits: "objectBoundingBox",
  });
  igL.innerHTML = `
        <stop offset="80%" stop-color="transparent" stop-opacity="0"/>
        <stop offset="100%" stop-color="#a955f791"      stop-opacity="0"/>
      `;
  defs.appendChild(igL);

  const igR = mkEl("radialGradient", {
    id: "inner-glow-r",
    cx: "50%",
    cy: "50%",
    r: "50%",
    fx: "50%",
    fy: "50%",
    gradientUnits: "objectBoundingBox",
  });
  igR.innerHTML = `
        <stop offset="80%" stop-color="transparent" stop-opacity="0"/>
        <stop offset="100%" stop-color="#a955f791"      stop-opacity="0"/>
      `;
  defs.appendChild(igR);

  // ── Line gradient — dim body, bright glowing tip ──
  const lineGradEl = mkEl("linearGradient", {
    id: "line-grad",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1",
    gradientUnits: "userSpaceOnUse",
  });
  lineGradEl.innerHTML = `
        <stop id="line-stop-top" offset="0%"   stop-color="#b48fff" stop-opacity="0"/>
        <stop id="line-stop-mid" offset="55%"  stop-color="#b48fff" stop-opacity="0.18"/>
        <stop id="line-stop-bot" offset="100%" stop-color="#d4aaff" stop-opacity="0.92"/>
      `;
  defs.appendChild(lineGradEl);

  const lineStopMid = defs.querySelector("#line-stop-mid");

  // ── Line geometry — 200px tall in viewBox units ──
  const lineLength = 200;
  const lineAbsoluteTop = tyF - lineLength; // fixed top of line
  const lineEndY = tyF; // bottom = top of lens

  function updateLineGradient(currentY2) {
    lineGradEl.setAttribute("y1", lineAbsoluteTop);
    lineGradEl.setAttribute("y2", currentY2);
    const lineLen = currentY2 - lineAbsoluteTop;
    const glowFrac = Math.min(80 / Math.max(lineLen, 1), 0.6);
    lineStopMid.setAttribute("offset", ((1 - glowFrac) * 100).toFixed(1) + "%");
  }

  // Initialise gradient coords
  updateLineGradient(lineAbsoluteTop);

  // ── Inner glow circles ──
  const glowCircleL = mkEl("circle", {
    cx: cx1,
    cy,
    r,
    fill: "url(#inner-glow-l)",
    opacity: "0",
  });
  const glowCircleR = mkEl("circle", {
    cx: cx2,
    cy,
    r,
    fill: "url(#inner-glow-r)",
    opacity: "0",
  });
  svg.appendChild(glowCircleL);
  svg.appendChild(glowCircleR);

  // ── Lens layers ──
  const lensGlow = mkEl("path", {
    d: lensD,
    fill: "url(#lg)",
    filter: "url(#glow-lens)",
    opacity: "0",
  });
  const lensFill = mkEl("path", { d: lensD, fill: "url(#lg)", opacity: "0" });
  const lensSheen = mkEl("path", {
    d: lensD,
    fill: "url(#sheen)",
    opacity: "0",
  });
  svg.appendChild(lensGlow);
  svg.appendChild(lensFill);
  svg.appendChild(lensSheen);

  // ── Circle strokes — start dim ──
  const strokeL = mkEl("circle", {
    cx: cx1,
    cy,
    r,
    fill: "none",
    stroke: "#DEC3F6",
    "stroke-width": "0.7",
    "stroke-opacity": "0.25",
    id: "strokeL",
    style: "transition: stroke-opacity 0.8s ease;",
  });
  const strokeR = mkEl("circle", {
    cx: cx2,
    cy,
    r,
    fill: "none",
    stroke: "#DEC3F6",
    "stroke-width": "0.7",
    "stroke-opacity": "0.25",
    id: "strokeR",
    style: "transition: stroke-opacity 0.8s ease;",
  });
  svg.appendChild(strokeL);
  svg.appendChild(strokeR);

  // ── Descending line ──
  const lineTrack = mkEl("line", {
    x1: tx,
    y1: lineAbsoluteTop.toFixed(2),
    x2: tx,
    y2: lineAbsoluteTop.toFixed(2), // y2 driven by GSAP
    stroke: "url(#line-grad)",
    "stroke-width": "0.7",
    "stroke-linecap": "round",
    opacity: "1", // always visible, length = 0 initially
  });
  svg.appendChild(lineTrack);

  // ── State ──
  let glowTriggered = false;

  // ── Inner glow opacity helper ──
  function setInnerGlowOpacity(gradId, op) {
    const stops = defs.querySelector("#" + gradId).querySelectorAll("stop");
    stops[1].setAttribute("stop-opacity", (op * 0.55).toFixed(3));
    stops[2].setAttribute("stop-opacity", op.toFixed(3));
  }

  // ── Glow trigger — fires once when line reaches lens ──
  function triggerGlow() {
    if (glowTriggered) return;
    glowTriggered = true;

    // Snap line to final y2, then fade out
    lineTrack.setAttribute("y2", lineEndY.toFixed(2));
    updateLineGradient(lineEndY);
    setTimeout(() => {
      lineTrack.style.transition = "opacity 0.5s ease";
      lineTrack.style.opacity = "0";
    }, 120);

    // Reveal lens
    lensFill.style.transition = "opacity 0.6s ease";
    lensSheen.style.transition = "opacity 0.6s ease";
    lensFill.setAttribute("opacity", "1");
    lensSheen.setAttribute("opacity", "1");

    // Strokes brighten
    strokeL.setAttribute("stroke-opacity", "1");
    strokeR.setAttribute("stroke-opacity", "1");

    // Inner glow circles appear
    glowCircleL.style.transition = "opacity 0.5s ease";
    glowCircleR.style.transition = "opacity 0.5s ease";
    glowCircleL.setAttribute("opacity", "1");
    glowCircleR.setAttribute("opacity", "1");

    // Glow burst → settle
    const glowStart = performance.now();
    function animGlow(now) {
      const p = Math.min((now - glowStart) / 600, 1);
      const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      setInnerGlowOpacity("inner-glow-l", ease * 0.85);
      setInnerGlowOpacity("inner-glow-r", ease * 0.85);
      if (p < 1) {
        requestAnimationFrame(animGlow);
      } else {
        setTimeout(() => {
          const ss = performance.now();
          function settle(n) {
            const sp = Math.min((n - ss) / 500, 1);
            setInnerGlowOpacity("inner-glow-l", 0.85 - sp * 0.3);
            setInnerGlowOpacity("inner-glow-r", 0.85 - sp * 0.3);
            if (sp < 1) requestAnimationFrame(settle);
          }
          requestAnimationFrame(settle);
        }, 200);
      }
    }
    setTimeout(() => requestAnimationFrame(animGlow), 300);

    // Lens glow burst → settle
    lensGlow.setAttribute("opacity", "0.35");
    setTimeout(() => {
      lensGlow.setAttribute("opacity", "0.15");
    }, 800);
  }

  // ── GSAP ScrollTrigger — line moves on scroll ──
  // start: when section CENTER hits viewport BOTTOM  → animation begins
  // end:   when section CENTER hits viewport CENTER  → animation completes
  // scrub: 1.5 → smooth, slightly lagged feel
  gsap.to(
    {},
    {
      scrollTrigger: {
        trigger: "#venn-root",
        start: "center bottom",
        end: "center center",
        scrub: 1.5,
        onUpdate(self) {
          if (glowTriggered) return;
          const curY2 =
            lineAbsoluteTop + (lineEndY - lineAbsoluteTop) * self.progress;
          lineTrack.setAttribute("y2", curY2.toFixed(2));
          updateLineGradient(curY2);
          if (self.progress >= 0.99) triggerGlow();
        },
      },
    },
  );
}
intersect();



// ==== PLANS SECTION CARD ANIMATE ======
// gsap.from(".plan_card_animate", {
//   y: 60,
//   opacity: 0,
//   duration: 1,
//   ease: "power1.out", 

//   stagger: {
//     each: 0.25,
//   },

//   scrollTrigger: {
//     trigger: ".plan_section_in",
//     start: "top 60%",
//     markers: true,
//   },
// });



const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const btn = item.querySelector(".faq-question");

  btn.addEventListener("click", () => {
    // close other items
    faqItems.forEach(i => {
      if (i !== item) {
        i.classList.remove("active");
        i.querySelector(".icon").textContent = "+";
      }
    });

    // toggle current item
    item.classList.toggle("active");

    const icon = item.querySelector(".icon");
    icon.textContent = item.classList.contains("active") ? "–" : "+";
  });
});
