# FC Barcelona Fan Community Platform

![FC Barcelona Logo](https://upload.wikimedia.org/wikipedia/ko/thumb/b/b1/FC_%EB%B0%94%EB%A5%B4%EC%85%80%EB%A1%9C%EB%82%98_%EB%A1%9C%EA%B3%A0.svg/300px-FC_%EB%B0%94%EB%A5%B4%EC%85%80%EB%A1%9C%EB%82%98_%EB%A1%9C%EA%B3%A0.svg.png)

## 프로젝트 소개

[기획서](https://carnation-domain-4f6.notion.site/Project-FC-Barcelona-Fan-Community-Platform-63bf4d3fb51f4011be378c8a21fd65e5)

FC Barcelona Fan Community Platform은 FC Barcelona 팬들을 위한 온라인 커뮤니티 플랫폼입니다. <br/>
이 플랫폼을 통해 FC Barcelona 팬들끼리 소통하고, 다양한 정보와 소식을 공유할 수 있습니다. 팬들은 게시물 작성, 댓글 달기, 팔로우 등의 기능을 활용하여 활발한 커뮤니티 활동을 할 수 있습니다.

### 프로젝트 구성
```
project_03-Barcelona-Fan-Community/
├── src/                   
│   ├── components/
|   |   ├── layout               # 레이아웃 관련 컴포넌트 (navbar,,,)
|   |   ├── styles               # 컴포넌트 관련 스타일링 폴더 (애니메이션등,,)
│   ├── pages/                     
│   │   ├── api/                 
|   |   |   ├── auth/
|   |   |   ├── forum/
|   |   |   ├── user/
|   |   |   ├── index.js/
│   │   ├── notification/
│   │   ├── profile/
│   │   ├── sign/
│   │   ├── _app.js/
│   │   ├── _document.js/
│   │   ├── about.js/
│   │   ├── index.js/
│   ├── prisma/                 # prisma 모델 정의
│   ├── public/                 
│   ├── styles/
│   ├── utils/                  # 데이터, 테마 설정 파일 
```


### ERD
![prisma-erd](https://github.com/joseph0926/project_03-Barcelona-Fan-Community/assets/100750188/1cc5439a-e6ce-47ca-9727-f5374e4bf08f)


## 주요 기능

- 사용자 회원가입과 로그인 기능
- 게시물 작성, 수정, 삭제 기능
- 댓글 작성, 수정, 삭제 기능
- 사용자 프로필 관리 기능
- 팔로우 기능
- 토론 포럼 기능
- 알림 기능

## 기술 스택

- Front-end:
  - Next.js v12
  - ChakraUI
  - Redux Toolkit
  - JavaScript

- Back-end:
  - Next.js v12
  - PostgreSQL
  - Prisma
  - JavaScript

## 팀원

| Frontend                                                                                                          | Backend                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| ![icon](https://github.com/joseph0926/project_02-MoneyNote/assets/100750188/212deebf-579d-409e-83b3-ead4e4ef7a90) | ![icon](https://github.com/joseph0926/project_02-MoneyNote/assets/100750188/212deebf-579d-409e-83b3-ead4e4ef7a90) |
| [김영훈](https://github.com/joseph0926)                                                                           | [김영훈](https://github.com/joseph0926)                                                                           |

## 실행 방법

```shell
npm install
npm run dev
```

## .env
```
DATABASE_URL=  #postgreSQL url
JWT_SECRET=    #JWT 토큰
```
