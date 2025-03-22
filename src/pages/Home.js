import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard'
import property1 from '../assets/images/property1.jpg';
import property2 from '../assets/images/property2.jpg';
import property3 from '../assets/images/property3.jpg';

import '../styles/home.css';

const Home = () => {
  // Sample featured properties data
  const featuredProperties = [
    {
      id: 1,
      title: 'Modern Downtown Apartment',
      price: 450000,
      type: 'Sale',
      address: '123 Downtown Ave, New York',
      beds: 2,
      baths: 2,
      area: 1200,
      image: property1
    },
    {
      id: 2,
      title: 'Spacious Family House',
      price: 720000,
      type: 'Sale',
      address: '456 Suburban St, Boston',
      beds: 4,
      baths: 3,
      area: 2400,
      image: property2
    },
    {
      id: 3,
      title: 'Luxury Penthouse',
      price: 5500,
      type: 'Rent',
      address: '789 Skyview Rd, Miami',
      beds: 3,
      baths: 2,
      area: 1800,
      image: property3
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find Your Dream Home</h1>
          <p>Discover the perfect property from our extensive listings</p>
          <SearchBar />
          <div className="property-stats">
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-text">Properties</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-text">Happy Clients</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-text">Awards</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="featured-properties">
        <div className="section-header">
          <h2>Featured Properties</h2>
          <p>Handpicked properties for you</p>
        </div>
        <div className="properties-grid">
          {featuredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        <div className="view-all-container">
          <Link to="/properties" className="view-all-button">
            View All Properties
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="section-header">
          <h2>Our Services</h2>
          <p>We offer the best real estate services</p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">
              <i className="fas fa-home"></i>
            </div>
            <h3>Buy Property</h3>
            <p>Find your dream home from our wide range of properties</p>
            <Link to="/buy" className="service-link">Learn More</Link>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <i className="fas fa-key"></i>
            </div>
            <h3>Rent Property</h3>
            <p>Explore rental options that suit your lifestyle and budget</p>
            <Link to="/rent" className="service-link">Learn More</Link>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <i className="fas fa-user-tie"></i>
            </div>
            <h3>Real Estate Agents</h3>
            <p>Connect with experienced agents to guide your journey</p>
            <Link to="/agents" className="service-link">Learn More</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Find Your Perfect Home?</h2>
          <p>Let us help you find the property that suits your needs</p>
          <div className="cta-buttons">
            <Link to="/properties" className="cta-button primary">
              Browse Properties
            </Link>
            <Link to="/contact" className="cta-button secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;