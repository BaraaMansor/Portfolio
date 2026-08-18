import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollFx from '@/components/ScrollFx';
import CursorGlow from '@/components/CursorGlow';
import { usePageTitle } from '@/hooks/usePageTitle';

const Index = () => {
  usePageTitle('Al-Baraa Mansour · Full-stack Developer');
  return (
  <div className="min-h-screen">
    <ScrollFx />
    <CursorGlow />
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
