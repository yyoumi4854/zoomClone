const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const camerasSelect = document.getElementById("cameras");

const call = document.getElementById("call");

call.hidden = true;

let myStream;
let muted = false;
let cameraOff = false;
let roomName; // 현재 있는 방 이름
let myPeerConnection; // 누구나 stream에 접촉 할 수 있도록 (연결 생성)
let myDataChannel;

const getCameras = async () => {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter((device) => device.kind === "videoinput");
        const currentCamera = myStream.getVideoTracks()[0];
        cameras.forEach((camera) => {
            const option = document.createElement("option");
            option.value = camera.deviceId;
            option.innerText = camera.label;
            if (currentCamera.label === camera.label) {
                option.selected = true;
            }
            camerasSelect.appendChild(option);
        });
    } catch (e) {
        console.log(e)
    }
}

async function getMedia(deviceId) {
    const initialConstrains = {
        audio: false, //잠시
        video: {facingMode: "user"}
    };
    const cameraConstraints = {
        audio : false, // 잠시
        deviceId: {exact: deviceId}
    };
    try{
        // 디바이스가 있다면 cameraConstraints를 사용, 없다면 초기 constraints을 사용   
        myStream = await navigator.mediaDevices.getUserMedia(
            deviceId ? cameraConstraints : initialConstrains
        ); 
        myFace.srcObject = myStream;
        if (!deviceId){
            await getCameras(); 
        }
    } catch (e) {
        console.log(e);
    }
}

const handleMuteClick = () => {
    myStream.getAudioTracks().forEach(track => 
        track.enabled = !track.enabled
    );

    if(!muted){
        muteBtn.innerText = "Unmute";
        muted = true;
    }else{
        muteBtn.innerText = "Mute";
        muted = false;
    }
};
const handleCameraClick = () => {
    myStream.getVideoTracks().forEach(track => 
        track.enabled = !track.enabled
    );

    if(cameraOff){
        cameraBtn.innerText = "Turn Camera Off";
        cameraOff = false;
    }else{
        cameraBtn.innerText = "Turn Camera On";
        cameraOff = true;
    }
};

// 두 종류의 track가 있고, 하나는 나 자신을 위한 my stream
// 동시에 우리는 다른 peer 브라우저로 데이터를 보낸다. -> Sender를 쓸 때
const handleCameraChange = async () => {
    await getMedia(camerasSelect.value);

    if(myPeerConnection){
        const videoTrack = myStream.getVideoTracks()[0];
        const videoSender = myPeerConnection
            .getSenders()
            .find(sender => sender.track.kind === "video");
        videoSender.replaceTrack(videoTrack); 
    }
}

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
camerasSelect.addEventListener("input", handleCameraChange);

// Welcome Form (join a room)
const welcome = document.getElementById("welcome");
const welcomeForm = welcome.querySelector("form");

const initCall = async () => {
    welcome.hidden = true;
    call.hidden = false;

    await getMedia(); // 카메라, 마이크, 다른카메라도 전부 불러온다.
    makeConnection();
}

const handleWelcomeSubmit = async (event) => {
    event.preventDefault();
    const input = welcomeForm.querySelector("input");
    await initCall(); // 방에 참가하기 전에 initCall함수 호출
    socket.emit("join_room", input.value);
    roomName = input.value;
    input.value = "";
}
welcomeForm.addEventListener("submit", handleWelcomeSubmit);

// Socket Code
// 방을 만드는 주체 (구글)
socket.on("welcome", async () => {
    // offer를 만드는 peer가 Data Channel을 만드는 주체
    myDataChannel = myPeerConnection.createDataChannel("chat");
    myDataChannel.addEventListener("message", console.log);
    console.log("made data channel");
    const offer = await myPeerConnection.createOffer();
    myPeerConnection.setLocalDescription(offer);
    console.log("sent the offer");
    socket.emit("offer", offer, roomName);
});

// 해당 방에 들어가는 주체 (엣지)
socket.on("offer", async (offer)=>{
    // offer를 받는 peer는 새로운 Data Channel가 있을 때 eventListener를 추가
    myPeerConnection.addEventListener("datachannel", (event)=>{
        myDataChannel = event.channel; // 새 Data Channel이 있을 때 우리는 그 Data Channel을 저장
        myDataChannel.addEventListener("message", console.log); // Data Channel에 event listener를 추가
    });
    console.log("received the offer");
    myPeerConnection.setRemoteDescription(offer);
    const answer = await myPeerConnection.createAnswer();
    myPeerConnection.setLocalDescription(answer);
    socket.emit("answer", answer, roomName);
    console.log("sent the answer");
})

socket.on("answer", (answer) => {
    console.log("received the answer");
    myPeerConnection.setRemoteDescription(answer);
})

socket.on("ice", (ice) => {
    console.log("received candidate");
    myPeerConnection.addIceCandidate(ice);
})

// RTC Code - 실제로 연결을 만드는 함수
const makeConnection = () => {
    myPeerConnection = new RTCPeerConnection({
        // 이건 잘 안되는 것 같음
        iceServers: [
            {
                urls: [
                    "stun:stun.l.google.com:19302",
                    "stun:stun1.l.google.com:19302",
                    "stun:stun2.l.google.com:19302",
                    "stun:stun3.l.google.com:19302",
                    "stun:stun4.l.google.com:19302",
                ],
            },
        ], 
    });
    myPeerConnection.addEventListener("icecandidate", handleIce);
    myPeerConnection.addEventListener("addstream", handleAddStream);
    myStream.getTracks().forEach(track => myPeerConnection.addTrack(track, myStream));
};

const handleIce = (data) => {
    console.log("sent candidate");
    // 우리가 icecandidate를 받으면 받은 icecandidate를 우리 서버로 보내겠다는 의미
    socket.emit("ice", data.candidate, roomName);
}
const handleAddStream = (data) => {
    const peerFace = document.getElementById("peerFace");
    console.log("Peer's Stream : ", data.stream);
    peerFace.srcObject = data.stream;
}

// 1. 우리가 peerConnection을 각각 다른 브라우저에 만듦
// 2. addStream이라는 함수를 사용

// Web Socket의 속도가 media를 가져오는 속도나 연결을 만드는 속도보다 빠르기 때문에
// getMedia(현재: initCall)하고, makeConnection을 한 다음에, 이벤트를 emit함

// Peer A가 offer를 만들고, Peer B가 anser를 생성해야 됨

// 내 컴퓨터랑 폰이 같은 Wifi에 있지 않으면 에러가 생김
// STUN 서버는 어떤 것을 request 하면 인터넷에서 네가 누군지 알려주는 서버
// 사용하고자 하는 STUN 서버의 리스트를 추가해야 된다. -> 구글이 무료로 제공하는 서버를 사용할 거임