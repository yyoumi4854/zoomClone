# Noom
Zoom Clone useing NodeJS, WebRTC and Websockets.

# Chat with webSockects
## 1. HTTP vs WebSockets
### http protocol에 대해 알아보자!
webSocket 덕분에 실시간 chat, notification 같은 real-time을 만들 수 있다.

유저가 **request**를 보내면 서버가 **response**로 반응... 계속 반복
```js
app.get("/", (req, res) => res.render("home"));
```
=> 유저가 home으로 GET request를 보내면 templete으로 반응

```js
app.get("/*", (req, res) => res.redirect("/"));
```
=> 유저가 어떤 페이지로 GET request를 보내도 redirect로 반응하도록
<br><br>
이게 바로 http이고, 인터넷 전체가 http를 기반으로 만들어 졌다.
<br>
http에서 기억해야 할 중요한 점은 **stateless**라는 것이다. 
<br>
즉 **backend가 유저를 기억하지 못하기 때문에** 유저와 backend사이에 아무런 연결이 없다.
<br>
request와 response과정 뒤에, backend는 유저를 잊어버리는 것이다! 
<br>
(response를 주면 끝~ 다음 resquest를 기다림)
<br>
=> 서버가 네가 누구인지 잊어버리는데 이러한 현상을 stateless라고 한다. (response후에, 서버는 잊다.)

유저, 서버에서 request, reponse하는 과정에서 real-time으로 일어나지 않는다!
1. 내가 request를 보내야 되고
2. 서버가 내게 아무것도 못 해주기 때문

서버가 나에게 "안녕" 이렇게는 못하고,
<br>
서버는 request를 기다려야 되고, 그런 다음에만 서버는 답장을 할 수 있게 된다.

> 정리
> - response과정 후, 서버는 네가 누구인지 잊고 다음 request를 받을 준비를 한다.
> - 이걸 http protocol이라고 하며, 모든 인터넷이 이 중심으로 구축이 됐다.

### webSocket에 대해 알아보자!
webSocket도 protocol이다.
<br>
webSocket을 사용해서 연결하고 싶고, 서버가 지원한다면 wss(Secure Web Socket)하면 된다.
```
https://~ -> wss://~
```
http와는 전혀 다른 protocol이다.

### 어떻게 webSocket이 작동하고, real-time을 어떻게 가능하게 해주는지 알아보자!
webSocket 연결(connection)이 일어날 때는 마치 악수하는 것처럼 작동한다.
<br>
브라우저가 서버로 webSocket request를 보내면, 서버가 받거나 거절하는데,
<br>
이러한 악수가 한번 성립되면, 연결은 성립(establish)이 된다.
<br>
브라우저와 서버가 손을 맞잡고 있는 것(터널과 유사)처럼 연결이 되면 브라우저랑 서버가 서로 커뮤니케이션하게 된다.

이제 연결돼있기 때문에 서버는 내가 누구인지 기억할 수 있고, 원한다면 서버가 유저에게 메시지를 보낼  수 있다.
<br>
즉 서버는 request를 기다리지 않아도 서버가 답장할 수 있게 된다.
<br>
서버는 "안녕"을 아무때나 보낼 수 있게 된다. (request, reponse 과정이 필요하지 않고, 그냥 발생)

```
서버 -(3개의 메시지)-> 유저
유저 -(1개의 메시지)-> 서버
서버 -(2개의 메시지)-> 유저
```
=> 가능한 이유는 bi-directional(양방향의) 연결이기 때문
<br>
이제 서버는 유저에게 메시지를 보낼 수 있고, 유저도 서버에게 메시지를 보낼 수 있다.
<br>
이점이 webSoket의 메리트!!
<br>
브라우저와 서버사이에 bi-directional한 연결이 있어서 서로에게 바로 갈 수 있는 길이 있게 된다! 

