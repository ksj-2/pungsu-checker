import React, { useState, useEffect, useCallback } from 'react';
import { INITIAL_FORM_DATA } from './constants.js';
import { analyzeFengShui } from './services/geminiService.js';
import FengShuiForm from './components/FengShuiForm.js';
import LoadingIndicator from './components/LoadingIndicator.js';
import ResultDisplay from './components/ResultDisplay.js';
import AdComponent from './components/AdComponent.js';

const App = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [result]);

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      try {
        window.Kakao.init('f90959efbc49398f80378e190c64ab18');
      } catch (e) {
        console.error("Kakao SDK initialization failed", e);
      }
    }
  }, []);

  const handleAnalyze = useCallback(async () => {
    const requiredFields = ['address', 'floor', 'direction', 'buildingType', 'sunlightHours', 'alleyPosition', 'balconyExpanded'];
    const missingField = requiredFields.find(field => !formData[field]);

    if (missingField) {
      setError('모든 항목을 입력해주세요.');
      return;
    }
    if (formData.balconyView.includes('강/하천') && !formData.riverShape) {
      setError('강/하천을 선택한 경우, 강 모양도 선택해야 합니다.');
      return;
    }

    setError('');
    setResult(null);
    setLoading(true);

    try {
      const analysisSteps = [
        '주변 지형과 기운 분석 중...',
        '음양오행의 조화를 살피는 중...',
        '전통 풍수 이론을 적용하는 중...',
        'AI가 최종 보고서를 작성하는 중...',
      ];
      for (const step of analysisSteps) {
        setLoadingStep(step);
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      }
      
      const report = await analyzeFengShui(formData);
      setResult(report);

    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : '분석 중 오류가 발생했습니다.';
      setError(`분석 실패: ${errorMessage}`);
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [formData]);

  const resetApp = () => {
    setFormData(INITIAL_FORM_DATA);
    setResult(null);
    setError('');
    setLoading(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-8 text-center">
        <div className="flex justify-center items-center gap-2 sm:gap-4 mb-2">
          <i data-lucide="mountain" className="w-8 h-8 sm:w-12 sm:h-12 text-emerald-400"></i>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            우리집 풍수 진단
          </h1>
          <i data-lucide="waves" className="w-8 h-8 sm:w-12 sm:h-12 text-cyan-400"></i>
        </div>
        <p className="text-sm sm:text-lg text-slate-400">150년 전통 풍수 이론 + Gemini AI 분석</p>
        <AdComponent adSlot="3450469461" />
      </header>

      <main className="w-full max-w-5xl mx-auto px-3 sm:px-4 pb-16 flex-grow">
        {!loading && !result && (
          <FengShuiForm
            formData={formData}
            setFormData={setFormData}
            onAnalyze={handleAnalyze}
            error={error}
          />
        )}
        {loading && <LoadingIndicator step={loadingStep} />}
        {result && <ResultDisplay result={result} formData={formData} onReset={resetApp} />}
      </main>

      <footer className="w-full max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-8 text-center text-slate-500 text-xs sm:text-sm border-t border-slate-800">
        <p>© 2025 우리집 풍수 진단. Gemini AI 기반 실제 데이터 분석</p>
      </footer>
    </div>
  );
};

export default App;