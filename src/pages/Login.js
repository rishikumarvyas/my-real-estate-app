import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({
    phoneNumber: '',
    otp: '',
    password: '',
    rememberMe: false
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' or 'otp'
  
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // In a real app, you would make an API call to send OTP
      // For demonstration purposes, we'll simulate a successful OTP sending after a delay
      setTimeout(() => {
        setIsLoading(false);
        setOtpSent(true);
      }, 1500);
      
    } catch (err) {
      setIsLoading(false);
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // In a real app, you would make an API call to your authentication endpoint
      // For demonstration purposes, we'll simulate a successful login after a delay
      setTimeout(() => {
        // Call the login function from AuthContext
        login({ 
          phoneNumber: credentials.phoneNumber,
          // Other user data you might receive from your API
          name: 'John Doe',
          id: '123456',
        });
        
        setIsLoading(false);
        navigate('/'); // Redirect to home page after successful login
      }, 1500);
      
    } catch (err) {
      setIsLoading(false);
      setError(loginMethod === 'password' ? 'Invalid phone number or password.' : 'Invalid OTP. Please try again.');
    }
  };

  const toggleLoginMethod = () => {
    setLoginMethod(prev => prev === 'password' ? 'otp' : 'password');
    setOtpSent(false);
    setError('');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to continue to your account</p>
        </div>

        <div className="login-method-toggle">
          <button 
            className={`toggle-button ${loginMethod === 'password' ? 'active' : ''}`}
            onClick={() => setLoginMethod('password')}
          >
            Password Login
          </button>
          <button 
            className={`toggle-button ${loginMethod === 'otp' ? 'active' : ''}`}
            onClick={() => setLoginMethod('otp')}
          >
            OTP Login
          </button>
        </div>

        {error && (
          <div className="auth-error">
            <i className="fas fa-exclamation-circle"></i> {error}
          </div>
        )}

        <form className="auth-form" onSubmit={loginMethod === 'password' ? handleSubmit : (otpSent ? handleSubmit : handleSendOtp)}>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <div className="input-icon-wrapper">
              <i className="fas fa-phone input-icon"></i>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={credentials.phoneNumber}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
                disabled={loginMethod === 'otp' && otpSent}
              />
            </div>
          </div>

          {loginMethod === 'password' && (
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-icon-wrapper">
                <i className="fas fa-lock input-icon"></i>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                />
              </div>
            </div>
          )}

          {loginMethod === 'otp' && otpSent && (
            <div className="form-group">
              <label htmlFor="otp">OTP</label>
              <div className="input-icon-wrapper">
                <i className="fas fa-key input-icon"></i>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={credentials.otp}
                  onChange={handleChange}
                  required
                  placeholder="Enter the OTP sent to your phone"
                />
              </div>
            </div>
          )}

          <div className="form-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={credentials.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            {loginMethod === 'password' ? (
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
            ) : (
              otpSent && (
                <button 
                  type="button" 
                  className="forgot-password"
                  onClick={() => {
                    setOtpSent(false);
                    setCredentials({...credentials, otp: ''});
                  }}
                >
                  Resend OTP
                </button>
              )
            )}
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner">
                <i className="fas fa-spinner fa-spin"></i> 
                {loginMethod === 'password' ? 'Signing in...' : (otpSent ? 'Verifying...' : 'Sending OTP...')}
              </span>
            ) : (
              loginMethod === 'password' ? 'Sign In' : (otpSent ? 'Verify & Sign In' : 'Send OTP')
            )}
          </button>
        </form>

        <div className="social-auth">
          <p>Or sign in with</p>
          <div className="social-buttons">
            <button className="social-button google">
              <i className="fab fa-google"></i> Google
            </button>
            <button className="social-button facebook">
              <i className="fab fa-facebook-f"></i> Facebook
            </button>
          </div>
        </div>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;