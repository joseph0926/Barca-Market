# FC Barcelona Fan Community Platform

![FC Barcelona Logo](https://upload.wikimedia.org/wikipedia/ko/thumb/b/b1/FC_%EB%B0%94%EB%A5%B4%EC%85%80%EB%A1%9C%EB%82%98_%EB%A1%9C%EA%B3%A0.svg/300px-FC_%EB%B0%94%EB%A5%B4%EC%85%80%EB%A1%9C%EB%82%98_%EB%A1%9C%EA%B3%A0.svg.png)

## 프로젝트 소개

- Typescript를 활용
- Microservice를 이용한 서버 구축

FC Barcelona Fan Community Platform은 FC Barcelona 팬들을 위한 온라인 커뮤니티 플랫폼입니다. <br/>
이 플랫폼을 통해 FC Barcelona 팬들끼리 소통하고, 다양한 정보와 소식을 공유할 수 있습니다. 팬들은 게시물 작성, 댓글 달기, 팔로우 등의 기능을 활용하여 활발한 커뮤니티 활동을 할 수 있습니다.

### 프로젝트 데모

![barcelona-gradient5](https://github.com/joseph0926/project_03-Barcelona-Fan-Community/assets/100750188/f045e8b8-4cbd-4f58-9a2b-ff3554ac50fa)


### 프로젝트 구성
![barcelona](https://github.com/joseph0926/project_03-Barcelona-Fan-Community/assets/100750188/3ff58c97-f1ad-4b2d-81af-fa20104c249e)



### ERD

<div>
  <span>User</span>
  <img src="https://github.com/joseph0926/project_03-Barcelona-Fan-Community/assets/100750188/b3e3e9a8-8e9f-4697-967c-4bc45bb1fb70" alt="이미지1 설명" width="400" height="300">
  <span>Post, Commnet</span>
  <img src="https://github.com/joseph0926/project_03-Barcelona-Fan-Community/assets/100750188/86f43d2e-5cf5-4c1a-8cd2-89de57418d0b" alt="이미지2 설명"  width="400" height="300">
  <span>Community</span>
  <img src="https://github.com/joseph0926/project_03-Barcelona-Fan-Community/assets/100750188/ba6fcc6d-9204-442d-84b7-c1608c1f4ca3" alt="이미지2 설명"  width="400" height="300">
  <span>Notification</span>
  <img src="https://github.com/joseph0926/project_03-Barcelona-Fan-Community/assets/100750188/12d2069e-dd64-4b8c-bed2-ce6de89074c4" alt="이미지2 설명"  width="400" height="300">
</div>


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
  - styled-components
  - Redux Toolkit
  - Redux Toolkit Query
  - TypeScript

- Back-end:
  - Node.js
  - Express
  - PostgreSQL
  - Redis
  - MongoDB
  - Prisma
  - mongoose
  - MicroService
  - NATS streaming service
  - TypeScript

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
docker pull rkekqmf0926/auth
docker pull rkekqmf0926/client
docker pull rkekqmf0926/post

// env 설정
kubectl create secret generic JWT_SERCRET --from-literal=JWT_SECRET={jwt 키}
/*
/infra/k6s/auth-psql-secret.yaml 파일 생성 후
*/
apiVersion: v1
kind: Secret
metadata:
  name: auth-psql-secret
type: Opaque
data:
  POSTGRES_USER: 
  POSTGRES_PASSWORD: 


skaffold dev
```

- 접속 <br/>
etc/hosts -> 127.0.0.1 joseph0926-barcelona.dev 추가 <br/>
joseph0926-barcelona.dev 로 접속 <br/>
(https 문제 -> thisisunsafe 입력)
