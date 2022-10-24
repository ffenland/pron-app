# Second Version of PP app

하도 꼬이고 꼬여서 새로 공부할 겸 새로 만듭니다.

## Setup

### 기본설치

npx create-next-app@latest --typescript

### TailwindCSS

npm install -D tailwindcss postcss autoprefixer

설치하고

npx tailwindcss init -p

tailwind.config.js 수정

```
- content : [
  "./pages/**/*.{js,jsx,ts,tsx}",  "./components/**/*.{js,jsx,ts,tsx}"
  ]
  // {}안에 공백 없게하자

```

styles/global.css 파일 수정

@tailwind base;  
@tailwind components;  
@tailwind utilities;

추가

### NextJS 설정

#### import 경로 단축하기

tsconfig.js 의 compilerOptions 항목에 아래 내용 추가.

```javascript

"compilerOptions": {
  "baseUrl": ".",
  "paths": {
    "@libs/*": ["libs/*"],
    "@components": ["components/*"]
  }
}

```

### Prisma

설치
npm i prisma -D
vsc prisma plugin 설치하기
초기화
npx prisma init
DB 설정하기 (기본값은 PostgreSQL)
PlanetScale로 할거면 MySql로 설정해주자.
