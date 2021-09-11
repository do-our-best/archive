const http = require("http");
const fs = require("fs");

const path = require("path")

const PORT = process.env.PORT || 8082;
const server = http.createServer(async (req,res)=>{
    try{
        // 콜백 방식
        // fs.readFile(path.join(__dirname,"index.html"),(err,data)=>{
        //     if(err){
        //         console.log(err)
        //     }else{
        //         console.log(data)
        //         res.end(data)
        //     }
        // });
        // async await 방식 실패시 catch 로 감
        // await 은 async 함수안에서만 사용가능
        // const body = await fs.promises.readFile(path.join(__dirname,"index.html"))
        fs.promises.readFile(path.join(__dirname,"index.html")).then(r=>{

            res.end(r)
        }).catch(e=>{
            console.log(e)
        })

        // res.end(body);

    }catch (err){
        res.writeHead(200,{
            'Content-Type':'text/html; charset=utf-8'
        });
        res.write("<h1>오류남</h1>");
        res.end(`<p>${err.message}</p>`);
    }
});

server.listen(PORT,()=>{
    console.log(`server is open!! ${PORT}`)

});
