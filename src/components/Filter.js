import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../styles/filter.css';

const Filter = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    type: searchParams.get('type') || 'all',
    status: searchParams.get('status') || 'all',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    beds: searchParams.get('beds') || 'any',
    baths: searchParams.get('baths') || 'any',
    minArea: searchParams.get('minArea') || '',
    maxArea: searchParams.get('maxArea') || '',
    amenities: searchParams.getAll('amenities') || []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      amenities: checked ? [...prev.amenities, value] : prev.amenities.filter(amenity => amenity !== value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    if (filters.location) params.append('location', filters.location);
    if (filters.type !== 'all') params.append('type', filters.type);
    if (filters.status !== 'all') params.append('status', filters.status);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.beds !== 'any') params.append('beds', filters.beds);
    if (filters.baths !== 'any') params.append('baths', filters.baths);
    if (filters.minArea) params.append('minArea', filters.minArea);
    if (filters.maxArea) params.append('maxArea', filters.maxArea);
    
    filters.amenities.forEach(amenity => params.append('amenities', amenity));
    
    navigate(`/properties?${params.toString()}`);
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      type: 'all',
      status: 'all',
      minPrice: '',
      maxPrice: '',
      beds: 'any',
      baths: 'any',
      minArea: '',
      maxArea: '',
      amenities: []
    });
  };

  return (
    <div className="filter-container">
      <h3 className="filter-title">Filter Properties</h3>
      
      <form onSubmit={handleSubmit} className="filter-form">
        <div className="filter-section">
          <label>Location</label>
          <input type="text" name="location" placeholder="City, ZIP, or Address" value={filters.location} onChange={handleInputChange} />
        </div>

        <div className="filter-section">
          <label>Property Type</label>
          <select name="type" value={filters.type} onChange={handleInputChange}>
            <option value="all">All Types</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="townhouse">Townhouse</option>
            <option value="villa">Villa</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        <div className="filter-section">
          <label>Status</label>
          <select name="status" value={filters.status} onChange={handleInputChange}>
            <option value="all">All</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </div>

        <div className="filter-section">
          <label>Price Range</label>
          <div className="price-inputs">
            <input type="number" name="minPrice" placeholder="Min" value={filters.minPrice} onChange={handleInputChange} />
            <span>to</span>
            <input type="number" name="maxPrice" placeholder="Max" value={filters.maxPrice} onChange={handleInputChange} />
          </div>
        </div>

        <div className="filter-section">
          <label>Bedrooms</label>
          <select name="beds" value={filters.beds} onChange={handleInputChange}>
            <option value="any">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>

        <div className="filter-section">
          <label>Bathrooms</label>
          <select name="baths" value={filters.baths} onChange={handleInputChange}>
            <option value="any">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>

        <div className="filter-section">
          <label>Area (sq ft)</label>
          <div className="area-inputs">
            <input type="number" name="minArea" placeholder="Min" value={filters.minArea} onChange={handleInputChange} />
            <span>to</span>
            <input type="number" name="maxArea" placeholder="Max" value={filters.maxArea} onChange={handleInputChange} />
          </div>
        </div>

        <div className="filter-section">
          <label>Amenities</label>
          <div className="amenities-checkboxes">
            {['pool', 'garage', 'garden', 'gym', 'security'].map(amenity => (
              <div key={amenity} className="checkbox-item">
                <input type="checkbox" name="amenities" value={amenity} checked={filters.amenities.includes(amenity)} onChange={handleCheckboxChange} />
                <label>{amenity.charAt(0).toUpperCase() + amenity.slice(1)}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="filter-buttons">
          <button type="submit" className="apply-btn">Apply Filters</button>
          <button type="button" className="reset-btn" onClick={resetFilters}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
