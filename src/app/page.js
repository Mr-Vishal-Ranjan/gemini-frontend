"use client";

import React, { useState } from 'react';
import useStore from '../store';
import OtpForm from '../features/auth/OtpForm';
import ChatroomList from '../features/dashboard/ChatroomList';
import CreateChatroom from '../features/dashboard/CreateChatroom';
import Chatroom from '../features/chatroom/Chatroom';
import DarkModeToggle from '../components/DarkModeToggle';
import Toast from '../components/Toast';

export default function HomePage() {
  const { user, toast, setToast } = useStore();
  const [selectedChatroom, setSelectedChatroom] = useState(null);

  if (!user) {
    return (
      <div className="auth-container">
        <main className="auth-main">
          <div className="auth-header">
            <h1>Gemini Chat</h1>
            <p>Connect with people around the world</p>
          </div>
          <OtpForm onLogin={(u) => { useStore.getState().setUser(u); setToast('Logged in successfully!'); }} />
          <Toast message={toast} onClose={() => setToast('')} />
        </main>
        
        <style jsx>{`
          .auth-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .auth-main {
            width: 100%;
            max-width: 500px;
            padding: 20px;
          }
          
          .auth-header {
            text-align: center;
            margin-bottom: 2rem;
            color: white;
          }
          
          .auth-header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin: 0 0 0.5rem 0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          
          .auth-header p {
            font-size: 1.1rem;
            opacity: 0.9;
            margin: 0;
          }
          
          @media (max-width: 768px) {
            .auth-header h1 {
              font-size: 2rem;
            }
            
            .auth-header p {
              font-size: 1rem;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-left">
            <h1>Gemini Chat</h1>
            <p>Welcome, {user.phone}</p>
          </div>
          <div className="header-actions">
            <DarkModeToggle />
            <button className="logout-btn" onClick={() => {
              if (window.confirm('Are you sure you want to logout?')) {
                setSelectedChatroom(null);
                useStore.getState().logout();
              }
            }}>
              Logout
            </button>
          </div>
        </header>
        
        <div className="dashboard-content">
          <div className="sidebar">
            <CreateChatroom />
            <ChatroomList onSelect={setSelectedChatroom} />
          </div>
          
          <div className="main-content">
            {selectedChatroom ? (
              <Chatroom chatroomId={selectedChatroom} />
            ) : (
              <div className="welcome-message">
                <h2>Select a chatroom to start messaging</h2>
                <p>Choose from your existing chatrooms or create a new one</p>
              </div>
            )}
          </div>
        </div>
        
        <Toast message={toast} onClose={() => setToast('')} />
      </main>
      
      <style jsx>{`
        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .logout-btn {
          padding: 8px 18px;
          background: linear-gradient(135deg, #ef4444, #f87171);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .logout-btn:hover {
          background: linear-gradient(135deg, #dc2626, #ef4444);
        }
        .dashboard-container {
          min-height: 100vh;
          background: var(--background);
        }
        
        .dashboard-main {
          height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        .dashboard-header {
          background: var(--card-bg);
          padding: 1rem 2rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
        }
        
        .header-left h1 {
          color: var(--primary-600);
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
        }
        
        .header-left p {
          color: var(--gray-500);
          font-size: 0.9rem;
          margin: 0.25rem 0 0 0;
        }
        
        .dashboard-content {
          display: flex;
          flex: 1;
          overflow: hidden;
        }
        
        .sidebar {
          width: 350px;
          background: var(--sidebar-bg);
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }
        
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: var(--chat-bg);
        }
        
        .welcome-message {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 2rem;
        }
        
        .welcome-message h2 {
          color: var(--primary-600);
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
        }
        
        .welcome-message p {
          color: var(--gray-500);
          font-size: 1rem;
          margin: 0;
        }
        
        @media (max-width: 768px) {
          .dashboard-header {
            padding: 1rem;
          }
          
          .header-left h1 {
            font-size: 1.25rem;
          }
          
          .dashboard-content {
            flex-direction: column;
          }
          
          .sidebar {
            width: 100%;
            max-height: 40vh;
            border-right: none;
            border-bottom: 1px solid var(--border-color);
          }
          
          .welcome-message {
            padding: 1rem;
          }
          
          .welcome-message h2 {
            font-size: 1.25rem;
          }
          
          .welcome-message p {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}
