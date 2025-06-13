import { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-royal-black z-50 flex items-center justify-center transition-opacity duration-500 ${
      progress >= 100 ? 'opacity-0' : 'opacity-100'
    }`}>
      <div className="text-center">
        {/* Logo Animation */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-royal flex items-center justify-center mb-4 animate-pulse">
            <span className="text-2xl font-bold text-royal-black">N</span>
          </div>
          <h2 className="text-2xl font-bold text-gradient-gold">Nehemiah Nesanathan</h2>
          <p className="text-silver/70 mt-2">AI Developer & ML Researcher</p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="w-full bg-royal-black/50 rounded-full h-2 mb-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-royal transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-golden text-sm">{Math.round(progress)}%</p>
        </div>

        {/* Loading Text */}
        <div className="mt-8">
          <div className="flex items-center justify-center gap-1">
            <span className="text-silver/70">Loading</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-golden rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1 h-1 bg-golden rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1 h-1 bg-golden rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
