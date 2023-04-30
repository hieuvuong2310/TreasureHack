let messages = []


document.querySelector("form#chatbox")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const question = document.querySelector("input#message-input")?.value;
    if (!question) return;
    messages.push({role: "user", content:question})
    const response = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({messages})
      });
    messages = await response.json();
    updateBody();
    return false;
})

function updateBody() {
    const elem = document.querySelector("div#chat-body");
    if (!elem) return;
    elem.innerHTML = ''
    for(let message of messages) {
        if (message.role == "system") continue;
        var messageElement = document.createElement("div");
        var messageText = document.createElement("span");
        messageText.textContent = message.content;
        messageElement.appendChild(messageText);
        elem.appendChild(messageElement);
        if (message.role == "user") {
            messageElement.classList.add("message", "user");
            messageText.classList.add("message-text", "user");
        } else if (message.role == "assistant") {
            messageElement.classList.add("message", "bot");
            messageText.classList.add("message-text", "bot");
        }
    }
    document.querySelector("input#message-input").value = '';
}
