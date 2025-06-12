import { ArrowRight, Download, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleDownloadResume = async () => {
    try {
      const resumeUrl = "https://docs.google.com/document/d/17GmTQ-Tprs2JqH4Lryh8eguUaqjvDVvnViAFtAD0ZFQ/export?format=pdf";

      const response = await fetch(resumeUrl);
      if (!response.ok) {
        throw new Error("Failed to download resume");
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const downloadLink = document.createElement("a");
      downloadLink.href = blobUrl;
      downloadLink.download = "Nehemiah_Nesanathan_Resume.pdf";

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      window.URL.revokeObjectURL(blobUrl);
      toast({
        title: "Resume downloaded!",
        description: "Thanks for your interest in my profile."
      });
    } catch (error) {
      console.error("Error downloading resume:", error);
      toast({
        title: "Download failed",
        description: "Please try again later or contact me directly.",
        variant: "destructive"
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-golden/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-silver/5 blur-3xl -z-10"></div>
      
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block rounded-full px-4 py-1.5 bg-golden/10 border border-golden/20 text-golden text-sm font-medium mb-6">
            AI Enthusiast | EdTech Innovator | Founder of UNAI TECH
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Hello, I'm <span className="text-gradient-gold">Jenish</span>
            <br />
            <span>AI Developer &</span>
            <br />
            <span className="text-gradient-gold">ML Researcher</span>
          </h1>
          
          <p className="text-silver/80 text-lg md:text-xl mb-8 max-w-xl">
            I specialize in creating cutting-edge AI solutions and educational technologies that make a difference in how we learn and interact with intelligent systems.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="button-primary flex items-center gap-2">
              View My Projects <ArrowRight size={18} />
            </a>
            <button onClick={handleDownloadResume} className="button-secondary flex items-center gap-2">
              Download Resume <Download size={18} />
            </button>
          </div>
          
          <div className="flex items-center gap-6 mt-12">
            <a href="#contact" className="flex items-center gap-2 text-white hover:text-golden transition-colors">
              <Mail size={20} /> nehemiahnesanathan@gmail.com
            </a>
          </div>
        </div>
        
        <div className={`flex justify-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
          <div className="relative">
            <div className="w-[300px] md:w-[400px] h-[400px] md:h-[500px] relative rounded-2xl overflow-hidden border border-golden/20 shadow-xl shadow-golden/10">
              <div className="absolute inset-0 bg-gradient-dark backdrop-blur-sm"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <img alt="Nehemiah Nesanathan" className="w-full h-full object-cover" src="/lovable-uploads/84957f1a-5d8b-49e0-a315-0ddc03bf0617.jpg" />
              </div>
            </div>
            
            <div className="absolute -top-5 -left-5 w-20 h-20 rounded-full bg-golden/20 backdrop-blur-md border border-golden/30 animate-pulse"></div>
            <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-silver/20 backdrop-blur-md border border-silver/30 animate-float"></div>
            <div className="absolute top-1/4 -right-10 w-14 h-14 rounded-full bg-gradient-royal opacity-70 backdrop-blur-md animate-float"></div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-silver/60 text-sm mb-2">Scroll Down</span>
        <div className="w-5 h-10 rounded-full border-2 border-silver/20 flex justify-center pt-1">
          <div className="w-1.5 h-1.5 rounded-full bg-silver/60 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
