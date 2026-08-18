import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useAmmanTime, isAwake } from '@/hooks/useAmmanTime';
import Glyphs from '@/components/Glyphs';
import ScrambleText from '@/components/ScrambleText';

const contactGlyphs = [
  { char: '@', top: '22%', left: '10%', size: '2.8rem', speed: 0.2, phase: -8, opacity: 0.1, serif: true },
  { char: '✦', top: '12%', right: '14%', size: '1.2rem', speed: -0.24, opacity: 0.14 },
  { char: '->', top: '60%', right: '8%', size: '1.8rem', speed: 0.24, phase: 12, opacity: 0.1, hideMobile: true },
  { char: '?', top: '78%', left: '16%', size: '1.7rem', speed: 0.26, phase: -20, opacity: 0.1, serif: true },
  { char: '&', top: '44%', left: '3%', size: '1.6rem', speed: -0.2, phase: 30, opacity: 0.09, hideMobile: true },
  { char: ';', top: '84%', right: '20%', size: '2rem', speed: 0.22, opacity: 0.09, serif: true, hideMobile: true },
];

const socials = [
  { name: 'GitHub', url: 'https://github.com/BaraaMansor' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/baraamansor' },
  { name: 'YouTube', url: 'https://www.youtube.com/@AlBaraaMansor' },
  { name: 'Instagram', url: 'https://www.instagram.com/baraadev0_/' },
  { name: 'WhatsApp', url: 'https://wa.me/962795114124' },
];

const Contact = () => {
  const { ref, visible } = useScrollReveal();
  const inClass = visible ? 'is-in' : '';
  const time = useAmmanTime();
  const awake = isAwake();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="contact"
      className="relative scroll-mt-20 overflow-hidden py-20 text-center md:py-28"
    >
      <Glyphs items={contactGlyphs} />
      <div className="container-page relative">
        <ScrambleText
          text="03 / Contact"
          active={visible}
          className={`text-label reveal ${inClass}`}
        />
        <h2
          className={`font-display mx-auto mt-4 max-w-3xl text-[clamp(2.2rem,5.5vw,4rem)] reveal ${inClass}`}
          style={{ transitionDelay: '90ms' }}
        >
          Let's build something{' '}
          <em className="accent-italic">great</em> together.
        </h2>
        <p
          className={`mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted reveal ${inClass}`}
          style={{ transitionDelay: '180ms' }}
        >
          Have a project, a role, or just an idea you want to talk through? My
          inbox is always open.
        </p>

        <div
          className={`mt-10 reveal ${inClass}`}
          style={{ transitionDelay: '270ms' }}
        >
          <a
            href="mailto:baraadev0@gmail.com"
            className="link-underlined font-display text-[clamp(1.5rem,4.5vw,2.6rem)]"
          >
            baraadev0@gmail.com
          </a>
        </div>

        <p
          className={`mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.18em] text-muted/70 reveal ${inClass}`}
          style={{ transitionDelay: '360ms' }}
        >
          <span className="flex items-center gap-2">
            <span
              className={`dot-pulse inline-block h-2 w-2 rounded-full ${
                awake ? 'bg-emerald-400' : 'bg-gold'
              }`}
            />
            {awake ? 'Available now' : 'Away, replies within 24h'}
          </span>
          <span className="text-gold/40">✦</span>
          <span>Amman, JO · {time}</span>
          <span className="text-gold/40">✦</span>
          <a href="tel:+962795114124" className="hover:text-foreground transition-colors">
            +962 79 511 4124
          </a>
        </p>

        <div
          className={`mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 reveal ${inClass}`}
          style={{ transitionDelay: '450ms' }}
        >
          {socials.map(social => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-sweep text-sm text-muted transition-colors hover:text-foreground"
            >
              {social.name} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
