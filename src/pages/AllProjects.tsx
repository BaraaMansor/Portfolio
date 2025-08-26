import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Icon from '@/components/ui/Icon';
import Footer from '@/components/Footer';
import { projects, getProjectsByCategory, categories } from '@/data/projects';

const ProjectsPage = () => {
  const [filter, setFilter] = useState('all');
  const scrollY = useMotionValue(0);
  const headerHeight = useTransform(scrollY, [0, 100], [80, 60]);
  const logoSize = useTransform(scrollY, [0, 100], [40, 32]);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.set(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header - same as before */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          height: headerHeight,
          backgroundColor: useTransform(
            scrollY,
            [0, 50],
            ['rgba(9, 10, 34, 0)', 'rgba(9, 10, 34, 0.85)']
          ),
          backdropFilter: useTransform(
            scrollY,
            [0, 50],
            ['blur(0px)', 'blur(20px)']
          ),
          borderBottom: useTransform(
            scrollY,
            [0, 50],
            ['1px solid transparent', '1px solid rgba(255, 255, 255, 0.1)']
          ),
          boxShadow: useTransform(
            scrollY,
            [0, 50],
            [
              'none',
              '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            ]
          ),
        }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
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
            </motion.div>

            {/* Logo */}
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.img
                src="/myLogoGold.svg"
                alt="Logo"
                className="object-contain"
                style={{
                  width: logoSize,
                  height: logoSize,
                }}
                loading="eager"
              />
            </motion.div>
          </div>
        </div>
      </motion.header>

      <main style={{ paddingTop: '80px' }}>
        <motion.section
          className="py-8 sm:py-12 lg:py-16 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                My <span className="gradient-text">Projects</span>
              </motion.h2>
              <motion.p
                className="text-base sm:text-lg lg:text-xl text-muted max-w-2xl mx-auto mb-6 sm:mb-8 px-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                A collection of projects showcasing my skills in web development
                and software engineering. Each project represents a unique
                challenge and learning experience.
              </motion.p>
              <motion.div
                className="w-16 sm:w-24 h-1 bg-gradient-accent mx-auto rounded-full"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </div>
          </div>
        </motion.section>

        {/* Projects Section - Using centralized data */}
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              className="text-center mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {categories.map((category, index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
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
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  layout
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
                </motion.div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-muted text-lg">
                  No projects found in this category.
                </p>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
