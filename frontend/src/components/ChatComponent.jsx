import React, { useState, useEffect } from 'react';

const ChatComponent = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const fetchMessages = async () => {
        const response = await fetch('https://api.example.com/getMessages');
        const data = await response.json();
        setMessages(data);
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        const response = await fetch('https://api.example.com/sendMessage', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ message: input }),
        });
        if (response.ok) {
            setInput('');
            fetchMessages();
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatComponent;