import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
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

  const sections = useMemo(
    () => [
      { id: 'hero', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'projects', label: 'Projects' },
      { id: 'contact', label: 'Contact' },
    ],
    []
  );

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

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      elements.forEach(el => {
        if (el) observer.unobserve(el);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = document.getElementById('site-nav')?.offsetHeight ?? 96;
      const targetY =
        element.getBoundingClientRect().top + window.scrollY - navHeight - 8;
      window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
    }
  }, []);

  return (
    <motion.nav
      id="site-nav"
      className="fixed inset-x-0 top-4 z-50 flex justify-center pointer-events-none transition-all duration-300"
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: -12 }}
    >
      <div className="pointer-events-auto w-full max-w-6xl px-4">
        <motion.div
          className={`rounded-2xl md:rounded-full px-3 md:px-4 py-2.5 md:py-3 flex items-center gap-3 transition-[background-color,transform,backdrop-filter,box-shadow,border-color] duration-300 ${
            isScrolled
              ? 'bg-[rgba(9,10,34,0.82)] border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl'
              : 'bg-transparent border border-transparent shadow-none backdrop-blur-0'
          }`}
          layout
        >
          <button
            className="flex items-center gap-3 rounded-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[hsl(var(--primary))] focus:ring-opacity-70 focus:ring-offset-transparent"
            onClick={() => scrollToSection('hero')}
            aria-label="Go to top"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 shadow-inner">
              <img
                src="/myLogoGold.svg"
                alt="Al-Baraa Logo"
                className="h-6 w-6"
              />
            </span>
            <span className="text-sm font-semibold tracking-tight text-foreground hidden sm:inline">
              Al-Baraa Mansor
            </span>
          </button>

          <div className="hidden md:flex flex-1 items-center justify-center gap-1">
            {sections
              .filter(section => section.id !== 'contact')
              .map(section => {
                const isActive = activeSection === section.id;
                return (
                  <Button
                    key={section.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => scrollToSection(section.id)}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-foreground bg-[rgba(255,229,161,0.12)] shadow-[0_0_0_1px_rgba(255,229,161,0.35)]'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                    }`}
                    data-active={isActive}
                  >
                    {isActive && (
                      <span
                        className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,229,161,0.25),transparent_60%)]"
                        aria-hidden
                      />
                    )}
                    <span className="relative">{section.label}</span>
                  </Button>
                );
              })}
          </div>

          <div className="hidden md:flex items-center ml-auto">
            {(() => {
              const isContactActive = activeSection === 'contact';
              return (
                <Button
                  size="sm"
                  onClick={() => scrollToSection('contact')}
                  className={`rounded-full px-5 py-2 text-sm font-semibold text-[hsl(var(--primary-foreground))] transition transform hover:-translate-y-[1px] ${
                    isContactActive
                      ? 'shadow-[0_0_0_1px_rgba(255,229,161,0.6),0_10px_30px_rgba(255,229,161,0.45)]'
                      : 'shadow-lg shadow-[rgba(255,229,161,0.28)] hover:shadow-[rgba(255,229,161,0.4)]'
                  }`}
                  style={{ background: 'var(--gradient-accent)' }}
                  data-active={isContactActive}
                >
                  Contact
                </Button>
              );
            })()}
          </div>

          <div className="md:hidden ml-auto">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full border border-white/10 hover:bg-white/10"
                  aria-label="Open menu"
                >
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
                className="w-[260px] sm:w-[320px] bg-[hsl(var(--surface))] border-l border-white/10 text-foreground"
              >
                <div className="pt-6 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 shadow-inner">
                      <img
                        src="/myLogoGold.svg"
                        alt="Al-Baraa Logo"
                        className="h-6 w-6"
                      />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-foreground">
                        Navigation
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Jump to a section
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-3">
                  {sections.map(section => {
                    const isActive = activeSection === section.id;
                    const isContact = section.id === 'contact';
                    return (
                      <SheetClose asChild key={section.id}>
                        <Button
                          variant="ghost"
                          size="lg"
                          onClick={() => scrollToSection(section.id)}
                          className={`w-full justify-start rounded-xl text-base ${
                            isContact
                              ? 'text-[hsl(var(--primary-foreground))] shadow-[rgba(255,229,161,0.28)_0_8px_24px] hover:shadow-[rgba(255,229,161,0.4)_0_10px_32px]'
                              : ''
                          } ${
                            isActive
                              ? isContact
                                ? 'shadow-[0_0_0_1px_rgba(255,229,161,0.5),0_10px_30px_rgba(255,229,161,0.45)]'
                                : 'text-foreground bg-[rgba(255,229,161,0.12)] shadow-[0_0_0_1px_rgba(255,229,161,0.35)]'
                              : isContact
                              ? 'text-muted-foreground'
                              : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                          }`}
                          style={
                            isContact
                              ? { background: 'var(--gradient-accent)' }
                              : undefined
                          }
                          data-active={isActive}
                        >
                          {section.label}
                        </Button>
                      </SheetClose>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
