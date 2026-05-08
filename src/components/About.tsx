import { useCallback } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const About = () => {
  const { ref, visible } = useScrollReveal();
  const cls = (animClass: string) => (visible ? animClass : 'opacity-0');

  const skills = [
    {
      category: 'Frontend',
      technologies: [
        'Angular',
        'React',
        'Next.js',
        'TypeScript',
        'JavaScript',
        'Tailwind CSS',
        'Sass',
        'HTML',
      ],
      icon: '🎨',
    },
    {
      category: 'Backend',
      technologies: ['C#', '.NET', 'SQL', 'Node.js', 'Restful API'],
      icon: '⚙️',
    },
    {
      category: 'Tools & Others',
      technologies: ['Git', 'Cloudflare', 'Figma', 'Docker'],
      icon: '🛠️',
    },
  ];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="about"
      className="py-20 relative overflow-hidden"
    >
      {/* Background Elements - CSS animations only */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-accent opacity-5 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 ${cls('animate-slide-up')}`}>
            <p className="text-xs font-mono text-primary/50 tracking-[0.25em] uppercase mb-4">
              01 / About
            </p>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-accent mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-6 glass-card ${cls('animate-slide-left delay-200')}`}
            >
              <p className="text-lg text-muted leading-relaxed">
                Hi! I'm <span className="gradient-text">Al-Baraa</span>, a
                passionate full-stack developer with a love for creating
                innovative web solutions. I specialize in modern web
                technologies and enjoy bringing ideas to life through clean,
                efficient code.
              </p>

              <p className="text-lg text-muted leading-relaxed">
                My journey in web development started with curiosity and has
                evolved into a passion for building user-friendly applications
                that make a difference. I'm always eager to learn new
                technologies and tackle challenging problems.
              </p>

              <p className="text-lg text-muted leading-relaxed">
                When I'm not coding, you can find me exploring new technologies,
                or sharing knowledge with the developer community by making
                courses and content.
              </p>
            </div>

            <div
              className={`space-y-6 ${cls('animate-slide-right delay-300')}`}
            >
              <h3 className="text-2xl font-bold text-center lg:text-left mb-8">
                Skills & Technologies
              </h3>

              <div className="space-y-6">
                {skills.map((skillGroup, index) => (
                  <div
                    key={skillGroup.category}
                    className={`glass-card p-6 space-y-4 ${cls('animate-slide-up')}`}
                    style={
                      visible
                        ? { animationDelay: `${0.4 + index * 0.1}s` }
                        : undefined
                    }
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{skillGroup.icon}</span>
                      <h4 className="text-xl font-semibold gradient-text">
                        {skillGroup.category}
                      </h4>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {skillGroup.technologies.map(tech => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm bg-surface/50 text-foreground rounded-full border border-glass-border hover:border-primary/50 hover:text-primary hover:shadow-[0_0_10px_rgba(255,229,161,0.18)] transition-all cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
