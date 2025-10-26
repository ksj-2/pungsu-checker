# GitHub Pages 배포 가이드 🚀

## ⚠️ 현재 문제
화면에 "pungsu-checker"와 "풍수 체크 사이트"만 표시되고 나머지가 안 보이는 이유는:
**필요한 JavaScript 파일들이 GitHub에 업로드되지 않았기 때문입니다.**

## 📦 반드시 업로드해야 할 파일 목록

GitHub 리포지토리의 **루트 디렉토리**에 다음 파일들을 모두 업로드하세요:

### 필수 파일 (15개):
```
📁 your-repository/
├── index.html ⭐ (메인 HTML)
├── index.js ⭐ (React 앱 진입점)
├── App.js ⭐ (메인 앱 컴포넌트)
├── constants.js ⭐ (상수 정의)
├── geminiService.js ⭐ (API 서비스)
├── FengShuiForm.js ⭐ (폼 컴포넌트)
├── ResultDisplay.js ⭐ (결과 표시 컴포넌트)
├── LoadingIndicator.js ⭐ (로딩 컴포넌트)
├── AdComponent.js ⭐ (광고 컴포넌트)
├── ScoreGauge.js ⭐ (점수 게이지 컴포넌트)
└── ShareButtons.js ⭐ (공유 버튼 컴포넌트)
```

### 선택 파일 (참고용):
```
├── README.md (프로젝트 설명)
├── package.json (npm 설정 - 참고용)
├── .gitignore (Git 설정)
```

## 🔍 현재 상황 확인 방법

### 1. GitHub 리포지토리 확인
GitHub 리포지토리 페이지에서 위의 11개 .js 파일이 **모두** 보이는지 확인하세요.

### 2. 브라우저 콘솔 확인
1. 사이트에 접속한 상태에서 `F12` 키를 누르세요
2. "Console" 탭을 클릭하세요
3. 빨간색 오류 메시지를 확인하세요

예상되는 오류:
- `Failed to load resource: index.js` → index.js 파일이 없음
- `Failed to load resource: App.js` → App.js 파일이 없음
- 등등...

## ✅ 해결 방법

### 방법 1: 개별 파일 업로드
1. GitHub 리포지토리로 이동
2. "Add file" → "Upload files" 클릭
3. 위에 나열된 **11개의 .js 파일**을 모두 드래그 & 드롭
4. "Commit changes" 클릭

### 방법 2: Git으로 푸시
```bash
# 로컬에 모든 파일이 있는 디렉토리에서
git add *.js
git add index.html
git commit -m "Add all required files"
git push origin main
```

## 🌐 GitHub Pages 설정 확인

1. GitHub 리포지토리 → Settings → Pages
2. "Source"가 "Deploy from a branch"로 설정되어 있는지 확인
3. "Branch"가 `main` (또는 `master`)와 `/ (root)`로 설정되어 있는지 확인
4. 설정을 변경했다면 "Save" 클릭

## ⏱️ 배포 대기 시간

파일을 업로드한 후 GitHub Pages가 업데이트되는데 **1-5분** 정도 걸립니다.
- 업로드 후 2-3분 기다린 다음
- 브라우저에서 `Ctrl + Shift + R` (강력 새로고침)을 눌러보세요

## 🐛 여전히 문제가 있다면

다음 정보를 제공해주세요:
1. GitHub 리포지토리 URL
2. 브라우저 콘솔의 오류 메시지 (F12 → Console)
3. GitHub 리포지토리에 업로드된 파일 목록

---

## 📋 빠른 체크리스트

- [ ] index.html 업로드됨
- [ ] index.js 업로드됨
- [ ] App.js 업로드됨
- [ ] constants.js 업로드됨
- [ ] geminiService.js 업로드됨
- [ ] FengShuiForm.js 업로드됨
- [ ] ResultDisplay.js 업로드됨
- [ ] LoadingIndicator.js 업로드됨
- [ ] AdComponent.js 업로드됨
- [ ] ScoreGauge.js 업로드됨
- [ ] ShareButtons.js 업로드됨
- [ ] GitHub Pages 설정 확인
- [ ] 2-3분 대기 후 강력 새로고침
