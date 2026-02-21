# 01. 프로젝트 개요

- 지원자: 김영우
- 지원 플랫폼 링크: [원티드 - 프론트엔드 개발자](https://www.wanted.co.kr/wd/206124)
- 과제 시작일: 2026. 02. 20 (금)
- 과제 마감일: 2026. 02. 26 (목)
- [프론트 사전과제](https://short-freckle-851.notion.site/42aed36c39ba467abf56728bb822dcdd)
  - [Figma 디자인 시안](https://www.figma.com/design/VHM0w7IBWLaaCJp0l9Mkff/certicos-Books?node-id=18-608&p=f&t=0M1YltYD8nhfALzC-0)
  - [카카오 책 검색 API](https://developers.kakao.com/docs/latest/ko/daum-search/dev-guide#search-book)



<br /><hr /><br />



# 02. 실행 방법 및 환경 설정

프로젝트를 실행하기 위해, 다음과 같은 사전 준비가 필요합니다.

- Node.js `v24.12.0 (lts/krypton)` 이상
- `pnpm` 패키지 매니저
- `.env` 파일

<br />

## 02-01. Node.js 설치 (with `nvm`)

프로젝트별 Node.js 권장 버전은 달라질 수 있으며, Node.js 버전 스위칭이 가능한 `nvm` 사용을 권장합니다.

아래는 `nvm` 을 설치한 후, `nvm` 을 통하여 Node.js(`v24.12.0`) 을 설치하는 커맨드입니다.

```bash
# nvm 다운로드 및 설치:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Node.js 다운로드 및 설치:
nvm install 24.12.0

# Node.js 버전 확인:
node -v # "v24.12.0" 이 출력되어야 합니다.
nvm current # "v24.12.0" 이 출력되어야 합니다.

# npm 버전 확인:
npm -v # 11.6.2 가 출력되어야 합니다.

# [선택사항] default node 버전 설정하기
nvm alias default 24.12.0
```

<br />

## 02-02. pnpm 전역 설치

`npm` 과 달리 symlink 방식의 패키지 매니징을 지원하는 `pnpm` 을 전역 설치합니다.

```bash
npm install -g pnpm@latest-10
```

<details>
<summary>symlink 방식이란?</summary>

`npm` 이나 `yarn` 은 설치한 패키지가 각 프로젝트의 `node_modules` 에 직접 설치되는 방식입니다.

이를 개선한 `pnpm` 은 로컬 PC 의 패키지 저장 디렉토리에 모든 패키지를 통합 저장하며, 각 프로젝트는 필요한 패키지를 참조하는 방식으로 동작합니다.

덕분에 각 패키지는 오직 한번만 설치되고 각 프로젝트는 패키지를 재사용하는 이점과 번복되는 설치시간을 단축할 수 있습니다.
</details>

<br />

## 02-03. 로컬 개발 환경 실행

```bash
# 패키지 설치 && 개발 환경 실행
pnpm install && pnpm dev
```

## 02-04. 기타 실행 명령

```bash
# 빌드
pnpm build
```

```bash
# lint 검사
pnpm lint

# lint 검사 및 자동 수정
pnpm lint:fix
```

```bash
# Typescript 타입 검사
pnpm type-check
```

```bash
# 유닛/통합 테스트 실행
pnpm test
```



<br /><hr /><br />



# 03. 폴더 구조 및 주요 코드 설명

## 03-01. 폴더 구조

TODO: 
```bash
.
├── app
│   │ # Next.js file system router
│
├── common
│   │ # 공통 구현부
│   │
│   ├── apis
│   │   │ # API 연동 구현부 (Axios 기반)
│   │
│   ├── components
│   │   │ # UI 컴포넌트
│   │
│   ├── features
│   │   │ # Feature 기반 구조 구현부
│   │
│   ├── layouts
│   │   │ # layout 구성 컴포넌트
│   │
│   ├── stores
│   │   │ # UI 스토어 (Zustand)
│   │
│   ├── test
│   │   │ # 테스트 관련 설정부
│   │
│   └── utils
│       │ # 유틸리티 구현부
│
└── public
    │ # 정적 리소스
```


FIXME: 각 디렉토리 구조 잡은 후, 아래 목록 삭제하기
- `app/`
  - Next.js 파일 시스템 라우터
- `app/**/components`
  - 특정 페이지에 종속된 컴포넌트
- `common/`
  - 공통 구현부
- `common/apis/`
  - API Generic type
  - axios instance
  - API 구현부 구조
- `common/layouts/`
  - 레이아웃 컴포넌트
- `common/components/`
  - 공통 컴포넌트
- `common/features/[피쳐명]/`
  - components
  - keys
  - queries
  - mutations
- `common/utils`
  - tailwindcss 유틸 만들기
    - cn: tailwindcss util class 병합 유틸
- `common/test`
  - vitest setupFile 만들기
  - vitest 설정 테스트는 `test/samples` 에서 해보자
- `common/stores`
  - zustand util 만들기 (middleware 통합용 유틸)
  - zustand persist 필요 (localStorage)
FIXME: //

<br />

## 03-02. 주요 코드 설명

TODO:
- `03-01` 에 대한 개별 주요 구현부, 패턴화 설명하기



<br /><hr /><br />



# 04. 라이브러리 선택 이유

## 04-01. axios

Axios 는 클라이언트와 서버와의 http 통신의 편의성을 제공하는 라이브러리입니다.

Next.js 는 JS 빌트인 함수인 `fetch` 를 확장하여 제공하지만, 본 프로젝트에서는 Axios 를 선택하였습니다.

- 서버 상태관리는 React Query 가 전담할 것이므로, `fetch` 의 캐싱 기능은 중복된 캐싱이 됩니다. (또는 `no-store` 고정 설정)
- `fetch` 의 핵심 기능인 캐싱을 사용하지 않는다면, http 통신의 편의성이 높은 Axios 를 사용하는 것이 이점으로 생각되었습니다.
  - 인터셉터 기능(request headers 에 인증 토큰 주입)
  - 응답 데이터에 대한 자동 역직렬화(JSON.parse)
  - 모든 에러에 대한 Error 객체 throw

<br />

## 04-02. zustand

서버 상태관리는 React Query 가 전담하게 되므로, UI 상태관리만 가능하면 중분할 것으로 생각하였습니다.

그러므로 Redux Saga/Thunk 의 입지는 없는 상황이며, Redux 의 장대한 보일러플레이트를 줄일 수 있는 zustand 를 선택하였습니다.
- Zustand 는 Provider 조차 필요없는 Closer 기반 상태관리를 제공하여 설정이나 스토어 정의가 간편합니다.
- 상태 관리에 필요한 공식 middleware 를 제공하므로, 필요에 따라 확장하여 사용할 수 있습니다.
- 본 프로젝트에 사용할 middleware 는 다음과 같습니다.
  - `persist` : 세션이 달라도 유지할 상태값을 localStorage 에 저장하며, hydration 을 지원합니다.
  - `devtools` : 브라우저 개발자 도구에서 스토어를 디버깅할 수 있습니다.
  - `immer` : 중첩 state 에 대한 draft 방식의 간편한 상태값 변경 및 변경되지 않은 상태값들에 대한 불변 보장으로 리렌더링 최적화를 도모합니다.

<br />

## 04-03. Vitest, Testing Library

유닛 테스트 및 통합 테스트를 위해 Vitest 테스팅 프레임워크를 선택하였습니다.
- Vitest 는 Jest 대비 간편한 설정과 EcmaScript 환경을 기본적으로 지원합니다. (Jest 는 기본 CommonJS 환경)
- `jest-dom` Matcher 를 사용하여 Jest 의 유용한 Matcher 들을 대부분 사용할 수 있습니다.
- setup, teardown, module mocking, file system mocking 모두 지원합니다.

<br />

## 04-04. tailwindcss, clsx, tailwind-merge

유틸 className 을 제공하는 CSS 프레임워크인 Tailwindcss 를 사용하였습니다.
- 간략하지만 왠만한 스타일은 className 조합으로 구현 가능합니다.
- `clsx` : 문자열, 객체, 배열 등의 조건부 className 들을 사용할 수 있도록 해줍니다.
- `tailwind-merge` : Tailwindcss className 들을 병합하여 충돌을 해소 해줍니다.
- `clsx` + `tailwind-merge` 를 통합한 `cn` 유틸을 만들 예정이며, Tailwindcss 의 편의성을 높일 수 있습니다.



<br /><hr /><br />



# 05. 강조 하고 싶은 기능

`Shadcn UI` 와 같은 컴포넌트 라이브러리는 사용하지 않고, 직접 구현하였습니다.
- 첫번째 평가 기준: `UI 구현력 및 디자인 완성도 (재사용 가능한 컴포넌트 설계)`

<br />

## 05-01. Git branch 접두사

개발 성격에 따라 branch 에 접두사를 사용하였습니다.
- `config/*` : 설정 관련 작업
- `ui/*` : 공통 UI 컴포넌트 구현 작업
- `feature/*` : 기능 구현 작업



<br /><hr /><br />



# 06. 개발 메모

다음은 과제 개발 관련 정리 및 과정별 메모입니다.

## 06-01. 작업 흐름 메모

<details>
<summary>작업 흐름 메모 상세</summary>

### 개발 방향 정리하기
- README.md 에 대략적인 프로젝트 개발 방향 정리하기
- 요구사항 정리하기

### 설정하기
- 테스트 환경 구성하기
  - [x] 브랜치명: `config/vitest--testing-library`
  - [x] Vitest 설치
  - [x] `_calculator.ts` 파일 테스트하기
  - [x] Testing Library 및 Ecosystem 설치하기
  - [x] `_SampleButton.tsx` 컴포넌트 만들고 테스트하기
- eslint 설정
  - [x] 브랜치명: `config/eslint--stylistic`
  - [x] stylistic plugin 설치
  - [x] eslint plugin 설정
  - [x] rules 설정
  - [x] type-check 실행 스크립트 추가
- Tailwind 구성하기
  - [x] 브랜치명: `config/tailwindcss`
  - [ ] `cn.ts` 유틸 함수 모듈 만들기
  - [ ] `cn()` 함수 유닛 테스트하기
  - [ ] theme 구성하기
- zustand 구성하기
  - [ ] 브랜치명: `config/zustand`
  - [ ] zustand module mocking 하기
  - [ ] sampleStore 만들고 테스트하기
- axios 구성하기
  - [ ] 브랜치명: `config/axios`
  - [ ] axios 설치하기
  - [ ] API request 제네릭 타입 만들기
- MSW 구성하기 (개발환경 전용)
  - [ ] 브랜치명: `config/msw`
  - [ ] API 관련 통합 테스트를 위한 `MSW` 설치하기
  - [ ] setup, teardown 만들기

### 구현

- [ ] UI 컴포넌트 개발 및 유닛 테스트
- [ ] Layout 구현
- [ ] `도서 검색` 페이지 `feature` 구현
- [ ] `내가 찜한 책` 페이지 `feature` 구현

</details>

<br />

## 06-02. 컴포넌트 정의하기

<details>
<summary>컴포넌트 정의하기 상세</summary>

### 레이아웃
- [ ] `MainLayout.tsx`
- [ ] `MainLayoutHeader.tsx`

### UI 컴포넌트
- [ ] `CDRIButton.tsx`
- [ ] `CDRIInput.tsx`
- [ ] `CDRICombobox.tsx` ***
- [ ] `CDRIAccordion.tsx` **
- [ ] `CDRISelect.tsx` **
- [ ] `CDRIPopup.tsx` *
- [ ] `CDRIInfinityLoader.tsx`
- [ ] `CDRINoData.tsx`

### feature 컴포넌트
- [ ] `BookSearch.tsx`
- [ ] `SearchCountIndicator.tsx`
- [ ] `BookList.tsx`
- [ ] `BookImage.tsx`
</details>
