const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const newChatBtn = document.getElementById('new-chat-btn');

let messageHistory = [
    { role: "system", content: "You are a helpful and intelligent AI assistant powered by Groq." }
];

// Configure marked.js
marked.setOptions({
    highlight: function(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(code, { language: lang }).value;
        }
        return hljs.highlightAuto(code).value;
    },
    breaks: true
});

// Auto-resize textarea
userInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

// Add message to UI
function addMessage(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    if (role === 'assistant') {
        contentDiv.innerHTML = marked.parse(content);
        // Highlight code blocks
        contentDiv.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    } else {
        contentDiv.textContent = content;
    }
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send message to backend
async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // Clear input
    userInput.value = '';
    userInput.style.height = 'auto';
    
    // Add user message to UI and history
    addMessage('user', text);
    messageHistory.push({ role: 'user', content: text });

    // Show typing indicator (simple)
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message assistant typing';
    typingDiv.innerHTML = '<div class="message-content">...</div>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: messageHistory })
        });

        const data = await response.json();
        
        // Remove typing indicator
        chatMessages.removeChild(typingDiv);

        if (data.error) {
            addMessage('assistant', `**Error:** ${data.error}\n\n**Details:** ${data.details || 'No additional details provided.'}`);
        } else {
            addMessage('assistant', data.message);
            messageHistory.push({ role: 'assistant', content: data.message });
        }
    } catch (error) {
        console.error('Error:', error);
        chatMessages.removeChild(typingDiv);
        addMessage('assistant', 'Sorry, something went wrong. Please check if the server is running.');
    }
}

// Event Listeners
sendBtn.addEventListener('click', sendMessage);

userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

newChatBtn.addEventListener('click', () => {
    chatMessages.innerHTML = `
        <div class="message assistant">
            <div class="message-content">
                Hello! I'm Groq AI. How can I help you today?
            </div>
        </div>
    `;
    messageHistory = [
        { role: "system", content: "You are a helpful and intelligent AI assistant powered by Groq." }
    ];
});
