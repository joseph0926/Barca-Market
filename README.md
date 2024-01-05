<!-- 프로젝트 로고 -->
<br />
<div align="center">
  <a href="https://github.com/joseph0926/GameAuction">
    <img src="https://github.com/joseph0926/GameAuction/assets/100750188/cd0eb354-ac1c-4a64-b852-05c247a7460e" alt="Logo" width="80" height="80">
  </a>


  <h3 align="center">GameAuction</h3>
  <p align="center">
    당신의 다음 게임을 위한 완벽한 선택, 여기서 원하는 게임을 구매하고 판매하세요!
    <br />
    ·
    <a href="https://github.com/joseph0926/GameAuction/issues">버그 신고하기</a>
    ·
    <a href="https://github.com/joseph0926/GameAuction/issues">기능 요청하기</a>
  </p>
</div>
<!-- 프로젝트 소개 -->

![game-auction](https://github.com/joseph0926/GameAuction/assets/100750188/a1db9277-e73f-43d0-bfc1-5ae127b2d653)

## 프로젝트 소개

GameAuction은 게임 구매 및 판매를 위한 최적의 플랫폼입니다. 본 프로젝트는 사용자가 쉽고 편리하게 게임을 사고팔 수 있는 환경을 제공함으로써 게임 거래를 한층 더 효율적으로 만들고자 합니다.

### 사용 기술

이 프로젝트는 다음과 같은 기술들을 사용합니다:

- Frontend
  * React
  * TailwindCSS
  * React-Query
  * RTK (Redux Toolkit)
- Backend
  * NodeJs
  * Microservice
  * Redis
  * RabbitMQ
- DevOps
  * Jenkins
  * Elasticsearch
  * Kibana

## 시작하기

이 섹션은 프로젝트를 로컬 환경에서 실행하기 위한 지침을 제공합니다.

### 실행 커멘드

* Dev
  ```sh
  // Docker 필요
  docker compose up -d redis mongodb mysql psql rabbitmq elasticsearch kibana metricbeat heartbeat gateway auth user notification gig order review chat jenkins jenkins-agent
  ```
* Prodction
  ```sh
  // Minikube 필요
  cd k8s
  cd barca-[service name]
  kubectl apply -f .
  ```

### 환경변수
  ```sh
      - ENABLE_APM=
      - DATABASE_URL=mongoDb or psql or mySQL
      - GATEWAY_JWT_TOKEN=
      - JWT_TOKEN=
      - NODE_ENV=development
      - API_GATEWAY_URL=http://gateway_container:4000
      - CLOUD_NAME=
      - CLOUD_API_KEY=
      - CLOUD_API_SECRET=
      - RABBITMQ_ENDPOINT=amqp://barca:<password>@rabbitmq:5672
      - ELASTIC_SEARCH_URL=http://elasticsearch_container:9200
      - ELASTIC_APM_SERVER_URL=http://apm_server_container:8200
      - ELASTIC_APM_SECRET_TOKEN=
      - STRIPE_API_KEY
      - CLIENT_URL=http://localhost:3000
      - SECRET_KEY_ONE=
      - SECRET_KEY_TWO=
      - CLIENT_URL=http://localhost:3000
      - AUTH_BASE_URL=http://auth_container:4002
      - USERS_BASE_URL=http://user_container:4003
      - GIG_BASE_URL=http://gig_container:4004
      - MESSAGE_BASE_URL=http://chat_container:4005
      - ORDER_BASE_URL=http://order_container:4006
      - REVIEW_BASE_URL=http://review_container:4007
      - REDIS_HOST=redis://redis_container:6379
  ```
