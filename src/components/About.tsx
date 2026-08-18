import { useScrollReveal } from '@/hooks/useScrollReveal';
import Glyphs from '@/components/Glyphs';
import ScrambleText from '@/components/ScrambleText';

const aboutGlyphs = [
  { char: '( )', top: '12%', right: '5%', size: '2.1rem', speed: 0.2, phase: 8, opacity: 0.11 },
  { char: '*', top: '28%', left: '3%', size: '2.6rem', speed: 0.28, opacity: 0.09, serif: true, hideMobile: true },
  { char: '✦', top: '6%', right: '30%', size: '1rem', speed: -0.24, opacity: 0.14 },
  { char: '&&', top: '74%', left: '44%', size: '1.4rem', speed: -0.22, phase: -12, opacity: 0.1, hideMobile: true },
  { char: '!', top: '86%', right: '8%', size: '1.8rem', speed: 0.26, phase: -14, opacity: 0.11, serif: true },
  { char: '~', top: '48%', right: '2%', size: '2rem', speed: -0.18, phase: 22, opacity: 0.09, hideMobile: true },
  { char: '%', top: '60%', left: '1%', size: '1.5rem', speed: 0.24, phase: 40, opacity: 0.09, hideMobile: true },
];

const skillGroups = [
  {
    category: 'Frontend',
    technologies: [
      'React',
      'Next.js',
      'Angular',
      'TypeScript',
      'Tailwind CSS',
      'Sass',
    ],
  },
  {
    category: 'Backend',
    technologies: ['C#', '.NET', 'Node.js', 'SQL', 'REST APIs'],
  },
  {
    category: 'Tools',
    technologies: ['Git', 'Docker', 'Cloudflare', 'Figma'],
  },
];

const About = () => {
  const { ref, visible } = useScrollReveal();
  const inClass = visible ? 'is-in' : '';

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="about"
      className="relative scroll-mt-20 overflow-hidden py-16 md:py-24"
    >
      <Glyphs items={aboutGlyphs} />
      <div className="container-page relative">
        <ScrambleText
          text="01 / About"
          active={visible}
          className={`text-label reveal ${inClass}`}
        />
        <h2
          className={`font-display mt-4 max-w-2xl text-[clamp(2rem,4.5vw,3.2rem)] reveal ${inClass}`}
          style={{ transitionDelay: '90ms' }}
        >
          A developer who cares how it{' '}
          <em className="accent-italic">feels</em>.
        </h2>

        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div
            className={`space-y-5 text-lg leading-relaxed text-muted md:col-span-7 reveal ${inClass}`}
            style={{ transitionDelay: '180ms' }}
          >
            <p className="text-foreground">
              Hi, I'm Al-Baraa. I build web products end to end, from the
              database schema to the last hover state, and I hold both ends to
              the same standard: it should work beautifully, and it should feel
              instant.
            </p>
            <p>
              What started as curiosity turned into a craft. These days I split
              my time between client work, my own products, and sharing what I
              learn with the developer community through courses and content.
            </p>
            <p>
              I treat slow software as a design flaw. This site ships no
              animation libraries and no heavy frameworks for effects. What
              you're feeling right now is just careful engineering.
            </p>
          </div>

          <div className="md:col-span-5">
            {skillGroups.map((group, i) => (
              <div
                key={group.category}
                className={`border-t hairline py-6 reveal ${inClass}`}
                style={{ transitionDelay: `${240 + i * 90}ms` }}
              >
                <h3 className="text-label mb-3">{group.category}</h3>
                <p className="leading-relaxed text-[0.97rem]">
                  {group.technologies.map((tech, j) => (
                    <span key={tech}>
                      {tech}
                      {j < group.technologies.length - 1 && (
                        <span className="mx-2 text-gold/40">·</span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            ))}
            <div
              className={`border-t border-b hairline py-6 reveal ${inClass}`}
              style={{ transitionDelay: '510ms' }}
            >
              <h3 className="text-label mb-3">Currently</h3>
              <p className="text-[0.97rem] text-muted">
                Building{' '}
                <span className="text-foreground">Echelon</span>, a gamified
                productivity platform where guilds compete on getting things
                done.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
