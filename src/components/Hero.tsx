import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / 300, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProjects = useCallback(() => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollToContact = useCallback(() => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden transition-all duration-300"
      style={{
        opacity: 1 - scrollProgress,
        transform: `scale(${1 - scrollProgress * 0.2})`,
      }}
    >
      {/* Animated background elements - use CSS animations instead of JS */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-accent opacity-20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-accent opacity-10 rounded-full blur-3xl animate-float delay-300"></div>
      </div>

      <div className="container mx-auto px-6 pt-12 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className="mb-8">
            <div className="w-40 h-40 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-gradient-accent rounded-full blur-lg opacity-50 animate-pulse-glow"></div>
              <img
                src="/my-image.JPG"
                alt="Al-Baraa Mansour"
                width={200}
                height={200}
                className="relative w-full h-full object-cover rounded-full border-4 border-glass-border glass backdrop-blur-xs"
              />
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="gradient-text">Al-Baraa</span>
          </h1>

          <h2 className="text-2xl md:text-4xl font-semibold text-muted mb-6">
            Full-stack Web Developer
          </h2>

          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
            Creating responsive websites for different markets, providing
            valuable coverage for any business. I am a Software Engineer that
            loves to create stuff!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-20">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                variant="hero"
                size="xl"
                onClick={scrollToProjects}
                className="group"
              >
                View Projects
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
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

              <Button variant="glass" size="xl" onClick={scrollToContact}>
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
