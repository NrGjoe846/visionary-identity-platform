
import { useState, useEffect, useRef } from "react";

interface StatItemProps {
  value: number;
  label: string;
  suffix: string;
  delay: number;
  isVisible: boolean;
}

const StatItem = ({ value, label, suffix, delay, isVisible }: StatItemProps) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isVisible) return;
    
    let start = 0;
    const duration = 2000; // ms
    const interval = 50; // ms
    const step = value / (duration / interval);
    
    const timer = setTimeout(() => {
      const counter = setInterval(() => {
        start += step;
        setCount(Math.min(Math.floor(start), value));
        
        if (start >= value) {
          clearInterval(counter);
        }
      }, interval);
      
      return () => clearInterval(counter);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [isVisible, value, delay]);
  
  return (
    <div className={`text-center transition-all duration-700 delay-${delay} ${isVisible ? "opacity-100" : "opacity-0 translate-y-8"}`}>
      <div className="text-4xl md:text-5xl font-bold mb-2">
        <span className="text-gradient-purple">{count}</span>
        <span className="text-gradient-purple">{suffix}</span>
      </div>
      <p className="text-white/60 font-medium">{label}</p>
    </div>
  );
};

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
  
  const stats = [
    { value: 600, label: "Students Trained", suffix: "+", delay: 100 },
    { value: 10, label: "Workshops Conducted", suffix: "+", delay: 200 },
    { value: 5, label: "AI Projects", suffix: "+", delay: 300 },
    { value: 4, label: "Years as School Leader", suffix: "", delay: 400 },
  ];
  
  return (
    <div ref={sectionRef} className="py-16 bg-dark/50 backdrop-blur-md">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={stat.delay}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
