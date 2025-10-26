import React, { useEffect, useState } from 'react';

const ScoreGauge = ({ score }) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const animationDuration = 1000;
    const frameRate = 60;
    const totalFrames = (animationDuration / 1000) * frameRate;
    let currentFrame = 0;

    const counter = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      const newScore = Math.round(score * progress);
      setDisplayScore(newScore);
      if (currentFrame === totalFrames) {
        clearInterval(counter);
        setDisplayScore(score);
      }
    }, animationDuration / totalFrames);

    return () => clearInterval(counter);
  }, [score]);

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  let colorClass = 'text-emerald-400';
  if (score < 40) colorClass = 'text-red-400';
  else if (score < 60) colorClass = 'text-yellow-400';
  else if (score < 80) colorClass = 'text-cyan-400';

  return (
    <div className="scale-90 sm:scale-100">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full" viewBox="0 0 120 120">
          <circle
            className="text-slate-700"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
          />
          <circle
            className={`transform -rotate-90 origin-center transition-all duration-1000 ease-out ${colorClass}`}
            style={{ strokeDashoffset: offset, transitionProperty: 'stroke-dashoffset' }}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
          />
        </svg>
        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-colors duration-500 ${colorClass}`}>
          <span className="text-5xl font-bold">{displayScore}</span>
          <span className="text-lg">점</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreGauge;