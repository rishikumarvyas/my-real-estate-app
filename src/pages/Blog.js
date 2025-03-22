import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import agent1 from '../assets/images/agent1.jpg';
import agent2 from '../assets/images/agent2.jpg';
import agent3 from '../assets/images/agent3.jpg';
import agent4 from '../assets/images/agent4.jpg';
import agent5 from '../assets/images/agent5.jpg';
import agent6 from '../assets/images/agent6.jpg';



import '../styles/blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample blog posts data
  useEffect(() => {
    setTimeout(() => {
      setPosts([
        {
          id: 1,
          title: '10 Tips for First-Time Home Buyers in 2025',
          summary: 'Navigate the complex home buying process with these essential tips for first-time buyers.',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          author: 'Sarah Johnson',
          authorAvatar: agent1,
          date: 'March 15, 2025',
          category: 'Buying',
          image: '/assets/images/blog1.jpg',
          readTime: '5 min read',
          comments: 12
        },
        {
          id: 2,
          title: 'Market Trends: What to Expect in Real Estate This Year',
          summary: 'A comprehensive analysis of current market trends and predictions for the coming months.',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          author: 'Michael Rodriguez',
          authorAvatar: agent2,
          date: 'March 10, 2025',
          category: 'Market Trends',
          image: '/assets/images/blog2.jpg',
          readTime: '8 min read',
          comments: 24
        },
        {
          id: 3,
          title: 'How to Stage Your Home to Sell Faster',
          summary: 'Professional staging tips that can help you sell your property more quickly and at a better price.',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          author: 'Jennifer Lee',
          authorAvatar: agent3,
          date: 'March 5, 2025',
          category: 'Selling',
          image: '/assets/images/blog3.jpg',
          readTime: '6 min read',
          comments: 18
        },
        {
          id: 4,
          title: 'Investment Properties: How to Build Your Portfolio',
          summary: 'Expert advice on selecting and managing investment properties for long-term wealth building.',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          author: 'David Thompson',
          authorAvatar: agent4,
          date: 'February 28, 2025',
          category: 'Investment',
          image: '/assets/images/blog4.jpg',
          readTime: '10 min read',
          comments: 30
        },
        {
          id: 5,
          title: 'Best Neighborhoods for Young Families in 2025',
          summary: 'Discover the top-rated neighborhoods for families with young children across major cities.',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          author: 'Jessica Martinez',
          authorAvatar: agent5,
          date: 'February 22, 2025',
          category: 'Neighborhoods',
          image: '/assets/images/blog5.jpg',
          readTime: '7 min read',
          comments: 15
        },
        {
          id: 6,
          title: 'The Ultimate Guide to Rental Property Management',
          summary: 'Learn how to efficiently manage rental properties and maximize your returns.',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          author: 'Robert Wilson',
          authorAvatar: agent6,
          date: 'February 18, 2025',
          category: 'Renting',
          image: '/assets/images/blog6.jpg',
          readTime: '9 min read',
          comments: 21
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const categories = ['all', 'Buying', 'Selling', 'Renting', 'Investment', 'Market Trends', 'Neighborhoods'];

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="blog-container">
      <h2 className="blog-title">Latest Blog Posts</h2>

      <div className="blog-filters">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />

        <div className="categories">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="loading-text">Loading posts...</p>
      ) : filteredPosts.length > 0 ? (
        <div className="blog-list">
          {filteredPosts.map(post => (
            <div key={post.id} className="blog-post">
              <img src={post.image} alt={post.title} className="blog-image" />
              <div className="blog-content">
                <h3 className="blog-post-title">{post.title}</h3>
                <p className="blog-summary">{post.summary}</p>
                <div className="blog-meta">
                  <img src={post.authorAvatar} alt={post.author} className="author-avatar" />
                  <span className="author-name">{post.author}</span>
                  <span className="blog-date">{post.date}</span>
                  <span className="blog-read-time">{post.readTime}</span>
                  <span className="blog-comments">{post.comments} comments</span>
                </div>
                <Link to={`/blog/${post.id}`} className="read-more">Read More</Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">No blog posts found.</p>
      )}
    </div>
  );
};

export default Blog;
