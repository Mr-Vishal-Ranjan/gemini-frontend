"use client";
import React from 'react';
import { COUNTRIES } from '../../utils/countries';

const CountrySelect = ({ value, onChange }) => {
  return (
    <div className="country-select-container">
      <select 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        required
        className="country-select"
      >
        <option value="">Select Country</option>
        {COUNTRIES.map((country) => (
          <option key={country.code} value={country.dial}>
            {country.name} ({country.dial})
          </option>
        ))}
      </select>
      <style jsx>{`
        .country-select-container {
          width: 100%;
          margin-bottom: 1rem;
        }
        
        .country-select {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid var(--border-color);
          border-radius: 8px;
          font-size: 16px;
          background: var(--input-bg);
          color: var(--foreground);
          transition: all 0.3s ease;
          box-sizing: border-box;
        }
        
        .country-select:focus {
          outline: none;
          border-color: var(--primary-600);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        
        .country-select:hover {
          border-color: var(--primary-500);
        }
        
        @media (max-width: 768px) {
          .country-select {
            font-size: 16px;
            padding: 14px 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default CountrySelect;
