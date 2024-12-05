const sendButton = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

sendButton.addEventListener('click', async () => {
    const userMessage = userInput.value;
    appendMessage(userMessage, 'user');
    userInput.value = '';

    const botResponse = await getBotResponse(userMessage);
    appendMessage(botResponse, 'bot');
});

function appendMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

async function getBotResponse(message) {
    const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    });

    const data = await response.json();
    return data.response || "Sorry, I didn't understand that.";
}