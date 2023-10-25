 # Socket.io

 ## SocketIO vs WebSockets
 **socket.io**
 - 실시간 기능을 만들어주는 framework
 - soket.io는 나온지 매우 매우 오래 되었고, 안정적이다.

 **socket.io의 역할**
 - 실시간, 양방향, event기반 통신을 가능하게 한다.
 - websocket하고 매우매우 유사하다.

 **websocket**
- 실시간으로 작동
- 양방향으로 통신(브라우저와 back-end의 양방향을 의미)
- 메시지를 주고 받음
- event기반 통신 (message, close, connection ...)

 **socket.io**
- websocket을 실행하는건 아니다.
- framework이며, 실시간, 양방향, event기반 통신을 제공
- websocket보다 탄력성이 뛰어난다.
- Socket IO가 실시간, 양방향, event 기반 통신을 제공하는 방법 중 하나 (많은 방법 중 하나일 뿐이다.)
> 만약 나의 브라우저가 websocket을 지원하지 않는다고 하거나 나의 핸드폰에서 websocket을 지원하지 않는다고 하면 <br>
> websocket에 문제가 생겨도 socket IO는 계속 작동을 한다.
- socket.io는 **"websocket의 부가기능"**이 아니며, 가끔 websocket을 이용해서 실시간, 양방향, event기반 통신을 제공하는 framework
- 만약 websocket이용이 불가능하면, socket IO는 다른 방법을 이용해서 계속 작동한다.

> - 만약 socket IO가 브라우저 websocket을 지원한다는 것을 확인하면 socket IO는 websocket을 이용할 거다.
> - 만약 firewall, proxy가 있어도 socket IO는 계속 작동

**What Socket.IO is not**
- Socket.IO는 websocket의 부가기능이 아니다.
- Socket.IO는 websocket을 사용한다. 하지만 websocket을 지원하지 않으면 다른 것을 사용한다.
    - 만일 websocket을 지원하지 않을 경우(연결을 할 수 없는 경우), HTTP long polling 같은 것을 사용
- Socket.IO는 만약 wifi연결이 잠기동안 끊겨도 socket.IO는 재연결을 시도
    - websocket의 경우에는 재연결 기능을 넣고 싶으면 우리가 직접 만들어줘야 된다.
- Socket.IO는 websocket을 사용하지만 이것만 사용하지는 않는다.
    - 우리에게 신뢰성(reliability)을 주는 것이다.
    - 브라우저가 websocket 지원을 안하거나, websocket 연결에 문제가 있거나, 회사에서 websocket사용이 안되거나, Firewall 혹은 proxy가 있거나 => Socket IO는 실시간 기능을 제공해준다.

**누가 socket.io를 사용하는가?**
- 많은 카지노, 도박 사이트가 있다. => 그만큼 socket.io를 신뢰할 수 있다는 말이다.
    - 카지노, 도박 사이트는 실시간 기능이 필요

> **socket.io 정리**
> - socket.io는 websocket의 부가기능이 아니다.
> - socket.io는 프론트와 백엔드 간 실시간 통신을 가능하게 해주는 프레임워크 또는 라이브러리이다.
> - front-end와 back-end간 실시간 통신을 websocket을 이용해서 할 수 있다.
> - front-end와 back-end간 실시간 통신을 하기 위해서 꼭 socket.io를 사용할 필요는 없다. 하지만 socket.io는 실시간 기능 같은 것을 더 쉽게 만드는 편리한 코드를 제공한다.
> - socket.io는 탄력성이 있다. socket.io가 websocket을 이용한 연결에 실패를 해도 다른 방법을 찾는다.
> - 모든 platform, 모든 브라우저, 모든 디바이스에 이용 가능 -> 신뢰성과 빠른 속도를 제공
> - 물론 socket.io는 websocket보다 조금 더 무겁다.

신뢰성
- 자동 재연결 지원
- 연결 끊김 확인
- 바이너리 지원

## 2. Installing SocketIO
```bash
npm i socket.io
```
이전에는 먼저 HTTP서버를 만들었고, 새로운 websocket을 만들 때 HTTP를 쌓아올리면서 만들었다.<br>
=> socket.io도 마찬가지
```js
// server
const io = SocketIO(server);
```
이렇게 socket.io를 설치해주는 것으로 socket io는 url을 준다.<br>
=> localhost:3000/socket.io/socket.io.js
- socketIO가 websocket의 부가기능이 아니기 때문
- Socket IO는 재연결 같은 부가기능이 있다.
- 그러므로 websocket을 사용할 수 없을 때 socket IO는 다른 것을 사용한다.

socket.io를 서버에 설치한 것처럼 client도 socket.io를 설치해야된다.<br>
왜냐하면 socket.io는 websocket의 부가기능이 아니다.
> 과거에는 back-end에 아무것도 설치할 필요가 없었다. 왜냐하면 브라우저가 제공하는 websocket API를 사용하면 되었으니까 하지만 브라우저가 주는 websocket은 socket IO와 호환이 안된다. 왜냐면, socket.io가 더 많은 기능을 주기 때문이다. <br>
> 그래서 **socket.io를 브라우저에 설치해야 된다.**

