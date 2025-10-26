export const INITIAL_FORM_DATA = {
  address: '',
  floor: '',
  buildingType: '',
  direction: '',
  balconyView: [],
  riverShape: '',
  sunlightHours: '',
  alleyPosition: '',
  terrain: [],
  balconyExpanded: '',
};

export const DIRECTIONS = [
  { value: '남향', label: '남향 (낮 12-2시에 해가 정면)' },
  { value: '동향', label: '동향 (아침 7-9시에 해가 정면)' },
  { value: '서향', label: '서향 (오후 4-6시에 해가 정면)' },
  { value: '북향', label: '북향 (햇빛 거의 안 들어옴)' },
  { value: '잘모름', label: '잘 모르겠어요 (방향 점수 제외)' },
];

export const VIEW_OPTIONS = ['산', '강/하천', '공원', '건물', '도로', '아무것도 안보임'];

export const SUNLIGHT_OPTIONS = [
  { value: '거의없음', label: '거의 없음 (1시간 미만)' },
  { value: '1-2시간', label: '1-2시간' },
  { value: '3시간이상', label: '3시간 이상 (이상적!)' },
];

export const ALLEY_OPTIONS = [
    { value:'큰길가', label:'큰 길가', icon:'<svg viewBox="0 0 80 50" class="w-full h-12"><path d="M0 25 H80" stroke="#475569" stroke-width="4"/><path d="M32.5 30 h15 v20 h-15z M32.5 30 L40 22 L47.5 30" fill="#14B8A6" stroke="#14B8A6" stroke-width="2" stroke-linejoin="round"/></svg>' },
    { value:'골목중간', label:'골목 중간', icon:'<svg viewBox="0 0 80 50" class="w-full h-12"><path d="M0 25 H80" stroke="#475569" stroke-width="4"/><path d="M32.5 30 h15 v20 h-15z M32.5 30 L40 22 L47.5 30" fill="#14B8A6" stroke="#14B8A6" stroke-width="2" stroke-linejoin="round"/><path d="M2.5 30 h15 v20 h-15z M2.5 30 L10 22 L17.5 30" fill="none" stroke="#64748B" stroke-width="2" stroke-linejoin="round"/><path d="M62.5 30 h15 v20 h-15z M62.5 30 L70 22 L77.5 30" fill="none" stroke="#64748B" stroke-width="2" stroke-linejoin="round"/></svg>' },
    { value:'교차로모퉁이', label:'T자/교차로 모퉁이', icon:'<svg viewBox="0 0 80 50" class="w-full h-12"><path d="M0 25 H80 M40 0 V50" stroke="#475569" stroke-width="4"/><path d="M52.5 30 h15 v20 h-15z M52.5 30 L60 22 L67.5 30" fill="#14B8A6" stroke="#14B8A6" stroke-width="2" stroke-linejoin="round"/></svg>' },
    { value:'큰길T자', label:'T자형 도로 끝 (정면)', icon:'<svg viewBox="0 0 80 50" class="w-full h-12"><path d="M0 25 H80 M40 25 V50" stroke="#475569" stroke-width="4"/><path d="M32.5 0 h15 v20 h-15z M32.5 0 L40 -8 L47.5 0" fill="#F87171" stroke="#F87171" stroke-width="2" stroke-linejoin="round"/></svg>' },
    { value:'y자형도로', label:'Y자형 도로 (가위 살)', icon:'<svg viewBox="0 0 80 50" class="w-full h-12"><path d="M40 50 V25 L10 0 M40 25 L70 0" stroke="#475569" stroke-width="4" /><path d="M32.5 10 h15 v20 h-15z M32.5 10 L40 2 L47.5 10" fill="#F87171" stroke="#F87171" stroke-width="2" stroke-linejoin="round"/></svg>'},
    { value:'굽은도로바깥', label:'굽은 도로 바깥쪽 (반궁 살)', icon:'<svg viewBox="0 0 80 50" class="w-full h-12"><path d="M0 50 C 40 -10, 40 -10, 80 50" stroke="#475569" stroke-width="4" fill="none"/><path d="M32.5 0 h15 v20 h-15z M32.5 0 L40 -8 L47.5 0" fill="#F87171" stroke="#F87171" stroke-width="2" stroke-linejoin="round"/></svg>'},
    { value:'막다른끝', label:'막다른 골목 끝', icon:'<svg viewBox="0 0 80 50" class="w-full h-12"><path d="M0 25 H60 M60 5 V45" stroke="#475569" stroke-width="4"/><path d="M12.5 30 h15 v20 h-15z M12.5 30 L20 22 L27.5 30" fill="#14B8A6" stroke="#14B8A6" stroke-width="2" stroke-linejoin="round"/></svg>' }
];

export const RIVER_SHAPE_OPTIONS = [
  { value:'궁수', label:'집을 감싸는 모양 (궁수)', icon:'<svg viewBox="0 0 80 50" class="w-full h-10"><path d="M0 0 C 40 60, 40 60, 80 0" stroke="#38BDF8" stroke-width="4" fill="none"/><path d="M32.5 30 h15 v20 h-15z M32.5 30 L40 22 L47.5 30" fill="#14B8A6" stroke="#14B8A6" stroke-width="2" stroke-linejoin="round"/></svg>' },
  { value:'반궁수', label:'집을 등지는 모양 (반궁수)', icon:'<svg viewBox="0 0 80 50" class="w-full h-10"><path d="M0 50 C 40 -10, 40 -10, 80 50" stroke="#38BDF8" stroke-width="4" fill="none"/><path d="M32.5 0 h15 v20 h-15z M32.5 0 L40 -8 L47.5 0" fill="#F87171" stroke="#F87171" stroke-width="2" stroke-linejoin="round"/></svg>' }
];

export const TERRAIN_OPTIONS = ['평지', '비탈', '골짜기', '언덕'];

export const BALCONY_EXPANDED_OPTIONS = [{ value: '예' }, { value: '아니오' }];