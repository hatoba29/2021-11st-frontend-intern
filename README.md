# 2021년 인턴(전환형) 검색서비스 Frontend분야 사전과제

## 작업환경

언어: TypeScript, SCSS

번들러: webpack

Node 버전: `12.20.1`

npm 버전: `6.14.10`

webpack 버전: `5.51.1`

## 실행방법

터미널에서 `npm install`로 의존 패키지 설치 후 `npm start` 실행

## 프로젝트 구조

- /src
  - /css: 홈 화면과 각 앱의 스타일시트
  - /img: 사진 앱에 쓰일 사진
    - import.d.ts: jpg import 시 TypeError 방지용 타입 선언 코드
    - index.ts: 모든 사진을 묶어서 export하기 위한 코드
  - /pages: 홈 화면과 각 앱 구현 코드
  - App.ts: 메인 실행 스크립트
  - Header.ts: 상단 헤더 구현 코드
  - index.html
  - Worker.ts: 알람을 위한 Web Worker 코드
- tsconfig.json: TypeScript 설정
- webpack.config.ts: webpack 설정
