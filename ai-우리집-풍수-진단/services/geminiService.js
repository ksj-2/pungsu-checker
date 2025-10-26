import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    totalScore: { type: Type.INTEGER, description: "풍수지리 총점 (0-100 사이)." },
    grade: { type: Type.STRING, description: "한 줄 요약 등급 (예: 천하제일 명당)." },
    emoji: { type: Type.STRING, description: "등급을 나타내는 단일 이모지." },
    positiveItems: {
      type: Type.ARRAY,
      description: "이 집의 좋은 점 목록.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "긍정적 요소의 제목." },
          description: { type: Type.STRING, description: "자세한 설명." },
          reason: { type: Type.STRING, description: "풍수지리학적 이유." },
          score: { type: Type.INTEGER, description: "이 항목으로 인한 점수 가산점." },
        },
        required: ["title", "description", "reason", "score"],
      },
    },
    negativeItems: {
      type: Type.ARRAY,
      description: "이 집의 주의할 점 목록.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "부정적 요소의 제목." },
          description: { type: Type.STRING, description: "자세한 설명." },
          reason: { type: Type.STRING, description: "풍수지리학적 이유." },
          score: { type: Type.INTEGER, description: "이 항목으로 인한 점수 감점 (음수)." },
        },
        required: ["title", "description", "reason", "score"],
      },
    },
    solutions: {
      type: Type.ARRAY,
      description: "부정적 요소를 보완할 수 있는 비보책 목록.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "비보책의 제목." },
          description: { type: Type.STRING, description: "비보책에 대한 자세한 설명." },
          reason: { type: Type.STRING, description: "비보책의 원리." },
        },
        required: ["title", "description", "reason"],
      },
    },
  },
  required: ["totalScore", "grade", "emoji", "positiveItems", "negativeItems", "solutions"],
};

function buildPrompt(formData) {
  return `
    다음 정보를 바탕으로 한국의 전통 풍수지리 이론에 따라 집의 풍수 감정을 수행해주세요.
    결과는 반드시 지정된 JSON 형식으로 한국어로 제공해야 합니다.

    [집 정보]
    - 주소: ${formData.address}
    - 건물 유형: ${formData.buildingType}
    - 층수: ${formData.floor}층
    - 거실 방향: ${formData.direction}
    - 거실 창문 조망: ${formData.balconyView.join(', ') || '정보 없음'}
    - 강/하천 모양 (해당하는 경우): ${formData.riverShape || '해당 없음'}
    - 하루 햇빛 시간: ${formData.sunlightHours}
    - 집의 위치 (도로 기준): ${formData.alleyPosition}
    - 집터 지형: ${formData.terrain.join(', ') || '정보 없음'}
    - 베란다 확장 여부: ${formData.balconyExpanded}

    [분석 요청]
    1.  모든 요소를 종합하여 0점에서 100점 사이의 총점을 계산해주세요.
    2.  총점에 맞는 등급(예: 천하제일 명당, 훌륭한 터, 주의 필요 등)과 이모지를 부여해주세요.
    3.  긍정적인 풍수 요소와 그로 인한 가산점을 상세히 설명해주세요.
    4.  부정적인 풍수 요소와 그로 인한 감점, 그리고 풍수지리적 이유를 설명해주세요.
    5.  부정적인 요소를 보완할 수 있는 실용적인 비보책(솔루션)을 제시해주세요.
    6.  분석 내용은 전문적이지만 일반인이 이해하기 쉽게 작성해주세요.
    `;
}

export async function analyzeFengShui(formData) {
  try {
    const prompt = buildPrompt(formData);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.5,
      },
    });

    const jsonString = response.text;
    const result = JSON.parse(jsonString);
    
    // API 응답 데이터 검증 및 보정
    result.totalScore = Math.min(100, Math.max(0, result.totalScore || 70));
    result.positiveItems = result.positiveItems || [];
    result.negativeItems = result.negativeItems || [];
    result.solutions = result.solutions || [];

    return result;

  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("AI 분석 서버와 통신하는 데 실패했습니다. 잠시 후 다시 시도해주세요.");
  }
}