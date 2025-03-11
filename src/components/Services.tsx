
import { useState, useEffect, useRef } from "react";
import { Brain, Code, GraduationCap, Database, ArrowRight } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  isVisible: boolean;
}

const ServiceCard = ({ icon, title, description, delay, isVisible }: ServiceCardProps) => {
  return (
    <div 
      className={`glass-card p-8 rounded-xl card-hover transition-all duration-700 delay-${delay} ${
        isVisible ? "opacity-100" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="w-16 h-16 rounded-xl bg-bright-purple/10 flex items-center justify-center text-bright-purple mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-white/70 mb-6">{description}</p>
      <a 
        href="#contact" 
        className="flex items-center gap-2 text-bright-purple font-medium hover:gap-3 transition-all"
      >
        Learn More <ArrowRight size={18} />
      </a>
    </div>
  );
};

const Services = () => {
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

  const services = [
    {
      icon: <Brain size={32} />,
      title: "AI Development",
      description: "Creating custom artificial intelligence solutions for diverse applications, focusing on neural networks and machine learning.",
      delay: 100,
    },
    {
      icon: <Code size={32} />,
      title: "Web Development",
      description: "Building responsive, modern websites and applications with the latest technologies and frameworks.",
      delay: 200,
    },
    {
      icon: <GraduationCap size={32} />,
      title: "EdTech Solutions",
      description: "Developing innovative educational technology solutions that enhance learning experiences and improve outcomes.",
      delay: 300,
    },
    {
      icon: <Database size={32} />,
      title: "Data Management",
      description: "Implementing effective database solutions and data management strategies for organizations of all sizes.",
      delay: 400,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-20 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-bright-purple/5 blur-3xl -z-10"></div>

      <div className="container mx-auto">
        <div className="max-w-xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My Quality <span className="text-gradient-purple">Services</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-purple mx-auto mb-8 rounded-full"></div>
          <p className="text-white/70">
            I offer a range of services focused on AI development, education,
            and technological innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={service.delay}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
