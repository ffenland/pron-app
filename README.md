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

prisma client도 설치를 해주자.
npm i @prisma/client
-D 옵션을 쓰지 않는다. 실제로 사용하는 기능이니깐.
npx prisma generate를 해서 client를 생성해준다.
lib/server/client.ts 파일을 만들고 client를 초기화.

### heroIcons

npm i @heroicons/react

Now each icon can be imported individually as a React component:

```javascript
<BeakerIcon className="h-6 w-6 text-blue-500" />
```

### iron-session

```bash
npm install iron-session
```

## Layout 구성

Layout component는 canGoBack, title, hasTabBar 속성을 갖습니다. 페이지 별로 속성 값이 다르므로 모든 페이지에서 매번 Layout을 import 해서 사용합니다.

### fixed 속성 주의

tabbar, titlebar는 fixed속성을 사용합니다. fixed속성은 부모요소의 max width값을 무시하므로 다시 설정해줘야합니다.

### canGoBack

뒤로가기 버튼이 있느냐 없느냐를 설정합니다. 뒤로가기버튼은 항상 왼쪽 상단으로 고정하기 위해 position:absolute를 사용하였습니다.

### title

타이틀은 내용만 바뀔뿐 그 요소는 늘 존재한다고 가정.

### children

tabBar의 존재 여부에 따라 padding 값이 바뀝니다. cls 유틸을 이용해서 분기를 나눠줍시다.

## Button component

버튼은 자주 사용되고, 또 일관성을 유지하고자 별도의 컴포넌트로 만들어둡니다.
floating, small, medium, large 4가지 타입을 가지며 floating은 fixed로 다른 버튼들과 다른 차이점이 있습니다.

## store component

store image, title 등등의 정보를 간략하게 보여줍니다.
StoreDetail 페이지로 들어가는 링크도 제공합니다.

# Database 설정

## Prisma

Typescript 기반의 ORM.
SQL문법도 사용가능

### Install

```bash
npm i prisma -D
```

### invoke Prisma

프리즈마의 기능은 npx를 이용해 불러온다.

```bash
npx prisma init
npx prisma db push
npx prisma studio
```

일단은 init을 해주면 root에 prisma 폴더가 생성되고 그 안에 schema.prisma 파일이 생긴다.
여기서 스키마 정의 및 client설정 DB경로 설정 등등을 해주면 된다.

### prisma/client

클라이언트를 잘 이해하고 넘어가자
Prisma Client
TypeScript 및 Node.js용 직관적인 데이터베이스 클라이언트
Prisma Client는 생각하는 방식으로 구성하고 앱에 맞춤화된 유형으로 Prisma 스키마에서 자동 생성되는 쿼리 빌더입니다.
npm install @prisma/client

## PlanetScale

MySQL과 유사한 Vitess 기반의 클라우드 DB

## React Hook Form

React에서 단순하고 반복적인 일인 Form을 다루는 일을 쉽게 해줍니다. 무한 useState의 늪에서 해방!

```javascript
import { useForm } from "react-hook-form";
```

기본적으로 useForm 훅을 불러와서 사용하며

```javascript
const { register, watch, handleSubmit } = useForm();
```

useForm훅의 메소드를 불러옵니다.
Input tag에는 register를 사용하여 input을 등록해서 사용합니다. 첫번째 인자로는 구분할 수 있는 이름, 두번째로는 옵션을 전달합니다. validation에 관한 설정을 비롯해 대부분의 막강파워 기능은 여기서 사용합니다.

```javascript
<input {...register("고유한이름")}>
```

form의 경우는 type을 지정해주어야 form에서 넘어오는 data type이나 또는 useForm 자체에서 자동완성 기능을 사용할 수 있다.

```javascript
interface SignInForm {
  username: string;
  email: string;
  password: string;
}

const SignIn: NextPage = () => {
  const { register, handleSubmit, watch } = useForm<SignInForm>({
    defaultValues: {
      username: "Guest",
      email: "Test@Test.com",
      password: "1234",
    },
  });

  const onValid = (data: SignInForm) => {
    console.log("Valid!");
  };
```

validation을 어느시점에 하는지는 mode 값을 정해줘서 변할 수 있다.

```typescript
const { register, handleSubmit, watch } =
  useForm <
  SignInForm >
  {
    mode: "onChange",
  };
```

## 정규식.

## Iron-session

handler를 감싸서 req안에 session을 넣어준다.