=> 그래서 URL을 준 거고, front-end에서는 이걸 쉽게 import할 수 있다.
**front-end에 import하기**
```pug
// pug
// socket.io 설치
script(src="/socket.io/socket.io.js")
```
websocket보다는 조금 무겁다.<br>
왜냐하면 websocket API는 브라우 저에 설치되어 있었지만<br>
이제는 socketIO를 사용할 예정이기 때문에 front-end와 back-end에 socket.io를 설치해줘야 된다.

```js
// server
// connection을 받을 준비 완료
wsServer.on("connection", (socket)=>{
    console.log(socket);
});
```
```js
// app
// socket.io를 front-end와 연결
const socket = io();
```
- io는 자동적으로 back-end socket.io와 연결 해주는 function이다.
- io function은 알아서 socket.io를 실행하고 있는 서버를 찾을 것이다.

socket.io설치했고, 새로운 connection을 등록할 준비가 되었고, socket.io를 front-end와 연결할 수 있게 되었다.

## 2. socketIO is Amazing
room에 대한 개념
- user가 웹상이트로 가면 방을 만들거나 방에 참가할 수 있는 form을 보게 되는데
- socket.io에는 이미 room 기능 이 있다.
- socket.io를 이용하면 방에 참가하고 떠나는 것이 매우 간단해진다.
    - 방에 메시지를 보내는 기능 구현 가능

이미 만들어진 방에 참가하는 것과 방을 만드는 것에는 차이가 없다. (같은거임)<br>
존재하지 않는 방에 참가하면 방을 만들고 한명만 있는 방이 된다.<br>
이미 존재하는 방에 참가하더라도, 같은 일을 한다.<br>
방의 유뮤와 상관없이 그냥 방에 들어가는 거다.

**socket.send가 아닌 socket.emit을 쓰고 메시지를 보낼 필요가 없다. 그리고 우리가 원하는 것을 emit 해주면 된다.**
```js
// app
function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("room", {payload: input.value}); // 요기
    input.value = "";
}
```
emit()
- 항상 메시지를 보낼 필요가 없으며, 여기서는 room이라는 event를 emit해주면 된다.
    - 내가 만들고 싶은 어떤 event라도 만들 수 있다.
- emit을 하면 argument를 보낼 수 있다.
    - argument는 object가 될 수 있다.
    - 예를들어 payload라 할 수 있는데 이건 input.value라고 할 수 있다.
- websocket은 메시지만 전송하면 되었고 object도 보낼 수 없었다.
    - object를 string으로 변환시키고 그 다음에 string을 전송 할 수 있었다.

socket.io를 이용하면 이렇게 할 필요가 없다.
1. 특정한 event를 emit해 줄 수 있다. (어떤 이름이든 상관없다.)
2. object를 전송 할 수 있다. (전처럼 string만 전송 할 필요가 없다.)

**이제 room 메시지를 전송하고 있는데 back-end에서는 어떻게 보일까?**
```js
// server
wsServer.on("connection", (socket)=>{
    socket.on("enter_room", (msg)=>console.log(msg)); // app에서도 room -> enter_room으로 교체
}); // {payload: 'nicoroom'} 오브젝트 출력
```
- 이제 `socket.on("message", (msg)=>{...})`처럼 쓰지 않는다.
- socket.on 뒤에 우리가 원하는 event를 넣어주면 된다.

개선
1. 어떤 event든지 전송할 수 있다.(모든 것이 가능하고 꼭 message event가 아니여도 된다.)
2. Javascript object를 전송할 수 있다. (전에는 string만 보낼 수 있었기 때문에 Object를 string으로 바꿔줘야 했다.) -> 이제 socket.io가 모두 처리해줌

**발전된 사항**
1. 직접 만든 event가 있으며 꼭 message가 아니여도 된다.
    - 우리가 원하는 어떠한 event도 상관 없다.
2. front-end에서 object를 전송할 수 있다.
    - socket.io는 object를 string으로 바꿔주고, 다시 알아서 javascript object로 만들어 준다.
    - callback은 서버로 부터 실행되는 function

```js
// app
// socket.emit의 3번째 argument로 function을 넣어줄거임
socket.emit("room", {payload: input.value}, ()=>{
    console.log("server is done!"); // 이 function은 서버에도 보냄
});
```
socket.emit를 사용하고 있으며
1. 첫번째 argument에는 **event 이름**
    - 물론 emit과 on은 같은 이름, 같은 string이어야 한다.
2. 두번째 argument에는 **보내고 싶은 payload**
    - JSON object
3. 서번째 argument에는 **서버에서 호출하는 function**
    - function

서버로 부터 function을 호출 할 수 있는데 그 function은 front-end에 있다.

```js
// server
// 오래 걸리는 일을 한다고 가정
// 이제 서버는 두번째 argument인 done이라는 function을 호출한다
socket.on("enter_room", (msg, done)=>{
    console.log(msg);
    setTimeout(()=>{
        done();
    }, 10000);
});
```
- 서버에서는 done이라는 function을 호출한다.
- 이제 서버는 두번째 argument인 done이라는 function을 호출한다.
- 그리고 서버가 done()을 실 행 시키면 app.js의 세번째 argument는 front-end에서 실행된다.

