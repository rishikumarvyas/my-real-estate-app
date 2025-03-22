import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import Filter from '../components/Filter';
import property1 from '../assets/images/property1.jpg';
import property2 from '../assets/images/property2.jpg';
import property3 from '../assets/images/property3.jpg';
import '../styles/rent.css';

const Rent = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Sample rental properties data
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setProperties([
        {
          id: 201,
          title: 'Stylish Studio Apartment',
          price: 1800,
          type: 'Rent',
          address: '321 Metro Ave, Seattle',
          beds: 1,
          baths: 1,
          area: 650,
          image: property1,
          featured: true
        },
        {
          id: 202,
          title: 'Modern 2BR with City View',
          price: 2500,
          type: 'Rent',
          address: '654 Downtown Blvd, San Francisco',
          beds: 2,
          baths: 2,
          area: 1100,
          image: property2,
          featured: true
        },
        {
          id: 203,
          title: 'Cozy 1BR near Park',
          price: 1600,
          type: 'Rent',
          address: '987 Greenway St, Portland',
          beds: 1,
          baths: 1,
          area: 750,
          image: property3,
          featured: false
        },
        {
          id: 204,
          title: 'Spacious Family Townhouse',
          price: 3200,
          type: 'Rent',
          address: '432 Suburb Ln, Austin',
          beds: 3,
          baths: 2.5,
          area: 1800,
          image: property1,
          featured: false
        },
        {
          id: 205,
          title: 'Luxury Waterfront Condo',
          price: 4500,
          type: 'Rent',
          address: '765 Harbor Dr, Miami',
          beds: 2,
          baths: 2,
          area: 1400,
          image: property2,
          featured: false
        },
        {
          id: 206,
          title: 'Pet-Friendly Garden Apartment',
          price: 1900,
          type: 'Rent',
          address: '543 Green St, Chicago',
          beds: 1,
          baths: 1,
          area: 850,
          image: property3,
          featured: false
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="rent-page">
      <div className="rent-hero">
        <div className="hero-content">
          <h1>Find Your Perfect Rental</h1>
          <p>Explore our hand-picked selection of rental properties</p>
          <SearchBar />
        </div>
      </div>

      <div className="rent-container">
        <div className="rent-header">
          <h2>Properties For Rent</h2>
          <div className="controls">
            <button className="filter-toggle" onClick={toggleFilters}>
              {showFilters ? 'Hide Filters' : 'Show Filters'} <i className={`fas fa-sliders-h ${showFilters ? 'active' : ''}`}></i>
            </button>
            <div className="sort-dropdown">
              <select name="sort" defaultValue="featured">
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rent-content">
          {showFilters && (
            <div className="filters-sidebar">
              <Filter isRental={true} />
            </div>
          )}

          <div className="properties-grid">
            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
                <p>Loading properties...</p>
              </div>
            ) : properties.length > 0 ? (
              properties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <div className="no-results">
                <i className="fas fa-search"></i>
                <h3>No rental properties found</h3>
                <p>Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>

        {!loading && properties.length > 0 && (
          <div className="pagination">
            <button className="page-button active">1</button>
            <button className="page-button">2</button>
            <button className="page-button">3</button>
            <button className="page-button next">
              Next <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rent;