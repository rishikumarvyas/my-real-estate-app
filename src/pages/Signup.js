import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate first name
    if (!userData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    // Validate last name
    if (!userData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email.trim() || !emailRegex.test(userData.email)) {
      newErrors.email = 'Valid email is required';
    }
    
    // Validate password
    if (userData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    // Validate password confirmation
    if (userData.password !== userData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Validate terms agreement
    if (!userData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, you would make an API call to your registration endpoint
      // For demonstration purposes, we'll simulate a successful registration after a delay
      setTimeout(() => {
        // Call the register function from AuthContext
        register({ 
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          // Other user data you might want to store
        });
        
        setIsLoading(false);
        navigate('/login'); // Redirect to login page after successful registration
      }, 1500);
      
    } catch (err) {
      setIsLoading(false);
      setErrors({
        form: 'Registration failed. Please try again later.'
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card signup-card">
        <div className="auth-header">
          <h2>Create an Account</h2>
          <p>Join EstateHub to find your perfect property</p>
        </div>

        {errors.form && (
          <div className="auth-error">
            <i className="fas fa-exclamation-circle"></i> {errors.form}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className={errors.firstName ? 'input-error' : ''}
              />
              {errors.firstName && <p className="error-message">{errors.firstName}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className={errors.lastName ? 'input-error' : ''}
              />
              {errors.lastName && <p className="error-message">{errors.lastName}</p>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-icon-wrapper">
              <i className="fas fa-envelope input-icon"></i>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={errors.email ? 'input-error' : ''}
              />
            </div>
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-icon-wrapper">
              <i className="fas fa-lock input-icon"></i>
              <input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className={errors.password ? 'input-error' : ''}
              />
            </div>
            {errors.password && <p className="error-message">{errors.password}</p>}
            <p className="password-hint">
              Password must be at least 8 characters long.
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-icon-wrapper">
              <i className="fas fa-lock input-icon"></i>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={errors.confirmPassword ? 'input-error' : ''}
              />
            </div>
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={userData.agreeToTerms}
              onChange={handleChange}
              className={errors.agreeToTerms ? 'checkbox-error' : ''}
            />
            <label htmlFor="agreeToTerms">
              I agree to the <Link to="/terms-of-service">Terms of Service</Link> and <Link to="/privacy-policy">Privacy Policy</Link>
            </label>
            {errors.agreeToTerms && <p className="error-message">{errors.agreeToTerms}</p>}
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner"><i className="fas fa-spinner fa-spin"></i> Creating account...</span>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <div className="social-auth">
          <p>Or sign up with</p>
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
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;