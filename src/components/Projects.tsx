
import { useState, useEffect, useRef } from "react";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  delay: number;
  isVisible: boolean;
  image: string;
  link?: string;
  github?: string;
}

const ProjectCard = ({ 
  title, 
  description, 
  technologies, 
  delay, 
  isVisible,
  image,
  link,
  github
}: ProjectCardProps) => {
  return (
    <div 
      className={`group relative overflow-hidden rounded-xl card-hover transition-all duration-700 delay-${delay} ${
        isVisible ? "opacity-100" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Background image with overlay */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 bg-dark-purple/40 backdrop-blur-sm group-hover:backdrop-blur-0 transition-all duration-300"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent opacity-80"></div>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-bright-purple transition-colors">{title}</h3>
        <p className="text-white/70 text-sm mb-4 line-clamp-2 group-hover:line-clamp-none transition-all">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, techIndex) => (
            <span 
              key={techIndex}
              className="px-2 py-1 bg-bright-purple/10 text-bright-purple text-xs rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          {link && (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white/80 hover:text-white text-sm transition-colors"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
          {github && (
            <a 
              href={github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white/80 hover:text-white text-sm transition-colors"
            >
              <Github size={16} /> Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState("all");

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
      description: "A comprehensive AI platform that integrates multiple data modalities including text, images, and audio for enhanced analysis and predictions.",
      technologies: ["Python", "TensorFlow", "NLP", "Computer Vision"],
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2965&auto=format&fit=crop&ixlib=rb-4.0.3",
      category: "ai",
      delay: 100,
    },
    {
      title: "Handwritten Numerical Digits Recognition",
      description: "Neural network-based system capable of recognizing handwritten numerical digits with high accuracy using deep learning algorithms.",
      technologies: ["Machine Learning", "Neural Networks", "Python", "OpenCV"],
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3",
      category: "ai",
      delay: 200,
    },
    {
      title: "Gamified Learning App (Eve)",
      description: "An interactive educational platform that uses gamification to enhance student engagement and learning outcomes through challenges and rewards.",
      technologies: ["React", "Firebase", "Game Design", "Education"],
      image: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3",
      category: "edtech",
      delay: 300,
    },
    {
      title: "Financial News Sentiment Analysis",
      description: "FinBERT-based system that analyzes sentiment in financial news articles to provide insights for investment decisions and market trends.",
      technologies: ["NLP", "FinBERT", "Python", "Finance"],
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3",
      category: "ai",
      delay: 400,
    },
  ];

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "ai", label: "AI & ML" },
    { id: "edtech", label: "EdTech" },
  ];

  const filteredProjects = activeTab === "all" 
    ? projects 
    : projects.filter(project => project.category === activeTab);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-20 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-bright-purple/5 blur-3xl -z-10"></div>

      <div className="container mx-auto">
        <div className="max-w-xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My Recent <span className="text-gradient-purple">Works</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-purple mx-auto mb-8 rounded-full"></div>
          <p className="text-white/70 mb-8">
            Explore my portfolio of projects ranging from AI solutions to educational technologies.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-6 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                  activeTab === category.id
                    ? "bg-bright-purple text-white"
                    : "bg-bright-purple/10 text-white/70 hover:text-white hover:bg-bright-purple/20"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              image={project.image}
              delay={project.delay}
              isVisible={isVisible}
              link="#"
              github="#"
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#contact" 
            className="button-primary inline-flex items-center gap-2"
          >
            Let's Build Something Together <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
