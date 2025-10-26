import React, { useEffect } from 'react';

const LoadingIndicator = ({ step }) => {
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-slate-800/50 p-8 sm:p-12 rounded-lg shadow-lg border border-slate-700 max-w-md w-full">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-slate-600 border-t-emerald-400 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <i data-lucide="sparkles" className="w-8 h-8 text-emerald-400"></i>
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-emerald-400">풍수 분석 중...</h3>
            <p className="text-sm text-slate-400">{step}</p>
          </div>
          
          <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
