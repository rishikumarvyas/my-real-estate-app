import React, { useState } from 'react';
import '../styles/contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically connect to your backend API
    // For demonstration, we'll simulate a successful submission
    
    setFormStatus({
      submitted: true,
      error: false,
      message: 'Thank you for your message! We will get back to you soon.'
    });

    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-container">
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Contact Us</h1>
          <p>Get in touch with our team of real estate experts</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="contact-info">
          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3>Our Office</h3>
            <p>123 Real Estate Lane</p>
            <p>New York, NY 10001</p>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-phone"></i>
            </div>
            <h3>Phone</h3>
            <p>Main: (123) 456-7890</p>
            <p>Support: (123) 456-7891</p>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <h3>Email</h3>
            <p>info@estatehub.com</p>
            <p>support@estatehub.com</p>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-clock"></i>
            </div>
            <h3>Working Hours</h3>
            <p>Monday - Friday: 9am - 6pm</p>
            <p>Saturday: 10am - 4pm</p>
          </div>
        </div>

        <div className="contact-form-container">
          <h2>Send Us a Message</h2>
          <p>Fill out the form below and we'll get back to you as soon as possible.</p>
          
          {formStatus.submitted && (
            <div className={`form-message ${formStatus.error ? 'error' : 'success'}`}>
              {formStatus.message}
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What is this regarding?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Type your message here..."
              ></textarea>
            </div>

            <button type="submit" className="submit-button">
              Send Message <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </section>

      <section className="map-section">
        <h2>Visit Our Office</h2>
        <div className="map-container">
          {/* In a real application, you would integrate with Google Maps or another map provider */}
          <div className="map-placeholder">
            <img src="/assets/images/map-placeholder.jpg" alt="Office Location Map" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;