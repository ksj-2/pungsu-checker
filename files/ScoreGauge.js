import React, { useEffect, useState } from 'react';

const ScoreGauge = ({ score }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = score / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  const percentage = (animatedScore / 100) * 100;
  const rotation = (percentage / 100) * 180;

  const getColor = (score) => {
    if (score >= 80) return '#10b981'; // emerald-500
    if (score >= 60) return '#3b82f6'; // blue-500
    if (score >= 40) return '#f59e0b'; // amber-500
    return '#ef4444'; // red-500
  };

  const color = getColor(animatedScore);

  return (
    <div className="relative w-40 h-40 sm:w-48 sm:h-48">
      <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
        {/* Background arc */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="#334155"
          strokeWidth="16"
          strokeDasharray="251.2 251.2"
          strokeDashoffset="125.6"
        />
        {/* Animated arc */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke={color}
          strokeWidth="16"
          strokeDasharray="251.2 251.2"
          strokeDashoffset={251.2 - (251.2 * percentage) / 100}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-4xl sm:text-5xl font-bold" style={{ color }}>
          {animatedScore}
        </div>
        <div className="text-sm sm:text-base text-slate-400">/ 100점</div>
      </div>
    </div>
  );
};

export default ScoreGauge;
