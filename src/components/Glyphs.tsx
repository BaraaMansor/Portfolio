export interface GlyphSpec {
  char: string;
  top: string;
  left?: string;
  right?: string;
  size: string;
  /** degrees of rotation per pixel scrolled; negative spins the other way */
  speed: number;
  /** starting rotation in degrees */
  phase?: number;
  opacity?: number;
  serif?: boolean;
  hideMobile?: boolean;
}

/**
 * A field of faint code glyphs scattered behind a section. ScrollFx picks
 * them up via [data-spin] and rotates them as the page scrolls past.
 */
const Glyphs = ({ items }: { items: GlyphSpec[] }) => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 overflow-hidden select-none"
  >
    {items.map((g, i) => (
      <span
        key={i}
        className={`absolute ${g.hideMobile ? 'hidden md:block' : ''}`}
        style={{
          top: g.top,
          left: g.left,
          right: g.right,
          fontSize: g.size,
          opacity: g.opacity ?? 0.1,
        }}
      >
        <span
          data-spin={g.speed}
          data-phase={g.phase ?? 0}
          className={`glyph ${g.serif ? 'font-display italic' : 'font-mono'}`}
          style={{ transform: `rotate(${g.phase ?? 0}deg)` }}
        >
          {g.char}
        </span>
      </span>
    ))}
  </div>
);

export default Glyphs;
