# FC Barcelona Fan Community Platform

![FC Barcelona Logo](https://upload.wikimedia.org/wikipedia/ko/thumb/b/b1/FC_%EB%B0%94%EB%A5%B4%EC%85%80%EB%A1%9C%EB%82%98_%EB%A1%9C%EA%B3%A0.svg/300px-FC_%EB%B0%94%EB%A5%B4%EC%85%80%EB%A1%9C%EB%82%98_%EB%A1%9C%EA%B3%A0.svg.png)

## 프로젝트 소개

- Typescript를 활용
- Microservice를 이용한 서버 구축

FC Barcelona Fan Community Platform은 FC Barcelona 팬들을 위한 온라인 커뮤니티 플랫폼입니다. <br/>
이 플랫폼을 통해 FC Barcelona 팬들끼리 소통하고, 다양한 정보와 소식을 공유할 수 있습니다. 팬들은 게시물 작성, 댓글 달기, 팔로우 등의 기능을 활용하여 활발한 커뮤니티 활동을 할 수 있습니다.

### 프로젝트 데모
![barcelona](https://github.com/joseph0926/project_03-Barcelona-Fan-Community/assets/100750188/8dd72818-1060-4c13-837e-25b0d8ce691e)



### 프로젝트 구성
![barcelona](https://github.com/joseph0926/project_03-Barcelona-Fan-Community/assets/100750188/0c8cb286-df28-442e-916b-764b29b5843f)


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
  - Next.js
  - ChakraUI
  - Redux Toolkit
  - TypeScript

- Back-end:
  - Node.js
  - Express
  - PostgreSQL
  - Prisma
  - TypeScript
  - Redis
  - MicroService

## 팀원

| Frontend                                                                                                          | Backend                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| ![icon](https://github.com/joseph0926/project_02-MoneyNote/assets/100750188/212deebf-579d-409e-83b3-ead4e4ef7a90) | ![icon](https://github.com/joseph0926/project_02-MoneyNote/assets/100750188/212deebf-579d-409e-83b3-ead4e4ef7a90) |
| [김영훈](https://github.com/joseph0926)                                                                           | [김영훈](https://github.com/joseph0926)                                                                           |

## 실행 방법

서버 코드를 실행시키려면 Kubernetes, Skaffold, ingress nginx 가 필요합니다 <br/>
[skaffold 설치](https://skaffold.dev/docs/install/) <br/>
[ingress nginx 설치](https://kubernetes.github.io/ingress-nginx/deploy/#quick-start)

```shell
// front
cd client
npm install
npm run dev

// back
cd auth
kubectl apply -f auth-psql-pvc.yaml

cd ..
skaffold dev
```

## auth/.env
```
DATABASE_URL=  #postgreSQL url
JWT_SECRET=    #JWT 토큰
```
