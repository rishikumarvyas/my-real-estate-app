// Base API URL - replace with your actual API URL in production
const API_BASE_URL = 'https://api.estatehub.com/api/v1';

// Helper function for making API requests
const fetchApi = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Default options for fetch
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        // Include auth token if available
        ...(localStorage.getItem('authToken') && {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        })
      },
    };
    
    const response = await fetch(url, { ...defaultOptions, ...options });
    
    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => {
        return { message: 'Something went wrong' };
      });
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Auth related API calls
export const apiLogin = async (email, password) => {
  const data = await fetchApi('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  
  if (data.token) {
    localStorage.setItem('authToken', data.token);
  }
  
  return data.user;
};

export const apiRegister = async (userData) => {
  const data = await fetchApi('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  });
  
  if (data.token) {
    localStorage.setItem('authToken', data.token);
  }
  
  return data.user;
};

export const apiLogout = async () => {
  await fetchApi('/auth/logout', { method: 'POST' });
  localStorage.removeItem('authToken');
};

export const apiCheckAuth = async () => {
  try {
    const data = await fetchApi('/auth/me');
    return data.user;
  } catch (error) {
    localStorage.removeItem('authToken');
    return null;
  }
};

// Property related API calls
export const fetchProperties = async (page = 1, limit = 12) => {
  return await fetchApi(`/properties?page=${page}&limit=${limit}`);
};

export const fetchFeaturedProperties = async () => {
  return await fetchApi('/properties/featured');
};

export const fetchPropertyById = async (id) => {
  return await fetchApi(`/properties/${id}`);
};

export const searchProperties = async (params, page = 1, limit = 12) => {
  // Build query string from params
  const queryParams = new URLSearchParams();
  
  queryParams.append('page', page);
  queryParams.append('limit', limit);
  
  // Add each search param to query string
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      // Handle arrays or objects differently
      if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (subValue === true) {
            queryParams.append(subKey, 'true');
          }
        });
      } else {
        queryParams.append(key, value);
      }
    }
  });
  
  return await fetchApi(`/properties/search?${queryParams.toString()}`);
};

// User related API calls
export const fetchUserProfile = async (userId) => {
  return await fetchApi(`/users/${userId}`);
};

export const updateUserProfile = async (userId, userData) => {
  return await fetchApi(`/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(userData)
  });
};

// Favorites/Saved properties API calls
export const getFavoriteProperties = async () => {
  return await fetchApi('/users/favorites');
};

export const addToFavorites = async (propertyId) => {
  return await fetchApi('/users/favorites', {
    method: 'POST',
    body: JSON.stringify({ propertyId })
  });
};

export const removeFromFavorites = async (propertyId) => {
  return await fetchApi(`/users/favorites/${propertyId}`, {
    method: 'DELETE'
  });
};

// Contact and messaging API calls
export const submitContactForm = async (contactData) => {
  return await fetchApi('/contact', {
    method: 'POST',
    body: JSON.stringify(contactData)
  });
};

export const sendPropertyInquiry = async (propertyId, inquiryData) => {
  return await fetchApi(`/properties/${propertyId}/inquiries`, {
    method: 'POST',
    body: JSON.stringify(inquiryData)
  });
};

// Agent related API calls
export const fetchAgents = async (page = 1, limit = 12) => {
  return await fetchApi(`/agents?page=${page}&limit=${limit}`);
};

export const fetchAgentById = async (id) => {
  return await fetchApi(`/agents/${id}`);
};

export const fetchAgentProperties = async (agentId, page = 1, limit = 12) => {
  return await fetchApi(`/agents/${agentId}/properties?page=${page}&limit=${limit}`);
};

// Blog related API calls
export const fetchBlogPosts = async (page = 1, limit = 10) => {
  return await fetchApi(`/blog/posts?page=${page}&limit=${limit}`);
};

export const fetchBlogPostById = async (id) => {
  return await fetchApi(`/blog/posts/${id}`);
};