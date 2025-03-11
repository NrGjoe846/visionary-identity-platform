
import { useState, useEffect, useRef } from "react";

interface SkillBarProps {
  label: string;
  percentage: number;
  color: string;
  delay: number;
  isVisible: boolean;
}

const SkillBar = ({ label, percentage, color, delay, isVisible }: SkillBarProps) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setWidth(percentage);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, percentage, delay]);

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="font-medium">{label}</span>
        <span className="text-white/70">{percentage}%</span>
      </div>
      <div className="h-3 w-full bg-dark/50 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};

interface SkillIconProps {
  icon: string;
  label: string;
  delay: number;
  isVisible: boolean;
}

const SkillIcon = ({ icon, label, delay, isVisible }: SkillIconProps) => {
  return (
    <div 
      className={`flex flex-col items-center transition-all duration-700 delay-${delay} ${
        isVisible ? "opacity-100" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="w-16 h-16 rounded-xl glass-card flex items-center justify-center mb-3">
        <img src={icon} alt={label} className="w-8 h-8" />
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

const Skills = () => {
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

  const technicalSkills = [
    { label: "Machine Learning", percentage: 90, color: "bg-gradient-purple" },
    { label: "Python", percentage: 85, color: "bg-gradient-purple" },
    { label: "Neural Networks", percentage: 80, color: "bg-gradient-purple" },
    { label: "NLP", percentage: 75, color: "bg-gradient-purple" },
  ];

  const softSkills = [
    { label: "Leadership", percentage: 95, color: "bg-gradient-gold" },
    { label: "Problem Solving", percentage: 90, color: "bg-gradient-gold" },
    { label: "Communication", percentage: 85, color: "bg-gradient-gold" },
    { label: "Teamwork", percentage: 90, color: "bg-gradient-gold" },
  ];

  const tools = [
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", label: "Python" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", label: "TensorFlow" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", label: "React" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", label: "HTML" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", label: "CSS" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", label: "C" },
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-20 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-bright-purple/5 blur-3xl -z-10"></div>

      <div className="container mx-auto">
        <div className="max-w-xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-gradient-purple">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-purple mx-auto mb-8 rounded-full"></div>
          <p className="text-white/70">
            My technical expertise and professional capabilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6">Technical Skills</h3>
            {technicalSkills.map((skill, index) => (
              <SkillBar
                key={index}
                label={skill.label}
                percentage={skill.percentage}
                color={skill.color}
                delay={index * 200}
                isVisible={isVisible}
              />
            ))}
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6">Soft Skills</h3>
            {softSkills.map((skill, index) => (
              <SkillBar
                key={index}
                label={skill.label}
                percentage={skill.percentage}
                color={skill.color}
                delay={index * 200 + 400}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8 text-center">
            Tools & <span className="text-gradient-purple">Technologies</span>
          </h3>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {tools.map((tool, index) => (
              <SkillIcon
                key={index}
                icon={tool.icon}
                label={tool.label}
                delay={index * 100}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
