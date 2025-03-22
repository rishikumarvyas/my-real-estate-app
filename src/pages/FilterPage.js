import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/filterpage.css';

const FilterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get current query params if any
  const queryParams = new URLSearchParams(location.search);
  
  // Initialize state with existing query params or defaults
  const [filters, setFilters] = useState({
    propertyType: queryParams.get('type') || 'all',
    status: queryParams.get('status') || 'all',
    minPrice: queryParams.get('minPrice') || '',
    maxPrice: queryParams.get('maxPrice') || '',
    minBeds: queryParams.get('minBeds') || '',
    maxBeds: queryParams.get('maxBeds') || '',
    minBaths: queryParams.get('minBaths') || '',
    maxBaths: queryParams.get('maxBaths') || '',
    location: queryParams.get('location') || '',
    minArea: queryParams.get('minArea') || '',
    maxArea: queryParams.get('maxArea') || '',
    features: {
      swimmingPool: queryParams.get('swimmingPool') === 'true',
      garage: queryParams.get('garage') === 'true',
      garden: queryParams.get('garden') === 'true',
      airConditioning: queryParams.get('airConditioning') === 'true',
      heating: queryParams.get('heating') === 'true',
      balcony: queryParams.get('balcony') === 'true',
      elevator: queryParams.get('elevator') === 'true',
      security: queryParams.get('security') === 'true',
      gym: queryParams.get('gym') === 'true',
      furnished: queryParams.get('furnished') === 'true'
    },
    sortBy: queryParams.get('sortBy') || 'newest'
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [name]: checked
      }
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create query parameters
    const params = new URLSearchParams();
    
    // Add basic filters
    if (filters.propertyType !== 'all') params.append('type', filters.propertyType);
    if (filters.status !== 'all') params.append('status', filters.status);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.minBeds) params.append('minBeds', filters.minBeds);
    if (filters.maxBeds) params.append('maxBeds', filters.maxBeds);
    if (filters.minBaths) params.append('minBaths', filters.minBaths);
    if (filters.maxBaths) params.append('maxBaths', filters.maxBaths);
    if (filters.location) params.append('location', filters.location);
    if (filters.minArea) params.append('minArea', filters.minArea);
    if (filters.maxArea) params.append('maxArea', filters.maxArea);
    if (filters.sortBy !== 'newest') params.append('sortBy', filters.sortBy);
    
    // Add feature filters
    Object.entries(filters.features).forEach(([feature, value]) => {
      if (value) params.append(feature, 'true');
    });
    
    // Navigate to search results page with filters
    navigate(`/search-results?${params.toString()}`);
  };

  // Handle clear filters
  const handleClear = () => {
    setFilters({
      propertyType: 'all',
      status: 'all',
      minPrice: '',
      maxPrice: '',
      minBeds: '',
      maxBeds: '',
      minBaths: '',
      maxBaths: '',
      location: '',
      minArea: '',
      maxArea: '',
      features: {
        swimmingPool: false,
        garage: false,
        garden: false,
        airConditioning: false,
        heating: false,
        balcony: false,
        elevator: false,
        security: false,
        gym: false,
        furnished: false
      },
      sortBy: 'newest'
    });
  };

  return (
    <div className="filter-page-container">
      <div className="filter-header">
        <h1>Advanced Property Search</h1>
        <p>Refine your search to find the perfect property</p>
      </div>

      <form onSubmit={handleSubmit} className="filter-form">
        <div className="filter-grid">
          {/* Basic Filters Section */}
          <div className="filter-section">
            <h3>Basic Information</h3>
            
            <div className="filter-group">
              <label htmlFor="propertyType">Property Type</label>
              <select 
                id="propertyType" 
                name="propertyType" 
                value={filters.propertyType} 
                onChange={handleInputChange}
                className="filter-select"
              >
                <option value="all">All Property Types</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="townhouse">Townhouse</option>
                <option value="condominium">Condominium</option>
                <option value="commercial">Commercial</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="status">Status</label>
              <select 
                id="status" 
                name="status" 
                value={filters.status} 
                onChange={handleInputChange}
                className="filter-select"
              >
                <option value="all">All Statuses</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="location">Location</label>
              <input 
                type="text" 
                id="location" 
                name="location" 
                placeholder="City, Neighborhood, ZIP" 
                value={filters.location} 
                onChange={handleInputChange}
                className="filter-input"
              />
            </div>
          </div>

          {/* Price Range Section */}
          <div className="filter-section">
            <h3>Price Range</h3>
            
            <div className="filter-row">
              <div className="filter-group half">
                <label htmlFor="minPrice">Min Price</label>
                <input 
                  type="number" 
                  id="minPrice" 
                  name="minPrice" 
                  placeholder="Min $" 
                  value={filters.minPrice} 
                  onChange={handleInputChange}
                  className="filter-input"
                />
              </div>
              
              <div className="filter-group half">
                <label htmlFor="maxPrice">Max Price</label>
                <input 
                  type="number" 
                  id="maxPrice" 
                  name="maxPrice" 
                  placeholder="Max $" 
                  value={filters.maxPrice} 
                  onChange={handleInputChange}
                  className="filter-input"
                />
              </div>
            </div>
          </div>

          {/* Bedrooms & Bathrooms Section */}
          <div className="filter-section">
            <h3>Rooms</h3>
            
            <div className="filter-row">
              <div className="filter-group half">
                <label htmlFor="minBeds">Min Beds</label>
                <select 
                  id="minBeds" 
                  name="minBeds" 
                  value={filters.minBeds} 
                  onChange={handleInputChange}
                  className="filter-select"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>
              
              <div className="filter-group half">
                <label htmlFor="maxBeds">Max Beds</label>
                <select 
                  id="maxBeds" 
                  name="maxBeds" 
                  value={filters.maxBeds} 
                  onChange={handleInputChange}
                  className="filter-select"
                >
                  <option value="">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6+</option>
                </select>
              </div>
            </div>

            <div className="filter-row">
              <div className="filter-group half">
                <label htmlFor="minBaths">Min Baths</label>
                <select 
                  id="minBaths" 
                  name="minBaths" 
                  value={filters.minBaths} 
                  onChange={handleInputChange}
                  className="filter-select"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>
              
              <div className="filter-group half">
                <label htmlFor="maxBaths">Max Baths</label>
                <select 
                  id="maxBaths" 
                  name="maxBaths" 
                  value={filters.maxBaths} 
                  onChange={handleInputChange}
                  className="filter-select"
                >
                  <option value="">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Area Size Section */}
          <div className="filter-section">
            <h3>Area Size</h3>
            
            <div className="filter-row">
              <div className="filter-group half">
                <label htmlFor="minArea">Min Area (sq ft)</label>
                <input 
                  type="number" 
                  id="minArea" 
                  name="minArea" 
                  placeholder="Min Area" 
                  value={filters.minArea} 
                  onChange={handleInputChange}
                  className="filter-input"
                />
              </div>
              
              <div className="filter-group half">
                <label htmlFor="maxArea">Max Area (sq ft)</label>
                <input 
                  type="number" 
                  id="maxArea" 
                  name="maxArea" 
                  placeholder="Max Area" 
                  value={filters.maxArea} 
                  onChange={handleInputChange}
                  className="filter-input"
                />
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="filter-section features-section">
            <h3>Features & Amenities</h3>
            
            <div className="features-grid">
              <div className="feature-checkbox">
                <input 
                  type="checkbox" 
                  id="swimmingPool" 
                  name="swimmingPool" 
                  checked={filters.features.swimmingPool} 
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="swimmingPool">Swimming Pool</label>
              </div>
              
              <div className="feature-checkbox">
                <input 
                  type="checkbox" 
                  id="garage" 
                  name="garage" 
                  checked={filters.features.garage} 
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="garage">Garage</label>
              </div>
              
              <div className="feature-checkbox">
                <input 
                  type="checkbox" 
                  id="garden" 
                  name="garden" 
                  checked={filters.features.garden} 
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="garden">Garden</label>
              </div>
              
              <div className="feature-checkbox">
                <input 
                  type="checkbox" 
                  id="airConditioning" 
                  name="airConditioning" 
                  checked={filters.features.airConditioning} 
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="airConditioning">Air Conditioning</label>
              </div>
              
              <div className="feature-checkbox">
                <input 
                  type="checkbox" 
                  id="heating" 
                  name="heating" 
                  checked={filters.features.heating} 
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="heating">Heating</label>
              </div>
              
              <div className="feature-checkbox">
                <input 
                  type="checkbox" 
                  id="balcony" 
                  name="balcony" 
                  checked={filters.features.balcony} 
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="balcony">Balcony</label>
              </div>
              
              <div className="feature-checkbox">
                <input 
                  type="checkbox" 
                  id="elevator" 
                  name="elevator" 
                  checked={filters.features.elevator} 
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="elevator">Elevator</label>
              </div>
              
              <div className="feature-checkbox">
                <input 
                  type="checkbox" 
                  id="security" 
                  name="security" 
                  checked={filters.features.security} 
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="security">Security System</label>
              </div>
              
              <div className="feature-checkbox">
                <input 
                  type="checkbox" 
                  id="gym" 
                  name="gym" 
                  checked={filters.features.gym} 
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="gym">Gym</label>
              </div>
              
              <div className="feature-checkbox">
                <input 
                  type="checkbox" 
                  id="furnished" 
                  name="furnished" 
                  checked={filters.features.furnished} 
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="furnished">Furnished</label>
              </div>
            </div>
          </div>

          {/* Sort By Section */}
          <div className="filter-section">
            <h3>Sort Results</h3>
            
            <div className="filter-group">
              <label htmlFor="sortBy">Sort By</label>
              <select 
                id="sortBy" 
                name="sortBy" 
                value={filters.sortBy} 
                onChange={handleInputChange}
                className="filter-select"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="size_asc">Size: Small to Large</option>
                <option value="size_desc">Size: Large to Small</option>
              </select>
            </div>
          </div>
        </div>

        <div className="filter-actions">
          <button 
            type="button" 
            onClick={handleClear} 
            className="clear-button"
          >
            Clear All Filters
          </button>
          <button 
            type="submit" 
            className="apply-button"
          >
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterPage;