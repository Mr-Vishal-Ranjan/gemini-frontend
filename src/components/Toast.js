"use client";
import React, { useEffect, useState } from 'react';

const Toast = ({ message, duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for animation to complete
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className={`toast ${isVisible ? 'toast-show' : 'toast-hide'}`}>
      <div className="toast-content">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>{message}</span>
      </div>
      
      <style jsx>{`
        .toast {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: linear-gradient(135deg, #059669, #10b981);
          color: white;
          padding: 16px 20px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          transition: all 0.3s ease;
          transform: translateY(100px);
          opacity: 0;
          max-width: 300px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .toast-show {
          transform: translateY(0);
          opacity: 1;
        }
        
        .toast-hide {
          transform: translateY(100px);
          opacity: 0;
        }
        
        .toast-content {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .toast-content span {
          font-size: 14px;
          font-weight: 500;
          line-height: 1.4;
        }
        
        @media (max-width: 768px) {
          .toast {
            bottom: 20px;
            right: 20px;
            left: 20px;
            max-width: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Toast;
