import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/Icon';
import { getFeaturedProjects } from '@/data/projects';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const categoryLabel: Record<string, string> = {
  fullstack: 'Full-Stack',
  frontend: 'Frontend',
  backend: 'Backend',
  mobile: 'Mobile',
};

const Projects = () => {
  const featuredProjects = getFeaturedProjects();
  const { ref, visible } = useScrollReveal();
  const cls = (animClass: string) => (visible ? animClass : 'opacity-0');

  const handleViewAllProjects = useCallback(() => {
    window.location.href = '/projects';
  }, []);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="projects"
      className="py-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-accent opacity-5 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 ${cls('animate-slide-up')}`}>
            <p className="text-xs font-mono text-primary/50 tracking-[0.25em] uppercase mb-4">
              02 / Projects
            </p>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Here are some of my featured projects that showcase my skills and
              passion for development.
            </p>
            <div className="w-24 h-1 bg-gradient-accent mx-auto rounded-full mt-6"></div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`group ${cls('animate-slide-up')}`}
                style={visible ? { animationDelay: `${index * 0.15}s` } : undefined}
              >
                <div className="glass-card h-full flex flex-col overflow-hidden relative group-hover:scale-[1.02] group-hover:shadow-[0_16px_48px_rgba(255,229,161,0.12)] transition-all duration-500">
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-2 py-1 text-xs bg-gradient-accent text-primary-foreground rounded-full font-medium">
                      {categoryLabel[project.category] ?? project.category}
                    </span>
                  </div>

                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full aspect-[4/3] rounded-lg object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Project Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xl font-bold gradient-text">
                          {project.title}
                        </h3>
                      </div>

                      {/* Status indicator */}
                      <div className="flex items-center gap-1.5 mb-3">
                        <span
                          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            project.status === 'completed'
                              ? 'bg-green-400'
                              : 'bg-yellow-400'
                          }`}
                        />
                        <span className="text-xs text-muted capitalize">
                          {project.status === 'in-progress'
                            ? 'In Progress'
                            : 'Completed'}
                        </span>
                      </div>

                      <p className="text-muted leading-relaxed mb-4 text-sm">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map(tech => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs bg-surface/50 text-foreground rounded-full border border-glass-border hover:border-primary/50 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project Links */}
                    <div className="flex gap-3 mt-auto">
                      {!project.private && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="flex-1 group"
                        >
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            <Icon
                              name="github"
                              className="group-hover:scale-110 transition-transform"
                              size={16}
                            />
                            Code
                          </a>
                        </Button>
                      )}

                      {project.live !== '#' && (
                        <Button
                          variant="default"
                          size="sm"
                          asChild
                          className="flex-1 bg-gradient-accent hover:bg-gradient-accent/90 group relative"
                        >
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            {project.private && (
                              <Icon
                                name="lock"
                                className="opacity-70"
                                size={14}
                              />
                            )}
                            <Icon
                              name="external-link"
                              className="group-hover:scale-110 transition-transform"
                              size={16}
                            />
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Projects Button */}
          <div className={`text-center ${cls('animate-slide-up delay-500')}`}>
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-accent rounded-lg blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <Button
                variant="hero"
                size="lg"
                onClick={handleViewAllProjects}
                className="relative group bg-gradient-accent hover:bg-gradient-accent/90 text-primary-foreground font-semibold"
              >
                View All Projects
                <Icon
                  name="arrow-right"
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
