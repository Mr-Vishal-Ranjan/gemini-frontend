"use client";
import React, { useState } from 'react';
import useStore from '../../store';

const ChatroomList = ({ onSelect }) => {
  const { chatrooms, removeChatroom } = useStore();
  const [search, setSearch] = useState('');

  const filtered = chatrooms.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="chatroom-list-container">
      <div className="search-container">
        <input
          placeholder="Search chatrooms..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="chatroom-list">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>{search ? 'No chatrooms found' : 'No chatrooms yet'}</p>
          </div>
        ) : (
          <ul className="chatroom-items">
            {filtered.map((c) => (
              <li key={c.id} className="chatroom-item">
                <div 
                  className="chatroom-info" 
                  onClick={() => onSelect(c.id)}
                >
                  <h4>{c.title}</h4>
                  <p>Click to join</p>
                </div>
                <button 
                  onClick={() => removeChatroom(c.id)}
                  className="delete-button"
                  title="Delete chatroom"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <style jsx>{`
        .chatroom-list-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .search-container {
          padding: 1rem;
          border-bottom: 1px solid var(--border-color);
        }
        
        .search-input {
          width: 100%;
          padding: 10px 16px;
          border: 2px solid var(--border-color);
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.3s ease;
          box-sizing: border-box;
          background: var(--input-bg);
          color: var(--foreground);
        }
        
        .search-input:focus {
          outline: none;
          border-color: var(--primary-600);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        
        .chatroom-list {
          flex: 1;
          overflow-y: auto;
        }
        
        .chatroom-items {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .chatroom-item {
          display: flex;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid var(--gray-100);
          transition: all 0.2s ease;
          cursor: pointer;
        }
        
        .chatroom-item:hover {
          background: var(--gray-50);
        }
        
        .chatroom-info {
          flex: 1;
          min-width: 0;
        }
        
        .chatroom-info h4 {
          color: var(--primary-600);
          font-size: 1rem;
          font-weight: 600;
          margin: 0 0 0.25rem 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .chatroom-info p {
          color: var(--gray-500);
          font-size: 0.875rem;
          margin: 0;
        }
        
        .delete-button {
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          font-size: 18px;
          line-height: 1;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 8px;
        }
        
        .delete-button:hover {
          background: #dc2626;
          transform: scale(1.05);
        }
        
        .empty-state {
          padding: 2rem 1rem;
          text-align: center;
        }
        
        .empty-state p {
          color: var(--gray-500);
          font-size: 0.875rem;
          margin: 0;
        }
        
        @media (max-width: 768px) {
          .search-container {
            padding: 0.75rem;
          }
          
          .chatroom-item {
            padding: 0.75rem;
          }
          
          .chatroom-info h4 {
            font-size: 0.9rem;
          }
          
          .chatroom-info p {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatroomList;
