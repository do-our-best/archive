const express = require("express");
const cookie = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
const dotenv = require("dotenv");
const nunjucks = require("nunjucks");
const multer = require("multer");

const fs= require("fs");
const path = require("path");
const http = require("http");

const IndexRouter = require("./router/IndexRouter");
const UploadRouter = require("./router/UploadRouter");
const LoginRouter = require("./router/LoginRouter");

dotenv.config();

const app = express();
// 이미지 폴더 생성
const IMAGE_PATH = path.join(__dirname,"public","img")
try{
    fs.readdirSync(IMAGE_PATH);
}catch (err){
    console.log(IMAGE_PATH+" 폴더 생성")
    fs.mkdirSync(path.join(__dirname,"public","img"));
}

app.set("port",process.env.PORT||8080);
// 템플릿 엔진 (nunjucks)
app.set("view engine","html");
nunjucks.configure(path.join(__dirname,"views"),{
    express:app,
    watch:true
});

// 개발용 dev 배포용 combined
app.use(morgan("dev"))
// 정적파일 로드
app.use(express.static(path.join(__dirname,"public","js")));
app.use(express.static(path.join(__dirname,"public","img")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookie(process.env.COOKIE_KEY));
const sessionMiddleware =session({
    saveUninitialized:false,
    secret:process.env.COOKIE_KEY,
    cookie:{
        httpOnly:true
    },
    name:'connect.sid'
});
app.use(sessionMiddleware);

// 라우터 연결
app.use(UploadRouter);
app.use(IndexRouter);
app.use(LoginRouter);

// 404 처리
app.use((req, res, next) => {
    res.render("error",{
        error:"url 을 확인해주세요"
    })
});
// 에러처리 미들웨어
app.use((err,req,res,next)=>{
    res.render("error",{
        error:err.message
    });
})

const server = http.createServer(app)
server.listen(app.get("port"),()=>{
    console.log("server is open : "+app.get("port"));
})
