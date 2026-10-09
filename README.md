# Mini Game Center

PC와 모바일에서 플레이하는 싱글 플레이 **복합 게임장 웹 게임**. 게임 속 가상 코인(C)만 사용하며 현금 입금·베팅·환전 또는 현금성 보상은 제공하지 않습니다.

## 현재 구현 상태

**1차 개발 진행 중 — 클릭 가능한 모던 다크 + 2D UI 시안을 GitHub Pages에 배포했습니다.**

[▶ 웹에서 직접 UI 체험하기](https://y3ssam.github.io/mini-game-center/)

- 구현: React 앱 구동, PC 좌측 메뉴 / 모바일 하단 메뉴, 게임장·알바·뽑기·도감 전환, 게임 목록 필터, 설정 다이얼로그, 콘텐츠별 오리지널 SVG 일러스트.
- **UI 조작 시안:** 주사위·하이로우 결과/재도전 및 베팅액 표시 조작, 가챠 시리즈 탭, 알바 종류·도감 필터 전환. 모바일 게임 화면에서는 하단 탐색을 숨깁니다.
- 경제 기초: 공통 지갑 초기 잔액(600 C), Zustand 상태 및 localStorage 지속화 구조, 정수 잔액 검증·중복 거래 방지 순수 함수.
- **미구현:** 실제 알바 수익·급여 수령, 지갑과 연동되는 베팅 미니게임, 실제 굿즈 추첨 및 수집품 저장. **시안 조작은 코인에 영향을 주지 않습니다.**

완료 여부는 [로드맵](docs/ROADMAP.md)을 기준으로 확인합니다.

## 로컬 실행

Node.js **20.19 이상**이 필요합니다. Node.js 22 권장.

```bash
npm install
npm run dev
```

브라우저에서 터미널에 안내되는 Vite 로컬 주소를 열면 됩니다.

```bash
npm run typecheck     # TypeScript 검사
npm run build         # 프로덕션 빌드
npm test              # Vitest 단위 테스트
npx playwright install chromium
npm run test:e2e      # Playwright PC/모바일 UI 테스트
```

GitHub Actions에서 타입 검사·빌드·단위 테스트 및 데스크톱/모바일 Chromium UI 테스트를 수행합니다.

## 기술 스택

- 구현 중: React + TypeScript + Vite, CSS Modules + CSS Variables, Zustand, localStorage
- 테스트: Vitest, Playwright
- 2D 게임 그래픽 기술은 향후 실제 필요에 따라 선택

## 문서

- [게임 기획](docs/GAME_DESIGN.md)
- [UI·그래픽 규격](docs/UI_SPEC.md)
- [경제·밸런스](docs/ECONOMY.md)
- [개발 순서 및 현황](docs/ROADMAP.md)
- [개발 에이전트 작업 규칙](AGENTS.md)

기획 문서의 게임 규칙·밸런스 수치는 구현 전 설정안이며, 구현 완료를 의미하지 않습니다.

> 범위 변경: 인형뽑기와 인형 수집은 폐기했습니다. 뽑기는 굿즈 가챠 전용입니다. 현재 배포된 화면은 확정 UI가 아닙니다.