> 복습 <br>
> 브라우저는 서버에게 어떤 때나 메시지를 보낼 수 있다. <br>
> 서버는 브라우저에게 어떤 때나 메시지를 보낼 수 있다. <br>
> 브라우저-서버 간에는 실시간으로 계속 연결되어 있다. (양방향, 쌍방) <br>
> 어떤 때나 유저는 backend에 메시지를 보낼 수 있다. <br>
> backend도 유저에게 아무 때나 메시지를 보낼 수 있다는 것이다.

http에서는 서버는 유저에게 메시지를 보낼 수 없고, request를 기다리고서야 response를 줄 수 있었다.
<br>
이러 것들이 webSocket에서는 안 일어난다. 한번 연결되면, 전화 통화하는 것 처럼 서로에게 메시지를 보낼 수 있게 된다.

### webSocket
webSocket은 protocol이고, 자바스크립트 전용은 아니지만 규현된 게 있어서 자바스크립트에서도 사용할 수 있다.
<br>
그리고 당연히, 브라우저에는 내장된 webSocket API가 있다.
(서버와 연결하기 위해 브라우저에서 webSocket을 써볼예정이다.)
<br>
webSocket은 브라우저와 backend사이에서만 발생하지 않고 2개의 backend사이에서도 작동할 수 있다.
<br>
=> 브라우저-backend, backend-backend 가능

> http <br>
> stateless <br>
> - backend는 너를 기억하지 못하고, 너에게 답해줄 수만 있다.
> - 브라우저(클라이언트)는 request만 할 수 있다.
> - 탁구 같음

> webSocket <br>
> - 한번 연결이 성립되면, 두 방향(양방향) 연결이 생긴다.
> - 메시지를 보내고 받고, 또 원하는 만큼 할 수도 있고, 순서도 상관없음
> - request-response 필요없음
> - 자유로움

## 2. WebSokets in NodeJS
### ws
ws는 사용하기 편하고, 아주 빠르며, 클라이언트와 서버사이의 webSocket실행에서 검증

**implementation(실행)**
전에 2개의 protocol이라는 관점에서 ws를 http와 비교를 했을떄
- protocol은 어떤 사람들이 어딘가에 있는 방에서 만나고 어떻게 일들이 진행될지 결정한다.
- 어떻게 모든 것이 돌아가야 할지에 대한 규칙을 만든다.
    - 규칙 : 사람들이 방에 모여, 표준이 되는 규칙을 protocol을 만든다.
- 프로그래머는 이 규칙을 가지고 이 규칙을 따르는 코드를 만들어서 실행
=> 그래서 Node.js를 위한 webSocket implementation이라고 하는 것이고 이람은, 어떤 규칙을 따르는 코드라는 뜻이다.
```
npm i ws
```

> 결론
> - webSocket protocol을 실행하는 package
> - ws는 implementation일 뿐이고, webSocket의 핵심부분 
> - 채팅방은 ws에 포함되어 있지 않음 => 채팅방 기능이 추가된 framework : socket.io
> - ws는 webSocket의 core(중심적 핵심적인)이고, 가장 기초적인(부가적인 유틸리티, 부가기능 ❌) 기능 밖에 없다.

ws를 이용해서 public 채팅을 만들 예정<br>
ws서버를 만들지 않을거고 대신 exporess서버를 놓고 함께 합칠 예정<br>
=> 서로 다른 protocol이기 때문
- expresss는 http
- ws(webSocket)은 다른 protocol

1. ws를 사용해서 backend와 frontend사이의 connection(연결) 만들기
    - 메시지 주고 받기
webSocket을 이용해 backend와 연결하고 싶다면 js로 구현하면 된다.
클라이언트와 backend를 연결해주는 webSocket은 준비가 되어 있고 브라우저에서 지원이 된다.

## 3. WebSocket Event
webSocket도 event가 있고, event가 발동될 때 사용할 function을 만들면 된다.<br>
webSocket은 listen할 특정한 event명이 있고, ws에서도, 추가적인 정보를 받을 function이 존재한다.

