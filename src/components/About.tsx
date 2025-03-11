
import { useState, useEffect, useRef } from "react";
import { Code, Cpu, Lightbulb, GraduationCap, Brain, Users } from "lucide-react";

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

  const skills = [
    { name: "AI & Machine Learning", icon: <Brain size={24} /> },
    { name: "Neural Networks", icon: <Cpu size={24} /> },
    { name: "Programming", icon: <Code size={24} /> },
    { name: "Education", icon: <GraduationCap size={24} /> },
    { name: "Innovation", icon: <Lightbulb size={24} /> },
    { name: "Leadership", icon: <Users size={24} /> },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-bright-purple/5 blur-3xl -z-10"></div>
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] rounded-full bg-bright-purple/10 blur-3xl -z-10"></div>

      <div className="container mx-auto">
        <div className="max-w-xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-gradient-purple">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-purple mx-auto mb-8 rounded-full"></div>
          <p className="text-white/70">
            Get to know more about my journey, skills, and passion for AI and education.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Stylized image or illustration */}
          <div 
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden border border-bright-purple/20 shadow-xl shadow-bright-purple/10 aspect-square">
              <div className="absolute inset-0 bg-gradient-card backdrop-blur-sm"></div>
              
              {/* Placeholder for another profile image or illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full bg-dark-purple/80 flex items-center justify-center">
                  <div className="relative w-3/4 h-3/4 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-purple opacity-10"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-bold text-gradient-purple">N</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-6 left-6 w-16 h-16 rounded-md bg-bright-purple/20 backdrop-blur-md border border-bright-purple/30"></div>
              <div className="absolute bottom-6 right-6 w-20 h-20 rounded-md bg-bright-purple/20 backdrop-blur-md border border-bright-purple/30 rotate-12"></div>
            </div>
          </div>

          {/* Right side - Bio */}
          <div 
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-2xl font-bold mb-6">
              AI Developer & Educational Technology Innovator
            </h3>
            <p className="text-white/80 mb-6">
              I am passionate about leveraging artificial intelligence to transform education and create innovative solutions. As the founder of UNAI TECH, I've trained over 600 students and conducted numerous workshops to promote AI awareness and education.
            </p>
            <p className="text-white/80 mb-8">
              My journey includes developing multimodal AI applications, creating handwritten digit recognition systems, and designing gamified learning experiences. I believe in the power of technology to make education more accessible, engaging, and effective.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-bright-purple/5 border border-bright-purple/10"
                >
                  <div className="text-bright-purple">{skill.icon}</div>
                  <span className="font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
