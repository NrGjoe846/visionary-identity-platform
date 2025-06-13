import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Github, ExternalLink, Play, Pause } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
}

const ProjectsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  const projects: Project[] = [
    {
      id: "1",
      title: "AI-Powered Learning Platform",
      description: "Comprehensive learning management system with AI-driven personalized learning paths and real-time analytics.",
      image: "https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "Node.js", "Python", "TensorFlow", "MongoDB"],
      githubUrl: "https://github.com/nehemiah-nesanathan",
      liveUrl: "https://demo-lms.example.com",
      category: "AI/ML"
    },
    {
      id: "2",
      title: "Real-time Sentiment Analysis",
      description: "Interactive dashboard for analyzing social media sentiment using advanced NLP techniques and BERT models.",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Python", "Streamlit", "BERT", "Pandas", "Plotly"],
      githubUrl: "https://github.com/nehemiah-nesanathan",
      liveUrl: "https://sentiment-dashboard.example.com",
      category: "Data Science"
    },
    {
      id: "3",
      title: "E-commerce with AI Recommendations",
      description: "Modern e-commerce platform featuring AI-powered product recommendations and comprehensive analytics.",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "Next.js", "TypeScript", "PostgreSQL", "AWS"],
      githubUrl: "https://github.com/nehemiah-nesanathan",
      liveUrl: "https://ecommerce-demo.example.com",
      category: "Full Stack"
    },
    {
      id: "4",
      title: "Computer Vision Object Detection",
      description: "Advanced object detection system using YOLO and custom CNN architectures for real-time processing.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Python", "OpenCV", "YOLO", "PyTorch", "Flask"],
      githubUrl: "https://github.com/nehemiah-nesanathan",
      category: "Computer Vision"
    }
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

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
      }, 5000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, projects.length]);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-golden/5 blur-3xl -z-10"></div>
      
      <div className="container mx-auto">
        <div className="max-w-xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-gradient-gold">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-royal mx-auto mb-8 rounded-full"></div>
          <p className="text-silver/70">
            Explore my latest projects with interactive carousel navigation.
          </p>
        </div>

        <div className={`relative max-w-6xl mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          {/* Main Carousel */}
          <div className="relative overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project) => (
                <div key={project.id} className="w-full flex-shrink-0">
                  <div className="grid lg:grid-cols-2 gap-8 items-center glass-card p-8 rounded-2xl">
                    {/* Project Image */}
                    <div className="relative group overflow-hidden rounded-xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-royal-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-xs rounded-full bg-golden/20 border border-golden/30 text-golden">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-bold mb-4">{project.title}</h3>
                        <p className="text-silver/80 text-lg leading-relaxed">{project.description}</p>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="text-golden font-semibold mb-3">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-sm rounded-full bg-royal-black border border-golden/20 text-golden"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-royal-black border border-silver/20 text-silver hover:bg-silver/10 transition-all duration-300 hover:scale-105"
                          >
                            <Github size={20} />
                            View Code
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-golden text-royal-black font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105"
                          >
                            <ExternalLink size={20} />
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Previous/Next Buttons */}
            <div className="flex gap-4">
              <button
                onClick={prevProject}
                className="w-12 h-12 rounded-full bg-royal-black border border-golden/20 flex items-center justify-center text-golden hover:bg-golden/10 transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextProject}
                className="w-12 h-12 rounded-full bg-royal-black border border-golden/20 flex items-center justify-center text-golden hover:bg-golden/10 transition-all duration-300 hover:scale-110"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToProject(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-golden scale-125" : "bg-silver/30 hover:bg-silver/50"
                  }`}
                />
              ))}
            </div>

            {/* Auto-play Toggle */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="w-12 h-12 rounded-full bg-royal-black border border-golden/20 flex items-center justify-center text-golden hover:bg-golden/10 transition-all duration-300 hover:scale-110"
            >
              {isAutoPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 w-full bg-royal-black/50 rounded-full h-1 overflow-hidden">
            <div 
              className="h-full bg-gradient-royal transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / projects.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsCarousel;
