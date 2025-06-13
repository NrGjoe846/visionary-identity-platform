import { useState, useEffect, useRef } from "react";

interface ProgressBarProps {
  percentage: number;
  label: string;
  color?: string;
  className?: string;
}

const ProgressBar = ({ percentage, label, color = "golden", className = "" }: ProgressBarProps) => {
  const [width, setWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (progressRef.current) {
      observer.observe(progressRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setWidth(percentage);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isVisible, percentage]);

  return (
    <div ref={progressRef} className={`mb-6 ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-off-white font-medium">{label}</span>
        <span className={`text-${color} text-sm`}>{percentage}%</span>
      </div>
      <div className="w-full bg-royal-black/50 rounded-full h-2 border border-golden/20">
        <div 
          className={`h-full bg-gradient-royal rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
