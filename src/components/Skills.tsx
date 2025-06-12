
import { useState, useEffect, useRef } from "react";
import { Code, Brain, Database, Globe, Lightbulb, Users } from "lucide-react";

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  skills: string[];
  delay: number;
  isVisible: boolean;
}

const SkillCard = ({ icon, title, skills, delay, isVisible }: SkillCardProps) => {
  return (
    <div className={`glass-card p-6 rounded-xl border border-golden/20 transition-all duration-700 delay-${delay} ${
      isVisible ? "opacity-100" : "opacity-0 translate-y-8"
    } hover:transform hover:scale-105 hover:shadow-xl hover:shadow-golden/20 group`}>
      <div className="w-16 h-16 rounded-xl bg-golden/10 flex items-center justify-center text-golden mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span 
            key={index}
            className="px-3 py-1 text-sm rounded-full bg-royal-black border border-golden/20 text-golden hover:bg-golden/10 transition-colors duration-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

interface ProgressBarProps {
  skill: string;
  percentage: number;
  delay: number;
  isVisible: boolean;
}

const ProgressBar = ({ skill, percentage, delay, isVisible }: ProgressBarProps) => {
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
    <div className={`mb-6 transition-all duration-700 delay-${delay} ${
      isVisible ? "opacity-100" : "opacity-0 translate-x-8"
    }`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-off-white font-medium">{skill}</span>
        <span className="text-golden text-sm">{percentage}%</span>
      </div>
      <div className="w-full bg-royal-black/50 rounded-full h-2 border border-golden/20">
        <div 
          className="h-full bg-gradient-royal rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        ></div>
      </div>
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

  const skillCategories = [
    {
      icon: <Code size={32} />,
      title: "Programming Languages",
      skills: ["Python", "JavaScript", "TypeScript", "C", "HTML/CSS", "SQL"],
      delay: 100,
    },
    {
      icon: <Brain size={32} />,
      title: "AI & Machine Learning",
      skills: ["TensorFlow", "Neural Networks", "NLP", "Computer Vision", "Deep Learning", "FinBERT"],
      delay: 200,
    },
    {
      icon: <Globe size={32} />,
      title: "Web Development",
      skills: ["React", "Node.js", "Express", "MongoDB", "Streamlit", "REST APIs"],
      delay: 300,
    },
    {
      icon: <Database size={32} />,
      title: "Tools & Technologies",
      skills: ["Git", "Docker", "AWS", "Google Cloud", "Jupyter", "VS Code"],
      delay: 400,
    },
    {
      icon: <Lightbulb size={32} />,
      title: "Core Competencies",
      skills: ["Problem Solving", "Algorithm Design", "Data Analysis", "Research", "Innovation"],
      delay: 500,
    },
    {
      icon: <Users size={32} />,
      title: "Soft Skills",
      skills: ["Leadership", "Teaching", "Communication", "Team Management", "Public Speaking"],
      delay: 600,
    },
  ];

  const technicalSkills = [
    { skill: "Python", percentage: 90, delay: 100 },
    { skill: "Machine Learning", percentage: 85, delay: 200 },
    { skill: "React/JavaScript", percentage: 80, delay: 300 },
    { skill: "AI Research", percentage: 85, delay: 400 },
    { skill: "Database Management", percentage: 75, delay: 500 },
    { skill: "Project Management", percentage: 88, delay: 600 },
  ];

  return (
    <section ref={sectionRef} id="skills" className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-golden/5 blur-3xl -z-10"></div>
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-silver/5 blur-3xl -z-10"></div>

      <div className="container mx-auto">
        <div className="max-w-xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Skills & <span className="text-gradient-gold">Expertise</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-royal mx-auto mb-8 rounded-full"></div>
          <p className="text-silver/70">
            A comprehensive overview of my technical skills and core competencies.
          </p>
        </div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={index}
              icon={category.icon}
              title={category.title}
              skills={category.skills}
              delay={category.delay}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Technical Proficiency */}
        <div className="max-w-4xl mx-auto">
          <h3 className={`text-2xl font-bold mb-12 text-center transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-4"
          }`}>
            Technical <span className="text-gradient-gold">Proficiency</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              {technicalSkills.slice(0, 3).map((skill, index) => (
                <ProgressBar
                  key={index}
                  skill={skill.skill}
                  percentage={skill.percentage}
                  delay={skill.delay}
                  isVisible={isVisible}
                />
              ))}
            </div>
            <div>
              {technicalSkills.slice(3).map((skill, index) => (
                <ProgressBar
                  key={index}
                  skill={skill.skill}
                  percentage={skill.percentage}
                  delay={skill.delay}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
