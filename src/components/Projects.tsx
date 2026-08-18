import { Link } from 'react-router-dom';
import { getFeaturedProjects, projects } from '@/data/projects';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Glyphs from '@/components/Glyphs';
import ScrambleText from '@/components/ScrambleText';

const projectGlyphs = [
  { char: '[ ]', top: '3%', left: '4%', size: '2.1rem', speed: 0.2, phase: -6, opacity: 0.11, hideMobile: true },
  { char: '✦', top: '2%', right: '7%', size: '1rem', speed: 0.26, opacity: 0.14 },
  { char: '</>', top: '30%', right: '3%', size: '1.8rem', speed: -0.2, phase: 10, opacity: 0.1 },
  { char: ';', top: '52%', left: '2%', size: '2.2rem', speed: 0.24, opacity: 0.09, serif: true, hideMobile: true },
  { char: '=>', top: '70%', right: '4%', size: '1.4rem', speed: -0.26, phase: -20, opacity: 0.1, hideMobile: true },
  { char: '$', top: '88%', left: '8%', size: '1.7rem', speed: 0.22, phase: 16, opacity: 0.1, serif: true },
  { char: '+', top: '16%', left: '48%', size: '1.3rem', speed: -0.3, opacity: 0.09, hideMobile: true },
];

const categoryLabel: Record<string, string> = {
  fullstack: 'Full-stack',
  frontend: 'Frontend',
  backend: 'Backend',
  mobile: 'Mobile',
};

const FeaturedRow = ({
  project,
  index,
}: {
  project: ReturnType<typeof getFeaturedProjects>[number];
  index: number;
}) => {
  const { ref, visible } = useScrollReveal();
  const inClass = visible ? 'is-in' : '';
  const imageRight = index % 2 === 1;

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className="grid items-center gap-8 border-t hairline py-10 md:grid-cols-12 md:gap-12 md:py-12"
    >
      <a
        href={project.live !== '#' ? project.live : undefined}
        target="_blank"
        rel="noopener noreferrer"
        className={`img-frame block aspect-[16/10] md:col-span-7 reveal ${inClass} ${
          imageRight ? 'md:order-last' : ''
        }`}
      >
        <img
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          width={1200}
          height={750}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top"
        />
      </a>

      <div
        className={`md:col-span-5 reveal ${inClass}`}
        style={{ transitionDelay: '120ms' }}
      >
        <ScrambleText
          text={`0${index + 1} / ${categoryLabel[project.category] ?? project.category}`}
          active={visible}
          className="text-label"
        />
        <h3 className="font-display mt-3 text-3xl md:text-4xl">
          {project.title}
        </h3>
        <p className="mt-2 flex items-center gap-2 text-xs text-muted">
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full ${
              project.status === 'completed' ? 'bg-emerald-400' : 'bg-gold'
            }`}
          />
          {project.status === 'in-progress' ? 'In progress' : 'Shipped'}
        </p>
        <p className="mt-4 leading-relaxed text-muted">{project.description}</p>
        <p className="mt-4 font-mono text-xs tracking-wide text-muted/70">
          {project.technologies.join(' / ')}
        </p>
        <div className="mt-6 flex items-center gap-6">
          {project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underlined font-medium"
            >
              Visit live ↗
            </a>
          )}
          {!project.private && project.github !== '#' && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-sweep text-muted hover:text-foreground transition-colors"
            >
              Source ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

const Projects = () => {
  const featured = getFeaturedProjects();
  const { ref, visible } = useScrollReveal();
  const inClass = visible ? 'is-in' : '';

  return (
    <section
      id="projects"
      className="relative scroll-mt-20 overflow-hidden py-16 md:py-24"
    >
      <Glyphs items={projectGlyphs} />
      <div className="container-page relative">
        <div ref={ref as React.RefObject<HTMLDivElement>}>
          <ScrambleText
            text="02 / Selected work"
            active={visible}
            className={`text-label reveal ${inClass}`}
          />
          <h2
            className={`font-display mt-4 mb-10 max-w-2xl text-[clamp(2rem,4.5vw,3.2rem)] reveal ${inClass}`}
            style={{ transitionDelay: '90ms' }}
          >
            Things I've <em className="accent-italic">shipped</em>.
          </h2>
        </div>

        {featured.map((project, index) => (
          <FeaturedRow key={project.id} project={project} index={index} />
        ))}

        <div className="border-t hairline pt-10 text-center">
          <Link
            to="/projects"
            className="link-sweep inline-flex items-center gap-2 text-lg font-medium"
          >
            Browse all {projects.length} projects
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
