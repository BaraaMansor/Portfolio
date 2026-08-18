import { useEffect, useRef } from 'react';

/**
 * A soft gold glow that trails the pointer. Desktop-only (fine pointers),
 * a single composited element moved with transform, and the rAF loop
 * stops whenever the glow has caught up with the cursor.
 */
const CursorGlow = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Pointer-driven, so not gated behind prefers-reduced-motion:
    // it only ever moves when the user moves.
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let targetX = -9999;
    let targetY = -9999;
    let x = targetX;
    let y = targetY;
    let raf = 0;

    const loop = () => {
      x += (targetX - x) * 0.1;
      y += (targetY - y) * 0.1;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.5) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden />;
};

export default CursorGlow;
