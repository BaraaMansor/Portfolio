import { useEffect, useRef, useState } from 'react';

const CHARS = '#[]{}<>*+=_';

/**
 * Mono label that decodes into place: characters flicker through random
 * glyphs and settle left to right. Runs once, ~0.5s, plain text swaps
 * (no layout shift: the font is monospace and length never changes).
 */
const ScrambleText = ({
  text,
  active,
  className,
}: {
  text: string;
  active: boolean;
  className?: string;
}) => {
  const [display, setDisplay] = useState(text);
  const played = useRef(false);

  useEffect(() => {
    if (!active || played.current) return;
    played.current = true;

    const totalFrames = 14;
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      if (frame >= totalFrames) {
        setDisplay(text);
        clearInterval(id);
        return;
      }
      const progress = frame / totalFrames;
      setDisplay(
        text
          .split('')
          .map((ch, i) => {
            if (ch === ' ' || ch === '/') return ch;
            if (i / text.length < progress) return ch;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );
    }, 38);

    return () => clearInterval(id);
  }, [active, text]);

  return (
    <p className={className} aria-label={text}>
      <span aria-hidden>{display}</span>
    </p>
  );
};

export default ScrambleText;
