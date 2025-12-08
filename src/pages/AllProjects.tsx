import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/Icon';
import Footer from '@/components/Footer';
import { projects, getProjectsByCategory, categories } from '@/data/projects';

const ProjectsPage = () => {
  const [filter, setFilter] = useState('all');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / 100, 1);
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProjects = getProjectsByCategory(filter);

  const handleFilterChange = useCallback((newFilter: string) => {
    setFilter(newFilter);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 border-green-400';
      case 'in-progress':
        return 'text-yellow-400 border-yellow-400';
      case 'planning':
        return 'text-blue-400 border-blue-400';
      default:
        return 'text-muted border-muted';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'planning':
        return 'Planning';
      default:
        return 'Unknown';
    }
  };

  const handleGoBack = useCallback(() => {
    window.location.href = '/';
  }, []);

  const headerHeight = 80 - scrollProgress * 20;
  const logoSize = 40 - scrollProgress * 8;
  const headerBgOpacity = scrollProgress * 0.85;
  const headerBlur = scrollProgress * 20;

  return (
    <div className="min-h-screen bg-background">
      {/* Header - same as before */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-fade-in"
        style={{
          height: `${headerHeight}px`,
          backgroundColor: `rgba(9, 10, 34, ${headerBgOpacity})`,
          backdropFilter: `blur(${headerBlur}px)`,
          borderBottom:
            scrollProgress > 0.5
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid transparent',
          boxShadow:
            scrollProgress > 0.5
              ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              : 'none',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Back Button */}
            <div className="animate-slide-left delay-200">
              <Button
                variant="ghost"
                onClick={handleGoBack}
                className="group flex items-center gap-2 hover:bg-surface/50 transition-all duration-200 border border-glass hover:border-glass-border/50"
              >
                <Icon
                  name="arrow-left"
                  className="group-hover:-translate-x-1 transition-transform duration-200"
                  size={18}
                />
                <span className="hidden sm:inline font-medium">
                  Back to Home
                </span>
                <span className="sm:hidden font-medium">Back</span>
              </Button>
            </div>

            {/* Logo */}
            <div className="flex items-center animate-slide-right delay-300">
              <img
                src="/myLogoGold.svg"
                alt="Logo"
                className="object-contain transition-all duration-300"
                style={{
                  width: `${logoSize}px`,
                  height: `${logoSize}px`,
                }}
                loading="eager"
              />
            </div>
          </div>
        </div>
      </header>

      <main style={{ paddingTop: '80px' }}>
        <section className="py-8 sm:py-12 lg:py-16 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 animate-slide-up delay-200">
                My <span className="gradient-text">Projects</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted max-w-2xl mx-auto mb-6 sm:mb-8 px-4 animate-slide-up delay-300">
                A collection of projects showcasing my skills in web development
                and software engineering. Each project represents a unique
                challenge and learning experience.
              </p>
              <div className="w-16 sm:w-24 h-1 bg-gradient-accent mx-auto rounded-full animate-fade-in delay-500" />
            </div>
          </div>
        </section>

        {/* Projects Section - Using centralized data */}
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {categories.map((category, index) => (
                  <div
                    key={category}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Button
                      variant={filter === category ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleFilterChange(category)}
                      className={`capitalize text-xs sm:text-sm transition-all duration-200 ${
                        filter === category
                          ? 'bg-gradient-accent hover:bg-gradient-accent/90 shadow-lg shadow-primary/20'
                          : 'hover:border-primary/50'
                      }`}
                    >
                      {category === 'all' ? 'All' : category}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="group animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="glass-card h-full flex flex-col overflow-hidden group-hover:shadow-xl group-hover:shadow-primary/10 transition-all duration-500">
                    {/* Project Image */}
                    <div className="relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full aspect-[4/3] rounded-lg object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 text-xs bg-surface/80 backdrop-blur-sm text-foreground rounded-full border border-glass-border capitalize">
                          {project.category}
                        </span>
                      </div>

                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-3 right-3">
                          <span className="px-2 py-1 text-xs bg-gradient-accent text-primary-foreground rounded-full font-medium">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Project Content */}
                    <div className="p-4 sm:p-6 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg sm:text-xl font-bold gradient-text flex-1 pr-2">
                          {project.title}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs rounded-full border flex-shrink-0 ${getStatusColor(
                            project.status
                          )}`}
                        >
                          {getStatusText(project.status)}
                        </span>
                      </div>

                      <p className="text-muted text-sm mb-4 flex-1 leading-relaxed">
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

                      {/* Project Links */}
                      <div className="flex gap-3">
                        {/* Conditionally render Code button only for non-private projects */}
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
                              <span className="hidden sm:inline">Code</span>
                              <span className="sm:hidden">Code</span>
                            </a>
                          </Button>
                        )}

                        {project.live !== '#' && (
                          <Button
                            variant="default"
                            size="sm"
                            asChild
                            className={`${
                              project.private ? 'flex-1' : 'flex-1'
                            } bg-gradient-accent hover:bg-gradient-accent/90 group relative`}
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
                              <span className="hidden sm:inline">
                                Live Demo
                              </span>
                              <span className="sm:hidden">Demo</span>
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-16 animate-fade-in">
                <p className="text-muted text-lg">
                  No projects found in this category.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