=> 서버는 back-end에서 function을 호출하지만 function은 front-end에서 실행된다.

## 3. Recap
emit 메서드의 arguments를 알아보자
- webSocket에서는 message만 보낼 수 있었다.
- 오직 string으로 되어있는 메시지만 보낼 수 있었으며, string을 parse하고 message.type을 얻을 수 있었다.

=> 하지만 socket.io를 사용하면 이렇게 안해도 된다.

1. socket.io를 이용하면, 모든 것이 message일 필요가 없다.
- 만약 여러 type의 메시지가 생기면 메시지 function이 엄청 커지기 때문에 힘들어진다.
- 대신 client는 내가 원하는 어떠한 event든 모두 emit해줄 수 있다.
2. 서버가 종료되어도 계속해서 재연결을 시도한다.
- 서버를 다시 시작하면 연결이 복구된다.
- 연결이 끊어졌다가 다시 연결이 된다.
3. 전송할 때 내가 원하는 아무거나 전송 할 수 있다.
- websocket은 text만 전송가능했지만 이제는 숫자를 전송할 수 있고, object를 전송할 수 있다.
- 한 가지만 보내야한다는 제약이 없다. 내가 원하는 만큼 전송 할 수 있다. (argument를 여러개 보낼 수 있다.)
```js
// app
socket.emit(
    "enter_room",
    {payload: input.value},
    5,
    "hello",
    333,
    true,
    false
);

//server
socket.on("enter_room", (a,b,c,d,e,f)=>{
    console.log(a,b,c,d,e,f);
}); // 터미널에 {payload: input.value} 5 "hello" 333 true false 출력된다.
```

기억!!
1. send말고 emit
- 내가 원하는 것 모두 emit 가능
- 단, socket.emit과 socket.on에는 같은 이름을 사용
2. 원하는 만큼 back-end에 보낼 수 있다.
- 무제한 argument
- object를 보내고 back-end에서 console.log하면 object를 받을 수 있다. -> string만 보내지 않아도 된다.

**socket에서 메시지를 받고 싶고(처리 비용이 크고, 시간이 오래 걸리는 작업을 해야 한다면), front-end에 작업을 완료했다고 알리고 싶을 경우**
- socket.io의 경우에는 마지막 argument가 있다. (**꼭 마지막 argument여야 한다.**)
- 만약 끝날 때 실행되는 function을 보내고 싶으면 마지막에 넣어야 된다.

function은 back-end에서 실행되는게 아니다. 만약 그렇게 된다면 엄청난 보안 문제가 된다.<br>
back-end는 front-end에서 오는 코드를 실행시키면 안된다.(그러면 엄청난 보안 문제가 생김)<br>
왜냐하면, 사람들이 아무 코드를 쓰면 back-end는 실행됨으로 이런 상황이 생기면 안된다.
```js
// app
// backendDone이라는 function을 만듬
function backendDone(){
    console.log("backend done"); 
}

function handleRoomSubmit(event){
    ...
    socket.emit(
        "enter_room",
        input.value,
        backendDone // 그리고 이 function을 back-end에 보내고 있다.
    );
    ...
}

// 이렇게 하면 back-end는 두개의 argument를 받는다.
//server
socket.on("enter_room", (roomName, done)=>{// 방 이름, call할 function
    console.log(roomName);

    // 10초 후에 done이라는 function을 call해줌
    setTimeout(()=>{
        done(); // done function을 call했을 때 back-end가 app.js에 있는 backendDone()을 실행 시키지 않는다. (보안의 큰 문제가 생김) -> front-end에서 실행
    })
}); 
// 실행시키지 않는 이유는 보안 문제가 생길 수 있기 때문
```
back-end에서 끝났다는 사실을 알리기 위해 function을 넣고 싶다면<br>
그 function이 가장 마지막 argument가 되어야한다.<br>
가운데에는 아무 argument를 보낼 수 있지만 마지막 argument는 꼭 function이 와야 한다.

done function을 실행시켰을 때, 어떤 일이 생기나면<br>
front-end에서 function을 실행시킴<br>
back-end에서 done()을 실행시키지 않는다. 왜냐면 보안 문제가 생길 수 있기 때문이다.<br>
신뢰하지 못한 코드는 back-end에서 실행 시키면 절대로 안된다.<br>
그래서 done()을 실행시켰을 때 back-end에서 코드를 실행시키는 것이 아니고<br>
front-end에서 실행 버튼을 눌러준다고 생각하면 된다.<br>
front-end에 있는 backendDone function은 back-end가 실행을 시킨 것이다.

> 한번더! <br>
> front-end에서 실행 된 코드는 back-end가 실행을 시킨거다.

