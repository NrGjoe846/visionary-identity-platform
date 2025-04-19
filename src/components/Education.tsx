import { useState, useEffect, useRef } from "react";
import { GraduationCap, Calendar, Award } from "lucide-react";
interface EducationCardProps {
  degree: string;
  institution: string;
  duration: string;
  description?: string;
  delay: number;
  isVisible: boolean;
}
const EducationCard = ({
  degree,
  institution,
  duration,
  description,
  delay,
  isVisible
}: EducationCardProps) => {
  return <div className={`glass-card p-6 rounded-xl border border-bright-purple/10 relative transition-all duration-700 delay-${delay} ${isVisible ? "opacity-100" : "opacity-0 translate-y-8"}`}>
      <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-gradient-purple flex items-center justify-center">
        <GraduationCap size={20} className="text-gold\n" />
      </div>

      <h3 className="text-xl font-bold mb-2 mt-2">{degree}</h3>
      <h4 className="text-bright-purple font-medium mb-4">{institution}</h4>

      <div className="flex items-center gap-1.5 text-white/70 text-sm mb-4">
        <Calendar size={16} />
        <span>{duration}</span>
      </div>

      {description && <p className="text-white/70">{description}</p>}
    </div>;
};
interface CertificationCardProps {
  title: string;
  issuer: string;
  date: string;
  delay: number;
  isVisible: boolean;
}
const CertificationCard = ({
  title,
  issuer,
  date,
  delay,
  isVisible
}: CertificationCardProps) => {
  return <div className={`flex items-start gap-4 p-4 rounded-xl bg-bright-purple/5 border border-bright-purple/10 transition-all duration-700 delay-${delay} ${isVisible ? "opacity-100" : "opacity-0 translate-y-8"}`}>
      <div className="w-10 h-10 rounded-full bg-bright-purple/20 flex items-center justify-center text-bright-purple">
        <Award size={20} />
      </div>
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-white/70 mb-1">{issuer}</p>
        <p className="text-xs text-white/50">{date}</p>
      </div>
    </div>;
};
const Education = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, {
      threshold: 0.1
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);
  const education = [{
    degree: "Computer Science Engineering",
    institution: "University of Technology",
    duration: "2020 - 2024",
    description: "Focused on artificial intelligence, machine learning, and data science. Participated in multiple coding competitions and AI research projects.",
    delay: 100
  }, {
    degree: "Higher Secondary Education",
    institution: "St. John's High School",
    duration: "2018 - 2020",
    description: "Specialized in Computer Science with excellent academic performance. Served as School Pupil Leader for 4 years.",
    delay: 200
  }];
  const certifications = [{
    title: "DCA Certification",
    issuer: "Nehru Yuva Kendra",
    date: "2023",
    delay: 100
  }, {
    title: "Machine Learning Specialization",
    issuer: "Coursera",
    date: "2022",
    delay: 200
  }, {
    title: "Neural Networks and Deep Learning",
    issuer: "DeepLearning.AI",
    date: "2022",
    delay: 300
  }, {
    title: "Python for Data Science",
    issuer: "IBM",
    date: "2021",
    delay: 400
  }];
  return <section ref={sectionRef} id="education" className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-bright-purple/5 blur-3xl -z-10"></div>

      <div className="container mx-auto">
        <div className="max-w-xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-gradient-purple">Education</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-purple mx-auto mb-8 rounded-full"></div>
          <p className="text-white/70">
            My academic background and professional certifications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {education.map((edu, index) => <EducationCard key={index} degree={edu.degree} institution={edu.institution} duration={edu.duration} description={edu.description} delay={edu.delay} isVisible={isVisible} />)}
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8 text-center">
            Certifications & <span className="text-gradient-purple">Achievements</span>
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, index) => <CertificationCard key={index} title={cert.title} issuer={cert.issuer} date={cert.date} delay={cert.delay} isVisible={isVisible} />)}
          </div>
        </div>
      </div>
    </section>;
};
export default Education;