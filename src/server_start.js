import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
// url를 선언하고, 유저가 url로 가면, req와 res를 받고 response를 보낸다.
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

// express로 같은 서버에 ws기능을 설치
/*
=> 서버는 http, ws 2개의 protocol을 이해할 수 있게 되었다.
http서버가 있으면, 그 위에서 ws서버를 만들 수 있고, 2개의 protocol 다 같은 port를 공유하게 됨
우리의 서버는 http protocol과 ws connection(연결)을 지원하게 됨
*/
const handleListen = () => console.log(`Listening on http://localhost:3000`);

// http서버 : views, static files, home, redirection을 지원
const httpServer = http.createServer(app); // 서버에 접근 가능해지고 이 서버에 webSocket을 만들 수 있음
// webSocket서버
const wss = new WebSocket.Server({server}); // http서버, webSocket서버 둘 다 돌릴 수 있게 된다. 

const sockets = [];

const onSocketClose = () => {
    console.log("Connected from the Browser ❎");
}

// connection : 누군가가 우리와 연결(connect)했다는 것을 의미
// 연결된 브라우저와의 contact(연락)라인을 의미한다.
// 콜백 socket이 frontend와 real-time(실시간)으로 소통할 수 있다.
wss.on("connection", (socket)=>{
    sockets.push(socket);
    socket["nickname"] = "Anon";
    console.log("Connected to Browser ✅");
    socket.on("close", onSocketClose);
    socket.on("message", (msg)=>{
        const messageString = msg.toString('utf8');
        const message = JSON.parse(messageString);
    
        switch (message.type) {
            case "new_message":
                sockets.forEach(aSocket => aSocket.send(`${socket.nickname}: ${message.payload}`));
            case "nickname":
                socket["nickname"] = message.payload;

        }
    });
});

/*
http 서버 위에 webSocket 서버를 만들 수 있도록
이렇게 하는 이유는, 우리의 서버를 만들고(보이게 노출시키고) 그 다음 http서버 위에 ws서버를 만들기 위해
그러므로 localhost는 동일한 포트에서 http, ws request 두 개를 다 처리할 수 있음
*/
httpServer.listen(3000, handleListen);