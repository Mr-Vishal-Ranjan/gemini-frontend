"use client";
import React, { useState } from 'react';
import useStore from '../../store';

const CreateChatroom = () => {
  const { addChatroom, setToast } = useStore();
  const [title, setTitle] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title) return;
    addChatroom({ id: Date.now().toString(), title });
    setTitle('');
    setToast('Chatroom created!');
  };

  return (
    <div className="create-chatroom-container">
      <h3>Create New Chatroom</h3>
      <form onSubmit={handleCreate} className="create-form">
        <div className="input-group">
          <input 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            placeholder="Enter chatroom title" 
            className="title-input"
            required
          />
          <button type="submit" className="create-button">
            Create
          </button>
        </div>
      </form>
      
      <style jsx>{`
        .create-chatroom-container {
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          background: var(--card-bg);
        }
        
        .create-chatroom-container h3 {
          color: var(--primary-600);
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
        }
        
        .create-form {
          width: 100%;
        }
        
        .input-group {
          display: flex;
          gap: 8px;
        }
        
        .title-input {
          flex: 1;
          padding: 10px 12px;
          border: 2px solid var(--border-color);
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.3s ease;
          box-sizing: border-box;
          background: var(--input-bg);
          color: var(--foreground);
        }
        
        .title-input:focus {
          outline: none;
          border-color: var(--primary-600);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        
        .create-button {
          padding: 10px 16px;
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        
        .create-button:hover {
          background: linear-gradient(135deg, var(--primary-700), var(--primary-600));
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }
        
        @media (max-width: 768px) {
          .create-chatroom-container {
            padding: 1rem;
          }
          
          .create-chatroom-container h3 {
            font-size: 1rem;
          }
          
          .input-group {
            flex-direction: column;
            gap: 12px;
          }
          
          .create-button {
            width: 100%;
            padding: 12px 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default CreateChatroom;
