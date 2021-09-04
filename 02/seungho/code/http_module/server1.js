const http = require("http");

const PORT = process.env.PORT || 8080;
const server = http.createServer(async (req,res)=>{
    try{
        // throw Error("강제로 오류 만들기");
        res.setHeader("Content-Type","text/html; charset=utf-8");
        res.write("<h1>Hello Node</h1>");
        res.write("<h2>Hello Nest</h2>");
        res.write("<h3>Hello WebRTC</h3>");
        res.end();
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

})

