import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/searchbar.css';

const SearchBar = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    type: 'all',
    status: 'all',
    price: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create query parameters for the search
    const params = new URLSearchParams();
    
    if (searchParams.location) params.append('location', searchParams.location);
    if (searchParams.type !== 'all') params.append('type', searchParams.type);
    if (searchParams.status !== 'all') params.append('status', searchParams.status);
    if (searchParams.price) params.append('price', searchParams.price);
    
    // Navigate to search results page with query parameters
    navigate(`/search-results?${params.toString()}`);
  };

  return (
    <div className="searchbar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-group">
          <i className="fas fa-map-marker-alt search-icon"></i>
          <input
            type="text"
            name="location"
            placeholder="City, Neighborhood, or Address"
            value={searchParams.location}
            onChange={handleChange}
            className="search-input"
          />
        </div>

        <div className="search-select-group">
          <select
            name="type"
            value={searchParams.type}
            onChange={handleChange}
            className="search-select"
          >
            <option value="all">All Types</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        <div className="search-select-group">
          <select
            name="status"
            value={searchParams.status}
            onChange={handleChange}
            className="search-select"
          >
            <option value="all">Buy & Rent</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </div>

        <div className="search-select-group">
          <select
            name="price"
            value={searchParams.price}
            onChange={handleChange}
            className="search-select"
          >
            <option value="">Price Range</option>
            <option value="0-100000">$0 - $100,000</option>
            <option value="100000-300000">$100,000 - $300,000</option>
            <option value="300000-500000">$300,000 - $500,000</option>
            <option value="500000-1000000">$500,000 - $1,000,000</option>
            <option value="1000000+">$1,000,000+</option>
          </select>
        </div>

        <button type="submit" className="search-button">
          <i className="fas fa-search"></i> Search
        </button>
      </form>
      
      <div className="advanced-search">
        <button onClick={() => navigate('/filter')} className="advanced-search-button">
          Advanced Filters <i className="fas fa-sliders-h"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;