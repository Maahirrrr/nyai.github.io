---
name: animaster-lib
description: >-
  Build immersive, 60fps WebGL + GSAP + Vanilla JS animations and scroll choreographies inspired by Animaster Lib (animmasterlib.dev).
  Covers 300 PRO components: procedural 3D elements, scroll-driven card stacks, inertia mouse physics,
  kinetic typography reveals, and seamless state/page transitions without heavy runtime overhead.
license: MIT
metadata:
  site: https://animmasterlib.dev
  stack: "WebGL, GSAP, Three.js, Vanilla JS, CSS3 Hardware Acceleration"
---

# Animaster Lib

Animaster Lib (`animmasterlib.dev`) reverse-engineers and standardizes award-winning (Awwwards/FWA-grade) animation patterns into clean, production-ready, copy-pasteable vanilla JavaScript and WebGL components.

## Core Animation Architectures

### 1. Damped Lerp Mouse Inertia (Physics-based Tilt)
Instead of snapping directly to cursor positions, elements follow with mathematical damping:
$$\text{pos} \leftarrow \text{pos} + (\text{target} - \text{pos}) \times \text{friction}$$

```javascript
class InertiaTilt {
  constructor(el, friction = 0.08, maxTilt = 12) {
    this.el = el;
    this.friction = friction;
    this.maxTilt = maxTilt;
    this.currentX = 0; this.currentY = 0;
    this.targetX = 0; this.targetY = 0;
    this.raf = null;

    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      this.targetX = -y * this.maxTilt;
      this.targetY = x * this.maxTilt;
      if (!this.raf) this.loop();
    });

    el.addEventListener('mouseleave', () => {
      this.targetX = 0; this.targetY = 0;
    });
  }

  loop() {
    this.currentX += (this.targetX - this.currentX) * this.friction;
    this.currentY += (this.targetY - this.currentY) * this.friction;
    this.el.style.transform = `perspective(1000px) rotateX(${this.currentX.toFixed(2)}deg) rotateY(${this.currentY.toFixed(2)}deg)`;

    if (Math.abs(this.targetX - this.currentX) > 0.01 || Math.abs(this.targetY - this.currentY) > 0.01) {
      this.raf = requestAnimationFrame(() => this.loop());
    } else {
      this.raf = null;
    }
  }
}
```

### 2. Scroll-Choreographed Stacked Cards (Verse Cards / Sticky Deck)
Cards that stack cleanly as the user scrolls, each scaling down slightly and dimming as the next card covers it:

```css
.animaster-card-stack {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
}
.animaster-card {
  position: sticky;
  top: calc(5rem + var(--index, 0) * 1.25rem);
  transform-origin: center top;
  transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1), opacity 0.2s;
  background: #0E1014;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

### 3. Procedural Three.js / WebGL Micro-Environments
Procedural geometries (armillary rings, crystalline cores, legal nodes) with zero external 3D asset downloads:
- Pause render loop automatically via `IntersectionObserver` when scrolled out of view.
- Support mouse orbital drag + automatic ambient gyroscope rotation.
- Ambient lighting with gilded brass specularity (`#C5A059`).

### 4. Seamless Tab & Page View Transitions
Smooth cross-dissolve with subtle vertical displacement:
```css
.page {
  display: none;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.25s cubic-bezier(0.2, 0, 0, 1), transform 0.25s cubic-bezier(0.2, 0, 0, 1);
}
.page.active {
  display: block;
  opacity: 1;
  transform: translateY(0);
}
```

## Performance & Anti-Slop Rules
1. **Never drop below 60fps**: Always use `requestAnimationFrame` and GPU-accelerated properties (`transform`, `opacity`).
2. **Intersection Throttling**: Every canvas and continuous animation MUST stop when not visible on screen.
3. **Respect Reduced Motion**: Always wrap continuous motion in `@media (prefers-reduced-motion: no-preference)`.
