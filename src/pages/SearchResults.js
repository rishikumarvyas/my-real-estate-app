import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import Filter from '../components/Filter';
import '../styles/searchresults.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 5,
    resultsPerPage: 9,
    totalResults: 42
  });

  // Get search parameters from URL
  const location = searchParams.get('location') || '';
  const propertyType = searchParams.get('type') || 'all';
  const status = searchParams.get('status') || 'all';
  const priceRange = searchParams.get('price') || '';

  // Fetch properties based on search params (simulated)
  useEffect(() => {
    setLoading(true);
    
    const fetchProperties = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockProperties = Array.from({ length: 9 }, (_, i) => ({
          id: i + 1,
          title: `${['Modern', 'Luxury', 'Cozy', 'Spacious', 'Elegant'][i % 5]} ${['Apartment', 'House', 'Villa', 'Condo', 'Penthouse'][i % 5]}`,
          price: Math.floor(Math.random() * 900000) + 100000,
          type: i % 3 === 0 ? 'Rent' : 'Sale',
          address: `${Math.floor(Math.random() * 999) + 100} ${['Main St', 'Park Ave', 'Broadway', 'Oak Lane', 'Sunset Blvd'][i % 5]}, ${location || 'New York'}`,
          beds: Math.floor(Math.random() * 4) + 1,
          baths: Math.floor(Math.random() * 3) + 1,
          area: (Math.floor(Math.random() * 2000) + 500),
          image: `/assets/images/property${(i % 5) + 1}.jpg`
        }));
        
        setProperties(mockProperties);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setLoading(false);
      }
    };
    
    fetchProperties();
  }, [location, propertyType, status, priceRange, pagination.currentPage]);

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    
    let sortedProperties = [...properties];
    
    switch (e.target.value) {
      case 'price-asc':
        sortedProperties.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedProperties.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sortedProperties.sort((a, b) => b.id - a.id);
        break;
      case 'oldest':
        sortedProperties.sort((a, b) => a.id - b.id);
        break;
      default:
        break;
    }
    
    setProperties(sortedProperties);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setPagination(prev => ({
      ...prev,
      currentPage: page
    }));
    window.scrollTo(0, 0);
  };

  // Generate pagination buttons
  const renderPagination = () => {
    const pages = [];
    
    pages.push(
      <button 
        key="prev" 
        className={`pagination-button prev ${pagination.currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => pagination.currentPage > 1 && handlePageChange(pagination.currentPage - 1)}
        disabled={pagination.currentPage === 1}
      >
        <i className="fas fa-chevron-left"></i> Prev
      </button>
    );
    
    for (let i = 1; i <= pagination.totalPages; i++) {
      if (
        i === 1 || 
        i === pagination.totalPages || 
        (i >= pagination.currentPage - 1 && i <= pagination.currentPage + 1)
      ) {
        pages.push(
          <button 
            key={i} 
            className={`pagination-button ${pagination.currentPage === i ? 'active' : ''}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      } else if (
        i === pagination.currentPage - 2 || 
        i === pagination.currentPage + 2
      ) {
        pages.push(
          <span key={`ellipsis-${i}`} className="pagination-ellipsis">...</span>
        );
      }
    }
    
    pages.push(
      <button 
        key="next" 
        className={`pagination-button next ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}`}
        onClick={() => pagination.currentPage < pagination.totalPages && handlePageChange(pagination.currentPage + 1)}
        disabled={pagination.currentPage === pagination.totalPages}
      >
        Next <i className="fas fa-chevron-right"></i>
      </button>
    );
    
    return pages;
  };

  return (
    <div className="search-results-container">
      <div className="search-results-header">
        <div className="search-title">
          <h1>{location ? `Properties in ${location}` : 'All Properties'}</h1>
          <p>{pagination.totalResults} results found</p>
        </div>

        <div className="search-actions">
          <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          <select value={sortBy} onChange={handleSortChange} className="sort-dropdown">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>

          <div className="view-toggle">
            <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
              <i className="fas fa-th"></i>
            </button>
            <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>
              <i className="fas fa-list"></i>
            </button>
          </div>
        </div>
      </div>

      {showFilters && <Filter />}

      {loading ? (
        <p className="loading-text">Loading properties...</p>
      ) : properties.length > 0 ? (
        <div className={`property-list ${viewMode}`}>
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} viewMode={viewMode} />
          ))}
        </div>
      ) : (
        <p className="no-results">No properties found. Try adjusting your search criteria.</p>
      )}

      <div className="pagination">{renderPagination()}</div>
    </div>
  );
};

export default SearchResults;
