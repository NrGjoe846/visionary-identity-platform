
import { useState, useEffect, useRef } from "react";
import { User, Target, Heart, Award } from "lucide-react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-golden/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-silver/5 blur-3xl -z-10"></div>

      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0 translate-x-8'}`}>
            <div className="relative">
              <div className="w-full max-w-md mx-auto relative rounded-2xl overflow-hidden border border-golden/20 shadow-xl shadow-golden/10">
                <div className="absolute inset-0 bg-gradient-dark backdrop-blur-sm"></div>
                <img 
                  alt="Nehemiah Nesanathan" 
                  className="w-full h-[500px] object-cover relative z-10" 
                  src="/lovable-uploads/84957f1a-5d8b-49e0-a315-0ddc03bf0617.jpg" 
                />
              </div>
              
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-golden/20 backdrop-blur-md border border-golden/30 animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-silver/20 backdrop-blur-md border border-silver/30 animate-float"></div>
            </div>
          </div>

          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-x-8'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About <span className="text-gradient-gold">Me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-royal mx-0 mb-8 rounded-full"></div>
            
            <p className="text-silver/80 text-lg mb-6 leading-relaxed">
              I'm Nehemiah Nesanathan, an AI enthusiast and EdTech innovator passionate about creating 
              intelligent solutions that transform how we learn and interact with technology. As the 
              founder of UNAI TECH, I've dedicated myself to making AI education accessible to everyone.
            </p>
            
            <p className="text-silver/80 text-lg mb-8 leading-relaxed">
              With over 600 students trained and 10+ workshops conducted, I believe in the power of 
              education to change lives. My expertise spans machine learning, neural networks, and 
              web development, always with a focus on practical applications that make a difference.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-golden/5 border border-golden/10">
                <div className="w-12 h-12 rounded-full bg-golden/20 flex items-center justify-center text-golden">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Leadership</h3>
                  <p className="text-sm text-silver/70">4 years as School Pupil Leader</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-silver/5 border border-silver/10">
                <div className="w-12 h-12 rounded-full bg-silver/20 flex items-center justify-center text-silver">
                  <Target size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Innovation</h3>
                  <p className="text-sm text-silver/70">AI solutions & EdTech development</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-golden/5 border border-golden/10">
                <div className="w-12 h-12 rounded-full bg-golden/20 flex items-center justify-center text-golden">
                  <Heart size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Teaching</h3>
                  <p className="text-sm text-silver/70">600+ students trained</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-silver/5 border border-silver/10">
                <div className="w-12 h-12 rounded-full bg-silver/20 flex items-center justify-center text-silver">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Entrepreneurship</h3>
                  <p className="text-sm text-silver/70">Founder of UNAI TECH</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
