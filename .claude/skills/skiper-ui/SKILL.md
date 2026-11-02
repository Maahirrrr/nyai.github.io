---
name: skiper-ui
description: >-
  Build and compose un-common, high-craft interactive components inspired by Skiper UI (skiper-ui.com).
  Features 106+ self-contained components: ray-traced border beams, cursor spotlight cards, dynamic islands,
  magnetic triggers, liquid specular highlights, and kinetic stat counters with zero runtime bloat.
license: MIT
metadata:
  site: https://skiper-ui.com
  philosophy: "UN-COMMON COMPONENTS — High-craft, self-contained micro-interactions"
---

# Skiper UI

Skiper UI (`skiper-ui.com`) provides "un-common" interactive components designed to break websites out of generic template patterns. Each component is self-contained with minimal dependencies, optimized for 60fps performance and pure craft.

## Signature Component Catalog

### 1. Ray-Traced Border Beam (`border-beam`)
A laser-precise light ray that orbits the border perimeter of a card or container using native CSS `offset-path` and mask compositing.

```css
@keyframes border-beam {
  100% { offset-distance: 100%; }
}
.skiper-border-beam {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 1.5px solid transparent;
  mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
  mask-clip: padding-box, border-box;
  mask-composite: intersect;
  pointer-events: none;
}
.skiper-border-beam::after {
  content: '';
  position: absolute;
  aspect-ratio: 1;
  width: var(--beam-size, 160px);
  background: linear-gradient(to left, var(--beam-from, #C5A059), var(--beam-to, #D4AF37), transparent);
  offset-anchor: 90% 50%;
  offset-path: rect(0 auto auto 0 round var(--beam-radius, 4px));
  animation: border-beam var(--beam-duration, 8s) infinite linear;
}
```

### 2. Cursor Spotlight Cards (`spotlight-card`)
Calculates the mouse cursor's exact coordinates relative to the card's bounding box to render an ultra-subtle, tactile ambient light cone.

```javascript
document.querySelectorAll('.spotlight-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});
```

```css
.spotlight-card {
  position: relative;
  background: #0E1014;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
}
.spotlight-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(400px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(197, 160, 89, 0.08), transparent 70%);
  pointer-events: none;
  transition: opacity 0.3s ease;
}
```

### 3. Magnetic Action Triggers (`magnetic-button`)
Elements that gently displace towards the user's cursor on hover, creating tactile weight.

```javascript
function initMagnetic(el, distance = 0.25) {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * distance;
    const dy = (e.clientY - cy) * distance;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0px, 0px)';
    el.style.transition = 'transform 0.35s cubic-bezier(0.2, 0, 0, 1)';
  });
}
```

### 4. Kinetic Spring Stats Counter (`stats-counter`)
Smoothly interpolates numerical values when scrolled into view using an `IntersectionObserver`.

```javascript
function animateNumber(el, target, duration = 1200, prefix = '', suffix = '') {
  let start = 0;
  const t0 = performance.now();
  function step(now) {
    const p = Math.min((now - t0) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 4); // Quartic ease out
    const current = Math.floor(start + (target - start) * ease);
    el.textContent = `${prefix}${current.toLocaleString()}${suffix}`;
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
  }
  requestAnimationFrame(step);
}
```

## Craft Rules (Anti-Slop Integration)
- **Monochrome & Gilded Brass**: Never use neon purple or rainbow gradients. Always tie glow colors to product tokens (e.g. Legal Brass `#C5A059` on Obsidian `#07080A`).
- **Subtle Opacity**: Keep radial spotlight opacity between `0.06` and `0.10` so it feels like natural ambient light, not a flashlight.
- **60fps Native**: Use CSS `transform`, `opacity`, and `offset-path` rather than triggering browser layout reflows.
