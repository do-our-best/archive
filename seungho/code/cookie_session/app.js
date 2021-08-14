const http = require("http");
const path = require("path");
const url = require("url");
const qs = require("querystring");
const fs = require("fs").promises;

const parseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

async function getIndex(req, res) {
    const cookie = parseCookies(req.headers.cookie);
    if (cookie.name) {
        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });
        res.end("환영합니다 " + decodeURIComponent(cookie.name));
    } else {
        const file = await fs.readFile(path.join(__dirname, "index.html"));
        res.end(file)
    }
}

const server = http.createServer(async (req, res) => {
    if (req.method === "GET") {
        if (req.url === "/") {
            await getIndex(req, res);
        }
        if (req.url.startsWith("/login")) {
            const baseURL = 'http://' + req.headers.host + '/';
            // url.parse(req.url)
            console.log(baseURL)
            const {search} = new URL(req.url, baseURL);
            const cookieName = qs.parse(search)['?name'];
            const expires = new Date();
            expires.setSeconds(expires.getSeconds() + 10)
            // 302는 리다이렉션
            // 200 하면 안됨
            // httpOnly 를 하지 않을경우 프론트에서 document.cookie 로 접근할수 있음
            res.writeHead(302, {
                "Content-Type": "text/html; charset=utf-8",
                "Set-Cookie": `name=${encodeURIComponent(cookieName)}; Max-Age=5000; `,
                "Location": "/"
            });
            res.end();
        }
    }
});

server.listen(8080, () => {
    console.log("server is open");
})