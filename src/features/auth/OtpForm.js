"use client";
import React, { useState } from 'react';
import useStore from '../../store';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import CountrySelect from './CountrySelect';

const schema = z.object({
  country: z.string().min(1, 'Country required'),
  phone: z
    .string()
    .min(10, 'Phone must be 10 digits')
    .max(10, 'Phone must be 10 digits')
    .regex(/^\d{10}$/, 'Phone must be exactly 10 digits'),
  otp: z.string().optional(),
});

const OtpForm = ({ onLogin }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const { setToast } = useStore();
  const sendOtp = (data) => {
    setLoading(true);
    // Generate a random 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
      setValue('otp', otp);
      setToast(`Your OTP is ${otp}`);
    }, 1000);
  };

  const verifyOtp = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({ phone: data.phone, country: data.country });
    }, 1000);
  };

  return (
    <div className="otp-form-container">
      <form onSubmit={handleSubmit(otpSent ? verifyOtp : sendOtp)} className="otp-form">
        <div className="form-header">
          <h2>{otpSent ? 'Verify OTP' : 'Sign In'}</h2>
          <p>{otpSent ? 'Enter the OTP sent to your phone' : 'Enter your phone number to continue'}</p>
        </div>
        
        <div className="form-fields">
          <CountrySelect value={watch('country')} onChange={val => setValue('country', val)} />
          {errors.country && <span className="error-message">{errors.country.message}</span>}
          
          <div className="input-container">
          <input 
            {...register('phone', {
              onChange: (e) => {
                // Only allow digits
                const value = e.target.value.replace(/\D/g, '');
                setValue('phone', value);
              },
            })}
            placeholder="Phone number"
            className="form-input"
            type="tel"
            maxLength={10}
            inputMode="numeric"
            pattern="\d{10}"
            autoComplete="tel"
          />
            {errors.phone && <span className="error-message">{errors.phone.message}</span>}
          </div>
          
          {otpSent && (
            <div className="input-container">
              <input 
                {...register('otp', { required: true })} 
                placeholder="Enter OTP" 
                className="form-input"
                type="text"
                maxLength="6"
              />
              {errors.otp && <span className="error-message">OTP is required</span>}
            </div>
          )}
        </div>
        
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? (
            <span className="loading-text">
              <span className="spinner"></span>
              Please wait...
            </span>
          ) : (
            otpSent ? 'Verify OTP' : 'Send OTP'
          )}
        </button>
      </form>
      
      <style jsx>{`
        .otp-form-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 60vh;
          padding: 20px;
        }
        
        .otp-form {
          background: var(--card-bg);
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          border: 1px solid var(--border-color);
        }
        
        .form-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .form-header h2 {
          color: var(--primary-600);
          font-size: 1.8rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
        }
        
        .form-header p {
          color: var(--gray-500);
          font-size: 0.9rem;
          margin: 0;
        }
        
        .form-fields {
          margin-bottom: 1.5rem;
        }
        
        .input-container {
          margin-bottom: 1rem;
        }
        
        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid var(--border-color);
          border-radius: 8px;
          font-size: 16px;
          transition: all 0.3s ease;
          box-sizing: border-box;
          background: var(--input-bg);
          color: var(--foreground);
        }
        
        .form-input:focus {
          outline: none;
          border-color: var(--primary-600);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        
        .form-input:hover {
          border-color: var(--primary-500);
        }
        
        .submit-button {
          width: 100%;
          padding: 14px 24px;
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .submit-button:hover:not(:disabled) {
          background: linear-gradient(135deg, var(--primary-700), var(--primary-600));
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.3);
        }
        
        .submit-button:disabled {
          background: var(--gray-400);
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        .loading-text {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        .error-message {
          color: #dc2626;
          font-size: 0.875rem;
          margin-top: 4px;
          display: block;
        }
        
        @media (max-width: 768px) {
          .otp-form-container {
            padding: 16px;
            min-height: 50vh;
          }
          
          .otp-form {
            padding: 1.5rem;
            border-radius: 12px;
          }
          
          .form-header h2 {
            font-size: 1.5rem;
          }
          
          .form-input, .submit-button {
            font-size: 16px;
            padding: 14px 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default OtpForm;
