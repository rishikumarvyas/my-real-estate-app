import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

const ForgotPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Enter phone, 2: Enter OTP, 3: New password

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // In a real app, you would make an API call to send OTP
      // For demonstration purposes, we'll simulate a successful OTP sending after a delay
      setTimeout(() => {
        setIsLoading(false);
        setMessage('OTP sent to your phone number. Please check your messages.');
        setStep(2);
      }, 1500);
      
    } catch (err) {
      setIsLoading(false);
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // In a real app, you would verify the OTP
      setTimeout(() => {
        setIsLoading(false);
        setMessage('OTP verified successfully. Please set your new password.');
        setStep(3);
      }, 1500);
      
    } catch (err) {
      setIsLoading(false);
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, you would make an API call to reset the password
      setTimeout(() => {
        setIsLoading(false);
        setMessage('Password reset successfully. You can now login with your new password.');
      }, 1500);
      
    } catch (err) {
      setIsLoading(false);
      setError('Failed to reset password. Please try again.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <form className="auth-form" onSubmit={handleSendOtp}>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <div className="input-icon-wrapper">
                <i className="fas fa-phone input-icon"></i>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  placeholder="Enter your registered phone number"
                />
              </div>
            </div>

            <button
              type="submit"
              className="auth-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner"><i className="fas fa-spinner fa-spin"></i> Sending OTP...</span>
              ) : (
                'Send OTP'
              )}
            </button>
          </form>
        );
      
      case 2:
        return (
          <form className="auth-form" onSubmit={handleVerifyOtp}>
            <div className="form-group">
              <label htmlFor="otp">OTP</label>
              <div className="input-icon-wrapper">
                <i className="fas fa-key input-icon"></i>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  placeholder="Enter the OTP sent to your phone"
                />
              </div>
            </div>

            <div className="form-options">
              <button 
                type="button" 
                className="forgot-password"
                onClick={() => {
                  setOtp('');
                  setStep(1);
                }}
              >
                Change Phone Number
              </button>
              <button 
                type="button" 
                className="forgot-password"
                onClick={handleSendOtp}
              >
                Resend OTP
              </button>
            </div>

            <button
              type="submit"
              className="auth-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner"><i className="fas fa-spinner fa-spin"></i> Verifying...</span>
              ) : (
                'Verify OTP'
              )}
            </button>
          </form>
        );
      
      case 3:
        return (
          <form className="auth-form" onSubmit={handleResetPassword}>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <div className="input-icon-wrapper">
                <i className="fas fa-lock input-icon"></i>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="Enter your new password"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-icon-wrapper">
                <i className="fas fa-lock input-icon"></i>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm your new password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="auth-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner"><i className="fas fa-spinner fa-spin"></i> Resetting Password...</span>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Forgot Password</h2>
          <p>Reset your password in three simple steps</p>
        </div>

        {error && (
          <div className="auth-error">
            <i className="fas fa-exclamation-circle"></i> {error}
          </div>
        )}

        {message && (
          <div className="auth-success">
            <i className="fas fa-check-circle"></i> {message}
          </div>
        )}

        {renderStep()}

        <div className="auth-footer">
          <p>
            Remember your password? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;