보통 HTTP는 사람들이 request를 보내면 loading을 보여주고 기다린 뒤에 HTTP request에 대해 결과를 보여준다. -> 이렇게 하면 오래 걸릴 수 있다.<br>
socket.io에서는 back-end에서 실행시키는 코드를 만들 수 있다.<br>
그리고 back-end에서 backendDone function에 argument를 보낼 수 있다.
```js
// back-end에서 backendDone function에 argument를 보낼 수 있다.

// app
function backendDone(msg){
    console.log(`The backend says: ${msg}`); 
}

function handleRoomSubmit(event){
    ...
    socket.emit(
        "enter_room",
        input.value,
        backendDone
    );
    ...
}

//server
socket.on("enter_room", (roomName, done)=>{
    console.log(roomName);

    setTimeout(()=>{
        done("hello from the backend");
    })
}); 

// 브라우저 콘솔에 The backend says: hello from the backend
```
=> emit의 마지막 argument가 function이기만 하면 된다.
- 첫번째는 반드시 event 이름
- 그 다음은 내 마음데로
- 마지막은 function -> function을 실행시키고 싶을 때 사용

## 4. Rooms
서로 소통을 할 수 있는 socket 그룹이 필요하다.<br>
이 개념을 가장 잘 서명할 수 있는 건 chat room이다.

socket.io는 기본적으로 room을 제공한다.
```js
// server
// 방에 참가하는 기능
socket.jion("룸이름");
```

```js
io.on("connection", (socket) => {
    console.log(socket.rooms); // Set {<socket.id>}
    socket.join("room1"); // "room1"방에 참가
    console.log(socket.rooms); // Set {<socket.id>, "room1"}
});
```
- socket.id : socket의 id를 보여줌(socket에는 id가 있어 id로 구별 가능)
- socket.rooms : socket에 있는 rooms를 보여줌(socket에 어떤 방이 있는지 확인)
- socket이 현재 어떤 room에 있는지 알 수 있다.

```js
socket.onAny((evnet, ...args) => {
    console.log(`got ${event}`);
});
```
- socket.onAny : middleware와 비슷, 이건 어느(any) event에서든지 console.log를 할 수 있다.
- 내가 enter_room이벤트를 사용했으면 event는 enter_room이 나옴
- socket에 있는 모든 event를 살피는 스파이

user의 id는 user가 있는 방의 id와 같다.<br>
왜냐면, socket.io에서 모든 socket은 기본적으로 user와 서버 사이에 private room이 있기 때문

```js
io.on("connection", (socket)=>{
    socket.leave("room 237"); // 237번 방 나감
    io.to("room 237").emit(`user ${socket.id} has left the room`); // 방 전체에게 메시지 보내기
});
```
- socket.leave(room) : 방 나가기
- socket.to(room) : 방 전체에 메시지 보내기

참가했다는 것을 방에 있는 모든 사람에게 알려줌
방 이름을 가지고 방에 입장하면 showRoom이라는 function을 실행시켜줄 거임
```js
// app
let roomName; // 처음에는 비어 있지만 누군가 방에 참가를 하면

const showRoom = () => {
    // 방 이름을 가지고 방에 입장하면 방이름 입력란 사라지고 채팅 입력란 생성
    welcome.hidden = true;
    room.hidden = false;
}

const handleRoomSubmit = (evnet) => {
    evnet.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", input.value, showRoom); // 방 이름을 가지고 방에 입장하면 showRoom이라는 function을 실행시켜줄 거임
    roomName = input.value; // 입력한 방이름 넣기
    input.value = "";
}
```

## Room Messages
```js
// documentation
io.on("connection", (socket)=>{
    // 방 하나 - 우리가 원하는 데이터를 가지고 string인 "an event"를 emit
    socket.to("방 제목").emit("an event", {some: "data"});

    // 여러 개의 방에 같은 event를 emit 가능 - 위 아래 같은거임
    socket.to("방 제목1").to("방 제목2").emit("hello");
    socket.to(["방 제목1","방 제목2"]).emit("hello");

    // private message(개인 메시지)를 보낼 수 있다.
    socket.to(/* another socket id */).emit("hey");
});
```

