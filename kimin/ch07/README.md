# MySQL - Sequelize 사용한 CRUD 예제

## npm 패키지 설치

```
npm i
```

## `.env` 파일 생성

```
MYSQL_USERNAME=사용자명
MYSQL_PASSWORD=비밀번호
MYSQL_DATABASE=데이터베이스명
MYSQL_HOST=127.0.0.1
```

## 프로젝트 실행

1. mysql에서 사용할 데이터베이스 생성

```
mysql> create schema <데이터베이스명> default character set utf8mb4;
```

2. root directory에서 서버 실행

```
npm start
```
