
import { ArrowRight, Download, Briefcase, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-bright-purple/10 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-bright-purple/5 blur-3xl -z-10"></div>
      
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block rounded-full px-4 py-1.5 bg-bright-purple/10 border border-bright-purple/20 text-bright-purple text-sm font-medium mb-6">
            AI Enthusiast | EdTech Innovator | Founder of UNAI TECH
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Hello, I'm <span className="text-gradient-purple">Nehemiah</span>
            <br />
            <span>AI Developer &</span>
            <br />
            <span className="text-gradient-gold">ML Researcher</span>
          </h1>
          
          <p className="text-white/80 text-lg md:text-xl mb-8 max-w-xl">
            I specialize in creating cutting-edge AI solutions and educational technologies that make a difference in how we learn and interact with intelligent systems.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="button-primary flex items-center gap-2">
              View My Projects <ArrowRight size={18} />
            </a>
            <a href="#" className="button-secondary flex items-center gap-2">
              Download Resume <Download size={18} />
            </a>
          </div>
          
          <div className="flex items-center gap-6 mt-12">
            <a 
              href="#contact" 
              className="flex items-center gap-2 text-white hover:text-bright-purple transition-colors"
            >
              <Mail size={20} /> nehemiahnesanathan@gmail.com
            </a>
          </div>
        </div>
        
        {/* Right content - profile image with animation */}
        <div className={`flex justify-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
          <div className="relative">
            <div className="w-[300px] md:w-[400px] h-[400px] md:h-[500px] relative rounded-2xl overflow-hidden border border-bright-purple/20 shadow-xl shadow-bright-purple/10">
              <div className="absolute inset-0 bg-gradient-card backdrop-blur-sm"></div>
              
              {/* Placeholder for profile image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/5ddceec4-71cf-4821-b213-469128d3e7ff.png"
                  alt="Nehemiah Nesanathan" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-5 -left-5 w-20 h-20 rounded-full bg-bright-purple/20 backdrop-blur-md border border-bright-purple/30 animate-pulse"></div>
            <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-bright-purple/20 backdrop-blur-md border border-bright-purple/30 animate-float"></div>
            <div className="absolute top-1/4 -right-10 w-14 h-14 rounded-full bg-gradient-gold opacity-70 backdrop-blur-md animate-float"></div>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-white/60 text-sm mb-2">Scroll Down</span>
        <div className="w-5 h-10 rounded-full border-2 border-white/20 flex justify-center pt-1">
          <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