**브라우저에서 event란 무엇일까?**
click, submit, Wi-Fi on/off

**webSocket에도 event가 있다.**
wss.on : event를 받고 function도 받는다.
```js
wss.on("", function);
""안에는 close, connection, error, headers, listening만 있다.
```

### connection : 서버와 브라우저 연결
```js
// server
wss.on("connection", (socket)=>)
```
- connection : 누군가가 우리와 연결(connect)했다는 것을 의미
    - **callback으로 socket**을 받는다.
- socket은 연결된 어떤 사람을 의미한다. 여기서는 연결된 브라우저와의 contact(연락)라인이다. 
    - **socke은 서버와 브라우저사이의 연결**
- socket을 이용하면 메시지를 주고 받기를 할 수 있다. socket을 어딘가에 저장(save)해야 된다.

front에게 backend랑 연결해달라고 해야된다.
```js
// app
var aWebSocket = new WebSocket(url [, protocols]);

const socket = new WebSocket("http://localhost:3000"); // 오류발생
const socket = new WebSocket(`ws://${window.location.host}`); // 수정
```
- http가 아니기 때문에 ws로 바꿔줘야 된다.
- localhost:3000을 그대로 쓰기 싫기 때문에 js로 불러올 거임

## 4. WebSocket Messages
브라우저에 메시지를 보내자!
```js
// server
wss.on("connection", (socket) => {
    console.log("Connected to Browser");
    socket.send("hello"); // socket으로 data 보내기
});
```

### open : 서버와 연결 되었을 때 발생
```js
// app
socket.addEventListener("open", ()=>{
    console.log("Connected to Server O");
})
```
- socket이 connection을 open했을 때 발생

socket에 message 이벤트를 추가
### message : 서버로부터 메시지를 받을 때 발생
```js
// app
socket.addEventListener("message", (message) => {
    console.log("New message: ", message.data);
});
```

### close : 서버와 연결이 끊어졌을 때 발생
```js
// app
socket.addEventListener("close", () => {
    console.log("Disconnected from Server X");
});
```

```js
// server
wss.on("connection", (socket) => {
    console.log("Connected to Browser");
    socket.on("close", ()=> console.log("Disconnected form the Browser X")) // 서버를 닫으면 실행(터미널)
    socket.send("hello"); // socket으로 data 보내기
});
```
양방향적임
- 브라우저의 연결이 끊기면, 서버에 event를 발생시키고
- 서버가 오프라인이 되면, 브라우저한테 알려준다.
- 우리는 frontend에서 보낸 메시지를 backend에서 받는 방법을 모르지만, backend에서 frontend로 보낸 메시지를 받는 방법은 안다.

### 이제 frontend에서 backend로 메시지를 보내보자!
1. 메시지 보내기
    - 즉시 실행되길 원하지 않기에, timeout을 사용
```js
// app
setTimeout(()=>{
    socket.send("hello from the browser!"); // 10초 뒤에 작동
});
```

```js
// server
wss.on("connection", (socket) => {
    console.log("Connected to Browser"); // 브라우저가 연결되면, 무언가를 console.log하고
    socket.on("close", ()=> console.log("Disconnected form the Browser X")) // 브라우저가 꺼졌을 때를 위한 listener를 등록
    socket.on("message", (message) => {
        console.log(message);
    }); // 브라우저가 서버에 메시지를 보냈을 때를 위한 listener도 등록
    socket.send("hello"); // 브라우저에 메시지를 보내도록
});
```
매번 새로운 브라우저가 backend로 연결할 때 이 코드는 backend와 연결된 각 브라우저에 대해 작동할 것이다.

```js
// app
const socket = new WebSocket(`ws://${window.location.host}`); // backend에 연결

// connection이 open일때 사용하는 listener를 등록
socket.addEventListener("open", ()=>{
    console.log("Connected to Server O");
});

