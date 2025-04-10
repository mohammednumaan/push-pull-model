const messageInput = document.querySelector("#message-input");
const buttonEl = document.querySelector("#send-msg-btn");
const messageBoard = document.querySelector(".message-board");

const socket = new WebSocket("ws://localhost:8000");
socket.onmessage = (message) => {
    
    const messageContainer = document.createElement("div");
    messageContainer.style.padding = "12px";
    messageContainer.style.margin = "10px 0";
    messageContainer.style.backgroundColor = "#f9f9f9";
    messageContainer.style.border = "1px solid #ddd";
    messageContainer.style.borderRadius = "8px";
    messageContainer.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";

    const paraEl = document.createElement("P");
    paraEl.textContent = message.data;
    paraEl.style.margin = "0";

    messageContainer.appendChild(paraEl);
    messageBoard.appendChild(messageContainer);
};

buttonEl.onclick = (event) => {
    const inputVal = messageInput.value;
    socket.send(inputVal)
}
