import React, { useEffect, useState } from 'react';
import AdComponent from './AdComponent.js';
import ScoreGauge from './ScoreGauge.js';
import ShareButtons from './ShareButtons.js';

const typeConfig = {
  positive: {
    icon: 'check-circle',
    scoreIcon: 'arrow-up',
    prefix: '💡',
    textColor: 'text-emerald-400',
    borderColor: 'border-emerald-900/30',
    bgColor: 'bg-emerald-900/50',
    reasonTextColor: 'text-emerald-200/80',
    reasonBgColor: 'bg-emerald-900/20',
  },
  negative: {
    icon: 'alert-triangle',
    scoreIcon: 'arrow-down',
    prefix: '⚠️',
    textColor: 'text-red-400',
    borderColor: 'border-red-900/30',
    bgColor: 'bg-red-900/50',
    reasonTextColor: 'text-red-200/80',
    reasonBgColor: 'bg-red-900/20',
  },
  solution: {
    icon: 'shield-alert',
    scoreIcon: 'lightbulb',
    prefix: '💡',
    textColor: 'text-yellow-400',
    borderColor: 'border-yellow-900/30',
    bgColor: 'bg-yellow-900/50',
    reasonTextColor: 'text-yellow-200/80',
    reasonBgColor: 'bg-yellow-900/20',
  }
};

const AnalysisSection = ({ title, items, type }) => {
  const [expanded, setExpanded] = useState(null);

  if (!items || items.length === 0) return null;

  const currentConfig = typeConfig[type];

  return (
    <div>
      <h3 className={`text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-slate-200 flex items-center gap-2`}>
        <i data-lucide={currentConfig.icon} className={`w-5 h-5 sm:w-6 sm:h-6 ${currentConfig.textColor}`}></i>
        {title}
      </h3>
      <div className="space-y-3 sm:space-y-4">
        {items.map((item, index) => {
           const isExpanded = expanded === index;
           return (
            <div key={index} className={`bg-slate-800/50 p-3 sm:p-4 rounded-lg border ${currentConfig.borderColor}`}>
              <button onClick={() => setExpanded(isExpanded ? null : index)} className="w-full flex items-start gap-3 sm:gap-4 text-left">
                <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${currentConfig.bgColor} ${currentConfig.textColor}`}>
                  <i data-lucide={currentConfig.scoreIcon} className="w-4 h-4 sm:w-5 sm:h-5"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-100 text-sm sm:text-base">
                    {item.title}
                    {type !== 'solution' && 'score' in item && (
                      <span className={`ml-2 text-xs sm:text-sm font-bold ${currentConfig.textColor}`}>
                        ({item.score > 0 ? '+' : ''}{item.score}점)
                      </span>
                    )}
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">{item.description}</p>
                </div>
                <i data-lucide="chevron-down" className={`${currentConfig.textColor} w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`}></i>
              </button>
              {isExpanded && (
                <div className={`mt-2 sm:mt-3 p-2.5 sm:p-3 ${currentConfig.reasonBgColor} rounded-lg ml-11 sm:ml-14`}>
                    <p className={`text-xs sm:text-sm ${currentConfig.reasonTextColor}`}>{currentConfig.prefix} {item.reason}</p>
                </div>
              )}
            </div>
           )
        })}
      </div>
    </div>
  );
};


const ResultDisplay = ({ result, formData, onReset }) => {
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [result]);
  
  return (
    <section id="result-section">
      <div className="space-y-6 sm:space-y-8">
        <div className="bg-slate-800 p-5 sm:p-8 rounded-lg border border-slate-700">
          <p className="text-center text-slate-400 mb-3 sm:mb-4 text-xs sm:text-sm truncate">{formData.address}</p>
          <p className="text-center text-slate-400 mb-4 sm:mb-6 text-xs sm:text-sm">{`${formData.floor}층 ${formData.direction} ${formData.buildingType}`}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            <ScoreGauge score={result.totalScore} />
            <div className="text-center sm:text-left">
              <div className="text-5xl sm:text-6xl mb-2">{result.emoji}</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{result.grade}</h2>
            </div>
          </div>
        </div>

        <ShareButtons result={result} />

        <div>
          <a href="https://www.shinhanlife.co.kr/hp/cdhg0130.do"
             className="block w-full text-center py-4 sm:py-4.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md active:scale-98 transition-all text-base sm:text-lg shadow-lg">
            🔮 무료 운세 보러가기
          </a>
          <p className="mt-2 text-xs text-slate-400 text-center">외부 사이트로 이동합니다.</p>
        </div>

        <div className="p-3 sm:p-4 bg-slate-800/30 rounded-lg text-center text-xs sm:text-sm text-slate-500 border border-slate-700">
            <AdComponent adSlot="4103740429" />
        </div>
        
        <div className="p-3 sm:p-4 bg-slate-800/30 rounded-lg text-center text-xs sm:text-sm text-slate-500 border border-slate-700">
            <AdComponent adSlot="4464482511" />
        </div>

        <AnalysisSection title="이 집의 좋은 점" items={result.positiveItems} type="positive" />
        <AnalysisSection title="주의할 점" items={result.negativeItems} type="negative" />
        <AnalysisSection title="기운을 보강하는 비보책" items={result.solutions} type="solution" />

        <div className="p-4 sm:p-6 bg-slate-800/30 rounded-lg text-center text-xs sm:text-sm text-slate-500 border border-slate-700">
          <AdComponent adSlot="9447953480" isMultiplex={true} />
        </div>

        <div className="text-center">
          <button onClick={onReset} className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-bold rounded-md hover:opacity-90 active:scale-98 transition-all text-sm sm:text-base">
            다른 주소로 새로 분석하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResultDisplay;