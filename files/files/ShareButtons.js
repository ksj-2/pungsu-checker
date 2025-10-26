import React, { useEffect } from 'react';

const ShareButtons = ({ result }) => {
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  const shareToKakao = () => {
    if (!window.Kakao) {
      alert('카카오톡 공유 기능을 사용할 수 없습니다.');
      return;
    }

    try {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '우리집 풍수 진단 결과',
          description: `${result.grade} - ${result.totalScore}점\n전통 풍수 이론 + AI 분석으로 우리집을 진단해보세요!`,
          imageUrl: 'https://picsum.photos/seed/fengshui/800/400',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: '내 집도 진단하기',
            link: {
              mobileWebUrl: window.location.origin,
              webUrl: window.location.origin,
            },
          },
        ],
      });
    } catch (error) {
      console.error('카카오톡 공유 실패:', error);
      alert('카카오톡 공유에 실패했습니다.');
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('링크가 복사되었습니다!');
    } catch (error) {
      console.error('링크 복사 실패:', error);
      alert('링크 복사에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
      <button
        onClick={shareToKakao}
        className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold rounded-md active:scale-98 transition-all text-sm sm:text-base"
      >
        <i data-lucide="message-circle" className="w-4 h-4 sm:w-5 sm:h-5"></i>
        카카오톡 공유
      </button>
      <button
        onClick={copyLink}
        className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 bg-slate-600 hover:bg-slate-700 text-white font-bold rounded-md active:scale-98 transition-all text-sm sm:text-base"
      >
        <i data-lucide="link" className="w-4 h-4 sm:w-5 sm:h-5"></i>
        링크 복사
      </button>
    </div>
  );
};

export default ShareButtons;
