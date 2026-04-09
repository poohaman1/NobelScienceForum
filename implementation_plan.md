# NobelScienceForum UI/UX 모바일 최적화 구현 계획

## 배경 및 목표

첨부된 모바일 스크린샷에서 다음 문제가 확인됨:
- **색상 불일치**: 히어로 섹션은 딥 네이비 배경인데, 이후 섹션은 밝은 배경으로 전환되면서 색상 대비가 어색함
- **모바일 Nav 메뉴**: 좁은 화면에서 메뉴 항목들이 겹치거나 잘림
- **폰트 크기**: PC 기준 폰트(4rem 히어로 타이틀 등)가 모바일에서 너무 큼
- **버튼 배치**: 가로 배열 버튼이 모바일에서 겹침
- **여백/패딩**: PC용 `6rem` padding이 모바일에서 과도하게 큼
- **카드 배경색**: 다크 히어로 이후 밝은 카드 배경이 모바일에서 어색하게 보임
- **viewport 메타태그**: [layout.tsx](file:///c:/Users/KIM%20DOOSOON/OneDrive/%EB%AC%B8%EC%84%9C/Antigravity/NobelScienceForum/NobelScienceForum/src/app/layout.tsx)에 모바일 최적화 메타태그 보강 필요

## 제안 변경 사항

---

### 핵심 스타일 시스템

#### [MODIFY] [globals.css](file:///c:/Users/KIM%20DOOSOON/OneDrive/%EB%AC%B8%EC%84%9C/Antigravity/NobelScienceForum/NobelScienceForum/src/app/globals.css)

- `prefers-color-scheme: dark` 자동 적용 **비활성화** → 모바일에서 색상 혼선 방지 (라이트 모드 단일 사용)
- `.container` 모바일 패딩 `1rem`으로 줄임
- `.title-h1` 모바일 `1.75rem`, `.title-h2` 모바일 `1.375rem`으로 조정
- `.btn-primary`, `.btn-outline` 모바일 `width: 100%`, `text-align: center` 추가
- 터치 최적화: a 태그 최소 높이 `44px` 적용

---

### 헤더 컴포넌트

#### [MODIFY] [Header.tsx](file:///c:/Users/KIM%20DOOSOON/OneDrive/%EB%AC%B8%EC%84%9C/Antigravity/NobelScienceForum/NobelScienceForum/src/components/Header.tsx)

- `'use client'` 지시어 추가 (useState 활용을 위해 Client Component로 전환)
- 햄버거 메뉴 버튼(≡) 추가 - 모바일(768px 미만)에서만 노출
- 메뉴 open/close 상태 관리
- 모바일 nav는 세로 드롭다운 형태로 표시

#### [MODIFY] [Header.module.css](file:///c:/Users/KIM%20DOOSOON/OneDrive/%EB%AC%B8%EC%84%9C/Antigravity/NobelScienceForum/NobelScienceForum/src/components/Header.module.css)

- `.hamburger` 버튼 스타일 추가
- `.nav` 모바일 변환: `flex-direction: column`, 전체 너비, 배경색
- `.navLink` 모바일 패딩 확대 (터치 영역 확보)

---

### 홈 페이지

#### [MODIFY] [page.module.css](file:///c:/Users/KIM%20DOOSOON/OneDrive/%EB%AC%B8%EC%84%9C/Antigravity/NobelScienceForum/NobelScienceForum/src/app/page.module.css)

- `.heroSection` 모바일: `min-height: 70vh`, 패딩 여백 축소
- `.heroTitle` 모바일: `2.25rem` → `1.875rem` (단계적 축소)
- `.heroDescription` 모바일: `1rem`
- `.buttonGroup` 모바일: `flex-direction: column`, 버튼 `width: 100%`
- `.sectionPadding` 모바일: `4rem 1rem` → `3rem 1rem`
- `.introStats` 모바일: `grid-template-columns: repeat(2, 1fr)` 유지, 여백 축소
- `.grid3` 태블릿: `repeat(2, 1fr)` 추가 (768px~1024px)
- `.lightSection` 배경색을 라이트 모드에서 명확하게 구분

---

### 레이아웃

#### [MODIFY] [layout.tsx](file:///c:/Users/KIM%20DOOSOON/OneDrive/%EB%AC%B8%EC%84%9C/Antigravity/NobelScienceForum/NobelScienceForum/src/app/layout.tsx)

- `viewport` 메타데이터 export 추가 (Next.js 방식)
- `themeColor` 설정

---

### 내부 페이지

#### [MODIFY] [news/page.tsx](file:///c:/Users/KIM%20DOOSOON/OneDrive/%EB%AC%B8%EC%84%9C/Antigravity/NobelScienceForum/NobelScienceForum/src/app/news/page.tsx)

- `summary` 내부 flex 레이아웃: 모바일에서 title/date가 겹치지 않도록 column 레이아웃 적용 (미디어쿼리 inline style → className 방식)

#### [MODIFY] [about/page.tsx](file:///c:/Users/KIM%20DOOSOON/OneDrive/%EB%AC%B8%EC%84%9C/Antigravity/NobelScienceForum/NobelScienceForum/src/app/about/page.tsx)

- 파트너사 카드: `min-width` 조정, 모바일에서 자연스럽게 wrap

#### [MODIFY] [forum/page.tsx](file:///c:/Users/KIM%20DOOSOON/OneDrive/%EB%AC%B8%EC%84%9C/Antigravity/NobelScienceForum/NobelScienceForum/src/app/forum/page.tsx)

- 프로그램 일정 `<li>` 패딩, 폰트 모바일 최적화

---

### 푸터

#### [MODIFY] [Footer.module.css](file:///c:/Users/KIM%20DOOSOON/OneDrive/%EB%AC%B8%EC%84%9C/Antigravity/NobelScienceForum/NobelScienceForum/src/components/Footer.module.css)

- `.sponsorLogos` 모바일: `grid` 2열로 전환
- `.sponsorLogo` 모바일: `min-width` 제거, 전체 너비 활용

---

## 검증 계획

### 자동화 테스트
- 없음 (현재 테스트 파일 미존재)

### 브라우저 개발자 도구 검증
1. `npm run dev` 실행 (프로젝트 경로: `c:\Users\KIM DOOSOON\OneDrive\문서\Antigravity\NobelScienceForum\NobelScienceForum`)
2. 브라우저에서 `http://localhost:3000` 접속
3. 개발자 도구 → 디바이스 모드 → **iPhone SE (375px)**, **iPhone 14 Pro (393px)**, **Galaxy S21 (384px)** 각각 확인
4. 각 페이지(/, /about, /forum, /news) 순서로 렌더링 및 색상 확인
5. PC 뷰포트(1280px 이상) 확인하여 기존 PC 디자인 유지 확인
6. 햄버거 메뉴 동작(열기/닫기) 확인
