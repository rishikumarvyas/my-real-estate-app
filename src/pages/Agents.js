import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import agent1 from '../assets/images/agent1.jpg';
import agent2 from '../assets/images/agent2.jpg';
import agent3 from '../assets/images/agent3.jpg';
import agent4 from '../assets/images/agent4.jpg';
import agent5 from '../assets/images/agent5.jpg';
import agent6 from '../assets/images/agent6.jpg';
import '../styles/agents.css';

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');

  // Sample agents data
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setAgents([
        {
          id: 1,
          name: 'Sarah Johnson',
          title: 'Senior Real Estate Agent',
          specialty: 'Luxury Properties',
          experience: 12,
          rating: 4.9,
          reviews: 87,
          phone: '(123) 456-7890',
          email: 'sarah.j@estatehub.com',
          description: 'Sarah specializes in high-end properties and has extensive experience in the luxury real estate market.',
          avatar: agent1,
          listings: 24
        },
        {
          id: 2,
          name: 'Michael Rodriguez',
          title: 'Commercial Real Estate Specialist',
          specialty: 'Commercial',
          experience: 8,
          rating: 4.7,
          reviews: 56,
          phone: '(123) 456-7891',
          email: 'michael.r@estatehub.com',
          description: 'Michael has a deep understanding of commercial real estate trends and opportunities.',
          avatar: agent2,
          listings: 18
        },
        {
          id: 3,
          name: 'Jennifer Lee',
          title: 'Residential Property Expert',
          specialty: 'Residential',
          experience: 15,
          rating: 4.8,
          reviews: 124,
          phone: '(123) 456-7892',
          email: 'jennifer.l@estatehub.com',
          description: 'Jennifer has helped hundreds of families find their perfect home with her client-centered approach.',
          avatar: agent3,
          listings: 31
        },
        {
          id: 4,
          name: 'David Thompson',
          title: 'Investment Property Advisor',
          specialty: 'Investment',
          experience: 10,
          rating: 4.6,
          reviews: 73,
          phone: '(123) 456-7893',
          email: 'david.t@estatehub.com',
          description: 'David helps investors maximize their returns through strategic property acquisitions.',
          avatar: agent4,
          listings: 15
        },
        {
          id: 5,
          name: 'Jessica Martinez',
          title: 'First-Time Homebuyer Specialist',
          specialty: 'Residential',
          experience: 6,
          rating: 4.9,
          reviews: 42,
          phone: '(123) 456-7894',
          email: 'jessica.m@estatehub.com',
          description: 'Jessica is passionate about guiding first-time homebuyers through the purchasing process.',
          avatar: agent5,
          listings: 12
        },
        {
          id: 6,
          name: 'Robert Wilson',
          title: 'Luxury Rental Expert',
          specialty: 'Rentals',
          experience: 9,
          rating: 4.7,
          reviews: 68,
          phone: '(123) 456-7895',
          email: 'robert.w@estatehub.com',
          description: 'Robert specializes in high-end rental properties and temporary housing solutions.',
          avatar: agent6,
          listings: 27
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterSpecialty(e.target.value);
  };

  // Filter agents based on search and specialty
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          agent.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = filterSpecialty === 'all' || agent.specialty === filterSpecialty;
    
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="agents-page">
      <div className="agents-hero">
        <div className="hero-content">
          <h1>Our Expert Agents</h1>
          <p>Meet our team of dedicated real estate professionals</p>
        </div>
      </div>

      <div className="agents-container">
        <div className="agents-filters">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search agents..."
              value={searchTerm}
              onChange={handleSearch}
              className="agent-search"
            />
            <i className="fas fa-search search-icon"></i>
          </div>

          <div className="specialty-filter">
            <select value={filterSpecialty} onChange={handleFilterChange} className="specialty-select">
              <option value="all">All Specialties</option>
              <option value="Luxury Properties">Luxury Properties</option>
              <option value="Commercial">Commercial</option>
              <option value="Residential">Residential</option>
              <option value="Investment">Investment</option>
              <option value="Rentals">Rentals</option>
            </select>
          </div>
        </div>

        <div className="agents-grid">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading agents...</p>
            </div>
          ) : filteredAgents.length > 0 ? (
            filteredAgents.map(agent => (
              <div className="agent-card" key={agent.id}>
                <div className="agent-image-container">
                  <img src={agent.avatar} alt={agent.name} className="agent-image" />
                  <div className="agent-listings-badge">
                    <span>{agent.listings} Listings</span>
                  </div>
                </div>
                
                <div className="agent-content">
                  <h3 className="agent-name">{agent.name}</h3>
                  <p className="agent-title">{agent.title}</p>
                  
                  <div className="agent-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, index) => (
                        <i 
                          key={index} 
                          className={`${index < Math.floor(agent.rating) ? 'fas' : index < agent.rating ? 'fas fa-star-half-alt' : 'far'} fa-star`}
                        ></i>
                      ))}
                    </div>
                    <span className="rating-text">{agent.rating} ({agent.reviews} reviews)</span>
                  </div>
                  
                  <p className="agent-specialty">
                    <strong>Specialty:</strong> {agent.specialty}
                  </p>
                  <p className="agent-experience">
                    <strong>Experience:</strong> {agent.experience} years
                  </p>
                  
                  <div className="agent-description">{agent.description}</div>
                  
                  <div className="agent-contact">
                    <div className="contact-item">
                      <i className="fas fa-phone"></i>
                      <span>{agent.phone}</span>
                    </div>
                    <div className="contact-item">
                      <i className="fas fa-envelope"></i>
                      <span>{agent.email}</span>
                    </div>
                  </div>
                  
                  <div className="agent-buttons">
                    <Link to={`/agent/${agent.id}`} className="view-profile-button">
                      View Profile
                    </Link>
                    <button className="contact-agent-button">
                      Contact Agent
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <i className="fas fa-user-slash"></i>
              <h3>No agents found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          )}
        </div>

        {!loading && filteredAgents.length > 0 && (
          <div className="join-team-cta">
            <div className="cta-content">
              <h3>Join Our Team of Professionals</h3>
              <p>Are you a real estate agent looking to advance your career? Join our dynamic team!</p>
              <Link to="/careers" className="join-team-button">
                Learn More
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Agents;