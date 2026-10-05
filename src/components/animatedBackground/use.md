# LawScales — usage

An animated background: a balancing scale of justice with floating law books behind it.
It's a single self-contained Astro file with no dependencies.

## 1. Drop it in

```astro
---
import LawScales from '../components/animatedBackground/LawScales.astro';
import civil from '../assets/books/civil.jpg';
import penal from '../assets/books/penal.jpg';
---

<section style="position:relative; min-height:100svh; background:#14110d;">
  <LawScales books={[civil, penal]} />

  <div style="position:relative; z-index:1;">
    Your content here
  </div>
</section>
```

Two rules:
1. **The parent needs `position: relative`** (`absolute`, `fixed` or `sticky` also work). LawScales fills that box.
2. **Content after it needs `position: relative`** (add `z-index: 1` if needed) so it renders on top.

The background color comes from the parent. LawScales itself is transparent.

## 2. Book covers

The `books` prop accepts any mix of:

```astro
books={[
  civil,                              // imported image → auto-resized to 320px WebP
  '/covers/penal.jpg',                // URL from /public or a remote URL (used as-is)
  { src: civil, alt: 'Code civil' },  // object form
]}
```

- If there are fewer covers than books, the covers repeat.
- With no covers, it draws plain leather-style covers in CSS.
- Imported images (`import x from '...jpg'`) are best because they get optimized at build time.

## 3. Props

| Prop           | Default    | What it does                                        |
| -------------- | ---------- | --------------------------------------------------- |
| `books`        | `[]`       | Cover images (see above)                            |
| `bookCount`    | `max(covers, 8)` | Number of floating books (max 16)             |
| `bookOpacity`  | `0.5`      | How visible the books are (0–1)                     |
| `scrollFactor` | `0.35`     | How far books move on scroll (`0` = no movement)    |
| `metal`        | `#c9a24a`  | Main color of the scale (also gold on plain covers) |
| `line`         | `#5a3f12`  | Engraving / outline color                           |
| `deep`         | `#2e2108`  | Color inside the pans                               |
| `duration`     | `12`       | Seconds per balancing cycle (higher = slower)       |
| `size`         | `1`        | Scale size multiplier (`0.7` smaller, `1.2` bigger) |
| `seed`         | `7`        | Change it to get a different book layout            |
| `class`        | —          | Extra class on the root element                     |

## 4. Recipes

**Light background**

```astro
<LawScales metal="#3b2f1e" line="#1a140b" deep="#0f0b06" bookOpacity={0.35} />
```

**Fixed full-page background**

```astro
<div style="position:fixed; inset:0;">
  <LawScales books={[civil, penal]} />
</div>
```

**Small card**

```astro
<div style="position:relative; height:400px; border-radius:24px; overflow:hidden; background:#1e2a44;">
  <LawScales size={0.8} bookCount={5} seed={21} />
</div>
```

**Calm (no scroll reaction, slower)**

```astro
<LawScales scrollFactor={0} duration={20} />
```

## 5. Built-in behavior

- The scale never reacts to touch or scroll. The books react to any scroll: the page or any scrollable container inside it.
- Animation pauses automatically when the component is off screen.
- Respects the OS "reduce motion" setting: the scale holds still, the books stop floating, and they follow scroll directly without smoothing or tilt.
- Several instances on one page share a single scroll listener.
