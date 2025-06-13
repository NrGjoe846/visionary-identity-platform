import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import SkillsInteractive from "@/components/SkillsInteractive";
import Contact from "@/components/Contact";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import InteractiveBackground from "@/components/InteractiveBackground";
import ThemeToggle from "@/components/ThemeToggle";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingActionButton from "@/components/FloatingActionButton";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-royal-black min-h-screen relative">
      <LoadingScreen />
      <InteractiveBackground />
      <ScrollProgress />
      <ThemeToggle />
      <FloatingActionButton />
      
      <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        <Hero />
        <About />
        <Stats />
        <Services />
        <ProjectsCarousel />
        <Experience />
        <Education />
        <SkillsInteractive />
        
        {/* Enhanced Contact Section */}
        <section id="contact" className="relative py-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-golden/5 blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-silver/5 blur-3xl -z-10"></div>

          <div className="container mx-auto">
            <div className="max-w-xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Get In <span className="text-gradient-gold">Touch</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-royal mx-auto mb-8 rounded-full"></div>
              <p className="text-silver/70">
                Let's discuss your next project or collaboration opportunity.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
              <Contact />
              <ContactForm />
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