// 메시지를 받았을 때 사용하는 listenrt를 등록
socket.addEventListener("message", (message) => {
    console.log("New message: ", message.data);
});

// 서버가 오프라인이 됐을 때 사용하는 listener도 등록
socket.addEventListener("close", () => {
    console.log("Disconnected from Server X");
});

// 이제 브라우저에서 보낸 hello~를 backend에서 받을 수 있을지 확인
setTimeout(()=>{
    socket.send("hello from the browser!"); // 10초 뒤에 터미널에서  작동
});
```

# 5. Recap
backend
- websocket server를 만들었고 지금 connection이라는 이벤트를 listen하고 있다.
- connection event가 발생하면 반응을 해줘야 된다.
- socket.on message는 특정 socket에서 메시지를 받았을 때 발생
- event listener를 추가해 주었고 메시지를 브라우저로 전달 했다.
- back-end에서도 front-end로 뭔가 보내고 있다. (socket.send())
- socket.on("message") 사용

frontend
- 브라우저에서는 backend와 connection을 열어 주고, 다시 event listener를 등록했다.
- front-end가 back-end로 뭔가 보낼 수 있다. (setTimeOut)
- socket.addEventListener("message") 사용

## 6. Chat Completed
서버가 firefox로 부터 메시지를 받아 brave에 전달<br>
=> 이렇게 하기 위해서는 누가 연결이 되었는지 알아야 된다.
- 현재 firefox와 brave로 메시지를 보내고 있지만 누가 연결되었는지는 모른다.
- 그리고 server에서 wss.on부분은 2번 작동된다. -> firefox, brave => 2번
- 이러한 이유로 둘다 서버와 연결이 되었다 나오고 새로운 메시지를 받게 된다.
=> 같은 코드가 두개의 브라우저와 연결된 것!!

그래서 우리는 fake database를 만들어 줄 것이다.
```js
// server
const sockets = [];
```
누군가 우리 서버에 연결하면, 그 connection을 위 코드에 넣어줄 것이다.
```js
// server
const sockets = []; // 여기에 socket 2개가 생성 된다. [brave, firefox]

wss.on("connection", (socket) => {
    sockets.push(socket); // 추가
    console.log("Connected to Browser");
    socket.on("close", ()=> console.log("Disconnected form the Browser X")) 
    socket.on("message", (message) => {
        sockets.forEach(aSocket => aSocket.send(message))
    });
    socket.send("hello");
});
```
- firefox가 연결될 때, firefox를 이 array에 넣어주고
- brave가 연결될 때는 brave를 array에 넣어준다.
- 이렇게 하면 받은 메시지를 다른 모든 socket에 전달해줄 수 있다.
- aSocket : 각 브라우저를 aSocket으로 표시하고 메시지를 보낸다는 의미
- 이제 연결된 모든 socket들에 접근할 수 있다.

## 7. Nicknames part One
```js
// app
function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value);
    input.value = "";
}
```
문제 : back-end로 nickname을 보내야 한다. 하지만, back-end는 message들을 구분 하지 못한다.<br>
왜냐하면, 우리가 메시지를 보낼 때, 그냥 모두에게 보내고 있기 때문이다.

하지만 우리는 메시지를 구별해주는 어떤 방법이 필요하다.<br>
왜냐하면, 어떤 메시지는 내 nickname을 저장하기 위한 메시지일 수 있고 다른 메시지는 chat에서 다른 사람들에게 보내는 메시지일 수 있으니
=> server에 있는 message는 아무메시지나 해당되고 그러기 때문에 메시지 type같은 것을 만들어야 된다.
```js
// app
function handleNickSubmit(event){
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(input.value);
    input.value = "";
}
```

text를 보내는 대신 json을 보낼 예정
```js
{
    type: "message",
    payload: "hello everyone!",
}
{
    type: "nickname",
    payload: "nico",
}
```
이 2가지 type의 메시지를 구별해 줄 수 있어야 한다.<br>
하지만 socket.send()는 string data만 보낼 수 있다.<br>
- JSON.stringify를 사용하면 json을 text로 교체할 수 있다.
- 반대로 JSON.parse를 사용하면 text를 json으로 교체할 수 있다.

- back-end에서 socket으로 메시지를 전송하고 싶으면 우리는 object를 가져와서 string으로 만들어줘야 된다.
- front-end에서도 동일하게 string을 가져와서 새로운 메시지가 왔을 때, 그 string을 object로 만들어야 한다.
```js
// app
function makeMessage(type, payload){
    const msg = {type, payload};
    return JSON.stringify(msg);
}

