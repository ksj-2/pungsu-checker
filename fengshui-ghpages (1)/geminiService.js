// This is a mock service that returns a sample analysis result.
// It allows the UI to be fully functional for demonstration and layout purposes
// without requiring a live Gemini API key.

export async function analyzeFengShui(formData) {
  console.log("Analyzing with mock data for:", formData.address);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Return a consistent, detailed mock response
  return {
    totalScore: 88,
    grade: "훌륭한 터",
    emoji: "🌟",
    positiveItems: [
      {
        title: "금성환포 (金星環抱) - 궁수",
        description: "강이 집을 감싸 안는 형태로, 재물이 모이고 귀인의 도움을 받는 최고의 명당입니다.",
        reason: "물이란 재물을 뜻하며, 물이 나를 감싸는 것은 재물이 나에게 모이는 형국입니다.",
        score: 15,
      },
      {
        title: "배산 (背山) - 든든한 뒷배",
        description: "주변에 산이 있어 뒤에서 받쳐주는 안정적인 형태입니다.",
        reason: "산이 바람을 막아주고 안정감을 주며, 귀인의 도움을 받는 운이 있습니다.",
        score: 10,
      },
    ],
    negativeItems: [
      {
        title: "서향 - 오후 햇빛",
        description: "오후 4-6시에 강한 햇빛이 들어와 여름에 더울 수 있고 기운이 쇠하기 쉽습니다.",
        reason: "저녁 햇빛은 하루의 기운이 저물어가는 것을 의미하며, 집안의 생기를 약화시킬 수 있습니다.",
        score: -5,
      },
    ],
    solutions: [
      {
        title: "서향 비보책",
        description: "서쪽 창가에 빛을 차단할 수 있는 두꺼운 커튼이나 블라인드를 설치하고, 집안에 관엽식물을 많이 두어 생기를 보충하세요.",
        reason: "커튼은 강한 기운을 막아주고, 식물의 생명력은 흩어지는 기운을 안정시키는 데 도움을 줍니다.",
      },
    ],
  };
}