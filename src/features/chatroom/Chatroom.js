"use client";
import React, { useEffect, useRef, useState } from 'react';
import useStore from '../../store';

const PAGE_SIZE = 20;

const Chatroom = ({ chatroomId }) => {
  const { messages, addMessage } = useStore();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const chatRef = useRef(null);

  const chatMessages = (messages[chatroomId] || []).slice(-page * PAGE_SIZE);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages.length]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input) return;
    addMessage(chatroomId, { sender: 'user', text: input, time: new Date().toLocaleTimeString() });
    setInput('');
    setLoading(true);
    setTimeout(() => {
      addMessage(chatroomId, { sender: 'ai', text: 'Gemini reply (simulated)', time: new Date().toLocaleTimeString() });
      setLoading(false);
    }, 1200);
  };

  const handleScroll = (e) => {
    if (e.target.scrollTop === 0 && chatMessages.length >= PAGE_SIZE * page) {
      setPage(page + 1);
    }
  };

  return (
    <div className="chatroom-container">
      <div className="chat-header">
        <h3>Chatroom</h3>
      </div>
      
      <div 
        ref={chatRef} 
        className="chat-messages" 
        onScroll={handleScroll}
      >
        {chatMessages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}>
            {msg.sender === 'ai' && (
              <div className="ai-avatar">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="#2563eb"/>
                  <path d="M16 8a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" fill="#fff"/>
                </svg>
              </div>
            )}
            <div className="message-bubble message-hover-group">
              <p>{msg.text}</p>
              <span className="message-time">{msg.time}</span>
              <button
                className="copy-btn copy-btn-bottom-center"
                title="Copy message"
                onClick={() => {
                  navigator.clipboard.writeText(msg.text);
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <rect x="2" y="2" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
        {loading && (
          <div className="ai-message">
            <div className="typing-indicator">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="typing-text">Gemini is typing...</span>
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSend} className="chat-input-form">
        <div className="input-container">
          <input 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            placeholder="Type a message..." 
            className="message-input"
            disabled={loading}
          />
          <button type="submit" className="send-button" disabled={loading || !input.trim()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </form>
      
      <style jsx>{`
        .chatroom-container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .chat-header {
          padding: 1rem 1.5rem;
          background: var(--card-bg);
          border-bottom: 1px solid var(--border-color);
        }
        
        .chat-header h3 {
          color: var(--primary-600);
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0;
        }
        
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          background: var(--chat-bg);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .message {
          display: flex;
          align-items: flex-end;
        }
        .ai-message {
          flex-direction: row;
        }
        .ai-avatar {
          width: 36px;
          height: 36px;
          margin-right: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .user-message {
          justify-content: flex-end;
        }
        
        .ai-message {
          justify-content: flex-start;
        }
        
        .message-bubble {
          max-width: 70%;
          padding: 0.75rem 1rem;
          border-radius: 18px;
          position: relative;
          word-wrap: break-word;
        }
        .message-hover-group {
          position: relative;
        }
        .copy-btn {
          display: none;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.05);
          border: none;
          border-radius: 6px;
          padding: 4px;
          cursor: pointer;
          color: var(--primary-600);
          transition: background 0.2s;
          z-index: 2;
        }
        .copy-btn-bottom-center {
          bottom: -18px;
          top: auto;
        }
        .message-hover-group:hover .copy-btn,
        .copy-btn:hover {
          display: block;
        }
        .copy-btn:hover {
          background: var(--primary-100);
        }
        .message-bubble {
          position: relative;
        }
        
        .user-message .message-bubble {
          background: var(--message-user-bg);
          color: white;
          border-bottom-right-radius: 4px;
        }
        
        .ai-message .message-bubble {
          background: var(--message-ai-bg);
          color: var(--foreground);
          border: 1px solid var(--message-ai-border);
          border-bottom-left-radius: 4px;
        }
        
        .message-bubble p {
          margin: 0 0 0.25rem 0;
          line-height: 1.4;
        }
        
        .message-time {
          font-size: 0.75rem;
          opacity: 0.7;
        }
        
        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: var(--message-ai-bg);
          border: 1px solid var(--message-ai-border);
          border-radius: 18px;
          border-bottom-left-radius: 4px;
        }
        
        .typing-dots {
          display: flex;
          gap: 4px;
        }
        
        .typing-dots span {
          width: 6px;
          height: 6px;
          background: var(--gray-500);
          border-radius: 50%;
          animation: typing 1.4s infinite ease-in-out;
        }
        
        .typing-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .typing-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        .typing-text {
          font-size: 0.875rem;
          color: var(--gray-500);
        }
        
        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }
        
        .chat-input-form {
          padding: 1rem 1.5rem;
          background: var(--card-bg);
          border-top: 1px solid var(--border-color);
        }
        
        .input-container {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        
        .message-input {
          flex: 1;
          padding: 12px 16px;
          border: 2px solid var(--border-color);
          border-radius: 24px;
          font-size: 14px;
          transition: all 0.3s ease;
          box-sizing: border-box;
          background: var(--input-bg);
          color: var(--foreground);
        }
        
        .message-input:focus {
          outline: none;
          border-color: var(--primary-600);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        
        .message-input:disabled {
          background: var(--gray-100);
          color: var(--gray-400);
        }
        
        .send-button {
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          color: white;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .send-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #1d4ed8, #2563eb);
          transform: scale(1.05);
        }
        
        .send-button:disabled {
          background: #94a3b8;
          cursor: not-allowed;
          transform: none;
        }
        
        @media (max-width: 768px) {
          .chat-header {
            padding: 0.75rem 1rem;
          }
          
          .chat-messages {
            padding: 0.75rem;
          }
          
          .message-bubble {
            max-width: 85%;
            padding: 0.5rem 0.75rem;
            font-size: 0.9rem;
          }
          
          .chat-input-form {
            padding: 0.75rem 1rem;
          }
          
          .message-input {
            font-size: 16px;
            padding: 10px 14px;
          }
          
          .send-button {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </div>
  );
};

export default Chatroom;
