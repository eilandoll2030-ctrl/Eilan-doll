/* ==========================================================================
   دار الورد · scene-3d.js
   A small hand-written 3D layer on a plain <canvas> 2D context.
   - a spinning brand cube ("مكعبات تبني عالم") in the hero
   - the code-drawn bouquet that grows and sways in the builder
   No libraries, no WebGL requirement, ~8 KB.
   ========================================================================== */
(() => {
  'use strict';

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const D2R = Math.PI / 180;
  const clamp = (v, a, b) => v < a ? a : v > b ? b : v;

  /* ---------------------------------------------------------------- cube --- */
  class Cube {
    constructor(canvas, opts = {}) {
      this.cv = canvas;
      this.ctx = canvas.getContext('2d');
      this.dead = !this.ctx;
      if (this.dead) return;
      this.size = opts.size || 62;
      this.gap = 0.055;
      this.rot = { x: -22 * D2R, y: 28 * D2R };
      this.vel = { x: 0, y: 0 };
      this.target = opts.target || { x: -18 * D2R, y: 24 * D2R };
      this.pointer = { x: 0, y: 0 };
      this.scale = 1;
      this.zoom = opts.zoom || 1;
      this.running = false;
      this.build();
      this.resize();
      if (opts.parallax) this.bindPointer();
      this.loop = this.loop.bind(this);
    }

    /* 3x3 face of cubes, each cube itself drawn as three visible faces */
    build() {
      if (this.dead) return;
      const COLS = [
        ['#EBDDB0', '#7FAA8A', '#2F5E42'],
        ['#3E7A55', '#4A2682', '#2F5E42'],
        ['#7FAA8A', '#E0B454', '#3E7A55']
      ];
      const cubes = [];
      const n = 3, step = this.size * (1 + this.gap);
      const off = (n * step - step) / 2;
      for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
          const x = c * step - off;
          const y = r * step - off;
          // the gold cube is lifted out of the top-right slot
          const lifted = (r === 0 && c === 2);
          cubes.push({
            x, y, z: 0,
            lift: lifted ? this.size * 0.55 : 0,
            color: COLS[r][c],
            gold: lifted
          });
        }
      }
      this.cubes = cubes;
      this.bounds = off + this.size / 2;
    }

    resize() {
      if (this.dead) return;
      const dpr = Math.min(devicePixelRatio || 1, matchMedia('(pointer: coarse)').matches ? 2 : 2.5);
      const r = this.cv.getBoundingClientRect();
      const w = r.width || 420, h = r.height || 420;
      this.cv.width = Math.round(w * dpr);
      this.cv.height = Math.round(h * dpr);
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.w = w; this.h = h;
      const fit = Math.min(w, h) / (this.bounds * 2.55);
      this.scale = fit * this.zoom;
    }

    bindPointer() {
      addEventListener('pointermove', (e) => {
        this.pointer.x = (e.clientX / innerWidth - 0.5) * 2;
        this.pointer.y = (e.clientY / innerHeight - 0.5) * 2;
      }, { passive: true });
    }

    project(p, cx, cy, cos, sin) {
      // rotate Y then X
      const yx = p.x * cos.y + p.z * sin.y;
      const yz = -p.x * sin.y + p.z * cos.y;
      const xr = p.y * cos.x - yz * sin.x;
      const zr = p.y * sin.x + yz * cos.x;
      const persp = 900 / (900 + zr);
      return {
        x: cx + yx * this.scale * persp,
        y: cy + xr * this.scale * persp,
        z: zr
      };
    }

    face(path, fill, stroke) {
      const c = this.ctx;
      c.beginPath();
      c.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length; i++) c.lineTo(path[i].x, path[i].y);
      c.closePath();
      c.fillStyle = fill; c.fill();
      if (stroke) { c.strokeStyle = stroke; c.lineWidth = 1; c.stroke(); }
    }

    tone(hex, f) {
      const n = parseInt(hex.slice(1), 16);
      let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
      r = clamp(Math.round(r * f), 0, 255);
      g = clamp(Math.round(g * f), 0, 255);
      b = clamp(Math.round(b * f), 0, 255);
      return `rgb(${r},${g},${b})`;
    }

    draw() {
      if (this.dead) return;
      const c = this.ctx;
      c.clearRect(0, 0, this.w, this.h);
      const cx = this.w / 2, cy = this.h / 2;
      const cos = { x: Math.cos(this.rot.x), y: Math.cos(this.rot.y) };
      const sin = { x: Math.sin(this.rot.x), y: Math.sin(this.rot.y) };
      const s = this.size / 2;
      const faces = [];
      for (const cube of this.cubes) {
        const lift = cube.lift * (reduce ? 1 : (1 + Math.sin(this.t * 1.7) * 0.06));
        const b = -lift; // negative y = up
        const verts = {
          // top face
          t0: { x: cube.x - s, y: b - s, z: -s }, t1: { x: cube.x + s, y: b - s, z: -s },
          t2: { x: cube.x + s, y: b - s, z: s }, t3: { x: cube.x - s, y: b - s, z: s },
          // bottom face
          b0: { x: cube.x - s, y: b + s, z: -s }, b1: { x: cube.x + s, y: b + s, z: -s },
          b2: { x: cube.x + s, y: b + s, z: s }, b3: { x: cube.x - s, y: b + s, z: s }
        };
        const P = {};
        for (const k in verts) P[k] = this.project(verts[k], cx, cy, cos, sin);
        const defs = [
          { f: [P.t0, P.t1, P.t2, P.t3], shade: 1.28, key: 'top' },
          { f: [P.t0, P.t1, P.b1, P.b0], shade: 0.82, key: 'back' },
          { f: [P.t1, P.t2, P.b2, P.b1], shade: 1.02, key: 'right' },
          { f: [P.t2, P.t3, P.b3, P.b2], shade: 0.66, key: 'front' },
          { f: [P.t3, P.t0, P.b0, P.b3], shade: 0.9, key: 'left' }
        ];
        for (const d of defs) {
          const z = d.f.reduce((a, p) => a + p.z, 0) / 4;
          faces.push({ path: d.f, z, fill: this.tone(cube.color, d.shade), key: d.key, gold: cube.gold });
        }
      }
      faces.sort((a, b) => a.z - b.z);
      for (const f of faces) {
        this.ctx.globalAlpha = 1;
        this.face(f.path, f.fill);
        if (f.gold) {
          this.ctx.globalAlpha = 0.16;
          this.face(f.path, '#FFF3C4');
          this.ctx.globalAlpha = 1;
        }
      }
    }

    loop(ts) {
      this.t = (ts || 0) / 1000;
      const px = this.pointer.x * 0.14, py = this.pointer.y * 0.1;
      if (!reduce) {
        this.vel.y += ((this.target.y + px) - this.rot.y) * 0.004;
        this.vel.x += ((this.target.x + py) - this.rot.x) * 0.004;
        this.vel.y *= 0.93; this.vel.x *= 0.93;
        this.rot.y += this.vel.y + 0.0032;
        this.rot.x += this.vel.x;
      } else {
        this.rot.y = this.target.y; this.rot.x = this.target.x;
      }
      this.draw();
      if (this.running) requestAnimationFrame(this.loop);
    }

    start() {
      if (this.running || this.dead) return;
      this.running = true; this.t = 0;
      requestAnimationFrame(this.loop);
    }
    stop() { this.running = false; }
  }

  /* ---------------------------------------------------- bouquet 2.5D rig --- */
  const STEM_KINDS = {
    eucalyptus: { petals: 'oval', petalColor: '#93A98A', coreColor: '#7C9575', petalCount: 6, r: 0.10 },
    grass: { petals: 'blade', petalColor: '#CDBF92', coreColor: '#B8A97B', petalCount: 7, r: 0.08 },
    rose: { petals: 'rose', petalColor: '#E7B4A6', coreColor: '#D99B89', petalCount: 8, r: 0.13 },
    anemone: { petals: 'round', petalColor: '#F6EFE2', coreColor: '#2A2A26', petalCount: 7, r: 0.12 },
    marigold: { petals: 'frill', petalColor: '#E08B3A', coreColor: '#C9752C', petalCount: 9, r: 0.10 },
    peony: { petals: 'rose', petalColor: '#EFC0CE', coreColor: '#DFA0B2', petalCount: 10, r: 0.15 },
    ranunculus: { petals: 'round', petalColor: '#F3D7C4', coreColor: '#D9A98E', petalCount: 9, r: 0.11 },
    foxglove: { petals: 'bell', petalColor: '#D8D3C4', coreColor: '#B9B39F', petalCount: 5, r: 0.09 },
    sweeppea: { petals: 'blade', petalColor: '#D9B6D9', coreColor: '#B98FBB', petalCount: 6, r: 0.09 }
  };

  class Bouquet {
    constructor(host) {
      this.host = host;
      this.svg = null;
      this.state = { stems: [], ribbon: '#E0B454' };
      this.rot = { x: -8, y: 0 };
      this.vel = { x: 0, y: 0 };
      this.pointer = { x: 0, y: 0 };
      this.dragging = false;
      this.renderShell();
      this.bind();
    }

    renderShell() {
      this.host.innerHTML = `
        <svg viewBox="0 0 400 400" role="img" aria-label="bouquet preview">
          <defs>
            <radialGradient id="bq-glow" cx="50%" cy="42%" r="55%">
              <stop offset="0%" stop-color="#2F5E42" stop-opacity=".55"/>
              <stop offset="100%" stop-color="#2F5E42" stop-opacity="0"/>
            </radialGradient>
            <linearGradient id="bq-paper" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#E6D2AC"/>
              <stop offset="55%" stop-color="#D9C29A"/>
              <stop offset="100%" stop-color="#C7AC82"/>
            </linearGradient>
            <linearGradient id="bq-paper2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#F3DCD8"/>
              <stop offset="100%" stop-color="#E3C4BE"/>
            </linearGradient>
            <filter id="bq-soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.1"/>
            </filter>
          </defs>
          <ellipse cx="200" cy="196" rx="150" ry="150" fill="url(#bq-glow)"/>
          <g class="sway" id="bq-rig"></g>
        </svg>`;
      this.rig = this.host.querySelector('#bq-rig');
    }

    bind() {
      const el = this.host.parentElement;
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        this.pointer.x = (e.clientX - r.left) / r.width - 0.5;
        this.pointer.y = (e.clientY - r.top) / r.height - 0.5;
        if (this.dragging) {
          this.rot.y = clamp(this.rot.y + e.movementX * 0.5, -26, 26);
          this.rot.x = clamp(this.rot.x - e.movementY * 0.3, -16, 12);
        }
      }, { passive: true });
      el.addEventListener('pointerleave', () => { this.pointer.x = 0; this.pointer.y = 0; });
      el.addEventListener('pointerdown', () => { this.dragging = true; el.style.cursor = 'grabbing'; });
      addEventListener('pointerup', () => { this.dragging = false; el.style.cursor = ''; });
      el.style.cursor = 'grab';
    }

    set(state) {
      this.state = state;
      this.paint();
    }

    /* deterministic pseudo-random so a bouquet looks the same every redraw */
    rnd(seed) {
      const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    }

    paint() {
      const stems = [];
      for (const s of this.state.stems) for (let i = 0; i < s.qty; i++) stems.push({ key: s.key, ...STEM_KINDS[s.key] });
      const total = stems.length;
      const cx = 200, top = 210, spread = 118;
      let out = '';

      /* stems fan out of one binding point, drawn behind the heads */
      out += `<g class="bq-stems" stroke="#3E6B49" stroke-linecap="round" fill="none">`;
      for (let i = 0; i < Math.min(total, 60); i++) {
        const t = total <= 1 ? 0.5 : i / (total - 1);
        const a = (t - 0.5) * 1.9;
        const len = 118 + this.rnd(i + 3) * 34;
        const x1 = cx + Math.sin(a) * 10, y1 = 300;
        const x2 = cx + Math.sin(a) * len, y2 = 300 - Math.cos(a) * len;
        out += `<path d="M${x1.toFixed(1)} ${y1} Q${((x1 + x2) / 2 + Math.sin(a) * 8).toFixed(1)} ${(y2 + 26).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}" stroke-width="${(2.1 - Math.abs(t - 0.5) * 1.4).toFixed(2)}" opacity="${(0.5 + this.rnd(i) * 0.35).toFixed(2)}"/>`;
      }
      out += `</g>`;

      /* heads: bigger near the middle, smaller at the edges; sorted by y */
      const heads = [];
      for (let i = 0; i < Math.min(total, 44); i++) {
        const t = total <= 1 ? 0.5 : i / (total - 1);
        const a = (t - 0.5) * 2.15;
        const dist = 58 + this.rnd(i * 2.1) * 78;
        const x = cx + Math.sin(a) * dist * 1.15;
        const y = top - Math.cos(a) * dist * 0.82 - this.rnd(i * 5.7) * 22;
        const k = stems[i % stems.length];
        const scale = (0.72 + this.rnd(i * 3.3) * 0.5) * (1 - Math.abs(t - 0.5) * 0.35);
        heads.push({ x, y, k, scale, i });
      }
      heads.sort((a, b) => a.y - b.y);
      for (const h of heads) out += this.head(h.x, h.y, h.k, h.scale, h.i);

      /* kraft wrap + tissue + ribbon */
      out += `<path d="M126 288 L274 288 L236 372 L164 372 Z" fill="url(#bq-paper)" opacity=".97"/>`;
      out += `<path d="M126 288 L274 288 L262 306 L138 306 Z" fill="url(#bq-paper2)" opacity=".9"/>`;
      out += `<path d="M126 288 L156 300 L150 360 L164 372 Z" fill="#000" opacity=".08"/>`;
      out += `<path d="M274 288 L244 300 L250 360 L236 372 Z" fill="#fff" opacity=".07"/>`;
      const rb = this.state.ribbon || '#E0B454';
      out += `<path d="M152 330 Q200 344 248 330" stroke="${rb}" stroke-width="9" fill="none" stroke-linecap="round"/>`;
      out += `<g transform="translate(200 337)">
        <path d="M0 0 C-30 -8 -44 8 -30 18 C-18 26 -4 12 0 0 Z" fill="${rb}"/>
        <path d="M0 0 C30 -8 44 8 30 18 C18 26 4 12 0 0 Z" fill="${rb}" opacity=".92"/>
        <path d="M-6 4 L-12 40" stroke="${rb}" stroke-width="7" stroke-linecap="round" opacity=".9"/>
        <path d="M7 4 L15 36" stroke="${rb}" stroke-width="6" stroke-linecap="round" opacity=".8"/>
        <circle cx="0" cy="2" r="6" fill="${rb}"/>
        <circle cx="-2" cy="0" r="2.4" fill="#fff" opacity=".28"/>
      </g>`;
      this.rig.innerHTML = out;
    }

    head(x, y, k, s, seed) {
      const g = [];
      const R = 26 * s;
      const rot = this.rnd(seed * 7.3) * 360;
      if (!k) return '';
      g.push(`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(0)}) scale(${s.toFixed(2)})">`);
      if (k.petals === 'blade') {
        for (let i = 0; i < k.petalCount; i++) {
          const a = (360 / k.petalCount) * i + this.rnd(seed + i) * 14;
          g.push(`<path d="M0 0 Q${-4} ${-18} 0 ${-30} Q${4} ${-18} 0 0" fill="${k.petalColor}" opacity=".85" transform="rotate(${a.toFixed(0)})"/>`);
        }
        g.push(`<circle r="3.4" fill="${k.coreColor}"/>`);
      } else if (k.petals === 'bell') {
        for (let i = 0; i < k.petalCount; i++) {
          const a = 360 / k.petalCount * i;
          g.push(`<path d="M0 0 q-8 -14 0 -22 q8 8 0 22" fill="${k.petalColor}" opacity=".9" transform="rotate(${a.toFixed(0)}) translate(0 -6)"/>`);
        }
        g.push(`<circle r="3" fill="${k.coreColor}"/>`);
      } else if (k.petals === 'frill') {
        for (let i = 0; i < k.petalCount; i++) {
          const a = 360 / k.petalCount * i;
          g.push(`<path d="M0 0 q-10 -16 0 -24 q10 8 0 24" fill="${i % 2 ? k.coreColor : k.petalColor}" opacity=".9" transform="rotate(${a}) translate(0 -4) scale(1.08)"/>`);
        }
        g.push(`<circle r="6" fill="${k.coreColor}" opacity=".85"/>`);
      } else if (k.petals === 'rose') {
        g.push(`<circle r="${R * 0.92}" fill="${k.coreColor}" opacity=".9"/>`);
        for (let i = 0; i < k.petalCount; i++) {
          const a = 360 / k.petalCount * i + 18;
          g.push(`<ellipse rx="${R * 0.72}" ry="${R * 0.46}" cy="${-R * 0.40}" fill="${k.petalColor}" opacity=".92" transform="rotate(${a})"/>`);
        }
        g.push(`<ellipse rx="${R * 0.5}" ry="${R * 0.34}" cy="${-R * 0.22}" fill="${k.petalColor}" opacity=".7"/>`);
        g.push(`<circle r="${R * 0.2}" cy="${-R * 0.1}" fill="${k.coreColor}" opacity=".9"/>`);
      } else if (k.petals === 'oval') {
        for (let i = 0; i < k.petalCount; i++) {
          const a = 360 / k.petalCount * i;
          g.push(`<ellipse rx="${R * 0.34}" ry="${R * 0.62}" cy="${-R * 0.55}" fill="${k.petalColor}" opacity=".92" transform="rotate(${a})"/>`);
        }
        g.push(`<circle r="${R * 0.2}" fill="${k.coreColor}"/>`);
      } else { /* round */
        for (let i = 0; i < k.petalCount; i++) {
          const a = 360 / k.petalCount * i;
          g.push(`<circle r="${R * 0.42}" cy="${-R * 0.58}" fill="${k.petalColor}" opacity=".95" transform="rotate(${a})"/>`);
        }
        g.push(`<circle r="${R * 0.26}" fill="${k.coreColor}"/>`);
        if (k.coreColor === '#2A2A26') g.push(`<circle r="${R * 0.2}" fill="#111" opacity=".55"/>`);
      }
      g.push(`</g>`);
      return g.join('');
    }

    tick() {
      if (!reduce) {
        const ty = this.pointer.x * 16, tx = -this.pointer.y * 10;
        this.rot.y += (ty - this.rot.y) * 0.06;
        this.rot.x += (tx - this.rot.x) * 0.06;
      }
      this.host.style.transform = `rotateX(${this.rot.x.toFixed(2)}deg) rotateY(${this.rot.y.toFixed(2)}deg)`;
    }
  }

  window.EilanScene = { Cube, Bouquet, STEM_KINDS, reduce };
})();
