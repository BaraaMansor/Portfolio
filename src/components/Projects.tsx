import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Coming Soon',
      description: 'Coming Soon',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      image: '/prj-placeholder.png',
      github: '#',
      live: '#',
      featured: true,
    },
    {
      id: 2,
      title: 'Coming Soon',
      description: 'Coming Soon',
      technologies: ['React', 'TypeScript', 'Firebase', 'Material-UI'],
      image: '/prj-placeholder.png',
      github: '#',
      live: '#',
      featured: false,
    },
    {
      id: 3,
      title: 'Coming Soon',
      description: 'Coming Soon',
      technologies: ['JavaScript', 'CSS3', 'Weather API', 'Chart.js'],
      image: '/prj-placeholder.png',
      github: '#',
      live: '#',
      featured: false,
    },
    {
      id: 4,
      title: 'Coming Soon',
      description: 'Coming Soon',
      technologies: ['React', 'Python', 'D3.js', 'MongoDB'],
      image: '/prj-placeholder.png',
      github: '#',
      live: '#',
      featured: true,
    },
  ];

  return (
    <motion.section
      id="projects"
      className="py-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-accent opacity-5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-accent opacity-10 rounded-full blur-3xl animate-float delay-500"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              My <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Here are some of the projects I've worked on. Each one represents
              a unique challenge and learning experience.
            </p>
            <div className="w-24 h-1 bg-gradient-accent mx-auto rounded-full mt-6"></div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`glass-card group hover:bg-surface/60 transition-all duration-500 ${
                  project.featured ? 'lg:grid-cols-2' : ''
                } ${index % 2 === 0 ? 'lg:grid-cols-2' : 'lg:grid-cols-2'}`}
              >
                <div
                  className={`grid ${
                    index % 2 === 0 ? 'lg:grid-cols-2' : 'lg:grid-cols-2'
                  } gap-6 items-center`}
                >
                  {/* Project Image */}
                  <div
                    className={`${
                      index % 2 === 0 ? 'order-1' : 'order-2 lg:order-1'
                    } overflow-hidden rounded-lg`}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      width={512}
                      height={256}
                      className="w-full h-64 object-scale-down bg-surface group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Project Content */}
                  <div
                    className={`${
                      index % 2 === 0 ? 'order-2' : 'order-1 lg:order-2'
                    } space-y-4`}
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-bold gradient-text">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <span className="px-2 py-1 text-xs bg-gradient-accent text-primary-foreground rounded-full font-medium">
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="text-muted leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map(tech => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm bg-surface/50 text-foreground rounded-full border border-glass-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Project Links */}
                    <div className="flex gap-4 pt-2">
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          Code
                        </a>
                      </Button>

                      <Button variant="default" size="sm" asChild>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          Live Demo
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View More Projects */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button variant="glass" size="lg">
              View More Projects
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
