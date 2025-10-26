import React, { useState } from 'react';
import { DIRECTIONS, VIEW_OPTIONS, SUNLIGHT_OPTIONS, ALLEY_OPTIONS, RIVER_SHAPE_OPTIONS, TERRAIN_OPTIONS, BALCONY_EXPANDED_OPTIONS } from '../constants.js';
import AdComponent from './AdComponent.js';

const RadioGroup = ({ name, options, selectedValue, onChange, renderOption }) => (
  <div className="space-y-2">
    {options.map((opt, index) => {
      const isChecked = selectedValue === opt.value;
      return (
        <label key={index} className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-colors active:scale-98 ${isChecked ? 'bg-emerald-900/30 border-emerald-500' : 'bg-slate-900 border-slate-600 hover:border-slate-500'}`}>
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={isChecked}
            onChange={(e) => onChange(e.target.value)}
            className="w-5 h-5 flex-shrink-0 text-emerald-500 bg-slate-700 border-slate-500 focus:ring-emerald-500"
          />
          {renderOption(opt)}
        </label>
      );
    })}
  </div>
);

const CheckboxGroup = ({ options, selectedValues, onChange }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {options.map((option) => {
            const isSelected = selectedValues.includes(option);
            return (
                <button
                    key={option}
                    type="button"
                    onClick={() => onChange(option)}
                    className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-md border transition-colors text-xs sm:text-sm active:scale-95 ${isSelected ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-slate-900 border-slate-600 hover:border-emerald-400'}`}
                >
                    {option}
                </button>
            );
        })}
    </div>
);


