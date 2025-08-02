import { useCallback, useEffect, lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Spinner from '@/components/ui/spinner';

const About = lazy(() => import('@/components/About'));
const Projects = lazy(() => import('@/components/Projects'));
const Contact = lazy(() => import('@/components/Contact'));
const Footer = lazy(() => import('@/components/Footer'));

const Index = () => {
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
          setTimeout(() => {
            entry.target.classList.add('animation-complete');
          }, 800);
        }
      });
    },
    []
  );

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    const observeElements = () => {
      const animatedElements = document.querySelectorAll('[data-animate]');
      animatedElements.forEach(el => observer.observe(el));
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(observeElements);
    } else {
      setTimeout(observeElements, 0);
    }

    return () => observer.disconnect();
  }, [handleIntersection]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<Spinner />}>
          <About />
          <Projects />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={<Spinner />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
