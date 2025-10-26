import React from 'react';

const LoadingIndicator = ({ step }) => {
  return (
    <section id="loading-section">
      <div className="mt-6 sm:mt-8 p-5 sm:p-6 bg-slate-800 rounded-lg border border-slate-700">
        <h3 className="text-lg sm:text-xl font-semibold text-center text-emerald-400 mb-5 sm:mb-6">AI 정밀 분석 중</h3>
        <div className="flex items-center justify-center gap-3">
          <i data-lucide="loader-2" className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 animate-spin"></i>
          <span id="loading-step" className="text-slate-300 text-sm sm:text-base">{step}</span>
        </div>
      </div>
    </section>
  );
};

export default LoadingIndicator;