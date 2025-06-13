import { useState, useEffect, useRef } from "react";
import { Github, ExternalLink, Calendar, Tag, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  image: string;
  date: string;
  featured: boolean;
}

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Mock projects data
    const mockProjects: Project[] = [
      {
        id: "1",
        title: "AI-Powered Learning Management System",
        description: "Comprehensive LMS with AI-driven personalized learning paths and real-time analytics.",
        longDescription: "A full-stack learning management system that uses machine learning algorithms to create personalized learning experiences. Features include adaptive content delivery, progress tracking, and intelligent recommendations.",
        technologies: ["React", "Node.js", "Python", "TensorFlow", "MongoDB", "Socket.io"],
        category: "Full Stack",
        githubUrl: "https://github.com/nehemiah-nesanathan",
        liveUrl: "https://demo-lms.example.com",
        image: "https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800",
        date: "2024-01-15",
        featured: true
      },
      {
        id: "2",
        title: "Real-time Sentiment Analysis Dashboard",
        description: "Interactive dashboard for analyzing social media sentiment using advanced NLP techniques.",
        longDescription: "A comprehensive sentiment analysis tool that processes real-time social media data using BERT and custom neural networks. Includes data visualization and trend analysis.",
        technologies: ["Python", "Streamlit", "BERT", "Pandas", "Plotly", "Twitter API"],
        category: "Data Science",
        githubUrl: "https://github.com/nehemiah-nesanathan",
        liveUrl: "https://sentiment-dashboard.example.com",
        image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpg?auto=compress&cs=tinysrgb&w=800",
        date: "2023-12-20",
        featured: true
      },
      {
        id: "3",
        title: "Computer Vision Object Detection",
        description: "Advanced object detection system using YOLO and custom CNN architectures.",
        longDescription: "State-of-the-art object detection system capable of real-time processing. Implements custom YOLO architecture with transfer learning for improved accuracy.",
        technologies: ["Python", "OpenCV", "YOLO", "PyTorch", "Flask", "Docker"],
        category: "Machine Learning",
        githubUrl: "https://github.com/nehemiah-nesanathan",
        image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
        date: "2023-11-10",
        featured: false
      },
      {
        id: "4",
        title: "E-commerce Platform with AI Recommendations",
        description: "Modern e-commerce platform featuring AI-powered product recommendations and analytics.",
        longDescription: "Full-featured e-commerce platform with machine learning-based recommendation engine, inventory management, and comprehensive analytics dashboard.",
        technologies: ["React", "Next.js", "TypeScript", "PostgreSQL", "Stripe", "AWS"],
        category: "Full Stack",
        githubUrl: "https://github.com/nehemiah-nesanathan",
        liveUrl: "https://ecommerce-demo.example.com",
        image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
        date: "2023-10-05",
        featured: true
      },
      {
        id: "5",
        title: "Blockchain Voting System",
        description: "Secure and transparent voting system built on blockchain technology.",
        longDescription: "Decentralized voting application ensuring transparency and security through blockchain technology. Features voter authentication and real-time result tracking.",
        technologies: ["Solidity", "Web3.js", "React", "Ethereum", "MetaMask", "IPFS"],
        category: "Blockchain",
        githubUrl: "https://github.com/nehemiah-nesanathan",
        image: "https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=800",
        date: "2023-09-15",
        featured: false
      },
      {
        id: "6",
        title: "Neural Network Visualization Tool",
        description: "Interactive tool for visualizing and understanding neural network architectures.",
        longDescription: "Educational tool that helps students and researchers visualize neural network structures, training processes, and decision boundaries in real-time.",
        technologies: ["JavaScript", "D3.js", "Python", "Flask", "TensorFlow.js"],
        category: "Data Visualization",
        githubUrl: "https://github.com/nehemiah-nesanathan",
        liveUrl: "https://nn-visualizer.example.com",
        image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800",
        date: "2023-08-20",
        featured: false
      }
    ];

    setProjects(mockProjects);
    setFilteredProjects(mockProjects);
  }, []);

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
    if (selectedCategory === "all") {
      setFilteredProjects(projects);
    } else if (selectedCategory === "featured") {
      setFilteredProjects(projects.filter(project => project.featured));
    } else {
      setFilteredProjects(projects.filter(project => project.category === selectedCategory));
    }
  }, [selectedCategory, projects]);

  const categories = ["all", "featured", ...Array.from(new Set(projects.map(project => project.category)))];

  return (
    <div className="bg-royal-black min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-silver/5 blur-3xl -z-10"></div>
        
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            My <span className="text-gradient-gold">Portfolio</span>
          </h1>
          <p className="text-xl text-silver/80 max-w-2xl mx-auto mb-12">
            A showcase of my technical projects spanning AI, web development, and innovative solutions.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Filter className="text-golden" size={20} />
            <span className="text-silver/70">Filter by category:</span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-golden text-royal-black"
                    : "bg-royal-black border border-golden/20 text-golden hover:bg-golden/10"
                }`}
              >
                {category === "all" ? "All Projects" : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={sectionRef} className="py-20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`glass-card rounded-xl overflow-hidden group hover:transform hover:scale-105 transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } ${project.featured ? "ring-2 ring-golden/30" : ""}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 text-xs rounded-full bg-golden/20 border border-golden/30 text-golden">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-3 py-1 text-xs rounded-full bg-silver/20 border border-silver/30 text-silver">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-royal-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-silver/60 mb-3">
                    <Calendar size={16} />
                    <span>{new Date(project.date).toLocaleDateString()}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-golden transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-silver/70 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded bg-royal-black/50 border border-golden/10 text-golden"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 text-xs rounded bg-royal-black/50 border border-golden/10 text-silver/60">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-royal-black border border-silver/20 text-silver hover:bg-silver/10 transition-all duration-300 hover:scale-105"
                      >
                        <Github size={16} />
                        <span className="text-sm">Code</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
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
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold mb-4">No projects found</h3>
              <p className="text-silver/70">Try selecting a different category.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
