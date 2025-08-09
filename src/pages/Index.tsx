import { useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');

          // Clean up will-change after animation
          setTimeout(() => {
            (entry.target as HTMLElement).style.willChange = 'auto';
          }, 1000);
        }
      });
    },
    []
  );

  useEffect(() => {
    // Preload critical images
    const preloadImages = () => {
      const criticalImages = ['/my-image.png', '/myLogoGold.svg'];
      criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        preloadImages();

        const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
        };

        const observer = new IntersectionObserver(
          handleIntersection,
          observerOptions
        );

        const animatedElements = document.querySelectorAll('[data-animate]');
        animatedElements.forEach(el => {
          (el as HTMLElement).style.willChange = 'opacity, transform';
          observer.observe(el);
        });

        return () => observer.disconnect();
      });
    } else {
      // Fallback for older browsers
      setTimeout(() => {
        preloadImages();
      }, 100);
    }

    // Performance monitoring
    if ('performance' in window && 'PerformanceObserver' in window) {
      try {
        const perfObserver = new PerformanceObserver(list => {
          list.getEntries().forEach(entry => {
            if (process.env.NODE_ENV === 'development') {
              console.log('Performance entry:', entry);
            }
          });
        });

        perfObserver.observe({ entryTypes: ['measure', 'navigation'] });

        return () => perfObserver.disconnect();
      } catch (e) {
        console.log('Performance monitoring not available');
      }
    }
  }, [handleIntersection]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>


      <Footer />
    </div>
  );
};

export default Index;
