/* ==========================================================================
   Portfolio — script.js
   Vanilla JS rebuild of the original Next.js portfolio.

   Contents
   1.  CONFIG            – edit your content here
   2.  Icons & helpers
   3.  Theme toggle      – light/dark + circular reveal transition
   4.  Smooth scroll     – Lenis (optional)
   5.  ShaderFlow        – WebGL animated backdrop
   6.  PortraitMorph     – WebGL hover-morph portrait
   7.  Content rendering – projects, experience, education, skills
   8.  Contact button    – hover to reveal e-mail, click to copy
   9.  Experience        – expandable list
   10. Polaroids         – spring-follow cards
   11. Stack             – Matter.js physics chips
   12. Router            – hash based Home / Projects / About
   ========================================================================== */
(function () {
  "use strict";

  /* ======================================================================
     1. CONFIG — edit your content here
     (Hero + About paragraphs live in index.html)
     ====================================================================== */
  var CONFIG = {
    siteName: "Portfolio",
    email: "mohanaviswa2005@gmail.com",
    linkedin: "https://www.linkedin.com/in/vishwasridhar/",
    x: "https://x.com",

    /* Your real portfolio projects. Add your deployed URLs below when ready. */
    projects: [
      {
        id: "pixelcraft-digital",
        icon: "layers",
        brand: "PIXELCRAFT DIGITAL",
        title: "We Build Digital Experiences That Matter.",
        description:
          "A responsive digital-agency website concept designed and developed to showcase creative services through a bold visual identity, clear messaging, and polished interactions.",
        meta: "Frontend Development • Personal Project, 2026",
        ratio: 752 / 497,
        image: "img/pixelcraft-preview.jpeg",
        alt: "PixelCraft Digital agency website preview",

        liveDemo: "https://vishwasridhar.github.io/Pixel-craft-digital-agency/",
        github: "https://github.com/vishwasridhar/Pixel-craft-digital-agency",
      },

      {
        id: "Tourbooking-design",
        icon: "map-pin",
        brand: "TOURBOOKING DESIGN",
        title: "A Modern Tour Booking Platform",
        description:
          "A sleek and intuitive tour booking website designed to provide users with a seamless experience for discovering and reserving travel experiences.",
        meta: "Frontend Development • Personal Project, 2026",
        ratio: 752 / 497,
        image: "img\tour-booking-design.png",
        alt: "Tourbooking Design website preview",
        liveDemo: "https://vishwasridhar.github.io/Tour-Booking-Design/",
        github: "https://github.com/vishwasridhar/Tour-Booking-Design",
      },
    ],

    /* How many projects appear on the Home page */
    homeProjectCount: 1,

    experience: [
      {
        company: "Linear",
        role: "Senior Design Engineer",
        period: "Mar 2024 – Present",
        slug: "linear",
      },
      {
        company: "Vercel",
        role: "Product Designer",
        period: "Aug 2022 – Feb 2024",
        slug: "vercel",
      },
      {
        company: "Stripe",
        role: "Design Engineer",
        period: "Jun 2021 – Jul 2022",
        slug: "stripe",
      },
      {
        company: "Figma",
        role: "UI Engineer",
        period: "Sep 2019 – May 2021",
        slug: "figma",
      },
      {
        company: "Notion",
        role: "Product Designer",
        period: "Jan 2018 – Aug 2019",
        slug: "notion",
      },
      {
        company: "Airbnb",
        role: "Design Intern",
        period: "May 2017 – Dec 2017",
        slug: "airbnb",
      },
      {
        company: "Freelance",
        role: "Designer & Developer",
        period: "2015 – 2017",
        brand: "#8F002B",
      },
    ],

    education: [
      {
        school: "Rhode Island School of Design",
        degree: "BFA, Graphic Design",
        period: "2013 – 2017",
      },
      {
        school: "Stanford University",
        degree: "HCI Certificate, d.school",
        period: "2018",
      },
      {
        school: "Bruno Simon's Three.js Journey",
        degree: "WebGL & Shaders",
        period: "2022",
      },
    ],

    skills: [
      "UI/UX Design",
      "Design Systems",
      "Prototyping & Motion",
      "Frontend Development",
      "TypeScript & React",
      "Interaction Design",
      "Performance Tuning",
      "Accessibility",
      "Visual Identity",
    ],

    stack: [
      {
        label: "Figma",
        slug: "figma",
        bg: "#1a1a1a",
        fg: "#ffffff",
        iconUrl: "https://svgl.app/library/figma.svg",
      },
      { label: "React", slug: "react", bg: "#8F002B", fg: "#ffffff" },
      { label: "Next.js", slug: "nextdotjs", bg: "#1a1a1a", fg: "#ffffff" },
      { label: "TypeScript", slug: "typescript", bg: "#1a1a1a", fg: "#ffffff" },
      { label: "shadcn/ui", slug: "shadcnui", bg: "#1a1a1a", fg: "#ffffff" },
      { label: "Cursor", slug: "cursor", bg: "#1a1a1a", fg: "#ffffff" },
      { label: "GSAP", slug: "gsap", bg: "#8F002B", fg: "#ffffff" },
      { label: "GitHub", slug: "github", bg: "#1a1a1a", fg: "#ffffff" },
      { label: "Vercel", slug: "vercel", bg: "#1a1a1a", fg: "#ffffff" },
      {
        label: "Tailwind CSS",
        slug: "tailwindcss",
        bg: "#1a1a1a",
        fg: "#ffffff",
      },
    ],
  };

  /* ======================================================================
     2. Icons & helpers
     ====================================================================== */
  var ICONS = {
    sparkles:
      '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>',
    compass:
      '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
    "map-pin":
      '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    "line-chart": '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
    wand: '<path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/>',
    layers:
      '<path d="m12 2 10 5-10 5L2 7l10-5Z"/><path d="m2 12 10 5 10-5"/><path d="m2 17 10 5 10-5"/>',
    bot: '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>',
  };

  function icon(name) {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (ICONS[name] || "") +
      "</svg>"
    );
  }

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }
  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[c];
    });
  }

  var reducedMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  function prefersReducedMotion() {
    return reducedMotionQuery.matches;
  }

  var root = document.documentElement;
  var currentView = null;

  /* ======================================================================
     3. Theme toggle (light / dark + circular reveal)
     ====================================================================== */
  function isDark() {
    return root.classList.contains("dark");
  }

  function applyTheme(dark) {
    root.classList.toggle("dark", dark);
    var btn = $("#theme-toggle");
    if (btn) {
      btn.setAttribute(
        "aria-label",
        dark ? "Switch to light theme" : "Switch to dark theme",
      );
      btn.setAttribute("aria-pressed", String(dark));
    }
  }

  function initTheme() {
    // black theme only
    applyTheme(true);
  }

  /* ======================================================================
     4. Smooth scroll (Lenis — optional)
     ====================================================================== */
  var lenis = null;

  function initSmoothScroll() {
    if (typeof window.Lenis === "undefined" || prefersReducedMotion()) return;
    lenis = new window.Lenis({
      duration: 1.6,
      easing: function (t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
      },
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  function scrollToTop() {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }

  /* ======================================================================
     5. ShaderFlow — animated WebGL backdrop
     ====================================================================== */
  var SHADER_VS =
    "attribute vec2 position;void main(){gl_Position=vec4(position,0.,1.);}";

  var SHADER_FS = [
    "precision highp float;",
    "uniform vec2 uR; uniform float uT; uniform vec2 uV; uniform float uS;",
    "uniform float uTw; uniform float uDe; uniform float uMs; uniform float uB;",
    "uniform int uIt; uniform vec3 uColorLow; uniform vec3 uColorHigh;",
    "uniform vec3 uBgColor; uniform vec4 uFadeShape;",
    "float h(vec2 p){ return sin(p.x+sin(p.y+uT*uV.x))*sin(p.y*p.x*0.1+uT*uV.y); }",
    "float fadeAlpha(float d){ float t=clamp(1.0-d,0.0,1.0); return t*t*(3.0-2.0*t); }",
    "void main(){",
    "  vec2 frag=gl_FragCoord.xy/uR;",
    "  vec2 p=frag-0.5;",
    "  p.x*=uR.x/uR.y;",
    "  p*=uS;",
    "  float ms=uT*uMs*0.1;",
    "  vec2 d=vec2(sin(ms),cos(ms))*0.1;",
    "  float kt=uTw*0.01;",
    "  float kd=1.0/uDe;",
    "  vec2 e=vec2(0.05,0.);",
    "  vec2 r=vec2(0.);",
    "  for(int i=0;i<24;i++){",
    "    if(i>=uIt)break;",
    "    float a=h(p);",
    "    float b=h(p+e.xy);",
    "    float c=h(p+e.yx);",
    "    vec2 q=vec2(b-a,c-a)*20.;",
    "    p+=vec2(-q.y,q.x)*kt+q*kd+d;",
    "    r=q;",
    "  }",
    "  float t=clamp(length(r)*0.5,0.0,1.0);",
    "  vec3 col=mix(uColorLow,uColorHigh,t)*uB;",
    "  vec2 ndc=vec2(frag.x,1.0-frag.y);",
    "  float aspect=uR.x/uR.y;",
    "  float dx=((ndc.x-uFadeShape.x)*aspect)/uFadeShape.z;",
    "  float dy=(ndc.y-uFadeShape.y)/uFadeShape.w;",
    "  float fa=fadeAlpha(sqrt(dx*dx+dy*dy));",
    "  gl_FragColor=vec4(mix(uBgColor,col,fa),1.0);",
    "}",
  ].join("\n");

  var SHADER_DEFAULTS = {
    flowSpeed: [0.1, 0.2],
    iterations: 14,
    scale: 6,
    brightness: 1,
    colorLowA: [0.04, 0.0, 0.012], // near-black maroon
    colorHighA: [0.3, 0.0, 0.09], // darkened #8F002B so the glow stays subtle
    fade: [0.5, 0.0, 1.4, 0.6], // cx, cy, rx, ry
  };

  function compileShader(gl, type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error("Shader compile error:", gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  }

  function createProgram(gl, vsSrc, fsSrc) {
    var vs = compileShader(gl, gl.VERTEX_SHADER, vsSrc);
    var fs = compileShader(gl, gl.FRAGMENT_SHADER, fsSrc);
    if (!vs || !fs) return null;
    var prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(prog));
      return null;
    }
    return prog;
  }

  function bindFullscreenTriangle(gl, prog) {
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    var loc = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  }

  function parseColor(input) {
    var s = String(input || "").trim();
    if (s.charAt(0) === "#") {
      var hex = s.slice(1);
      if (hex.length === 3)
        hex = hex
          .split("")
          .map(function (c) {
            return c + c;
          })
          .join("");
      if (hex.length !== 6) return null;
      var n = parseInt(hex, 16);
      if (isNaN(n)) return null;
      return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
    }
    var m = s.match(/(\d+(?:\.\d+)?)/g);
    if (!m || m.length < 3) return null;
    return [Number(m[0]) / 255, Number(m[1]) / 255, Number(m[2]) / 255];
  }

  function readBgColor() {
    var v = getComputedStyle(root).getPropertyValue("--background");
    return parseColor(v) || [1, 1, 1];
  }

  function createShaderFlow(el, opts) {
    if (!el) return null;
    opts = opts || {};
    var cfg = {
      flowSpeed: opts.flowSpeed || SHADER_DEFAULTS.flowSpeed,
      iterations: opts.iterations || SHADER_DEFAULTS.iterations,
      scale: opts.scale || SHADER_DEFAULTS.scale,
      brightness: opts.brightness || SHADER_DEFAULTS.brightness,
    };

    var canvas = document.createElement("canvas");
    canvas.className = "shader-canvas";
    var gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "high-performance",
    });
    if (!gl) return null;

    var prog = createProgram(gl, SHADER_VS, SHADER_FS);
    if (!prog) return null;
    gl.useProgram(prog);
    bindFullscreenTriangle(gl, prog);
    el.appendChild(canvas);

    var U = {};
    [
      "uR",
      "uT",
      "uV",
      "uS",
      "uTw",
      "uDe",
      "uMs",
      "uB",
      "uIt",
      "uColorLow",
      "uColorHigh",
      "uBgColor",
      "uFadeShape",
    ].forEach(function (n) {
      U[n] = gl.getUniformLocation(prog, n);
    });

    gl.uniform2fv(U.uV, cfg.flowSpeed);
    gl.uniform1f(U.uS, cfg.scale);
    gl.uniform1f(U.uTw, 50);
    gl.uniform1f(U.uDe, 200);
    gl.uniform1f(U.uMs, 2.5);
    gl.uniform1f(U.uB, cfg.brightness);
    gl.uniform1i(U.uIt, cfg.iterations);
    gl.uniform3fv(U.uColorLow, SHADER_DEFAULTS.colorLowA);
    gl.uniform3fv(U.uColorHigh, SHADER_DEFAULTS.colorHighA);
    gl.uniform4fv(U.uFadeShape, opts.fade || SHADER_DEFAULTS.fade);
    gl.uniform3fv(U.uBgColor, readBgColor());

    function resize() {
      var w = el.clientWidth,
        h = el.clientHeight;
      if (!w || !h) return;
      var dpr = Math.min(window.devicePixelRatio || 1, 1);
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(U.uR, canvas.width, canvas.height);
    }
    resize();
    var ro = new ResizeObserver(resize);
    ro.observe(el);

    var tabVisible = true,
      onScreen = true,
      raf = 0;
    var t0 = performance.now();

    var onVis = function () {
      tabVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVis);

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          onScreen = e.isIntersecting;
        });
      },
      { rootMargin: "100px" },
    );
    io.observe(el);

    var themeObs = new MutationObserver(function () {
      gl.uniform3fv(U.uBgColor, readBgColor());
    });
    themeObs.observe(root, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "style"],
    });

    function tick() {
      if (tabVisible && onScreen && canvas.width > 1) {
        gl.uniform1f(U.uT, (performance.now() - t0) / 1000);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return {
      destroy: function () {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        themeObs.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        var ext = gl.getExtension("WEBGL_lose_context");
        if (ext) ext.loseContext();
        if (canvas.parentNode === el) el.removeChild(canvas);
      },
    };
  }

  /* ======================================================================
     6. PortraitMorph — WebGL image morph on hover (falls back to CSS fade)
     ====================================================================== */
  var MORPH_VS = [
    "attribute vec2 position;",
    "varying vec2 vUv;",
    "void main(){ vUv = position * 0.5 + 0.5; gl_Position = vec4(position, 0.0, 1.0); }",
  ].join("\n");

  var MORPH_FS = [
    "precision highp float;",
    "uniform sampler2D uTexA; uniform sampler2D uTexB;",
    "uniform float uProgress; uniform float uTime;",
    "uniform vec2 uResolution; uniform vec2 uImageSize;",
    "uniform vec2 uOrigin; uniform vec2 uDirection;",
    "varying vec2 vUv;",
    "vec2 coverUv(vec2 uv){",
    "  vec2 ratio = vec2(",
    "    min((uResolution.x / uResolution.y) / (uImageSize.x / uImageSize.y), 1.0),",
    "    min((uResolution.y / uResolution.x) / (uImageSize.y / uImageSize.x), 1.0));",
    "  return vec2(uv.x * ratio.x + (1.0 - ratio.x) * 0.5, uv.y * ratio.y + (1.0 - ratio.y) * 0.5);",
    "}",
    "float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }",
    "float noise(vec2 p){",
    "  vec2 i = floor(p); vec2 f = fract(p);",
    "  f = f * f * (3.0 - 2.0 * f);",
    "  float a = hash(i); float b = hash(i + vec2(1.0, 0.0));",
    "  float c = hash(i + vec2(0.0, 1.0)); float d = hash(i + vec2(1.0, 1.0));",
    "  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);",
    "}",
    "float fbm(vec2 p){",
    "  float v = 0.0; float a = 0.5;",
    "  for (int i = 0; i < 5; i++){ v += a * noise(p); p *= 2.0; a *= 0.5; }",
    "  return v;",
    "}",
    "void main(){",
    "  vec2 uv = vUv;",
    "  float p = uProgress;",
    "  float bell = 4.0 * p * (1.0 - p);",
    "  vec2 dir = normalize(uDirection + vec2(0.0001));",
    "  float along = dot(uv - uOrigin, dir);",
    "  float distGradient = (along + 1.4) / 2.8;",
    "  float warpLow = fbm(uv * 1.8 + uTime * 0.05) - 0.5;",
    "  float warpHi = fbm(uv * 5.5 - uTime * 0.04 + 13.0) - 0.5;",
    "  float warp = warpLow * 0.55 + warpHi * 0.18;",
    "  float field = distGradient + warp;",
    "  float remapped = mix(-0.25, 1.25, p);",
    "  float edgeWidth = 0.07;",
    "  float mask = smoothstep(remapped - edgeWidth, remapped + edgeWidth, field);",
    "  mask = 1.0 - mask;",
    "  vec2 perp = vec2(-dir.y, dir.x);",
    "  float ripplePhase = (field - remapped) * 14.0;",
    "  float ripple = sin(ripplePhase) * 0.5 + 0.5;",
    "  float edgeBand = 1.0 - smoothstep(0.0, edgeWidth * 1.6, abs(field - remapped));",
    "  float pushAmount = ripple * edgeBand * 0.025 * bell;",
    "  vec2 pushUv = uv + perp * pushAmount;",
    "  vec2 baseUv = coverUv(pushUv);",
    "  vec4 texA = texture2D(uTexA, baseUv);",
    "  vec4 texB = texture2D(uTexB, baseUv);",
    "  vec4 color = mix(texA, texB, mask);",
    "  color.rgb *= 1.0 - edgeBand * 0.35 * bell;",
    "  gl_FragColor = color;",
    "}",
  ].join("\n");

  function initPortraitMorph() {
    var container = $("#portrait");
    if (!container) return;
    var imgA = $(".portrait__img--a", container);
    var imgB = $(".portrait__img--b", container);
    if (!imgA || !imgB) return;

    var canvas = document.createElement("canvas");
    var gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
    });
    if (!gl) return; // CSS fallback remains

    var prog = createProgram(gl, MORPH_VS, MORPH_FS);
    if (!prog) return;
    gl.useProgram(prog);
    bindFullscreenTriangle(gl, prog);

    var U = {};
    [
      "uTexA",
      "uTexB",
      "uProgress",
      "uTime",
      "uResolution",
      "uImageSize",
      "uOrigin",
      "uDirection",
    ].forEach(function (n) {
      U[n] = gl.getUniformLocation(prog, n);
    });

    function makeTexture(unit, img) {
      var tex = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      // Throws a SecurityError when opened via file:// — caught below, CSS fallback stays.
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      return tex;
    }

    function whenLoaded(img) {
      return new Promise(function (resolve, reject) {
        if (img.complete && img.naturalWidth) return resolve();
        img.addEventListener("load", resolve, { once: true });
        img.addEventListener("error", reject, { once: true });
      });
    }

    var hover = false,
      progress = 0,
      time = 0;
    var origin = [0.5, 0.5],
      direction = [1, 0];
    var lastPointer = null;
    var visible = false,
      raf = 0,
      last = performance.now();
    var needsFrame = true;

    function resize() {
      var w = container.clientWidth,
        h = container.clientHeight;
      if (!w || !h) return;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(U.uResolution, canvas.width, canvas.height);
      needsFrame = true;
    }

    function tick() {
      raf = requestAnimationFrame(tick);
      if (!visible) {
        last = performance.now();
        return;
      }
      var now = performance.now();
      var dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      time += dt;

      var target = hover ? 1 : 0;
      var stiffness = hover ? 2.4 : 2.0;
      progress += (target - progress) * (1 - Math.exp(-stiffness * dt));

      // Skip drawing while idle on the first image
      if (!needsFrame && !hover && progress < 0.0005) return;
      needsFrame = false;

      gl.uniform1f(U.uTime, time);
      gl.uniform1f(U.uProgress, progress);
      gl.uniform2f(U.uOrigin, origin[0], origin[1]);
      gl.uniform2f(U.uDirection, direction[0], direction[1]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    function edgeDirection(x, y) {
      var m = Math.min(x, 1 - x, y, 1 - y);
      if (m === x) return [1, 0];
      if (m === 1 - x) return [-1, 0];
      if (m === y) return [0, 1];
      return [0, -1];
    }
    function localPoint(e) {
      var r = container.getBoundingClientRect();
      return [
        (e.clientX - r.left) / r.width,
        1 - (e.clientY - r.top) / r.height,
      ];
    }

    container.addEventListener("pointerenter", function (e) {
      var p = localPoint(e);
      origin = p;
      direction = edgeDirection(p[0], p[1]);
      lastPointer = { x: p[0], y: p[1], t: performance.now() };
      hover = true;
    });
    container.addEventListener("pointerleave", function (e) {
      var p = localPoint(e);
      origin = p;
      var d = edgeDirection(p[0], p[1]);
      direction = [-d[0], -d[1]];
      hover = false;
    });
    container.addEventListener("pointermove", function (e) {
      var p = localPoint(e);
      if (
        lastPointer &&
        performance.now() - lastPointer.t < 80 &&
        progress < 0.15
      ) {
        var vx = p[0] - lastPointer.x,
          vy = p[1] - lastPointer.y;
        var mag = Math.hypot(vx, vy);
        if (mag > 0.01) direction = [vx / mag, vy / mag];
      }
      lastPointer = { x: p[0], y: p[1], t: performance.now() };
    });

    Promise.all([whenLoaded(imgA), whenLoaded(imgB)])
      .then(function () {
        makeTexture(0, imgA);
        makeTexture(1, imgB);
        gl.uniform1i(U.uTexA, 0);
        gl.uniform1i(U.uTexB, 1);
        gl.uniform2f(U.uImageSize, imgA.naturalWidth, imgA.naturalHeight);

        container.appendChild(canvas);
        container.classList.add("is-gl");
        resize();
        new ResizeObserver(resize).observe(container);
        new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            visible = e.isIntersecting;
            if (visible) needsFrame = true;
          });
        }).observe(container);

        last = performance.now();
        raf = requestAnimationFrame(tick);
      })
      .catch(function (err) {
        console.warn(
          "Portrait WebGL morph unavailable, using CSS fade instead.",
          err && err.message,
        );
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
        container.classList.remove("is-gl");
      });
  }

  /* ======================================================================
     7. Content rendering
     ====================================================================== */
  function projectCard(p, index) {
    var delay = Math.min(index * 0.06, 0.3);
    var imageMarkup = p.image
      ? '<div class="project-card__image" style="aspect-ratio:' +
        p.ratio +
        '">' +
        '<div class="project-card__image-inner">' +
        '<img src="' +
        esc(p.image) +
        '" alt="' +
        esc(p.alt) +
        '" loading="' +
        (index < 2 ? "eager" : "lazy") +
        '" decoding="async" referrerpolicy="no-referrer" />' +
        "</div>" +
        "</div>"
      : '<div class="project-card__image project-card__image--placeholder" style="aspect-ratio:' +
        p.ratio +
        '" role="img" aria-label="' +
        esc(p.alt) +
        '">' +
        '<div class="project-card__placeholder">' +
        '<span class="project-card__placeholder-kicker">DIGITAL STUDIO</span>' +
        "<strong>PIXELCRAFT</strong>" +
        '<span class="project-card__placeholder-caption">DESIGN · DEVELOP · DELIVER</span>' +
        "</div>" +
        "</div>";

    var liveDemoButton = p.liveDemo
      ? '<a class="project-action project-action--primary" href="' +
        esc(p.liveDemo) +
        '" target="_blank" rel="noopener noreferrer">Live Demo <span aria-hidden="true">↗</span></a>'
      : '<span class="project-action project-action--primary is-unavailable" aria-disabled="true" title="Add your deployed website URL in CONFIG.projects">Live Demo</span>';
    var githubButton = p.github
      ? '<a class="project-action" href="' +
        esc(p.github) +
        '" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>'
      : '<span class="project-action is-unavailable" aria-disabled="true" title="Add your GitHub repository URL in CONFIG.projects">GitHub</span>';

    return (
      '<div class="project-slot fade-in" style="--delay:' +
      delay +
      's">' +
      '<article class="project-card">' +
      '<header class="project-card__header">' +
      '<span class="project-card__icon">' +
      icon(p.icon) +
      "</span>" +
      '<span class="project-card__brand">' +
      esc(p.brand) +
      "</span>" +
      "</header>" +
      imageMarkup +
      '<div class="project-card__text">' +
      '<h3 class="project-card__title">' +
      esc(p.title) +
      "</h3>" +
      '<p class="project-card__desc">' +
      esc(p.description) +
      "</p>" +
      "</div>" +
      '<p class="project-card__meta">' +
      esc(p.meta) +
      "</p>" +
      '<div class="project-card__actions">' +
      liveDemoButton +
      githubButton +
      "</div>" +
      "</article>" +
      "</div>"
    );
  }

  function logoHtml(entry, name, mode) {
    // mode: "brand" (white tile w/ simple-icons logo) | "plain" (bordered initial)
    var initial = esc(name.charAt(0));
    if (entry.slug) {
      return (
        '<span class="row__logo row__logo--brand" aria-hidden="true">' +
        '<img src="https://cdn.simpleicons.org/' +
        esc(entry.slug) +
        '" alt="" width="24" height="24" draggable="false" data-initial="' +
        initial +
        '" />' +
        "</span>"
      );
    }
    if (mode === "brand") {
      return (
        '<span class="row__logo row__logo--solid" aria-hidden="true" style="background:' +
        esc(entry.brand || "#111") +
        '">' +
        '<span class="row__initial">' +
        initial +
        "</span>" +
        "</span>"
      );
    }
    return (
      '<span class="row__logo row__logo--plain" aria-hidden="true">' +
      '<span class="row__initial">' +
      initial +
      "</span>" +
      "</span>"
    );
  }

  function rowHtml(logo, name, sub, period) {
    return (
      '<li class="row">' +
      logo +
      '<div class="row__text">' +
      '<span class="row__name">' +
      esc(name) +
      "</span>" +
      '<span class="row__sub">' +
      esc(sub) +
      "<i>•</i><em>" +
      esc(period) +
      "</em></span>" +
      "</div>" +
      "</li>"
    );
  }

  function renderContent() {
    var home = $("#home-projects");
    var all = $("#all-projects");
    if (home)
      home.innerHTML = CONFIG.projects
        .slice(0, CONFIG.homeProjectCount)
        .map(projectCard)
        .join("");
    if (all) all.innerHTML = CONFIG.projects.map(projectCard).join("");

    var exp = $("#experience-list");
    if (exp) {
      exp.innerHTML = CONFIG.experience
        .map(function (e) {
          return rowHtml(
            logoHtml(e, e.company, "brand"),
            e.company,
            e.role,
            e.period,
          );
        })
        .join("");
    }
    var edu = $("#education-list");
    if (edu) {
      edu.innerHTML = CONFIG.education
        .map(function (e) {
          return rowHtml(
            logoHtml(e, e.school, "plain"),
            e.school,
            e.degree,
            e.period,
          );
        })
        .join("");
    }
    var skills = $("#skills-list");
    if (skills)
      skills.innerHTML = CONFIG.skills
        .map(function (s) {
          return '<span class="skill">' + esc(s) + "</span>";
        })
        .join("");

    // contact details
    $$("[data-email]").forEach(function (n) {
      n.textContent = CONFIG.email;
    });
    $$("[data-mailto]").forEach(function (n) {
      n.setAttribute("href", "mailto:" + CONFIG.email);
    });
    $$('[data-social="linkedin"]').forEach(function (n) {
      n.setAttribute("href", CONFIG.linkedin);
    });
    $$('[data-social="x"]').forEach(function (n) {
      n.setAttribute("href", CONFIG.x);
    });

    // logo image fallback → initial letter
    document.addEventListener(
      "error",
      function (e) {
        var t = e.target;
        if (t && t.tagName === "IMG" && t.hasAttribute("data-initial")) {
          var span = document.createElement("span");
          span.className = "row__initial";
          span.textContent = t.getAttribute("data-initial");
          t.replaceWith(span);
        }
      },
      true,
    );
  }

  /* ======================================================================
     8. Contact button — hover to reveal e-mail, click to copy
     ====================================================================== */
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy") ? resolve() : reject();
      } catch (e) {
        reject(e);
      }
      document.body.removeChild(ta);
    });
  }

  function initContactButtons() {
    $$("[data-contact-btn]").forEach(function (btn) {
      var labelFace = $(".contact-btn__face--label", btn);
      var emailFace = $(".contact-btn__face--email", btn);
      var hovering = false,
        focused = false,
        copied = false,
        timer = 0;

      function measure() {
        var pad = 40; // 20px each side
        btn.dataset.wLabel = Math.ceil(
          labelFace.getBoundingClientRect().width + pad,
        );
        btn.dataset.wEmail = Math.ceil(
          emailFace.getBoundingClientRect().width + pad,
        );
        sync(true);
      }
      function sync(skipAnim) {
        var open = hovering || focused || copied;
        btn.classList.toggle("is-open", open);
        btn.classList.toggle("is-copied", copied);
        btn.setAttribute(
          "aria-label",
          copied
            ? "Email copied"
            : open
              ? "Copy " + CONFIG.email
              : "Show email",
        );
        var w = open ? btn.dataset.wEmail : btn.dataset.wLabel;
        if (w) {
          if (skipAnim) {
            var prev = btn.style.transition;
            btn.style.transition = "none";
            btn.style.width = w + "px";
            void btn.offsetWidth;
            btn.style.transition = prev;
          } else {
            btn.style.width = w + "px";
          }
        }
      }

      btn.addEventListener("pointerenter", function (e) {
        if (e.pointerType === "mouse") {
          hovering = true;
          sync();
        }
      });
      btn.addEventListener("pointerleave", function (e) {
        if (e.pointerType === "mouse") {
          hovering = false;
          sync();
        }
      });
      btn.addEventListener("focus", function () {
        focused = true;
        sync();
      });
      btn.addEventListener("blur", function () {
        focused = false;
        sync();
      });
      btn.addEventListener("click", function () {
        copyText(CONFIG.email)
          .then(function () {
            copied = true;
            sync();
            clearTimeout(timer);
            timer = setTimeout(function () {
              copied = false;
              sync();
            }, 1600);
          })
          .catch(function () {
            window.location.href = "mailto:" + CONFIG.email;
          });
      });

      // measure now, after web fonts load, and on resize of the font set
      var remeasure = function () {
        if (btn.offsetParent !== null) measure();
      };
      btn._remeasure = remeasure;
      if (document.fonts && document.fonts.ready)
        document.fonts.ready.then(remeasure);
      window.addEventListener("load", remeasure);
      remeasure();
    });
  }

  function remeasureContactButtons() {
    $$("[data-contact-btn]").forEach(function (b) {
      if (b._remeasure) b._remeasure();
    });
  }

  /* ======================================================================
     9. Experience — expandable list
     ====================================================================== */
  function initExperience() {
    var panel = $("#experience");
    var body = $("#experience-body");
    var toggle = $("#experience-toggle");
    var label = $("#experience-toggle-label");
    if (!panel || !body || !toggle) return;

    var ROW = 64,
      GAP = 8,
      COLLAPSED_ROWS = 2.5;
    var collapsedHeight =
      Math.floor(COLLAPSED_ROWS) * (ROW + GAP) + (COLLAPSED_ROWS % 1) * ROW;
    var hiddenCount = CONFIG.experience.length - Math.floor(COLLAPSED_ROWS);
    var open = false;

    if (hiddenCount <= 0) {
      toggle.hidden = true;
      $(".accordion__fade", panel).hidden = true;
      body.style.height = "auto";
      return;
    }
    label.textContent = "Show " + hiddenCount + " more";
    body.style.height = collapsedHeight + "px";

    toggle.addEventListener("click", function () {
      open = !open;
      panel.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      label.textContent = open ? "Show less" : "Show " + hiddenCount + " more";

      if (open) {
        body.style.height = body.scrollHeight + "px";
      } else {
        if (body.style.height === "auto") {
          body.style.height = body.scrollHeight + "px";
          void body.offsetHeight; // reflow so the transition starts from the real height
        }
        body.style.height = collapsedHeight + "px";
      }
    });

    body.addEventListener("transitionend", function (e) {
      if (e.propertyName === "height" && open) body.style.height = "auto";
    });
  }

  /* ======================================================================
     10. Polaroids — spring-follow cards on the About page
     ====================================================================== */
  var polaroids = [];
  var polaroidRaf = 0;

  function initPolaroids() {
    var strip = $("#polaroid-strip");
    if (!strip) return;
    var rotations = [-8, 6, -4, 7, -6, 5];
    var mern = [
      { label: "MongoDB", slug: "mongodb/47A248" },
      { label: "Express", slug: "express/ffffff" },
      { label: "React", slug: "react/61DAFB" },
      { label: "Node.js", slug: "nodedotjs/5FA04E" },
      { label: "JavaScript", slug: "javascript/F7DF1E" },
      { label: "GitHub", slug: "github/ffffff" },
    ];
    strip.innerHTML = rotations
      .map(function (rot, i) {
        var t = mern[i];
        return (
          '<div class="polaroid" style="--rot:' +
          rot +
          "deg;--delay:" +
          (0.05 + i * 0.08).toFixed(2) +
          's">' +
          '<div class="polaroid__dots">' +
          '<img class="polaroid__logo" src="https://cdn.simpleicons.org/' +
          t.slug +
          '" alt="' +
          esc(t.label) +
          ' logo" width="48" height="48" draggable="false" data-initial="' +
          esc(t.label.charAt(0)) +
          '" />' +
          '<span class="polaroid__label">' +
          esc(t.label) +
          "</span>" +
          "</div></div>"
        );
      })
      .join("");

    polaroids = $$(".polaroid", strip).map(function (el) {
      var s = { el: el, x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0 };
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2);
        var dy = e.clientY - (r.top + r.height / 2);
        var max = 18,
          k = 0.25;
        s.tx = Math.max(-max, Math.min(max, dx * k));
        s.ty = Math.max(-max, Math.min(max, dy * k));
        startPolaroidLoop();
      });
      el.addEventListener("pointerleave", function () {
        s.tx = 0;
        s.ty = 0;
        startPolaroidLoop();
      });
      return s;
    });
  }

  function startPolaroidLoop() {
    if (polaroidRaf) return;
    var last = performance.now();
    var stiffness = 220,
      damping = 18,
      mass = 0.6;

    function step(now) {
      var dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      var active = false;
      polaroids.forEach(function (s) {
        var sub = 3,
          h = dt / sub;
        for (var i = 0; i < sub; i++) {
          s.vx += ((-stiffness * (s.x - s.tx) - damping * s.vx) / mass) * h;
          s.vy += ((-stiffness * (s.y - s.ty) - damping * s.vy) / mass) * h;
          s.x += s.vx * h;
          s.y += s.vy * h;
        }
        var moving =
          Math.abs(s.x - s.tx) > 0.02 ||
          Math.abs(s.y - s.ty) > 0.02 ||
          Math.abs(s.vx) > 0.02 ||
          Math.abs(s.vy) > 0.02;
        if (moving) active = true;
        else {
          s.x = s.tx;
          s.y = s.ty;
          s.vx = s.vy = 0;
        }
        s.el.style.translate = s.x.toFixed(2) + "px " + s.y.toFixed(2) + "px";
      });
      polaroidRaf =
        active && currentView === "about" ? requestAnimationFrame(step) : 0;
    }
    polaroidRaf = requestAnimationFrame(step);
  }

  /* ======================================================================
     11. Stack — Matter.js physics chips
     ====================================================================== */
  var stackState = { teardown: null, observer: null };

  function chipHtml(chip) {
    var src = chip.iconUrl || "https://cdn.simpleicons.org/" + chip.slug;
    return (
      '<div class="chip" style="background-color:' +
      chip.bg +
      ";color:" +
      chip.fg +
      '">' +
      '<span class="chip__icon" aria-hidden="true"><img src="' +
      esc(src) +
      '" alt="" width="18" height="18" draggable="false" /></span>' +
      "<span>" +
      esc(chip.label) +
      "</span>" +
      "</div>"
    );
  }

  function buildStackDom() {
    var measure = $("#stack-measure");
    var arena = $("#stack-arena");
    measure.innerHTML = CONFIG.stack.map(chipHtml).join("");
    arena.innerHTML = CONFIG.stack
      .map(function (c) {
        return (
          '<div class="stack-chip" data-stack-chip>' + chipHtml(c) + "</div>"
        );
      })
      .join("");
  }

  function startStack() {
    if (typeof window.Matter === "undefined") return;
    stopStack();

    var arena = $("#stack-arena");
    var measure = $("#stack-measure");
    var chipEls = $$("[data-stack-chip]", arena);
    if (!arena || !arena.clientWidth) return;

    var M = window.Matter;
    var Engine = M.Engine,
      Runner = M.Runner,
      Bodies = M.Bodies,
      Body = M.Body;
    var Mouse = M.Mouse,
      MouseConstraint = M.MouseConstraint,
      Events = M.Events,
      Composite = M.Composite;

    var CHIP_RADIUS = 14,
      WALL_PAD = 16,
      WALL = 400;

    var dims = $$(".chip", measure).map(function (el) {
      var r = el.getBoundingClientRect();
      return { w: Math.max(80, r.width), h: Math.max(28, r.height) };
    });

    var width = arena.clientWidth,
      height = arena.clientHeight;
    var engine = Engine.create();
    engine.gravity.y = 1;
    var world = engine.world;

    var floor = Bodies.rectangle(
      width / 2,
      height - WALL_PAD + WALL / 2,
      width * 3,
      WALL,
      { isStatic: true },
    );
    var leftWall = Bodies.rectangle(
      WALL_PAD - WALL / 2,
      height / 2,
      WALL,
      height * 4,
      { isStatic: true },
    );
    var rightWall = Bodies.rectangle(
      width - WALL_PAD + WALL / 2,
      height / 2,
      WALL,
      height * 4,
      { isStatic: true },
    );
    Composite.add(world, [floor, leftWall, rightWall]);

    var items = CONFIG.stack.map(function (chip, i) {
      var d = dims[i] || { w: 120, h: 36 };
      var minX = WALL_PAD + d.w / 2 + 4;
      var maxX = width - WALL_PAD - d.w / 2 - 4;
      var x = minX + Math.random() * Math.max(1, maxX - minX);
      var y = -80 - i * 60 - Math.random() * 120;
      var body = Bodies.rectangle(x, y, d.w, d.h, {
        chamfer: { radius: CHIP_RADIUS },
        restitution: 0.35,
        friction: 0.5,
        frictionAir: 0.025,
        density: 0.0018,
        angle: (Math.random() - 0.5) * 0.4,
      });
      Composite.add(world, body);
      return { body: body, w: d.w, h: d.h, el: chipEls[i] };
    });

    var mouse = Mouse.create(arena);
    // let the page scroll with the mouse wheel while hovering the arena
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    var mc = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.2, damping: 0.2, render: { visible: false } },
    });
    Composite.add(world, mc);
    Events.on(mc, "startdrag", function () {
      arena.style.cursor = "grabbing";
    });
    Events.on(mc, "enddrag", function () {
      arena.style.cursor = "grab";
    });

    var runner = Runner.create();
    Runner.run(runner, engine);

    var raf = 0;
    (function tick() {
      items.forEach(function (it) {
        if (!it.el) return;
        var p = it.body.position;
        it.el.style.transform =
          "translate3d(" +
          (p.x - it.w / 2) +
          "px," +
          (p.y - it.h / 2) +
          "px,0) rotate(" +
          it.body.angle +
          "rad)";
      });
      raf = requestAnimationFrame(tick);
    })();

    var ro = new ResizeObserver(function () {
      var nw = arena.clientWidth,
        nh = arena.clientHeight;
      if (!nw || !nh || (nw === width && nh === height)) return;
      Body.setPosition(floor, { x: nw / 2, y: nh - WALL_PAD + WALL / 2 });
      Body.setPosition(leftWall, { x: WALL_PAD - WALL / 2, y: nh / 2 });
      Body.setPosition(rightWall, { x: nw - WALL_PAD + WALL / 2, y: nh / 2 });
      width = nw;
      height = nh;
    });
    ro.observe(arena);

    stackState.teardown = function () {
      cancelAnimationFrame(raf);
      ro.disconnect();
      Runner.stop(runner);
      // detach Matter's mouse listeners so a restart doesn't stack handlers
      var el = mouse.element;
      el.removeEventListener("mousemove", mouse.mousemove);
      el.removeEventListener("mousedown", mouse.mousedown);
      el.removeEventListener("mouseup", mouse.mouseup);
      el.removeEventListener("touchmove", mouse.mousemove);
      el.removeEventListener("touchstart", mouse.mousedown);
      el.removeEventListener("touchend", mouse.mouseup);
      Composite.clear(world, false);
      Engine.clear(engine);
      chipEls.forEach(function (c) {
        c.style.transform = "translate3d(-9999px,-9999px,0)";
      });
      arena.style.cursor = "grab";
    };
  }

  function stopStack() {
    if (stackState.teardown) {
      stackState.teardown();
      stackState.teardown = null;
    }
  }

  function initStack() {
    var arena = $("#stack-arena");
    if (!arena) return;
    buildStackDom();

    var reset = $("#stack-reset");
    if (reset)
      reset.addEventListener("click", function () {
        startStack();
      });

    // start the drop when the panel scrolls into view (so you actually see it fall)
    stackState.observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (
            e.isIntersecting &&
            !stackState.teardown &&
            currentView === "about"
          ) {
            var begin = function () {
              startStack();
            };
            if (document.fonts && document.fonts.ready)
              document.fonts.ready.then(begin);
            else begin();
          }
        });
      },
      { threshold: 0.35 },
    );
    stackState.observer.observe($("#stack"));
  }

  /* ======================================================================
     12. Router — hash based (#/, #/projects, #/about)
     ====================================================================== */
  var ROUTES = { "/": "home", "/projects": "projects", "/about": "about" };

  function routeFromHash() {
    var h = (window.location.hash || "").replace(/^#/, "");
    if (h.charAt(0) !== "/") return null; // not a route (e.g. #main-content)
    h = h.replace(/\/+$/, "") || "/";
    return ROUTES[h] || "home";
  }

  function movePill(animate) {
    var pill = $("#nav-pill");
    var active = $('.nav__link[aria-current="page"]');
    if (!pill || !active) return;
    var li = active.parentElement;
    var list = $("#nav-list");
    var lr = list.getBoundingClientRect();
    var ir = li.getBoundingClientRect();
    if (!animate) pill.classList.add("no-anim");
    pill.style.width = ir.width + "px";
    pill.style.transform = "translateX(" + (ir.left - lr.left) + "px)";
    pill.classList.add("is-ready");
    if (!animate) {
      void pill.offsetWidth;
      pill.classList.remove("no-anim");
    }
  }

  var firstRoute = true;

  function showView(name) {
    var prev = currentView;
    currentView = name;

    $$(".view").forEach(function (v) {
      v.hidden = v.dataset.view !== name;
    });

    $$(".nav__link").forEach(function (a) {
      if (a.dataset.route === name) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    movePill(!firstRoute);

    // shared contact card lives inside the active view
    var view = $("#view-" + name);
    var slot = $("[data-contact-slot]", view);
    var contact = $("#contact");
    if (slot && contact && contact.parentNode !== slot)
      slot.appendChild(contact);

    document.title = (view.dataset.title || "Home") + " | " + CONFIG.siteName;

    if (prev !== name) scrollToTop();
    if (!firstRoute) {
      var main = $("#main-content");
      if (main) main.focus({ preventScroll: true });
    }

    remeasureContactButtons();

    if (name === "about") {
      // restart entrance animation cleanly and (re)start physics when visible
      stopStack();
      requestAnimationFrame(function () {
        if (stackState.observer) {
          var stackEl = $("#stack");
          stackState.observer.unobserve(stackEl);
          stackState.observer.observe(stackEl);
        }
      });
    } else {
      stopStack();
    }

    firstRoute = false;
  }

  function onRouteChange() {
    var name = routeFromHash();
    if (name === null) return; // in-page hash like the skip link
    showView(name);
  }

  function initRouter() {
    window.addEventListener("hashchange", onRouteChange);
    window.addEventListener("resize", function () {
      movePill(false);
    });
    if (document.fonts && document.fonts.ready)
      document.fonts.ready.then(function () {
        movePill(false);
      });

    // Skip link: jump to <main> without clobbering the route hash
    var skip = $("#skip-link");
    if (skip) {
      skip.addEventListener("click", function (e) {
        e.preventDefault();
        var main = $("#main-content");
        if (main) {
          main.focus();
          main.scrollIntoView();
        }
      });
    }

    // Clicking the link of the page you're already on just scrolls to the top
    $$('a[href^="#/"]').forEach(function (a) {
      a.addEventListener("click", function () {
        var target =
          a.getAttribute("href").replace(/^#/, "").replace(/\/+$/, "") || "/";
        var cur =
          (window.location.hash || "#/")
            .replace(/^#/, "")
            .replace(/\/+$/, "") || "/";
        if (target === cur) scrollToTop();
      });
    });

    if (!window.location.hash) {
      // keep the URL clean on first visit; Home is the default route
      showView("home");
    } else {
      showView(routeFromHash() || "home");
    }
  }

  /* ======================================================================
     Init
     ====================================================================== */
  function init() {
    renderContent();
    initTheme();
    initSmoothScroll();
    initContactButtons();
    initExperience();
    initPolaroids();
    initStack();
    initPortraitMorph();
    initRouter();

    createShaderFlow($("#backdrop-shader"), {
      brightness: 3,
      iterations: 10,
      flowSpeed: [0, 0.1],
      fade: [0.5, 0.5, 1.5, 1.5],
    });
    createShaderFlow($("#contact-shader"), { scale: 3, brightness: 3 });
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();