function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    input.value = "";
}

function handleNickSubmit(event){
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
    input.value = "";
}
```
메시지를 전송하고 싶으면, makemessage function을 불러주면 된다.<br>
이제 back-end로 메시지를 전송할 때 마다 우리는 string을 전송<br>
하지만, string을 보내기 전에, object를 만들고 그 object를 string으로 만들었다.

## Nicknames part Two
back-end로 javascript object를 보내면 좋지 않다.<br>
왜냐하면, 연결하고 싶은 front-end와 back-end서버가 javascript 서버가 아닐 수도 있기 때문이다. (java서버일수도 있고 GO서버일 수도 있다.)<br>
이러한 이유로 javascript object를 back-end로 보내면 안된다.<br>
그러므로 string을 보내야 되고 back-end에 있는 모든 서버는 그 string을 가지고 뭘 할지 정해야 된다.

왜 object를 보낼 수 없는거야?
왜 object를 string으로 바꿔줘야하는 건가?<br>
- 이렇게 해야하는 이유는 websocket이 브라우저에 있는 API이기 떄문이다.
- 백엔드에서는 다양한 프로그래밍 언어를 사용할 수 있기 때문에 API는 어떠한 판단도 하면 안된다.

우리는 back-end에서 이 string을 javascript object로 바꿔야 한다.
```js
// server
const sockets = []; // 여기에 socket 2개가 생성 된다. [brave, firefox]

wss.on("connection", (socket) => {
    sockets.push(socket); // * firefox연결해서 firefox를 socket array에 저장
    socket["nickname"] = "Anon" // 3 * 즉시 socket에 nickname (익명)을 줌
    console.log("Connected to Browser");
    socket.on("close", ()=> console.log("Disconnected form the Browser X")) 

    // 메시지 전달
    socket.on("message", (msg) => { // * socket이 메시지를 보낼 때까지 대기
        const message = JSON.parse(msg);
        switch(message.type){ 
            case "new_message": // * socket이 new_message type를 보내면
                sockets.forEach(aSocket => aSocket.send(`${socket.nickname} : ${message.payload}`)) // 4
                // * 다른 모두에게 그 익명의 socket이 보낸 메시지를 전달
            case "nickname" // * socket이 nickname type를 보내면 
                socket["nickname"] = message.payload; // 2 
                // * 메시지에 뭐가 있든지 그것을 firefox의 nickname으로 바꿔즘
        }
    });
    socket.send("hello");
});
```
1. type은 메시지의 종류, payload는 메시지에 담겨있는 중요한 정보
2. socket이 누구인지 알기 위해 socket에 새로운 item을 추가 -> socket은 기본적으로 객체이기 때문
    - 내가 nickname type message를 받으면 nickname을 socket에 넣어주고 있다.
3. 아직 nickname을 정하지 않은 사람들도 있기 때문에 이러한 경우 socket이 연결될 때
    - 따라서 메시지가 socket에서 전송되고 메시지의 type이 new_message이면
4. nickname property를 socket object에 저장하고 있다.

wss.on connection안에 있는 코드는 2번 실행된다. firefox, brave 2번

## 9. Conclusions
개선사항
1. 메시지를 보낼때 보낸 후 값을 비워 주고 있다.
    - 분명 나를 제외하고 다른 사람 모두에게 메시지를 보내는 방법이 있을 것이다.