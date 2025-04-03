import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Components
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import Buy from './pages/Buy';
import Rent from './pages/Rent';
import Agents from './pages/Agents';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SearchResults from './pages/SearchResults';
import FilterPage from './pages/FilterPage';
import RegisterPropertyPage from './pages/RegisterProperty';
import ForgotPassword from './components/ForgotPassword';
// Context Providers
import { AuthProvider } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';

// Global Styles
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <PropertyProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <Routes>
                {/* Main Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/property/:id" element={<PropertyDetail />} />
                <Route path="/buy" element={<Buy />} />
                <Route path="/rent" element={<Rent />} />
                {/* <Route path="/agents" element={<Agents />} />
                <Route path="/blog" element={<Blog />} /> */}
                <Route path="/contact" element={<Contact />} />
                <Route path="/register-property" element={<RegisterPropertyPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                {/* Auth Pages */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* Search & Filter Pages */}
                <Route path="/search" element={<SearchResults />} />
                <Route path="/filter" element={<FilterPage />} />
                
                {/* 404 Page - Catch all other routes */}
                <Route path="*" element={
                  <div className="not-found-container">
                    <h1>404 - Page Not Found</h1>
                    <p>The page you are looking for does not exist.</p>
                    <button className="back-button" onClick={() => window.history.back()}>
                      Go Back
                    </button>
                  </div>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </PropertyProvider>
    </AuthProvider>
  );
}

export default App;