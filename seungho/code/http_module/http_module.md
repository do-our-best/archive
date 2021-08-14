# http 모듈로 서버 만들기

```
git clone https://github.com/do-our-best/archive.git
cd seungho/code/경로
node 실행시킬 파일.js
```

1. 노드 내장 모듈 불러오기
```javascript
const http = require("http");
const fs = require("fs");
const path = require("path");
```
2. 포트번호 설정
```javascript
const PORT = process.env.PORT || 8080;
```
process.env 에 등록된 PORT 가 있을시 등록된 포트번호로 사용하고  
등록된 포트번호가 없을시 8080으로 사용  
Heroku 는 반드기 process.env.PORT 로 적어줘야함  

3 서버 열기
```javascript
http.createServer(async(req,res)=>{
    try{
        
    }catch (err){
        
    }
}).listen(8080);
```
async await 문을 사용할경우 try catch 에서 오류 처리
```javascript
const server = http.createServer(async(req,res)=>{
    try{

    }catch (err){

    }
});
server.listen(8080,()=>{
    console.log("servier is open")
});
```
listen 함수에 골백 함수를 추가해 서버가 처음실행될때마다 실행가능

http 모듈 주요 명령어  
-res.write : 본문의 청크 보냄, 여러번 호출가능   
-res.end : 모든 메시지를 보내고 완료되었을때 보냄, 한번만 호출가능  
-res.writeHead : 응답 코드와 응답 헤더를 객체로 담아서 보냄  
-res.setHeader : 응답헤더에 하나의 값만 지정해서 보냄  
```javascript
res.setHeader("Content-Type","text/html; charset=utf-8");
// res.writeHeader(200,{"Content-Type":"text/html; charset=utf-8"});
res.write("<h1>Hello Node</h1>");
res.write("<h2>Hello Nest</h2>");
res.write("<h3>Hello WebRTC</h3>");
res.end();
```
setHeader 는 헤더에서 하나의 값만 설정할수 있고  
writeHeader 는 헤더의 값을 객체형태로 넘기기 때문에 여러가지 값을 한번에 지정할수 있음  
Content-Type 에서 인코딩을 utf-8 로 해야 한글이 안깨져서 나옴
write()는 여러번 쓸수 있고 end()는 한번밖에 못쓰지만 한 라우터에 end()가 반드시 들어가야 제대로 응답이 처리됨

4. 파일읽기

```javascript
const fs = require("fs");
// const file = fs.readFileSync(path.join(__dirname,"index.html"));
fs.readFile(path.join(__dirname,"index.html"),(err,data)=>{
    if(err){
        console.log(err)
    }else{
        console.log(data)
        res.end(data)
    }
});
```
>path.join 을 사용하는 이유  
> 경로를 편하게 쓸수 있다는 이유도 있지만  
> 가장 큰 이유는 운영체제에 따라 경로를 알아서 처리해줌  
> window 일때는 \ 리눅스 맥일때는 /

readFileSync 의 경우 동기적으로 파일을 읽기 때문에 서버 시작전에 읽어야되는 파일에 주로 사용
readFile 은 비동기적으로 파일을 읽기때문에 서버에서 파일 서빙할때 주로 사용
```javascript
const fs = require("fs").promises;
//async await 방식 실패시 catch 로 감
//await 은 async 함수안에서만 사용가능
try{
    const body = await fs.readFile(path.join(__dirname,"index.html"))
    res.end(body);
}catch (err){
    res.end(err)
    
}
```
async await 을 쓰려면 fs 모듈을 프로미스로 해줘야함  
또한 async 함수안에있어야 await 함수를 쓸수 있음  
await 함수는 비동기작업이 끝날때까지 기다렸다가 작업이 끝나면 다음 코드를 실행(개사기)  
```javascript
fs.promises.readFile(path.join(__dirname,"index.html")).then(r=>{
    res.end(r)
}).catch(e=>{
    console.log(e)
})
```
promise 는 then 기반이기 때문에 then catch 로도 사용가능

