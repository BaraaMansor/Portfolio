import { useState, useEffect, useCallback } from 'react';

const sections = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );

    const observed = ['hero', ...sections.map(s => s.id)]
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    observed.forEach(el => observer.observe(el));

    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [menuOpen]);

  const goTo = useCallback((id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          isScrolled && !menuOpen
            ? 'bg-[hsl(var(--background)/0.92)] border-b hairline'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <nav className="container-page flex h-16 items-center justify-between">
          <button
            onClick={() => goTo('hero')}
            className="flex items-center gap-3 group"
            aria-label="Back to top"
          >
            <img
              src="/myLogoGold.svg"
              alt=""
              width={18}
              height={18}
              className="transition-transform duration-300 group-hover:rotate-12"
            />
            <span className="text-sm font-medium tracking-tight hidden sm:inline">
              Al-Baraa Mansour
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => goTo(id)}
                className={`link-sweep text-sm transition-colors duration-200 ${
                  activeSection === id
                    ? 'text-gold'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                {label}
              </button>
            ))}
            <a
              href="mailto:baraadev0@gmail.com"
              className="text-sm font-medium text-primary-foreground bg-gold rounded-full px-4 py-1.5 transition-transform duration-200 hover:-translate-y-0.5"
            >
              Let's talk
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            onClick={() => setMenuOpen(open => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-px w-6 bg-foreground transition-transform duration-300 ${
                menuOpen ? 'translate-y-[3.5px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-px w-6 bg-foreground transition-transform duration-300 ${
                menuOpen ? '-translate-y-[3.5px] -rotate-45' : ''
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu: plain fixed overlay, transform/opacity only */}
      <div
        className={`fixed inset-0 z-40 bg-background md:hidden transition-opacity duration-300 ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex h-full flex-col items-start justify-center gap-2 px-8">
          {sections.map(({ id, label }, i) => (
            <button
              key={id}
              onClick={() => goTo(id)}
              tabIndex={menuOpen ? 0 : -1}
              className={`font-display text-5xl py-2 transition-[opacity,transform] duration-500 ${
                activeSection === id ? 'text-gold' : 'text-foreground'
              } ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
              style={{ transitionDelay: menuOpen ? `${100 + i * 70}ms` : '0ms' }}
            >
              {label}
            </button>
          ))}
          <a
            href="mailto:baraadev0@gmail.com"
            tabIndex={menuOpen ? 0 : -1}
            className={`text-label mt-8 transition-[opacity,transform] duration-500 ${
              menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: menuOpen ? '340ms' : '0ms' }}
          >
            baraadev0@gmail.com ↗
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
