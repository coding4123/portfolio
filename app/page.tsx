import Hero from '../components/sections/Hero';
import Projects from '../components/sections/Projects';
import Services from '../components/sections/Services';
import EducationExperience from '../components/sections/EducationExperience';
import Contact from '../components/sections/Contact';
import RevealOnScroll from '../components/ui/RevealOnScroll';
import Navbar from '../components/layout/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen text-white">
      <Navbar />
      <RevealOnScroll />
      <Hero />
      <Projects />
      <Services />
      <EducationExperience />
      <Contact />
    </main>
  );
}

