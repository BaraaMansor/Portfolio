import { useEffect } from 'react';

/**
 * One passive scroll listener rotates every [data-spin] glyph as the page
 * scrolls. Writes go straight to style.transform inside a single rAF, so
 * React never re-renders and the work stays on the compositor.
 *
 * Deliberately NOT gated behind prefers-reduced-motion: the rotation is
 * scrubbed by the user's own scrolling (nothing moves on its own), which
 * is the interaction-driven kind of motion the preference permits.
 */
const ScrollFx = () => {
  useEffect(() => {
    const glyphs = Array.from(
      document.querySelectorAll<HTMLElement>('[data-spin]')
    );
    if (glyphs.length === 0) return;

    // Only spin glyphs that are actually on screen.
    const active = new Set<HTMLElement>();
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) active.add(el);
          else active.delete(el);
        });
      },
      { rootMargin: '20%' }
    );
    glyphs.forEach(el => io.observe(el));

    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      active.forEach(el => {
        const speed = parseFloat(el.dataset.spin || '0');
        const phase = parseFloat(el.dataset.phase || '0');
        el.style.transform = `rotate(${phase + y * speed}deg)`;
      });
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  return null;
};

export default ScrollFx;
