import { useAmmanTime } from '@/hooks/useAmmanTime';
import Glyphs from '@/components/Glyphs';

const stack = [
  'React',
  'TypeScript',
  'Next.js',
  '.NET',
  'C#',
  'Node.js',
  'PostgreSQL',
  'Tailwind CSS',
  'Angular',
  'Docker',
  'Cloudflare',
  'SQL',
];

const heroGlyphs = [
  { char: '{ }', top: '16%', right: '10%', size: '3.4rem', speed: 0.16, phase: -10, opacity: 0.13 },
  { char: '</>', top: '56%', right: '24%', size: '1.7rem', speed: -0.28, phase: 14, opacity: 0.11, hideMobile: true },
  { char: '✦', top: '30%', right: '32%', size: '1.1rem', speed: 0.22, opacity: 0.16 },
  { char: ';', top: '70%', right: '9%', size: '2.4rem', speed: 0.2, phase: 20, opacity: 0.11, serif: true },
  { char: '=>', top: '12%', left: '56%', size: '1.3rem', speed: -0.3, opacity: 0.1, hideMobile: true },
  { char: '?', top: '82%', left: '5%', size: '1.6rem', speed: 0.26, phase: 12, opacity: 0.1, serif: true },
  { char: '#', top: '40%', right: '4%', size: '1.5rem', speed: -0.2, phase: -18, opacity: 0.09 },
  { char: '&', top: '8%', right: '40%', size: '1.4rem', speed: 0.24, phase: 30, opacity: 0.09, serif: true, hideMobile: true },
  { char: '( )', top: '68%', right: '38%', size: '1.5rem', speed: -0.18, opacity: 0.09, hideMobile: true },
];

const Hero = () => {
  const time = useAmmanTime();

  return (
    <>
      <section
        id="hero"
        className="relative flex min-h-[88svh] items-center overflow-hidden pt-28 pb-12"
      >
        {/* Static dot grid, painted once, zero runtime cost */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, hsl(46 100% 80% / 0.05) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
            maskImage:
              'radial-gradient(ellipse 70% 60% at 50% 35%, black, transparent)',
          }}
        />
        <Glyphs items={heroGlyphs} />

        <div className="container-page relative">
          {/* Orbital portrait: ring text spins with scroll, photo stays still */}
          <figure
            className="enter absolute top-[16%] right-0 hidden h-72 w-72 xl:block"
            style={{ animationDelay: '0.5s' }}
          >
            {/* Outer tick dial, slow clockwise */}
            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 h-full w-full"
              data-spin="0.05"
              data-phase="0"
              aria-hidden
            >
              <circle
                cx="100"
                cy="100"
                r="94"
                fill="none"
                stroke="hsl(46 100% 80% / 0.3)"
                strokeWidth="1.5"
                strokeDasharray="1.5 8.35"
              />
            </svg>
            {/* Inner arc with a star, counter-rotating */}
            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 h-full w-full"
              data-spin="-0.09"
              data-phase="40"
              aria-hidden
            >
              <circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="hsl(46 100% 80% / 0.55)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="160 374"
              />
              <circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="hsl(46 100% 80% / 0.4)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="50 484"
                strokeDashoffset="-267"
              />
              <text
                x="100"
                y="19"
                textAnchor="middle"
                fontSize="13"
                fill="hsl(46 100% 80% / 0.7)"
              >
                ✦
              </text>
            </svg>
            <img
              src="/me.webp"
              alt="Portrait of Al-Baraa Mansour"
              width={512}
              height={512}
              className="absolute inset-10 h-52 w-52 rounded-full border border-[hsl(var(--gold)/0.35)] object-cover saturate-[0.8] transition-[filter,transform] duration-500 hover:scale-[1.03] hover:saturate-100"
            />
          </figure>

          <h1
            className="enter font-display mt-0 max-w-4xl text-[clamp(2.7rem,7.5vw,5.6rem)]"
            style={{ animationDelay: '0.05s' }}
          >
            Full-stack developer building{' '}
            <em className="accent-italic relative inline-block">
              fast, humane
              <svg
                aria-hidden
                className="absolute -bottom-[0.1em] left-0 h-[0.22em] w-full overflow-visible"
                viewBox="0 0 300 24"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  className="sig-draw"
                  d="M4 15 C 60 22, 118 6, 172 12 S 268 19, 296 9"
                  pathLength={1}
                  stroke="hsl(46 100% 80% / 0.55)"
                  strokeWidth={5}
                  strokeLinecap="round"
                />
              </svg>
            </em>{' '}
            software.
          </h1>

          <p
            className="enter mt-7 max-w-xl text-lg leading-relaxed text-muted"
            style={{ animationDelay: '0.2s' }}
          >
            I design and ship web products that load in a blink and feel
            effortless to use. Performance isn't a feature I add at the end,
            it's how I build.
          </p>

          <div
            className="enter mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: '0.35s' }}
          >
            <a href="#projects" className="btn-gold">
              See my work
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path d="M12 5v14m0 0l-6-6m6 6l6-6" />
              </svg>
            </a>
            <a href="#contact" className="btn-ghost">
              Get in touch
            </a>
          </div>

          <p
            className="enter mt-12 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs tracking-[0.18em] text-muted/70 uppercase"
            style={{ animationDelay: '0.5s' }}
          >
            <span>Amman, JO · {time}</span>
            <span className="hidden sm:inline text-gold/40">✦</span>
            <span>Currently building Echelon</span>
          </p>
        </div>
      </section>

      {/* Tech marquee: one composited transform loop */}
      <div className="marquee border-y hairline py-5" aria-hidden>
        <div className="marquee-track">
          {[...stack, ...stack].map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="flex items-center gap-12 font-display text-xl text-muted/60 whitespace-nowrap"
            >
              {tech}
              <span className="text-[0.6rem] text-gold/40">✦</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
