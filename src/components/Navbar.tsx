import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // Less restrictive margins
      threshold: [0, 0.1, 0.5], // Multiple thresholds for better detection
    };

    const observer = new IntersectionObserver(entries => {
      // Find the section with the highest intersection ratio
      let maxIntersectionRatio = 0;
      let activeEntry = null;

      entries.forEach(entry => {
        if (
          entry.isIntersecting &&
          entry.intersectionRatio > maxIntersectionRatio
        ) {
          maxIntersectionRatio = entry.intersectionRatio;
          activeEntry = entry;
        }
      });

      if (activeEntry) {
        setActiveSection(activeEntry.target.id);
      }
    }, observerOptions);

    const elements = sections.map(section =>
      document.getElementById(section.id)
    );

    elements.forEach(el => {
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      elements.forEach(el => {
        if (el) observer.unobserve(el);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    // Set active state immediately for better UX
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 origin-top transition-[transform,background-color,backdrop-filter,box-shadow] duration-300 py-3 ${
        isScrolled
          ? 'glass rounded-xl shadow-2xl scale-95'
          : 'bg-transparent scale-100'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="text-2xl font-bold gradient-text cursor-pointer animate-fade-in"
            onClick={() => scrollToSection('hero')}
          >
            <img
              src="/myLogoGold.svg"
              alt="Al-Baraa Logo"
              className="h-8 w-auto"
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {sections.map(section => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? 'glass' : 'ghost'}
                size="default"
                onClick={() => scrollToSection(section.id)}
                className="animate-fade-in"
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
              <SheetContent
                side="right"
                className="w-[250px] sm:w-[300px] glass-card"
                style={{
                  background:
                    'linear-gradient(135deg, hsl(238, 38%, 16%, 0.1), hsla(240, 6%, 96%, 0.05))',
                }}
              >
                <div className="flex flex-col items-center space-y-6 mt-12">
                  {sections.map(section => (
                    <SheetClose asChild key={section.id}>
                      <Button
                        variant={
                          activeSection === section.id ? 'glass' : 'ghost'
                        }
                        size="lg"
                        onClick={() => scrollToSection(section.id)}
                        className="w-full text-lg"
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
    </nav>
  );
};

export default Navbar;
