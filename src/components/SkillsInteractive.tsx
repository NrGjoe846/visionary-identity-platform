import { useState, useEffect, useRef } from "react";
import { Code, Brain, Database, Globe, Lightbulb, Users, ChevronRight } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  category: string;
  description: string;
  projects: number;
}

const SkillsInteractive = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const skills: Skill[] = [
    { name: "Python", level: 95, category: "programming", description: "Advanced proficiency in Python for AI/ML development", projects: 25 },
    { name: "JavaScript", level: 90, category: "programming", description: "Full-stack JavaScript development", projects: 30 },
    { name: "TypeScript", level: 85, category: "programming", description: "Type-safe development for large applications", projects: 20 },
    { name: "React", level: 92, category: "frontend", description: "Modern React with hooks and context", projects: 28 },
    { name: "Node.js", level: 88, category: "backend", description: "Server-side JavaScript development", projects: 22 },
    { name: "TensorFlow", level: 90, category: "ai", description: "Deep learning and neural networks", projects: 15 },
    { name: "PyTorch", level: 85, category: "ai", description: "Research-focused deep learning", projects: 12 },
    { name: "MongoDB", level: 82, category: "database", description: "NoSQL database design and optimization", projects: 18 },
    { name: "PostgreSQL", level: 80, category: "database", description: "Relational database management", projects: 16 },
    { name: "AWS", level: 75, category: "cloud", description: "Cloud infrastructure and deployment", projects: 10 },
    { name: "Docker", level: 78, category: "devops", description: "Containerization and deployment", projects: 14 },
    { name: "Machine Learning", level: 93, category: "ai", description: "ML algorithms and model development", projects: 20 },
  ];

  const categories = [
    { id: "all", name: "All Skills", icon: <Code size={20} /> },
    { id: "programming", name: "Programming", icon: <Code size={20} /> },
    { id: "frontend", name: "Frontend", icon: <Globe size={20} /> },
    { id: "backend", name: "Backend", icon: <Database size={20} /> },
    { id: "ai", name: "AI/ML", icon: <Brain size={20} /> },
    { id: "database", name: "Database", icon: <Database size={20} /> },
    { id: "cloud", name: "Cloud", icon: <Lightbulb size={20} /> },
    { id: "devops", name: "DevOps", icon: <Users size={20} /> },
  ];

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

    return () => observer.disconnect();
  }, []);

  const filteredSkills = selectedCategory === "all" 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const getSkillColor = (level: number) => {
    if (level >= 90) return "from-green-400 to-green-600";
    if (level >= 80) return "from-blue-400 to-blue-600";
    if (level >= 70) return "from-yellow-400 to-yellow-600";
    return "from-red-400 to-red-600";
  };

  return (
    <section ref={sectionRef} id="skills-interactive" className="relative py-20 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-golden/5 blur-3xl -z-10"></div>
      
      <div className="container mx-auto">
        <div className="max-w-xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Interactive <span className="text-gradient-gold">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-royal mx-auto mb-8 rounded-full"></div>
          <p className="text-silver/70">
            Explore my technical expertise with interactive skill visualization.
          </p>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-golden text-royal-black scale-105"
                  : "bg-royal-black border border-golden/20 text-golden hover:bg-golden/10 hover:scale-105"
              }`}
            >
              {category.icon}
              <span className="hidden sm:inline">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className={`glass-card p-6 rounded-xl transition-all duration-700 hover:transform hover:scale-105 cursor-pointer ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{skill.name}</h3>
                <span className="text-golden font-semibold">{skill.level}%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-royal-black/50 rounded-full h-3 mb-4 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${getSkillColor(skill.level)} rounded-full transition-all duration-1000 ease-out relative`}
                  style={{ 
                    width: isVisible ? `${skill.level}%` : '0%',
                    transitionDelay: `${index * 100 + 500}ms`
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>

              {/* Skill Details */}
              <div className={`transition-all duration-300 ${
                hoveredSkill === skill.name ? "opacity-100 max-h-32" : "opacity-70 max-h-16"
              }`}>
                <p className="text-silver/70 text-sm mb-2">{skill.description}</p>
                <div className="flex items-center justify-between text-xs text-golden">
                  <span>{skill.projects} projects</span>
                  <ChevronRight size={14} className={`transition-transform duration-300 ${
                    hoveredSkill === skill.name ? "rotate-90" : ""
                  }`} />
                </div>
              </div>

              {/* Hover Effect */}
              {hoveredSkill === skill.name && (
                <div className="absolute inset-0 bg-golden/5 rounded-xl pointer-events-none transition-opacity duration-300"></div>
              )}
            </div>
          ))}
        </div>

        {/* Skills Summary */}
        <div className={`mt-16 grid md:grid-cols-3 gap-6 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-golden mb-2">
              {skills.length}
            </div>
            <p className="text-silver/70">Technical Skills</p>
          </div>
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-golden mb-2">
              {Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length)}%
            </div>
            <p className="text-silver/70">Average Proficiency</p>
          </div>
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-golden mb-2">
              {skills.reduce((acc, skill) => acc + skill.projects, 0)}
            </div>
            <p className="text-silver/70">Total Projects</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsInteractive;
