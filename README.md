# Couplix
경북대학교 컴퓨터학부 2024년 1학기 소프트웨어 공학

0팀 박서연, 박주열, 박지원, 이강인

## 프로젝트 결과물
[https://couplix.raipen.com](https://couplix.raipen.com)

## 폴더 구조

```null
Couplix
├─backend
│  ├─prisma : 데이터베이스와 ORM 설정 및 seed 데이터, embedding 데이터를 가지고 오는 코드 파일들이 있는 폴더
│  └─src: 백엔드 서버를 설정하고 실행하는 파일들이 있는 폴더
│      ├─api: API 라우터와 컨트롤러가 있는 폴더
│      ├─loaders: 서버를 시작할 때 필요한 설정 파일들이 있는 폴더
│      ├─services: 비즈니스 로직을 처리하는 파일들이 있는 폴더
│      └─utils: 유틸리티 함수들이 있는 폴더
└─frontend
    ├─public: 정적 파일들이 있는 폴더
    └─src
        ├─assets: 이미지 파일들이 있는 폴더
        ├─components: 컴포넌트 파일들이 있는 폴더
        ├─hooks: 컴포넌트나 page에서 사용할 custom hook 파일들이 있는 폴더
        ├─page: 컴포넌트들과 훅들을 조합하여 만든 페이지 파일들이 있는 폴더
        ├─styles: 컴포넌트나 페이지에서 사용할 스타일 파일들이 있는 폴더
        └─utils: 유틸리티 함수들이 있는 폴더
```

## 실행 방법
### 로컬에서 개발용 서버 실행
1. Node.js 및 npm 설치
2. 데이터베이스 설치
    - MySQL or MariaDB 설치
    - 데이터베이스 생성
    - 데이터베이스 사용자 생성
    - 데이터베이스 사용자에게 데이터베이스 권한 부여
3. ```backend``` 폴더에 ```.env``` 파일 생성
4. ```.env``` 파일에 다음과 같이 환경 변수 설정
    ```shell
    #DATABASE_URL="mysql://{id}:{password}@{host}:{port}/{database}"
    DATABASE_URL="mysql://root:1234@localhost:3306/testcouplix"
    ```
5. ```backend``` 폴더에서 다음 명령어 실행
    ```shell
    npm install
    npx prisma migrate dev #만약 2. 과정에서 데이터베이스를 생성하지 않았다면 자동으로 데이터베이스 생성과 함께 시드 데이터가 추가되므로 아래 명령어는 실행하지 않아도 됩니다.
    npx prisma db seed #만약 2. 과정에서 데이터베이스를 생성하지 않았다면 위 명령어 실행 과정에서 자동으로 실행되므로 이 명령어는 실행하지 않아도 됩니다.
    npm run dev
    ```
6. ```frontend``` 폴더에서 다음 명령어 실행
    ```shell
    npm install
    npm run dev
    ```

### 배포용 서버 실행
1. docker 및 docker-compose 설치
2. 루트 폴더(```/```)에 ```.env``` 파일 생성
3. ```.env``` 파일에 다음과 같이 환경 변수 설정
    ```shell
    DATABASE_URL="mysql://root:root@db/couplix"
    NODE_ENV=production
    ```
4. 루트 폴더에서 다음 명령어 실행
    ```shell
    docker-compose up -d
    #도커 설치 방식에 따라 docker compose up -d를 사용해야할 수도 있음
    ```

### 임베딩 데이터 업데이트

**이 방식으로 기본 임베딩 데이터를 구하여 seed 값으로 사용하였으니 임베딩 데이터를 업데이트 하고 싶을 때만 사용하시기 바랍니다.**

1. 데이터 베이스 설정 및 실행
    - MySQL or MariaDB 설치
    - 데이터베이스 생성
    - 데이터베이스 사용자 생성
    - 데이터베이스 사용자에게 데이터베이스 권한 부여
    - ```backend``` 폴더에 ```.env``` 파일 생성
    - ```.env``` 파일에 다음과 같이 환경 변수 설정
        ```shell
        DATABASE_URL="mysql://{id}:{password}@{host}:{port}/{database}"
        ```
    - ```backend``` 폴더에서 다음 명령어 실행
        ```shell
        npm install
        npx prisma migrate dev
        npx prisma db seed
        ```
2. OpenAI API Key 발급
    - [OpenAI](https://platform.openai.com/)에 가입
    - API Key 발급
3. 기존 데이터베이스에 있는 데이터 중 Embedding 테이블과 Recommendation 테이블 내용 삭제
    ```sql
    TRUNCATE TABLE Embedding;
    TRUNCATE TABLE Recommendation;
    ```
1. ```backend``` 폴더에 ```.env``` 파일 생성
2. ```.env``` 파일에 다음과 같이 환경 변수 추가
    ```shell
    OPENAI_API_KEY="sk-..."
    ```
3. ```backend``` 폴더에서 다음 명령어 실행
    ```shell
    npm run embedding
    npm run vector
    ```
