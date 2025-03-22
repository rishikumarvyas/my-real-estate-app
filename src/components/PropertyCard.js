import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/propertycard.css';

const PropertyCard = ({ property }) => {
  const {
    id,
    title,
    price,
    type,
    address,
    beds,
    baths,
    area,
    image
  } = property;

  // Format price with commas
  const formatPrice = (price) => {
    if (type === 'Rent') {
      return `$${price.toLocaleString()}/mo`;
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="property-card">
      <div className="property-image-container">
        <img src={image} alt={title} className="property-image" />
        <div className="property-badge">
          <span className={`property-type ${type.toLowerCase()}`}>{type}</span>
        </div>
        <button className="favorite-button">
          <i className="far fa-heart"></i>
        </button>
      </div>
      
      <div className="property-content">
        <div className="property-price">{formatPrice(price)}</div>
        <Link to={`/property/${id}`} className="property-title-link">
          <h3 className="property-title">{title}</h3>
        </Link>
        <p className="property-address">
          <i className="fas fa-map-marker-alt"></i> {address}
        </p>
        
        <div className="property-features">
          <div className="feature">
            <i className="fas fa-bed"></i>
            <span>{beds} {beds > 1 ? 'Beds' : 'Bed'}</span>
          </div>
          <div className="feature">
            <i className="fas fa-bath"></i>
            <span>{baths} {baths > 1 ? 'Baths' : 'Bath'}</span>
          </div>
          <div className="feature">
            <i className="fas fa-vector-square"></i>
            <span>{area} sq ft</span>
          </div>
        </div>
        
        <div className="property-footer">
          <Link to={`/property/${id}`} className="view-details-button">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;