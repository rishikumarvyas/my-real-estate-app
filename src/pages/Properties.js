import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import Filter from '../components/Filter';
import '../styles/properties.css';

const Properties = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [totalProperties, setTotalProperties] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState('newest');

  // Extract search parameters
  const location = searchParams.get('location') || '';
  const type = searchParams.get('type') || 'all';
  const status = searchParams.get('status') || 'all';
  const priceRange = searchParams.get('price') || '';

  useEffect(() => {
    // Simulate API call to get properties
    setLoading(true);
    setTimeout(() => {
      // Sample properties data - In a real app, you would fetch this from your API
      const fetchedProperties = [
        {
          id: 1,
          title: 'Modern Downtown Apartment',
          price: 450000,
          type: 'Sale',
          address: '123 Downtown Ave, New York',
          beds: 2,
          baths: 2,
          area: 1200,
          image: '/assets/images/property1.jpg'
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
          image: '/assets/images/property2.jpg'
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
          image: '/assets/images/property3.jpg'
        },
        {
          id: 4,
          title: 'Cozy Studio Apartment',
          price: 1800,
          type: 'Rent',
          address: '101 College Ave, Chicago',
          beds: 1,
          baths: 1,
          area: 750,
          image: '/assets/images/property4.jpg'
        },
        {
          id: 5,
          title: 'Waterfront Condo',
          price: 550000,
          type: 'Sale',
          address: '222 Harbor View, San Francisco',
          beds: 2,
          baths: 2,
          area: 1400,
          image: '/assets/images/property5.jpg'
        },
        {
          id: 6,
          title: 'Modern Suburban House',
          price: 890000,
          type: 'Sale',
          address: '333 Green Valley, Los Angeles',
          beds: 5,
          baths: 4,
          area: 3200,
          image: '/assets/images/property6.jpg'
        }
      ];

      setProperties(fetchedProperties);
      setTotalProperties(fetchedProperties.length);
      setTotalPages(Math.ceil(fetchedProperties.length / 6));
      setLoading(false);
    }, 800);
  }, [location, type, status, priceRange, currentPage, sortOption]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // In a real app, you would fetch new data based on the page
    window.scrollTo(0, 0);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    // In a real app, you would re-fetch or re-sort the data
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="properties-container">
      <div className="properties-header">
        <h1>Find Your Perfect Property</h1>
        <p>Browse our extensive collection of properties for sale and rent</p>
      </div>

      <div className="properties-actions">
        <button 
          className="filter-toggle-button" 
          onClick={toggleFilters}
        >
          <i className="fas fa-filter"></i> 
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        <div className="sort-controls">
          <label htmlFor="sort">Sort By:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={handleSortChange}
            className="sort-select"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
            <option value="size-asc">Size (Small to Large)</option>
            <option value="size-desc">Size (Large to Small)</option>
          </select>
        </div>
      </div>

      <div className="properties-content">
        {showFilters && (
          <div className="filters-sidebar">
            <Filter />
          </div>
        )}

        <div className="properties-list">
          <div className="properties-count">
            Showing <span>{properties.length}</span> of <span>{totalProperties}</span> properties
          </div>

          {loading ? (
            <div className="properties-loading">
              <div className="loading-spinner"></div>
              <p>Loading properties...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="no-properties">
              <h3>No properties found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="properties-grid">
              {properties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="pagination-button prev" 
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <i className="fas fa-chevron-left"></i> Previous
              </button>
              
              <div className="pagination-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button 
                className="pagination-button next" 
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Properties;