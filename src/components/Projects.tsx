import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/Icon';
import { getFeaturedProjects } from '@/data/projects';

const Projects = () => {
  const featuredProjects = getFeaturedProjects();

  const handleViewAllProjects = useCallback(() => {
    // Navigate to projects page
    window.location.href = '/projects';
  }, []);

  return (
    <motion.section
      id="projects"
      className="py-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-accent opacity-5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-accent opacity-10 rounded-full blur-3xl animate-float delay-500"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Here are some of my featured projects that showcase my skills and
              passion for development.
            </p>
            <div className="w-24 h-1 bg-gradient-accent mx-auto rounded-full mt-6"></div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                viewport={{ once: true, margin: '-50px' }}
              >
                {/* Project Card */}
                <div className="glass-card h-full flex flex-col overflow-hidden group-hover:shadow-xl group-hover:shadow-primary/10 transition-all duration-500">
                  {/* Featured Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-2 py-1 text-xs bg-gradient-accent text-primary-foreground rounded-full font-medium">
                      Featured
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
                      <h3 className="text-xl font-bold mb-3 gradient-text group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>

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
                            Code
                          </a>
                        </Button>
                      )}

                      {/* Live button - spans full width if project is private */}
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
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Projects Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
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
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