방금 들어간 방 안에 있는 모두에게 메시지 보내기
```js
// server
wsServer.on("connection", (socket) => {
    socket.onAny((event)=>{ // event 감시자
        console.log(`Socket Event: ${event}`);
    });
    socket.on("enter_room", (roomName, done)=>{
        socket.join(roomName); // 방에 참가하면
        done(); // done() function을 호출 -> 프론트엔드에 있는 showRoom()을 실행
        socket.to(roomName).emit("welcome"); // "welcome" event를 roomName에 있는 모든 사람들에게 emit -> event를 방금 참가한 방 안에 있는 모든 사람에게 emit
    });
});
```
이제 프론트엔드에서 이 event에 반응하도록 만들어야 된다.
"누군가 방에 참가했습니다"같은 message 기능 만들기
```js
// message를 추가기능
const addMessage = (message) => {
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message; // message를 li안에 넣어줌
    ul.appendChild(li); // message를 ul에 추가
}

socket.on("welcome", (user, newCount)=>{
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName} (${newCount})`;
    addMessage(`${user} arrived !🥰`); // welcome event가 발생하면 addMessage 호출
}); 
```

"welcome"을 방 안에 나를 제외한 모두에게 보낸다는 점이 중요!
- socket.io가 나를 제외한 모든 사람에게 message를 보내고 싶다는 점
- 여기서 방을 입력하면 나의 socket은 "welcome" message를 받지 않는다.

방에 입장해서 프론트엔드에게 알리고 방안에 있는 모두에게 우리가 입장했다고 알림

## Room Notifications
우리가 떠났다는 것을 알려줘야 된다.
```js
// documentation
io.on("connection", socket => {
    socket.on("disconnecting", reason => {
        console.log(socket.rooms); // Set {...}
    });
});
```
- disconnecting은 disconnect와 다르다.
- disconnect : 연결이 완전히 끊어졌다는 것
- disconnecting : 고객이 접속을 중단할 것이지만 아직 방을 완전히 나가지는 않음
    - 완전히 끊기기 전에(창을 닫거나, 컴퓨터가 꺼졌을 때) 방에 message를 보낼 수 있다.
    - => disconnecting일 때 메시지를 보낼 수 있다.

클라이언트가 서버와 연결이 끊어지기 전에 마지막 "굿바이" message를 보낼 수 있다.
```js
// server
socket.on("disconnecting", ()=>{
    socket.rooms.forEach((room)=>socket.to(room).emit("bye")); // set 배열 안에 있는 방안에 있는 모두에게 마지막 인사를 보냄
});
```
- socket.rooms : socket에 어떤 방이 있는지 확인
- set : 중복 요소가 없는 array
    - 여기서 set은 참여하고 있는 방 이름과 ID를 볼 수 있다.
```js
// app
// set 배열 안에 있는 방안에 있는 모두에게 마지막 인사를 보냄
socket.on("bye", (left, newCount)=> {
    addMessage(`${left} left😢`);
});
```

닉네임 추가
```js
// app
const handleMessageSubmit = (event) => {
    event.preventDefault(); 
    const input = room.querySelector("#msg input");
    const {value} = input;
    // * 여기에 대한 설명 *
    socket.emit("new_message", input.value, roomName, () => {
        addMessage(`You: ${value}`)
    }); // 백엔드로 message 보내는 중(백엔드에서 event를 발생)
    input.value = "";
}
// addMssage function을 호출하는 function

const showRoom = () => {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;

    const form = room.querySelector("#form"); // 추가
    form.addEventListener("submit", handleMessageSubmit); // 추가
}
```
// * 여기에 대한 설명 *
- 백엔드로 "new_message" event를 보낸다. 
- 첫번째 argument인 input.value와 함께
- 두번째 argument는 방제목 그래야 어디로 message를 보내는지 알 수 있다.
- 마지막 argument는 백엔드에서 시작시킬 수 있는 function을 넣어줌
    - 이건 내 대화창에 메시지가 보이도록 만들어줄거임!!

백엔드에서 message를 받아보자
```js
// sever
socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", msg);
    done();
});
```
- argument에 room이 있어 어떤 방으로 message를 보내야 하는지 알 수 있다.
- payload는 내가 방금 받은 메시지 -> msg
- 완료되면 done function을 호출
- ⭐️ 정말 중요!! done 코드는 백엔드에서 실행하지 않는다.
    - done을 호출했을 때 프론트엔드에서 코드를 실행한다!!!

new-message 이벤트를 보냈지만 app.js에서 message받는걸 만들지 않았다.
```js
// app
socket.on("new_message", addMessage);
```

## 7. Nicknames
닉네임 추가하기
```js
// app
const handleNicknameSubmit = (event) => {
    event.preventDefault();
    const input = room.querySelector("#name input");
    const {value} = input;
    socket.emit("nickname", value);
}

const showRoom = () => {
    welcome.hidden = true;
    room.hidden = false;

    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;

    const msgform = room.querySelector("#msg");
    const nameform = room.querySelector("#name");
    msgform.addEventListener("submit", handleMessageSubmit); // 메시지 채팅 new_message
    nameform.addEventListener("submit", handleNicknameSubmit); // 닉네임 nickname
}
```

이제 input.value를 가지고 백엔드로 보내고 백엔드에 handler를 만들어줘야 된다.
```js
// server
socket["nickname"] = "Anon(익명)"

// 누군가 message를 보내면 socket.nickname과 msg를 넣어줄 수 있다.
socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
    done();
});

socket.on("nickname", nickname => socket["nickname"] = nickname);
```
- socket이 연결되었을 때 누군가 방에 입장했으면 "누군가 입장했습니다."를 해줄 수 있다. (이름을 포함해서)
- 누군가 방을 떠나면 방을 나간 사람 이름을 보낼 수 있다.

리팩토링
- "welcome"을 보내면 아무 데이터도 보내지 않는다.
- "bye"를 보낼 떄도 아무 데이터를 보내지 않는다.
```js
// server
socket.on("enter_room", (roomName, done)=> {
    socket.join(roomName);
    done();
    socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));
    wsServer.sockets.emit("room_change", publicRooms());
});

socket.on("disconnecting", ()=>{
        socket.rooms.forEach((room)=>socket.to(room).emit("bye", socket.nickname)
    );
});
```
이제 "welcome"과 "bye"는 우리에게 무언가를 줄거고<br>
"welcome"은 접속한 유저가 누군인지 알려주게 만들 예정
```js
socket.on("welcome", (user)=>{
    addMessage(`${user} arrived !🥰`);
});

