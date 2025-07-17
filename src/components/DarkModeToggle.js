"use client";
import React from 'react';
import useStore from '../store';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useStore();
  
  return (
    <button onClick={toggleDarkMode} className="dark-mode-toggle">
      <div className="toggle-icon">
        {darkMode ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="5" fill="currentColor"/>
            <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" fill="currentColor"/>
          </svg>
        )}
      </div>
      <span className="toggle-text">{darkMode ? 'Light' : 'Dark'}</span>
      
      <style jsx>{`
        .dark-mode-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: var(--gray-100);
          border: 2px solid var(--border-color);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: var(--gray-500);
          font-size: 14px;
          font-weight: 500;
        }
        
        .dark-mode-toggle:hover {
          background: var(--gray-200);
          border-color: var(--primary-600);
          color: var(--primary-600);
        }
        
        .toggle-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .toggle-text {
          white-space: nowrap;
        }
        
        @media (max-width: 768px) {
          .dark-mode-toggle {
            padding: 6px 12px;
            font-size: 13px;
          }
          
          .toggle-text {
            display: none;
          }
        }
      `}</style>
    </button>
  );
};

export default DarkModeToggle;
