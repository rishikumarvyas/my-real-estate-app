import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/propertydetail.css';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [showContact, setShowContact] = useState(false);
  
  // Sample property data - In a real app, you would fetch this from your API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const propertyData = {
        id: parseInt(id),
        title: 'Luxury Waterfront Villa',
        description: 'This stunning waterfront villa offers breathtaking views and modern amenities. Perfect for those seeking luxury living with a touch of nature. The property includes a private pool, spacious garden, and direct access to the beach.',
        price: 1250000,
        type: 'Sale',
        status: 'Available',
        address: '789 Ocean Drive, Miami Beach, FL 33139',
        city: 'Miami',
        state: 'FL',
        zipCode: '33139',
        beds: 5,
        baths: 4,
        area: 3800,
        yearBuilt: 2018,
        garageSpaces: 2,
        features: [
          'Private Pool',
          'Ocean View',
          'Smart Home System',
          'Gourmet Kitchen',
          'Hardwood Floors',
          'Walk-in Closets',
          'Central Air Conditioning',
          'Home Office',
          'Fireplace',
          'Outdoor Kitchen'
        ],
        images: [
          '/assets/images/property-detail-1.jpg',
          '/assets/images/property-detail-2.jpg',
          '/assets/images/property-detail-3.jpg',
          '/assets/images/property-detail-4.jpg',
          '/assets/images/property-detail-5.jpg'
        ],
        agent: {
          id: 101,
          name: 'Sarah Johnson',
          phone: '(305) 555-1234',
          email: 'sarah@estatehub.com',
          image: '/assets/images/agent1.jpg'
        }
      };
      
      setProperty(propertyData);
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading) {
    return (
      <div className="property-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading property details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="property-not-found">
        <h2>Property Not Found</h2>
        <p>Sorry, we couldn't find the property you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="property-detail-container">
      {/* Property Images Gallery */}
      <div className="property-gallery">
        <div className="main-image-container">
          <img 
            src={property.images[activeImage]} 
            alt={`${property.title} - View ${activeImage + 1}`} 
            className="main-image" 
          />
          <button 
            className="gallery-nav prev" 
            onClick={() => setActiveImage(prev => (prev === 0 ? property.images.length - 1 : prev - 1))}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button 
            className="gallery-nav next" 
            onClick={() => setActiveImage(prev => (prev === property.images.length - 1 ? 0 : prev + 1))}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        <div className="thumbnail-container">
          {property.images.map((img, index) => (
            <div 
              key={index} 
              className={`thumbnail ${activeImage === index ? 'active' : ''}`}
              onClick={() => setActiveImage(index)}
            >
              <img src={img} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Property Overview */}
      <div className="property-overview">
        <div className="property-header">
          <div className="property-title-section">
            <h1 className="property-title">{property.title}</h1>
            <p className="property-address">
              <i className="fas fa-map-marker-alt"></i> {property.address}
            </p>
          </div>
          <div className="property-price-section">
            <h2 className="property-price">${property.price.toLocaleString()}</h2>
            <span className="property-type-badge">{property.type}</span>
          </div>
        </div>

        <div className="property-main-features">
          <div className="feature">
            <i className="fas fa-bed"></i>
            <span>{property.beds} Bedrooms</span>
          </div>
          <div className="feature">
            <i className="fas fa-bath"></i>
            <span>{property.baths} Bathrooms</span>
          </div>
          <div className="feature">
            <i className="fas fa-vector-square"></i>
            <span>{property.area} sq ft</span>
          </div>
          <div className="feature">
            <i className="fas fa-calendar"></i>
            <span>Built {property.yearBuilt}</span>
          </div>
          <div className="feature">
            <i className="fas fa-car"></i>
            <span>{property.garageSpaces} Garage Spaces</span>
          </div>
        </div>

        <div className="property-actions">
          <button className="action-button primary">
            <i className="fas fa-phone"></i> Call
          </button>
          <button className="action-button secondary" onClick={() => setShowContact(!showContact)}>
            <i className="fas fa-envelope"></i> Message
          </button>
          <button className="action-button tertiary">
            <i className="fas fa-share-alt"></i> Share
          </button>
          <button className="action-button favorite">
            <i className="far fa-heart"></i> Save
          </button>
        </div>

        {showContact && (
          <div className="contact-form-container">
            <h3>Contact Agent</h3>
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input type="tel" id="phone" name="phone" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  defaultValue={`Hi ${property.agent.name}, I'm interested in ${property.title} at ${property.address}.`}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>
        )}
      </div>

      {/* Property Details & Description */}
      <div className="property-details-section">
        <h2 className="section-title">Description</h2>
        <p className="property-description">{property.description}</p>
        
        <h2 className="section-title">Features</h2>
        <ul className="property-features-list">
          {property.features.map((feature, index) => (
            <li key={index} className="feature-item">
              <i className="fas fa-check"></i> {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Property Location */}
      <div className="property-location-section">
        <h2 className="section-title">Location</h2>
        <div className="map-container">
          {/* Here you would normally integrate Google Maps or another map provider */}
          <div className="map-placeholder">
            <p>Map Loading...</p>
            <p>Address: {property.address}</p>
          </div>
        </div>
      </div>

      {/* Agent Information */}
      <div className="agent-information">
        <h2 className="section-title">Listed By</h2>
        <div className="agent-card">
          <img src={property.agent.image} alt={property.agent.name} className="agent-image" />
          <div className="agent-details">
            <h3 className="agent-name">{property.agent.name}</h3>
            <p className="agent-contact">
              <i className="fas fa-phone"></i> {property.agent.phone}
            </p>
            <p className="agent-contact">
              <i className="fas fa-envelope"></i> {property.agent.email}
            </p>
            <button className="view-agent-button">View Agent Profile</button>
          </div>
        </div>
      </div>

      {/* Similar Properties */}
      <div className="similar-properties-section">
        <h2 className="section-title">Similar Properties</h2>
        <p className="similar-properties-placeholder">Similar properties will be shown here.</p>
      </div>
    </div>
  );
};

export default PropertyDetail;