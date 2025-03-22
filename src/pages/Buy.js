import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import Filter from '../components/Filter';
import property1 from '../assets/images/property1.jpg';
import property2 from '../assets/images/property2.jpg';
import property3 from '../assets/images/property3.jpg';

import '../styles/buy.css';

const Buy = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Sample properties data - in a real app, you would fetch this from an API
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setProperties([
        {
          id: 101,
          title: 'Modern Downtown Apartment',
          price: 450000,
          type: 'Sale',
          address: '123 Downtown Ave, New York',
          beds: 2,
          baths: 2,
          area: 1200,
          image: property1,
          featured: true
        },
        {
          id: 102,
          title: 'Spacious Family House',
          price: 720000,
          type: 'Sale',
          address: '456 Suburban St, Boston',
          beds: 4,
          baths: 3,
          area: 2400,
          image: property2,
          featured: true
        },
        {
          id: 103,
          title: 'Luxury Penthouse',
          price: 1250000,
          type: 'Sale',
          address: '789 Skyview Rd, Miami',
          beds: 3,
          baths: 2,
          area: 1800,
          image: property3,
          featured: false
        },
        {
          id: 104,
          title: 'Waterfront Villa',
          price: 2100000,
          type: 'Sale',
          address: '567 Oceanside Dr, San Diego',
          beds: 5,
          baths: 4,
          area: 3500,
          image: property1,
          featured: false
        },
        {
          id: 105,
          title: 'Cozy City Loft',
          price: 375000,
          type: 'Sale',
          address: '890 Urban St, Chicago',
          beds: 1,
          baths: 1,
          area: 950,
          image: property2,
          featured: false
        },
        {
          id: 106,
          title: 'Mountain View Cabin',
          price: 520000,
          type: 'Sale',
          address: '234 Alpine Rd, Denver',
          beds: 3,
          baths: 2,
          area: 1600,
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
    <div className="buy-page">
      <div className="buy-hero">
        <div className="hero-content">
          <h1>Find Your Dream Home</h1>
          <p>Explore our curated collection of properties for sale</p>
          <SearchBar />
        </div>
      </div>

      <div className="buy-container">
        <div className="buy-header">
          <h2>Properties For Sale</h2>
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

        <div className="buy-content">
          {showFilters && (
            <div className="filters-sidebar">
              <Filter />
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
                <h3>No properties found</h3>
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

export default Buy;