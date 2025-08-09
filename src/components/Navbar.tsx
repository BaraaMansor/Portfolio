import { useState, useEffect, useCallback } from 'react';
import { useMotionValue, useTransform, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero');

  // Use useMotionValue for scroll-based animations (no re-renders)
  const scrollY = useMotionValue(0);
  const navOpacity = useTransform(scrollY, [0, 20], [0, 0.8]);
  const navBlur = useTransform(scrollY, [0, 20], [0, 20]);

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: 0.3,
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const elements = sections.map(section =>
      document.getElementById(section.id)
    );

    elements.forEach(el => {
      if (el) observer.observe(el);
    });

    // Update motion value instead of state (no re-renders)
    const handleScroll = () => {
      scrollY.set(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      elements.forEach(el => {
        if (el) observer.unobserve(el);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 w-full z-50 transition-colors duration-300"
      style={{
        backgroundColor: useTransform(
          scrollY,
          [0, 20],
          ['rgba(9, 10, 34, 0)', 'rgba(9, 10, 34, 0.8)']
        ),
        backdropFilter: useTransform(
          scrollY,
          [0, 20],
          ['blur(0px)', 'blur(20px)']
        ),
        boxShadow: useTransform(
          scrollY,
          [0, 20],
          ['none', '0 4px 6px -1px rgba(0, 0, 0, 0.1)']
        ),
      }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="text-2xl font-bold gradient-text cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            <img
              src="/myLogoGold.svg"
              alt="Al-Baraa Logo"
              className="h-8 w-auto"
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            {sections.map(section => (
              <Button
                key={section.id}
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection(section.id)}
                className={`nav-button transition-colors duration-200 ${
                  activeSection === section.id
                    ? 'nav-button-active'
                    : 'nav-button-inactive'
                }`}
                data-active={activeSection === section.id}
              >
                {section.label}
              </Button>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {sections.map(section => (
                    <SheetClose asChild key={section.id}>
                      <Button
                        variant="ghost"
                        size="lg"
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full justify-start transition-colors duration-200 ${
                          activeSection === section.id
                            ? 'nav-button-active'
                            : 'nav-button-inactive'
                        }`}
                        data-active={activeSection === section.id}
                      >
                        {section.label}
                      </Button>
                    </SheetClose>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
