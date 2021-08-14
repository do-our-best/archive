const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const PORT = process.env.PORT || 8080;

// 유저데이터를 담을 리스트
const userList = [];

/**
 * 에러처리 페이지
 * @param err 에러내용
 * @param req 요청
 * @param res 응답
 */
function errorPage(err, req, res) {
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.write("<h1>에러남</h1>")
    res.write(err.message);
    res.end();
}

/**
 * 메인페이지 로드 index.html
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getIndex(req, res) {
    try {
        const body = await fs.readFile(path.join(__dirname, "views", "index.html"));
        res.end(body);
    } catch (err) {
        errorPage(err, req, res);
    }
}

/**
 * 유저 데이터 로드
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getUser(req,res){
    try{
        res.writeHead(200,{"Content-Type":"application/json; charset=utf-8"});
        res.end(JSON.stringify(userList));
    }catch (err){
        errorPage(err,req,res);

    }
}

/**
 * About 페이지 로드 about.html
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getAbout(req, res) {
    try {
        const body = await fs.readFile(path.join(__dirname, "views", "about.html"));
        res.end(body);
    } catch (err) {
        errorPage(err, req, res);
    }

}

/**
 * post 요청 받을시 데이터에 유저 정보 추가
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function postUser(req, res) {
    try {
        let body = "";
        // 바디 데이터 버퍼단위로 가져오기
        req.on("data", data => {
            body += data;
        });
        // 전부 가져왔을때
        req.on("end", () => {
            // 추가된 아이템 JSON 형태로 응답
            res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
            console.log(`create item :${body}`);
            userList.push(JSON.parse(body));
            res.end(body)
        });
    } catch (err) {
        errorPage(err, req, res);
    }
}

/**
 * put 요청 받을시 유저정보 수정
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function putUser(req, res) {
    try{
        console.log(req.url)
        // 동적 파라미터 2번째 항목이 수정할 인덱스 번호
        const idx = req.url.split("/")[2];
        let body = "";
        req.on("data",data=>{
            body+=data;
        });
        req.on("end",()=>{
            console.log(`update item :${idx}  ${body}`)
            // body 가 string 타입이기때문에 형변환
            userList[idx].name = JSON.parse(body).name;
            res.end("Ok");
        });
    }catch (err){
        errorPage(err,req,res);
    }
}

/**
 * delete 요청 받을시
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteUser(req, res) {
    try {
        const pageIdx = req.url.split("/")[2]
        // a 번째 항목에서 b 개만큼 삭제
        userList.splice(pageIdx, 1);
        res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
        res.end(JSON.stringify({result: "Ok"}));
    } catch (err) {
        errorPage(err,req,res);
    }
}

const server = http.createServer(async (req, res) => {
    try {
        if (req.method === 'GET') {
            if (req.url === "/") {
                console.log("request get /")
                await getIndex(req, res);
            } else if (req.url === "/about") {
                console.log("request get /about")
                await getAbout(req, res);
            }else if(req.url ==="/user"){
                console.log("request get /user")
                await getUser(req,res)
            } else {
                console.log("request get "+req.url);
                // 정적파일 요청 .js, .css 등등
                const file = await fs.readFile(`.${req.url}`);
                res.end(file);
            }
        } else if (req.method === 'POST') {
            if (req.url === "/user") {
                console.log("request post /user")
                await postUser(req, res);
            }

        } else if (req.method === "PUT") {
            // put 요청이면서 user/ 로 시작하는 url 일 경우
            if (req.url.startsWith("/user/")) {
                console.log(`request put ${req.url}`)
                await putUser(req,res)
            }
        } else if (req.method === "DELETE") {
            if (req.url.startsWith("/user/")) {
                console.log(`request delete ${req.url}`)
                await deleteUser(req, res)
            }

        }
    } catch (err) {
        errorPage(err, req, res);
    }

});

server.listen(PORT, () => {
    console.log("server is open")
});