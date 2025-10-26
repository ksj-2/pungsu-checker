import React, { useState } from 'react';

const ShareButtons = ({ result }) => {
  const [isCopied, setIsCopied] = useState(false);
  const shareUrl = window.location.href;
  const shareTitle = '우리집 풍수 진단 결과';
  const shareDescription = `저희 집 풍수 점수는 ${result.totalScore}점! (${result.grade} ${result.emoji})`;

  const shareToKakao = () => {
    if (window.Kakao && window.Kakao.isInitialized()) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: shareTitle,
          description: shareDescription,
          imageUrl: 'https://picsum.photos/seed/fengshui_share/800/400',
          link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
        },
        buttons: [{ title: '우리집도 진단하기', link: { mobileWebUrl: shareUrl, webUrl: shareUrl } }],
      });
    } else {
        alert('카카오 공유 기능을 사용할 수 없습니다.');
    }
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400');
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(`${shareDescription}\n\n`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(() => alert('링크 복사에 실패했습니다.'));
  };

  return (
    <div className="bg-gradient-to-r from-emerald-900/20 to-cyan-900/20 p-4 sm:p-6 rounded-lg border border-emerald-700/30">
      <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
        <i data-lucide="share-2" className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400"></i>
        <h3 className="text-lg sm:text-xl font-semibold text-slate-200">결과 공유하기</h3>
      </div>
      <p className="text-center text-slate-400 text-xs sm:text-sm mb-4">친구들에게도 우리집 풍수 진단을 알려주세요!</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        <button onClick={shareToKakao} className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-[#FEE500] hover:bg-[#FDD835] text-[#3C1E1E] rounded-lg transition-all active:scale-95">
          <i data-lucide="message-circle" className="w-6 h-6 sm:w-7 sm:h-7"></i><span className="text-xs sm:text-sm font-semibold">카카오톡</span>
        </button>
        <button onClick={shareToFacebook} className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-[#1877F2] hover:bg-[#0C63D4] text-white rounded-lg transition-all active:scale-95">
          <i data-lucide="facebook" className="w-6 h-6 sm:w-7 sm:h-7"></i><span className="text-xs sm:text-sm font-semibold">페이스북</span>
        </button>
        <button onClick={shareToTwitter} className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-[#1DA1F2] hover:bg-[#0C8BD9] text-white rounded-lg transition-all active:scale-95">
          <i data-lucide="twitter" className="w-6 h-6 sm:w-7 sm:h-7"></i><span className="text-xs sm:text-sm font-semibold">트위터</span>
        </button>
        <button onClick={copyLink} className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all active:scale-95">
          {isCopied ? (
            <div className="flex flex-col items-center gap-2 text-emerald-400">
              <i data-lucide="check" className="w-6 h-6 sm:w-7 sm:h-7"></i><span className="text-xs sm:text-sm font-semibold">복사됨!</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <i data-lucide="link-2" className="w-6 h-6 sm:w-7 sm:h-7"></i><span className="text-xs sm:text-sm font-semibold">링크복사</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;