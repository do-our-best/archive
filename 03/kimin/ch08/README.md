# MongoDB - Mongoose 사용한 CRUD 예제

## npm 패키지 설치

```
npm i
```

## MongoDB 설치하기

1. MongoDB Community Server On-premises 설치

https://www.mongodb.com/try/download/community

2. 설치 완료 후 환경변수 설정

> 시스템 속성 -> `고급` 탭의 환경 변수 -> `시스템 변수`의 `Path` 편집 -> 새로 만들기 `C:\Program Files\MongoDB\Server\5.0\bin` -> 확인

3. `C:\data\db` 디렉토리 생성

## `.env` 파일 생성

```
MONGO_URL=mongodb://<사용자명>:<비밀번호>localhost:27017/admin
MONGO_DATABASE=<데이터베이스명>
```

## 프로젝트 실행

1. 터미널에서 `mongod` 명령어로 디비 서버 실행

2. 터미널 하나 더 열고 root directory에서 서버 실행

```
npm start
```
