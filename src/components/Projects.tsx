
import { useState, useEffect, useRef } from "react";
import { Github, ExternalLink, Brain, Calculator, Gamepad2, Code } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  icon: React.ReactNode;
  delay: number;
  isVisible: boolean;
}

const ProjectCard = ({
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
  icon,
  delay,
  isVisible
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`glass-card p-6 rounded-xl border border-golden/20 relative group transition-all duration-700 delay-${delay} ${
        isVisible ? "opacity-100" : "opacity-0 translate-y-8"
      } hover:transform hover:scale-105 hover:shadow-xl hover:shadow-golden/20`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 rounded-xl bg-golden/10 flex items-center justify-center text-golden transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>

      <p className="text-silver/70 mb-6 leading-relaxed">{description}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {technologies.map((tech, index) => (
          <span 
            key={index} 
            className="px-3 py-1 text-xs rounded-full bg-golden/10 border border-golden/20 text-golden"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-4">
        {githubUrl && (
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-royal-black border border-silver/20 text-silver hover:bg-silver/10 transition-all duration-300 hover:scale-105"
          >
            <Github size={16} />
            <span className="text-sm">Code</span>
          </a>
        )}
        {liveUrl && (
          <a 
            href={liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-golden text-royal-black font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105"
          >
            <ExternalLink size={16} />
            <span className="text-sm">Live Demo</span>
          </a>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState("all");
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

  const projects = [
    {
      title: "Multimodal AI Development",
      description: "Advanced AI system capable of processing and understanding multiple types of data inputs including text, images, and audio for comprehensive analysis.",
      technologies: ["Python", "TensorFlow", "Computer Vision", "NLP", "Neural Networks"],
      category: "ai",
      icon: <Brain size={24} />,
      delay: 100,
    },
    {
      title: "Handwritten Digit Recognition",
      description: "Machine learning model that accurately recognizes handwritten numerical digits using convolutional neural networks and deep learning techniques.",
      technologies: ["Python", "CNN", "OpenCV", "Scikit-learn", "Matplotlib"],
      category: "ml",
      icon: <Calculator size={24} />,
      delay: 200,
    },
    {
      title: "Eve - Gamified Learning App",
      description: "Interactive educational platform that gamifies the learning experience, making education more engaging and effective for students of all ages.",
      technologies: ["React", "Node.js", "MongoDB", "Game Design", "UI/UX"],
      category: "web",
      icon: <Gamepad2 size={24} />,
      delay: 300,
    },
    {
      title: "FinBERT Sentiment Analysis",
      description: "Financial news sentiment analysis tool using FinBERT for analyzing market sentiment and predicting financial trends from news articles.",
      technologies: ["FinBERT", "NLP", "Streamlit", "Financial Data", "Python"],
      category: "ai",
      icon: <Code size={24} />,
      delay: 400,
    },
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

  const filterButtons = [
    { id: "all", label: "All Projects" },
    { id: "ai", label: "AI/ML" },
    { id: "web", label: "Web Dev" },
  ];

  return (
    <section ref={sectionRef} id="projects" className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-golden/5 blur-3xl -z-10"></div>

      <div className="container mx-auto">
        <div className="max-w-xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-gradient-gold">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-royal mx-auto mb-8 rounded-full"></div>
          <p className="text-silver/70">
            A showcase of my technical expertise and innovative solutions in AI, machine learning, and web development.
          </p>
        </div>

        {/* Filter buttons */}
        <div className={`flex justify-center gap-4 mb-12 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          {filterButtons.map((button) => (
            <button
              key={button.id}
              onClick={() => setFilter(button.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === button.id
                  ? "bg-golden text-royal-black"
                  : "bg-royal-black border border-golden/20 text-golden hover:bg-golden/10"
              }`}
            >
              {button.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={`${project.title}-${filter}`}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              icon={project.icon}
              delay={project.delay}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
