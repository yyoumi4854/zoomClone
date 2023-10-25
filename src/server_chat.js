import http from "http"; // node.js에 이미 설치되어 있기 때문에 따로 설치할 필요 없음
import {Server} from "socket.io";
import {instrument} from "@socket.io/admin-ui";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));


const handleListen = () => console.log(`Listening on http://localhost:3000`); // http or ws 작동시킬 수 있다.

// http서버
const httpServer = http.createServer(app);
// socket io 서버
const wsServer = new Server(httpServer, {
    cors: {
        origin: ["https://admin.socket.io"],
        credentials: true,
    }
});
instrument(wsServer, {
    auth: false
})

const publicRooms = () => {
    // sockets에 있는 sids, rooms 가져오기
    const {
        sockets: {
            adapter: {sids, rooms},
        },
    } = wsServer;

    // public rooms list 만들기
    const publicRooms = [];
    // private room이 아닌 방만 남음
    rooms.forEach((_, key) => {
        if(sids.get(key) === undefined){
            publicRooms.push(key);
        }
    });
    return publicRooms;
}

// 한 방에 몇 명이 있는지 계산
const countRoom = (roomName) => {
    // 하지만 가끔 roomName을 찾을 수도 있지만 아닐수도 있기 때문 ?로 해줘야 된다.
    return wsServer.sockets.adapter.rooms.get(roomName)?.size
}

// connection을 받을 준비 완료
wsServer.on("connection", (socket) => { // socket에 접근
    socket["nickname"] = "Anon(익명)"

    // ocket에 있는 모든 event를 살피는 스파이(현재 내가 socket에서 무슨 이벤트를 사용하는지 알 수 있다.)
    socket.onAny((event) => { // middleware와 비슷, 이건 어느(any) event에서든지 console.log를 할 수 있다.
        console.log(wsServer.sockets.adapter);
        console.log(`Socket Event : ${event}`); // ex) Socket Event : enter_room
    });

    // 방 입장
    socket.on("enter_room", (roomName, done)=> {
        socket.join(roomName); // 방에 참가
        done(); // showRoom() 실행

        // 메시지를 하나의 socket에만 보냄
        socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName)); // "welcome" event를 roomName에 있는 모든 사람들에게 emit함
        // 메시지를 모든 socket에 보냄
        wsServer.sockets.emit("room_change", publicRooms());
    });

    // disconnecting : 고객이 접속을 중단할 것이지만 아직 방을 완전히 나가지는 않음
    socket.on("disconnecting", ()=>{
        socket.rooms.forEach((room)=>socket.to(room).emit("bye", socket.nickname, countRoom(room) - 1));
    });

    // 클라이언트가 종료 메시지를 모두에게 보낸 다음 모두에게 room이 변경됐다고 알려줌
    // disconnect : 연결이 완전히 끊어졌다는 것 
    socket.on("disconnect", ()=>{
        wsServer.sockets.emit("room_change", publicRooms());
    });

    // 메시지 받기
    socket.on("new_message", (msg, room, done) => {
        socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
        done();
    });
    socket.on("nickname", nickname => socket["nickname"] = nickname)
});

httpServer.listen(3000, handleListen);