socket.on("bye", (left)=> {
    addMessage(`${left} left😢`);
});
```

socket.io는 규모가 정말 커서 많은 것을 할 수 있고, 유용하다.
- message를 모든 사람에게 보낼 수 있으며,
- 서버를 가져오고 io.sockets.emit을 하면 모두에게 message를 보낼 수 있다.
- 유저 한 명을 만들어서 강제로 socket이 방에 입장하게 할 수 있다.
    - server.socketsJoin(rooms)
```js
// 모든 socket이 이 room에 강제 입장
io.socketsJoin("room");

// room1에 있는 모든 socket을 room2와 room3에 입장
io.in("room1").socketsJoin(["room2", "room3"]);
io.in(theSocketId).socketsJoin("room1");
```
- 모든 socket을 어떤 방에 들어가게끔 하고 싶다면 wsServer를 쓰고 
    - `wsServer.in("room1").socketsJoin(["room2", "room3"]);`처럼 쓸 수 있다.
    - 아니면 `wsServer.socketsJoin()`을 써서 "announcement"(공지) 방에 들어가게 만들 
    수도 있다.
        - socket이 연결 되었을 때 모든 socket이 announcement방에 입장하게 만듬

## 8. Room Count part One
방에 유저가 몇 명 있는지 세볼거고 서버에 있는 모든 방을 실시간으로 보여줄 예정

### Adapter 개념에 대해 알아보자
- Adapter가 기본적으로 하는 일은 다른 서버들 사이에 실시간 어플리케이션을 동기화 하는 것
    - 지금 우리는 서버의 메모리에서 Adapter를 사용하고 있다.
- 데이터베이스에는 아무것도 저장하고 있지 않다.
    - 서버를 종료하고 다시 시작할 때 모든 room과 message와 socket은 없어진다.
    - 재시작할 때는 모든 것들이 처음부터 시작된다.
- 앱 안에 많은 클라이언트가 있을 때, 모든 클라이언트에 대해서 connection을 열어둬야 된다. (Brave와 Firefox 브라우저를 서버에 연결했던 것처럼)
    - 그 연결은 어딘가에 있어야 하며, 실시간으로 서버 메모리에 있어야 된다.
    - 그렇기 때문에 나의 서버는 이 connection을 오픈된 상태를 유지해야 된다.
- 브라우저는 서버로 단 한 개의 connection을 열지만, 많은 브라우저들은 하나의 서버에 connectione들을 열게 된다.
    - 이말인 즉, 서버에 많은 connection이 들어오며, 서버는 그 많은 connection들을 메모리에 저장할 것이다.
    - 이때 쯤이면 서버 2~3개를 사용하게 될 거다.

우리는 지금 서버 메모리에서 Adaptor을 사용하고 있다.<br>
이말은 우리가 만든 3개의 서버는 같은 memory pool을 공유하지 않을 거라는 얘기이다.<br>
당연히 같은 connection이지만

**=> 이게 어떤 문제이냐면**
- 만약 나에게 두개의 서버(A, B)가 있다고 한다면 
- 클라이언트는 다 똑같은 프론트엔드를 보고 있다. (예를 들면, 슬랙에서 동일한 대화창을 보고 있음)
- 같은 프론트엔드를 보고 있지만 실은 다른 서버에 연결되어 있다.

만약 우리가 Adapter를 쓰지 않는다면
- 만약 서버 A에 있는 클라이언트가 서버 B에 있는 클라이언트에 메시지를 보내고 싶다면 불가능하다!!
    - 왜냐하면 두 서버는 분리되어 있기 때문이다.
- 두 서버는 각각의 다른 메모리가 있다.
- 이건 in memory Adapter를 쓰고 있기 떄문에 발생 (지금 사용하고 있음)
- 나중에 우리가 실제로 앱을 만들고 싶다면 이렇게 하지 말아야 된다.

=> 해결방법은 바로 Adapter를 쓰는 것
- MongoDB Adapter같은걸 쓰면 된다.
- Adapter는 MongoDB를 사용해서 서버간의 통신을 해주는 것이다.

규모가 큰 어플리케이션에는 많은 서버를 가지게 될것이며, 모든 클라이언트가 동일한 서버에 연결되는 것은 아니다.
- 만약 서버A에 있는 클라이언트가 서버B에 메시지를 보내고 싶다면
- 그 메시지는 서버A에서 Adapter와 데이터베이스를 거쳐 다시 Adapter로 가서 가야 할 곳에 도착할 거다.

그러므로 진짜로 데이터베이스를 사용하고 싶다면, Adapter가 필요하다.<br>
현재 코드에서는 모든 것을 memory에서 하고 있다.

Adapter는 어플리케이션으로 통하는 창문<br>
Adapter는 누가 연결되었는지, 현재 어플리케이션에 room이 얼마나 있는지 알려줄 것이다.

```js
socket.onAny((event)=>{
    console.log(wsServer.sockets.adapter); 
})
```
Adapter는 memory에 있으며, 나중에 MongoDB나 다른 걸로 바꿀거임

여기서 중요한 포인트 2가지가 있다.
1. 어플리케이션에 있는 room : 우린 어플리케이션에 있는 모든 room을 볼 수 있다.
2. socket ID를 볼 수 있다.
    - socket도 전용 방이 있고, private room이 있기 때문에 우리가 private message들을 보낼 수 있다.

socket의 id를 뜻하는 sids를 가져와서 방들을 보고 이 방들이 어떤 socket을 위해서 만들어졌는지 볼예정<br> 
그래서 private메시지와 모든 사람들과 채팅하기 위해 만든 방이 어떤 건지 말해줄 거임<br>
왜냐면 서버에 있는 모든 방 리스트를 보여주고 싶긴때문에

지금 private rooms와 public rooms이 보인다.<br>
그래서 이제 map에 있는 모든 rooms를 확인하고, room의 id도 확인<br>
- room id를 socket id에서 찾을 수 있다면 우리가 private용 room을 찾을거임
- room id를 socket id에서 찾을 수 없다면 우리는 public room을 찾을거임

이걸 하길 위해서 우리는 map데이터 구조를 봐야 된다.<br>
map은 object같은건데, unique keys가 있다.
```js
const food = new Map();

