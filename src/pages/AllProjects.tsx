import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import ScrollFx from '@/components/ScrollFx';
import ScrambleText from '@/components/ScrambleText';
import { projects, getProjectsByCategory, categories } from '@/data/projects';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { usePageTitle } from '@/hooks/usePageTitle';

const categoryLabel: Record<string, string> = {
  all: 'All',
  fullstack: 'Full-stack',
  frontend: 'Frontend',
  backend: 'Backend',
};

const AllProjects = () => {
  usePageTitle('All Projects · Al-Baraa Mansour');
  const [filter, setFilter] = useState('all');
  const filtered = getProjectsByCategory(filter);
  const { ref, visible } = useScrollReveal();
  const inClass = visible ? 'is-in' : '';

  return (
    <div className="min-h-screen">
      <ScrollFx />
      <header className="container-page flex h-20 items-center justify-between">
        <Link
          to="/"
          className="link-sweep flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <span aria-hidden>←</span> Back home
        </Link>
        <img src="/myLogoGold.svg" alt="Al-Baraa Mansour" width={26} height={26} />
      </header>

      <main className="container-page pb-16">
        <section ref={ref as React.RefObject<HTMLElement>} className="pt-10 md:pt-16">
          <ScrambleText
            text="The archive"
            active={visible}
            className={`text-label reveal ${inClass}`}
          />
          <h1
            className={`font-display mt-4 text-[clamp(2.4rem,6vw,4.2rem)] reveal ${inClass}`}
            style={{ transitionDelay: '90ms' }}
          >
            All <em className="accent-italic">{projects.length}</em> projects.
          </h1>
          <p
            className={`mt-5 max-w-xl text-lg leading-relaxed text-muted reveal ${inClass}`}
            style={{ transitionDelay: '180ms' }}
          >
            Client work, side projects, and experiments. Each one taught me
            something new.
          </p>

          {/* Filters */}
          <div
            className={`mt-10 flex flex-wrap gap-x-7 gap-y-2 border-b hairline pb-4 reveal ${inClass}`}
            style={{ transitionDelay: '270ms' }}
          >
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                  filter === category
                    ? 'text-gold'
                    : 'text-muted/70 hover:text-foreground'
                }`}
                aria-pressed={filter === category}
              >
                {categoryLabel[category] ?? category}
                {filter === category && <span className="ml-1.5">✦</span>}
              </button>
            ))}
          </div>
        </section>

        {/* Grid */}
        <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(project => (
            <article
              key={project.id}
              className="card-raise flex flex-col overflow-hidden rounded-xl border hairline bg-surface/25"
            >
              <div className="img-frame aspect-[16/10] rounded-none border-0">
                <img
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  width={1200}
                  height={750}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top"
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-display text-xl">{project.title}</h2>
                  <span className="flex shrink-0 items-center gap-1.5 text-[0.68rem] uppercase tracking-wider text-muted">
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full ${
                        project.status === 'completed'
                          ? 'bg-emerald-400'
                          : 'bg-gold'
                      }`}
                    />
                    {project.status === 'in-progress' ? 'Building' : 'Shipped'}
                  </span>
                </div>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>

                <p className="mt-4 font-mono text-[0.68rem] tracking-wide text-muted/60">
                  {project.technologies.join(' / ')}
                </p>

                <div className="mt-4 flex items-center gap-5 border-t hairline pt-4 text-sm">
                  {project.live !== '#' ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underlined font-medium"
                    >
                      Visit live ↗
                    </a>
                  ) : (
                    <span className="text-muted/50">In the workshop</span>
                  )}
                  {!project.private && project.github !== '#' && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-sweep text-muted transition-colors hover:text-foreground"
                    >
                      Source ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-muted">
            Nothing in this category yet.
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AllProjects;