const FengShuiForm = ({ formData, setFormData, onAnalyze, error }) => {
  const [showBalconyTip, setShowBalconyTip] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRadioChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleMultiSelect = (field, value) => {
    setFormData(prev => {
        const currentValues = prev[field];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];
        const newState = { ...prev, [field]: newValues };

        if (field === 'balconyView' && !newValues.includes('강/하천')) {
            newState.riverShape = '';
        }

        return newState;
    });
  };

  return (
    <section id="form-section">
      <form id="main-form" className="bg-slate-800/50 p-4 sm:p-6 rounded-lg shadow-lg border border-slate-700 space-y-4 sm:space-y-5">
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-2 text-slate-300">주소</label>
          <div className="relative">
            <i data-lucide="map-pin" className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-5 sm:h-5"></i>
            <input name="address" value={formData.address} onChange={handleChange} type="text" placeholder="예) 서울특별시 종로구 세종대로 209"
                   className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 bg-slate-900 border border-slate-600 rounded-md focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm sm:text-base"/>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-2 text-slate-300">층수</label>
            <input name="floor" value={formData.floor} onChange={handleChange} type="number" placeholder="예) 7" min="1" max="200"
                   className="w-full px-3 sm:px-4 py-3 sm:py-3.5 bg-slate-900 border border-slate-600 rounded-md focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm sm:text-base"/>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-2 text-slate-300">건물 유형</label>
            <select name="buildingType" value={formData.buildingType} onChange={handleChange} className="w-full px-3 sm:px-4 py-3 sm:py-3.5 bg-slate-900 border border-slate-600 rounded-md focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm sm:text-base">
              <option value="">선택하세요</option>
              <option value="아파트">아파트</option>
              <option value="오피스텔">오피스텔</option>
              <option value="빌라/다세대">빌라/다세대</option>
              <option value="단독주택">단독주택</option>
            </select>
          </div>
        </div>
        
        <div>
            <label className="text-xs sm:text-sm font-semibold text-slate-300 mb-2 block">거실 방향</label>
            <RadioGroup
                name="direction"
                options={DIRECTIONS}
                selectedValue={formData.direction}
                onChange={(value) => handleRadioChange('direction', value)}
                renderOption={(opt) => <span className="text-xs sm:text-sm text-slate-200">{opt.label}</span>}
            />
        </div>

        <div>
            <div className="flex justify-between items-center mb-2">
                <label className="block text-xs sm:text-sm font-semibold text-slate-300">거실 창문에서 보이는 것 (다중 선택)</label>
                <button type="button" onClick={() => setShowBalconyTip(!showBalconyTip)} className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300">
                    <i data-lucide="sparkles" className="w-3.5 h-3.5 sm:w-4 sm:h-4"></i><span>풍수 Tip</span>
                </button>
            </div>
            {showBalconyTip && (
                 <div className="bg-cyan-900/20 p-3 rounded-md border border-cyan-400/30 mb-3 text-xs text-cyan-200/80 space-y-2">
                    <p className="font-bold text-cyan-300">💡 왜 거실 기준인가요?</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>거실은 집의 중심이자, 기운이 가장 많이 드나드는 곳입니다.</li>
                        <li>가족 모두의 운에 영향을 미치므로 풍수에서 가장 중요하게 봅니다.</li>
                    </ul>
                </div>
            )}
            <p className="text-xs text-slate-400 mb-2 sm:mb-3">가장 큰 창문 기준</p>
            <CheckboxGroup options={VIEW_OPTIONS} selectedValues={formData.balconyView} onChange={(value) => handleMultiSelect('balconyView', value)} />
        </div>

        {formData.balconyView.includes('강/하천') && (
            <div id="river-shape-section">
                <label className="block text-xs sm:text-sm font-semibold mb-2 text-slate-300">🌊 강/하천이 집을 어떻게 감싸나요?</label>
                <RadioGroup
                    name="riverShape"
                    options={RIVER_SHAPE_OPTIONS}
                    selectedValue={formData.riverShape}
                    onChange={(value) => handleRadioChange('riverShape', value)}
                    renderOption={(opt) => (
                        <>
                            <div className="flex-grow" dangerouslySetInnerHTML={{ __html: opt.icon || '' }} />
                            <span className="text-xs sm:text-sm text-slate-200 flex-grow text-right">{opt.label}</span>
                        </>
                    )}
                />
            </div>
        )}

        <div>
            <label className="block text-xs sm:text-sm font-semibold mb-2 text-slate-300">하루 햇빛 시간</label>
            <RadioGroup
                name="sunlightHours"
                options={SUNLIGHT_OPTIONS}
                selectedValue={formData.sunlightHours}
                onChange={(value) => handleRadioChange('sunlightHours', value)}
                renderOption={(opt) => <span className="text-xs sm:text-sm text-slate-200">{opt.label}</span>}
            />
        </div>

        <div>
            <label className="block text-xs sm:text-sm font-semibold mb-2 text-slate-300">집의 위치</label>
            <RadioGroup
                name="alleyPosition"
                options={ALLEY_OPTIONS}
                selectedValue={formData.alleyPosition}
                onChange={(value) => handleRadioChange('alleyPosition', value)}
                renderOption={(opt) => (
                    <>
                        <div className="flex-grow" dangerouslySetInnerHTML={{ __html: opt.icon || '' }} />
                        <span className="text-xs sm:text-sm text-slate-200 flex-grow text-right">{opt.label}</span>
                    </>
                )}
            />
        </div>
        
        <div>
            <label className="block text-xs sm:text-sm font-semibold mb-2 text-slate-300">집터 지형 (다중 선택)</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TERRAIN_OPTIONS.map(option => {
                     const isSelected = formData.terrain.includes(option);
                     return (
                        <button key={option} type="button" onClick={() => handleMultiSelect('terrain', option)} className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-md border transition-colors text-xs sm:text-sm active:scale-95 ${isSelected ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-slate-900 border-slate-600 hover:border-emerald-400'}`}>
                           {option}
                        </button>
                    )
                })}
            </div>
        </div>

        <div>
            <label className="block text-xs sm:text-sm font-semibold mb-2 text-slate-300">베란다 확장 여부</label>
             <div className="grid grid-cols-2 gap-2 sm:gap-4">
                 {BALCONY_EXPANDED_OPTIONS.map(opt => {
                    const isChecked = formData.balconyExpanded === opt.value;
                    return (
                        <label key={opt.value} className={`flex items-center justify-center gap-2 p-3 sm:p-3.5 rounded-md border cursor-pointer transition-colors active:scale-95 ${isChecked ? 'bg-emerald-900/30 border-emerald-500' : 'bg-slate-900 border-slate-600 hover:border-slate-500'}`}>
                            <input type="radio" name="balconyExpanded" value={opt.value} checked={isChecked} onChange={() => handleRadioChange('balconyExpanded', opt.value)} className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 bg-slate-700 border-slate-500 focus:ring-emerald-500" />
                            <span className="text-xs sm:text-sm text-slate-200">{opt.value}</span>
                        </label>
                    )
                })}
            </div>
        </div>

        <div>
          <button type="button" onClick={onAnalyze}
                  className="w-full py-4 sm:py-4.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-md hover:opacity-90 active:scale-98 transition-all text-base sm:text-lg shadow-lg">
            풍수 감정 시작
          </button>
           <a href="https://www.shinhanlife.co.kr/hp/cdhg0130.do"
             className="mt-3 block w-full text-center py-4 sm:py-4.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md active:scale-98 transition-all text-base sm:text-lg shadow-lg">
            🔮 무료 운세 보러가기
          </a>
        </div>

        {error && <p className="text-red-400 text-center text-sm sm:text-base">{error}</p>}
      </form>
      
      <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-slate-800/30 rounded-lg text-center text-xs sm:text-sm text-slate-500 border border-slate-700">
        <AdComponent adSlot="4103740429" />
      </div>
    </section>
  );
};

export default FengShuiForm;