// key: pizza, value: 12
food.set("pizza", 12); // Map {"pizza" => 12}
food.get("pizza"); // 12
food.get("aaaa"); // undefined
```

모든 sids에 대한 map을 만들기
우리에게 sides가 있는데 그건 우리 백엔드에 연결된 모든 sockets드르이 map이다. 그리고 rooms도 있다.<br>
때떄로 socket id는 room id와 같다.<br>
=> rooms를 정리하고, public room의 id만 가지고 싶다. <br>
=> 모든 socket은 private room이 있다는 것을 기억해야 된다. <br>
=> 그건 바로 id가 방제목인 경우!! 그래야 우리가 private message를 보낼 수 있다.

이제 어떻게 하면 map을 반복하거나 살펴볼 수 있는지 배워보자<br>
내가 가지고 있는 모든 rooms에 forEach를 해줄거다.<br>
여기서 나는 두 개의 객체를 가지는 callback을 보내야 된다. <br>
하나는 value이고 다른 하나는 key이다.
```js
rooms.forEach((value, key)=>{
    console.log(value, key);
});
// true "socket id 1"
// true "socket id 2"
// true "nico" -> 방제목임
```
모든 value는 true지만 key는 다 다른다. => 내가 관심이 있는 건 key이다.

우리는 map안에 있는 것을 어떻게 가져올까?<br>
우리에겐 side map이 있다.<br>
무언가를 얻고 싶으면 get이랑 key를 사용하면 된다.<br>
이말은 get과 key를 이용해서 key가 socket id인지 아니면 방제목인지 알 수 있다.
```js
rooms.forEach((_, key) => {
    // 만약 내가 room의 key와 함께 socket id를 가질 수 있다면 (우리가 private room을 찾았다면)
    // if(sids.get(key) !== undefined) // 우리가 sids에도 존재하는 room을 찾았다는 말
    
    // 만약 내가 key를 가지고 socket id를 가지려고 하고 그게 undefined라면
    // 내 key는 public room의 key라는 뜻이다.
    if(sids.get(key) === undefined){
        console.log(key);// nico -> private room이 아닌 방만 남음
    }
})
```
이 모든 건 현재 서버에 있는 모든 room을 보여주고 싶어서 한거임<br>
```js
// server
function publicRooms(){
    const sids = wsServer.sockets.adapter.sids; // 우리는 sids를 가져옴
    const room = wsServer.sockets.adapter.rooms; // wsServer안에 있는 rooms도 가져옴

    // 위 아래 같은 표현임
    const {
        sockets: {
            adapter: {sids, rooms},
        },
    } = wsServer;

    // public rooms list 만들기
    const publicRooms = [];
    // private room이 아닌 방만 남음
    rooms.forEach((_, key) => { // key가 중요
        if(sids.get(key) === undefined){
            publicRooms.push(key);
        }
    });
    return publicRooms;
}

