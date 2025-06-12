
import { useState, useEffect, useRef } from "react";
import { Briefcase, Calendar, MapPin, Award } from "lucide-react";

interface ExperienceCardProps {
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
  type: string;
  delay: number;
  isVisible: boolean;
}

const ExperienceCard = ({
  title,
  company,
  duration,
  location,
  description,
  type,
  delay,
  isVisible
}: ExperienceCardProps) => {
  return (
    <div className={`relative pl-8 pb-12 transition-all duration-700 delay-${delay} ${isVisible ? "opacity-100" : "opacity-0 translate-y-8"}`}>
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-golden via-silver to-transparent"></div>
      
      {/* Timeline dot */}
      <div className="absolute -left-2 top-6 w-4 h-4 rounded-full bg-golden border-2 border-royal-black"></div>
      
      <div className="glass-card p-6 rounded-xl border border-golden/20 hover:shadow-xl hover:shadow-golden/10 transition-all duration-300 group hover:scale-105">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="inline-block px-3 py-1 text-xs rounded-full bg-golden/10 border border-golden/20 text-golden mb-2">
              {type}
            </span>
            <h3 className="text-xl font-bold mb-1">{title}</h3>
            <h4 className="text-golden font-medium mb-2">{company}</h4>
          </div>
          <div className="w-12 h-12 rounded-full bg-golden/10 flex items-center justify-center text-golden group-hover:scale-110 transition-transform duration-300">
            <Briefcase size={20} />
          </div>
        </div>

        <div className="flex items-center gap-4 text-silver/70 text-sm mb-4">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={16} />
            <span>{location}</span>
          </div>
        </div>

        <ul className="space-y-2">
          {description.map((item, index) => (
            <li key={index} className="text-silver/80 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-golden mt-2.5 flex-shrink-0"></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Experience = () => {
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

  const experiences = [
    {
      title: "AI/ML Research Intern",
      company: "MIT Square",
      duration: "April 2024 - Present",
      location: "Remote",
      type: "Internship",
      description: [
        "Conducted advanced research in artificial intelligence and machine learning applications",
        "Developed social media engagement analysis systems using cutting-edge AI algorithms",
        "Implemented FinBERT-based financial news sentiment analysis for market prediction",
        "Collaborated with research teams to publish findings and improve model performance"
      ],
      delay: 100,
    },
    {
      title: "Founder & CEO",
      company: "UNAI TECH",
      duration: "2023 - Present",
      location: "Chennai, India",
      type: "Entrepreneurship",
      description: [
        "Founded and led a startup focused on AI education and technology solutions",
        "Successfully trained over 600 students in AI and machine learning concepts",
        "Conducted 10+ workshops and webinars to promote AI awareness and literacy",
        "Developed innovative EdTech solutions to make AI education accessible to all"
      ],
      delay: 200,
    },
    {
      title: "Science Teacher",
      company: "Local Educational Institution",
      duration: "2023 - 2024",
      location: "Chennai, India",
      type: "Teaching",
      description: [
        "Taught science subjects to students with innovative teaching methodologies",
        "Integrated technology and AI concepts into traditional curriculum",
        "Mentored students in science projects and competitions",
        "Developed interactive learning materials and assessment tools"
      ],
      delay: 300,
    },
    {
      title: "Freelance Developer",
      company: "Various Clients",
      duration: "2022 - Present",
      location: "Remote",
      type: "Freelance",
      description: [
        "Developed custom websites and web applications for diverse clients",
        "Created EdTech solutions and learning management systems",
        "Implemented AI-powered features in client projects",
        "Provided technical consultation for startups and small businesses"
      ],
      delay: 400,
    },
  ];

  return (
    <section ref={sectionRef} id="experience" className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/3 w-[400px] h-[400px] rounded-full bg-silver/5 blur-3xl -z-10"></div>

      <div className="container mx-auto">
        <div className="max-w-xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Professional <span className="text-gradient-gold">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-royal mx-auto mb-8 rounded-full"></div>
          <p className="text-silver/70">
            My journey through various roles in AI research, entrepreneurship, and education.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={index}
              title={experience.title}
              company={experience.company}
              duration={experience.duration}
              location={experience.location}
              type={experience.type}
              description={experience.description}
              delay={experience.delay}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
