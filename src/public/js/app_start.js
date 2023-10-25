const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");

// FE에서 BE 연결
const socket = new WebSocket(`ws://${window.location.host}`);

const makeMessage = (type, payload) => {
    const msg = {type, payload};
    return JSON.stringify(msg);
}

const handleOpen = ()=>{
    console.log("Connected to Server ✅");
};
const handleMessage = (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
};
const handleClose = ()=>{
    console.log("Connected from Server ❎");
};

socket.addEventListener("open", handleOpen);
socket.addEventListener("message", handleMessage);
socket.addEventListener("close", handleClose);

const handleSubmit = (event) => {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    const li = document.createElement("li");
    li.innerText = `You ${input.value }`;
    messageList.append(li);
    input.value = "";
}
const handleNickSubmit = (event) => {
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);