wsServer.on("connection", ...);
```

## 9. Room Count part Two
이제 새로운 방이 만들어졌다고 모두에게 알려줄거다.<br>
socket.to.emit을 사용해서 알리는게 아니라 server.sockets.emit을 사용!!<br>
server.socket.emit : 연결된 모든 socket에게 message 보내기

내가 방에 입장할 때, 누군가가 방에 입장할 때 -> 어플리케이션 안에 있는 모든 방에 공지를 내보냄
```js
// server
wsServer.on("connection", (socket) => {
    ...
    // 방 입장
    socket.on("enter_room", (roomName, done)=> {
        ...
        // "room_change" event의 payload는 publicRooms 함수의 결과 
        // -> 그건 현재 우리 서버안에 있는 모든 방의 array
        wsServer.sockets.emit("room_change",)
    });
    ...
});
```


```js
socket.on("room_change", console.log);
socket.on("room_change", (msg)=> console.log(msg));
```
- 이 두개의 코드는 같은 코드임
클라이언트와의 연결이 종료되었을 때 똑같이 해줄거다.<br>
왜냐하면 누군가 disconnecting한다면 그건 바로 그 사람이 방을 떠난다는 의미이기 때문<br>
그 방은 없어졌을 수도 있고, 아무도 방에 없을 수도 있다.

클라이언트가 종료 메시지를 모두에게 보낸 다음 모두에게 room이 변경됐다고 알려줌
```js
socket.on("disconnect", ()=>{
    wsServer.sockets.emit("room_change", publicRooms());
});
```

```js
socket.on("room_change", (rooms)=>{ // room_change event가 발생했을 때 나한테 rooms 배열을 줌
    const roomList = welcome.querySelector("ul");

    // room에 li element를 만들어주기
    rooms.forEach(room => {
        const li = document.createElement("li");
        li.innerText = room;
        roomList.append(li);
    });
}); 
```
이제 방에 들어가기 전 기다릴 때 열려있는 모든 방의 list를 볼 수 있다.

새로고침이 안되는 이유 인자로 rooms을 받았을 때 비어있는 상태로 왔을 수 있기 때문<br>
한 번 실행할 때 화면에 방 목록을 paint해주는데,<br> 
다시한번 실행할 때 목록이 비어있으면 아무것도 안한다.<br>
하지만 우리가 이미 paint 했던 것은 그대로 유지 된다.

그래서 확인해 줘야 된다.
```js
socket.on("room_change", (rooms)=>{ // room_change event가 발생했을 때 나한테 rooms 배열을 줌
    const roomList = welcome.querySelector("ul");

    // 추가
    // rooms가 없는 상태로 오면, 즉 내 어플리케이션에 room이 하나도 없을 때 모든 것을 비워주기
    if(rooms.length === 0){
        roomList.innerHTML = ""; // roomList비워주기
        return;
    }

    // room에 li element를 만들어주기
    rooms.forEach(room => {
        const li = document.createElement("li");
        li.innerText = room;
        roomList.append(li);
    });
}); 
```
우리는 항상 roomList를 비워줘야 된다.<br>
방 목록을 비워줘서 항상 새로운 list가 되도록 해야된다.

## 10. User Count
마지막으로 할 일은 우리 방 안에 있는 사람들의 수를 세야된다.<br>
map안에 set이 있고, set은 array같은건데 item들이 unique하다.

set의 size를 얻는 방법
```js
const food = new Set(["pizza", "love", "love"])

food // Set(2) {"pizza", "love"}

// set에 추가해주거나 삭제할 수 있고, set의 크기도 알 수 있다.
food.size // 2 
```

한 방에 몇 명이 있는지 계산하기 위해서는 rooms로 가서 우리가 찾고 있는 방의 key를 얻어야 된다.<br>
그 다음 `set.siz`를 해주면 끝

count event는 누군가 방에 입장했을때, welcome message를 보낼 때, 누군가 퇴장했을 때 실행(즉 우리가 bye message를 보냈을 때)
```js
// server
const countRoom = (roomName) => {
    //하지만 가끔 roomName을 찾을 수도 있지만 아닐수도 있기 때문 ?로 해줘야 된다.
    return wsServer.sockets.adapter.rooms.get(roomName)?.size
}
```

```js
// 1
socket.on("enter_room", (roomName, done)=> {
    ...
    socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));
    ...
});

// 2
socket.on("disconnecting", ()=>{
    socket.rooms.forEach((room)=>socket.to(room).emit("bye", socket.nickname, countRoom(room) - 1));
});
```
1. 내가 welcome event를 보낼 때 countRoom의 결과값도 같이 보낸다. + 방 이름 
2. 방에서 퇴장할 때도 똑같이 해줌
    - countRoom을 보내주고 퇴장하는 room을 넣어준다.
    - 왜냐하면 지금 방을 퇴장하기 직전이기 때문 (아직 방에 떠나지 않음)
    - 우린 아직 방을 떠나지 않았기 때문에 우리도 포함되서 계산될 예정
        - 그래서 `countRoom(room) - 1`이로 해야된다.
        - 이말은 내가 welcome과 bye를 할 때 newCount를 받을거라는 얘기
```js
socket.on("welcome", (user, newCount)=>{
    addMessage(`${user} arrived !🥰`);
});

socket.on("bye", (left, newCount)=> {
    addMessage(`${left} left😢`);
});
```
- newCount 추가

## 11. Admin panel
Admin UI
- socket.io 백엔드를 위한 것이며
- 모든 socket을 볼 수 있다.
- 모든 room과 클라이언트도 확인할 수 있다.
```bash
npm i @socket.io/admin-ui
```

```js
//server
import {Server} from "socket.io"; // 변경
import {instrument} from "@socket.io/admin-ui"; // 추가
```
+ socket.io server을 만들었던 방식을 조금 변경해줘야 된다.

새로운 socket.io server를 만들어줘야 된다.
```js
//server
import {Server} from "socket.io";
import {instrument} from "@socket.io/admin-ui";

const wsServer = new Server(httpServer, {
    // 환경설정
    cors: {
        origin: ["https://admin.socket.io"], // 이 url를 localhost 3000에 액세스할거임(서버 url를 넣어줘도 된다.)
        credentials: true,
    }
});

// 복사하기 붙혀넣기
instrument(wsServer, {
    auth: false
})
```
- 온라인에서 Admin UI를 실제로 테스트 할 수 있는 데모가 있다.
- 그리고 만약 원한다면 server에 호스트할 수 있다.

=> 이게 데모가 작동하는 데 필요한 환경설정이다.


