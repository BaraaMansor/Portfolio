import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const About = () => {
  const technologies = [
    'React',
    'HTML',
    'CSS',
    'JavaScript',
    'Figma',
    'TypeScript',
    'Node.js',
    'PostgreSQL',
    'Python',
  ];

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/BaraaMansor', icon: 'github.svg' },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/baraamansor',
      icon: 'linkedin.svg',
    },
    {
      name: 'Youtube',
      url: 'https://www.youtube.com/@AlBaraaMansor',
      icon: 'youtube.svg',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/baraadev0_/',
      icon: 'instagram.svg',
    },
    { name: 'Email', url: 'mailto:baraadev0@gmail.com', icon: 'envelope.svg' },
  ];

  return (
    <motion.section
      id="about"
      className="py-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-accent opacity-10 rounded-full blur-3xl animate-float delay-200"></div>
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
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-accent mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="glass-card">
                <h3 className="text-2xl font-bold mb-4 gradient-text">
                  My Journey
                </h3>
                <p className="text-muted leading-relaxed mb-4">
                  I am Al-Baraa Mansour, from a young age, got interested in
                  coding, excelled academically and got the chance to study
                  Software Engineering through a scholarship, which only made my
                  passion for this field grow.
                </p>
                <p className="text-muted leading-relaxed mb-4">
                  That drew the path of my goals, that is, to help people, and
                  build useful & beautiful projects. I am passionate learner,
                  and aspire to be one of the best web developers ever.
                </p>
                <p className="text-muted leading-relaxed">
                  I am always learning and growing, but through my prior
                  experience, I can help you in growing your business, through a
                  good website that will increase reach, and make it easier for
                  customers.
                </p>
              </div>

              {/* Social Links */}
              <div className="glass-card">
                <h3 className="text-xl font-bold mb-4 gradient-text">
                  Connect With Me
                </h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social, index) => (
                    <Button
                      key={social.name}
                      variant="outline"
                      size="sm"
                      className={`glow-hover animate-slide-up delay-${
                        index * 100
                      }`}
                      asChild
                    >
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <img
                          src={`/${social.icon}`}
                          alt={social.name}
                          width={24}
                          height={24}
                          className="h-5 w-5"
                        />
                        <span className="ml-2">{social.name}</span>
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="glass-card">
                <h3 className="text-2xl font-bold mb-6 gradient-text">
                  Technologies I Use
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {technologies.map((tech, index) => (
                    <div
                      key={tech}
                      className={`glass text-center py-4 px-2 rounded-lg glow-hover animate-slide-up delay-${
                        index * 50
                      }`}
                    >
                      <span className="font-medium text-foreground">
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div className="glass-card mt-6">
                <blockquote className="text-lg italic text-muted text-center">
                  "Using the right type of technology for the project is
                  something important to me, so I am always learning new stuff
                  to apply to different situations."
                </blockquote>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;