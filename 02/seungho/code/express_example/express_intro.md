# [익스프레스](https://expressjs.com/)

##### [웹 프레임워크 다운로드 순위](https://www.npmtrends.com/express-vs-koa-vs-fastify)
![image](https://user-images.githubusercontent.com/68223593/129328272-7d54128e-7456-4aa0-99d7-136ef209d18e.png)

## 익스프레스 기본 사용법
```javascript
const express = require("express");

const app = express();

app.set("PORT",process.env.PORT||8080);

app.get("/",async(req,res)=>{
    res.send("<h1>Hello World!</h1>");
});

app.listen(app.get("PORT"),()=>{
    console.log(`server is open port is :${app.get("PORT")}`);
})
```

## 미들웨어
미들웨어 함수는 요청 오브젝트(req), 응답 오브젝트 (res), 그리고 애플리케이션의 요청-응답 주기 중 그 다음의 미들웨어 함수 대한 액세스 권한을 갖는 함수입니다. 그 다음의 미들웨어 함수는 일반적으로 next라는 이름의 변수로 표시됩니다.

미들웨어 함수는 다음과 같은 태스크를 수행할 수 있습니다.

모든 코드를 실행.
요청 및 응답 오브젝트에 대한 변경을 실행.
요청-응답 주기를 종료.
스택 내의 그 다음 미들웨어 함수를 호출.
현재의 미들웨어 함수가 요청-응답 주기를 종료하지 않는 경우에는 next()를 호출하여 그 다음 미들웨어 함수에 제어를 전달해야 합니다. 그렇지 않으면 해당 요청은 정지된 채로 방치됩니다.

Express 애플리케이션은 다음과 같은 유형의 미들웨어를 사용할 수 있습니다.

애플리케이션 레벨 미들웨어
라우터 레벨 미들웨어
오류 처리 미들웨어
기본 제공 미들웨어
써드파티 미들웨어
애플리케이션 레벨 및 라우터 레벨 미들웨어는 선택적인 마운트 경로를 통해 로드할 수 있습니다. 일련의 미들웨어 함수를 함께 로드할 수도 있으며, 이를 통해 하나의 마운트 위치에 미들웨어 시스템의 하위 스택을 작성할 수 있습니다.


## express 에서 send 와 http 의 end 차이
send 는 들어가는 바디의 타입을 보고 알아서 헤더에 Content-Type을 지정해주고
end 는 writeHead 로 Content-Type 으로 지정해줘야됨, 익스프레스에서는 주로 404 로 쓰임


## morgan bodyParser cookieParser
- morgan
- bodyParser : 예전에는 post 요청으로 보낸 body를 받을때 bodyParser 라이브러리를 사용했지만 지금은 내장되있음
```javascript
app.use(express.json()); // 클라에서 json 보낼때 파싱
app.use(express.urlencode({extended:true}))// form 보낼때 파싱
```

## static 미들웨어
정적파일을 미리 로드해주는 미들웨어
```javascript
app.use("경로",express.static("실제경로"));
app.use("/static",express.static(path.join(__dirname,"public")));
app.use(express.static(path.join(__dirname,"public")));
```
/ 에 정적파일을 제공하고싶을경우 / 는 생략가능


## 멀티파트 데이터 형식
이미지 파일 동영상 등을 업로드할때 폼으로 넘길때 해석 불가능
multer

## 템플릿 엔진
![image](https://user-images.githubusercontent.com/68223593/129348421-eee649e5-969f-49f5-a591-7e75735a8220.png)
