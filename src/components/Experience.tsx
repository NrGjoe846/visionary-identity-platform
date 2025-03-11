
import { useState, useEffect, useRef } from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";

interface TimelineItemProps {
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string;
  isLeft: boolean;
  isVisible: boolean;
  delay: number;
}

const TimelineItem = ({
  title,
  company,
  duration,
  location,
  description,
  isLeft,
  isVisible,
  delay,
}: TimelineItemProps) => {
  return (
    <div
      className={`relative ${
        isLeft ? "md:flex-row-reverse" : "md:flex-row"
      } flex flex-col md:flex-row gap-8 md:gap-0 transition-all duration-700 delay-${delay} ${
        isVisible ? "opacity-100" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Timeline line */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-bright-purple/20 -z-10 transform -translate-x-1/2"></div>

      {/* Content */}
      <div className="md:w-1/2 md:px-10">
        <div className="glass-card p-6 rounded-xl border border-bright-purple/10 relative">
          {/* Arrow */}
          <div
            className={`hidden md:block absolute top-6 ${
              isLeft ? "left-0 -translate-x-full" : "right-0 translate-x-full"
            } transform rotate-45 w-4 h-4 glass-card border-l border-t border-bright-purple/10`}
          ></div>

          {/* Timeline dot */}
          <div className="absolute hidden md:flex items-center justify-center top-6 transform -translate-y-1/2 left-[-30px] md:left-auto md:right-auto md:left-[calc(100%_+_10px)] md:translate-x-0 md:left-[-30px] w-6 h-6 bg-gradient-purple rounded-full">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>

          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <h4 className="text-bright-purple font-medium mb-4">{company}</h4>

          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-1.5 text-white/70 text-sm">
              <Calendar size={16} />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/70 text-sm">
              <MapPin size={16} />
              <span>{location}</span>
            </div>
          </div>

          <p className="text-white/70">{description}</p>
        </div>
      </div>

      {/* Empty div for layout */}
      <div className="hidden md:block md:w-1/2"></div>
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
      description:
        "Conducted research on social media engagement analysis and developed a FinBERT-based financial news sentiment analysis system to provide insights for investment decisions.",
      delay: 100,
    },
    {
      title: "Founder & AI Educator",
      company: "UNAI TECH",
      duration: "2022 - Present",
      location: "India",
      description:
        "Founded an EdTech startup focused on AI education. Trained over 600 students, conducted 10+ workshops, and organized ₹1 webinars to raise awareness about artificial intelligence.",
      delay: 200,
    },
    {
      title: "Part-time Science Teacher",
      company: "Local School",
      duration: "2023",
      location: "India",
      description:
        "Taught science subjects for 3 months, developing curriculum materials and implementing innovative teaching methods to improve student engagement and understanding.",
      delay: 300,
    },
    {
      title: "Freelance Developer",
      company: "Self-employed",
      duration: "2021 - Present",
      location: "Remote",
      description:
        "Developed websites and EdTech solutions for various clients. Created custom applications focusing on educational technology and AI integration.",
      delay: 400,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-20 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-bright-purple/5 blur-3xl -z-10"></div>

      <div className="container mx-auto">
        <div className="max-w-xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-gradient-purple">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-purple mx-auto mb-8 rounded-full"></div>
          <p className="text-white/70">
            My professional journey and notable career milestones.
          </p>
        </div>

        <div className="relative space-y-12">
          {experiences.map((exp, index) => (
            <TimelineItem
              key={index}
              title={exp.title}
              company={exp.company}
              duration={exp.duration}
              location={exp.location}
              description={exp.description}
              isLeft={index % 2 === 0}
              isVisible={isVisible}
              delay={exp.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
