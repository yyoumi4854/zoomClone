const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName; // 방이름(처음에는 비어 있음)

// message를 추가기능 - 누군가 방에 참가시, 채팅시
const addMessage = (message) => {
    // 전달 받은 메시지 ul에 li로 추가 
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message; // message를 li안에 넣어줌
    ul.appendChild(li); // message를 ul에 추가
}

const handleMessageSubmit = (event) => {
    event.preventDefault(); 
    const input = room.querySelector("#msg input");
    const {value} = input;
    socket.emit("new_message", input.value, roomName, () => { // socket.send가 아닌 emit
        addMessage(`You: ${value}`)
    });
    input.value = "";
}

const handleNicknameSubmit = (event) => {
    event.preventDefault();
    const input = room.querySelector("#name input");
    const {value} = input;
    socket.emit("nickname", value);
}

// back-end에서 실행 시키고 싶은 함수
const showRoom = () => {
    // 방 이름을 가지고 방에 입장하면 방이름 입력란 사라지고 채팅 입력란 생성
    welcome.hidden = true;
    room.hidden = false;

    // 채팅화면 위에 현재 방이름 나오게
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;

    const msgform = room.querySelector("#msg");
    const nameform = room.querySelector("#name");
    msgform.addEventListener("submit", handleMessageSubmit); // 메시지 채팅 new_message
    nameform.addEventListener("submit", handleNicknameSubmit); // 닉네임 nickname
}

// 방생성
const handleRoomSubmit = (evnet) => {
    evnet.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", input.value, showRoom); // 방 이름을 가지고 방에 입장하면 showRoom이라는 function을 실행시켜줄 거임
    roomName = input.value;
    input.value = "";
}
form.addEventListener("submit", handleRoomSubmit);

// 방금 들어간 방 안에 있는 모두에게 메시지 보내기
socket.on("welcome", (user, newCount)=>{
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName} (${newCount})`;
    addMessage(`${user} arrived !🥰`);
});

// set 배열 안에 있는 방안에 있는 모두에게 마지막 인사를 보냄
socket.on("bye", (left, newCount)=> {
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName} (${newCount})`;
    addMessage(`${left} left😢`);
});

// new-message 이벤트를 보냈지만 app.js에서 message받는걸 만들지 않았다.
socket.on("new_message", addMessage);

socket.on("room_change", (rooms)=>{ // room_change event가 발생했을 때 나한테 rooms 배열을 줌
    const roomList = welcome.querySelector("ul");
    
    // 새로고침이 안되는 이유 인자로 rooms을 받았을 때 비어있는 상태로 왔을 수 있기 때문
    if(rooms.length === 0){
        roomList.innerHTML = "";
        return;
    }

    // room에 li element를 만들어주기
    rooms.forEach(room => {
        const li = document.createElement("li");
        li.innerText = room;
        roomList.append(li);
    });
});