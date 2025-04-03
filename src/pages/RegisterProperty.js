import React, { useState, useEffect } from 'react';
import { Upload, X, ImagePlus, Check, Home, DollarSign, MapPin, Bath, BedDouble} from 'lucide-react';
import '../styles/property-registration.css';

const superCategories = [
  { id: 1, name: 'Buy' },
  { id: 2, name: 'Rent' },
  { id: 3, name: 'Sale' },
  { id: 4, name: 'PG' }
];

const propertyTypes = [
  { id: 1, superCategoryId: 1, name: 'Flat' },
  { id: 2, superCategoryId: 1, name: 'Shop' },
  { id: 3, superCategoryId: 1, name: 'Plot' },
  { id: 4, superCategoryId: 1, name: 'RowHouse' },
  { id: 5, superCategoryId: 1, name: 'Villa/Bunglow' },
  { id: 6, superCategoryId: 2, name: 'Flat' },
  { id: 7, superCategoryId: 2, name: 'Shop' },
  { id: 8, superCategoryId: 2, name: 'Villa/Bunglow' },
  { id: 9, superCategoryId: 3, name: 'Flat' },
  { id: 10, superCategoryId: 3, name: 'Plot' },
  { id: 11, superCategoryId: 3, name: 'Villa/Bunglow' },
  { id: 12, superCategoryId: 4, name: 'Shared Room' },
  { id: 13, superCategoryId: 4, name: 'Private Room' }
];

const amenities = [
  { id: 1, name: 'Lift', icon: '🛗' },
  { id: 2, name: 'Swimming Pool', icon: '🏊' },
  { id: 3, name: 'Gym', icon: '💪' },
  { id: 4, name: 'Club House', icon: '🏛️' },
  { id: 5, name: 'Garden', icon: '🌳' },
  { id: 6, name: 'Covered Parking', icon: '🅿️' },
  { id: 7, name: 'Security', icon: '👮' },
  { id: 8, name: 'Power Backup', icon: '🔋' },
  { id: 9, name: 'Children Play Area', icon: '🧒' },
  { id: 10, name: 'Wi-Fi', icon: '📶' },
  { id: 11, name: 'Air Conditioning', icon: '❄️' },
  { id: 12, name: 'Water Purifier', icon: '💧' }
];

const userTypes = ['Owner', 'Broker', 'Builder'];

const RegisterPropertyPage = () => {
  const [selectedSuperCategory, setSelectedSuperCategory] = useState(null);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    propertyName: '',
    location: '',
    price: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: '',
    userType: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter property types based on selected super category
  const filteredPropertyTypes = selectedSuperCategory
    ? propertyTypes.filter(type => type.superCategoryId === selectedSuperCategory)
    : [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  const handleSuperCategorySelect = (categoryId) => {
    setSelectedSuperCategory(categoryId);
    // Reset property type when category changes
    setFormData({
      ...formData,
      propertyType: ''
    });
  };

  const handleAmenityToggle = (amenityId) => {
    if (selectedAmenities.includes(amenityId)) {
      setSelectedAmenities(selectedAmenities.filter(id => id !== amenityId));
    } else {
      setSelectedAmenities([...selectedAmenities, amenityId]);
    }
  };

  const handleImageUpload = (e) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const validateForm = () => {
    const errors = {};
    
    if (!selectedSuperCategory) errors.superCategory = 'Please select a property category';
    if (!formData.userType) errors.userType = 'Please select who you are';
    if (!formData.propertyName.trim()) errors.propertyName = 'Property name is required';
    if (!formData.location.trim()) errors.location = 'Location is required';
    if (!formData.price) errors.price = 'Price is required';
    if (!formData.propertyType) errors.propertyType = 'Property type is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulation of form submission
      setTimeout(() => {
        console.log('Form submitted:', {
          ...formData,
          superCategory: selectedSuperCategory,
          amenities: selectedAmenities,
          images
        });
        
        setIsSubmitting(false);
        // Here you would normally redirect or show success message
      }, 1500);
    }
  };

  // Clean up image URLs when component unmounts
  useEffect(() => {
    return () => {
      images.forEach(image => URL.revokeObjectURL(image.preview));
    };
  }, []);

  return (
    <div className="property-registration-container">
      <div className="property-form-card">
        <div className="form-header">
          <h2>Submit Your Property</h2>
          <button type="button" className="close-button">
            <X size={24} />
          </button>
        </div>

        <form className="form-body" onSubmit={handleSubmit}>
          {/* Super Category Selection */}
          <div className="form-section-title">
            <h3>Basic Information</h3>
            <div className="form-section-divider"></div>
          </div>
          
          <div className="form-group category-section">
            <label className="form-label">Property Category *</label>
            <div className="category-buttons">
              {superCategories.map(category => (
                <button
                  key={category.id}
                  type="button"
                  className={`category-button ${selectedSuperCategory === category.id ? 'active' : ''}`}
                  onClick={() => handleSuperCategorySelect(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            {formErrors.superCategory && <div className="form-error">{formErrors.superCategory}</div>}
          </div>

          <div className="form-grid">
            {/* User Type */}
            <div className="form-group">
              <label className="form-label">You are a *</label>
              <select 
                className="form-select"
                name="userType"
                value={formData.userType}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                {userTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
              {formErrors.userType && <div className="form-error">{formErrors.userType}</div>}
            </div>

            {/* Property Type */}
            <div className="form-group">
              <label className="form-label">Property Type *</label>
              <select
                className="form-select"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                disabled={!selectedSuperCategory}
              >
                <option value="">Select Type</option>
                {filteredPropertyTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
              {formErrors.propertyType && <div className="form-error">{formErrors.propertyType}</div>}
            </div>

            {/* Property Name */}
            <div className="form-group">
              <label className="form-label">Property Name *</label>
              <div className="input-icon-wrapper">
                <Home size={18} className="input-icon" />
                <input
                  type="text"
                  name="propertyName"
                  value={formData.propertyName}
                  onChange={handleInputChange}
                  className="form-input with-icon"
                  placeholder="Enter property name"
                />
              </div>
              {formErrors.propertyName && <div className="form-error">{formErrors.propertyName}</div>}
            </div>

            {/* Location */}
            <div className="form-group">
              <label className="form-label">Location *</label>
              <div className="input-icon-wrapper">
                <MapPin size={18} className="input-icon" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="form-input with-icon"
                  placeholder="Enter location"
                />
              </div>
              {formErrors.location && <div className="form-error">{formErrors.location}</div>}
            </div>

            {/* Price */}
            <div className="form-group">
              <label className="form-label">Price (₹) *</label>
              <div className="input-icon-wrapper">
                <DollarSign size={18} className="input-icon" />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="form-input with-icon"
                  placeholder="Enter price"
                />
              </div>
              {formErrors.price && <div className="form-error">{formErrors.price}</div>}
            </div>

            {/* Area */}
            <div className="form-group">
              <label className="form-label">Area (sq ft)</label>
              <div className="input-icon-wrapper">
                {/* <SquareFoot size={18} className="input-icon" /> */}
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  className="form-input with-icon"
                  placeholder="Property area"
                />
              </div>
            </div>

            {/* Bedrooms */}
            <div className="form-group">
              <label className="form-label">Bedrooms</label>
              <div className="input-icon-wrapper">
                <BedDouble size={18} className="input-icon" />
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  className="form-input with-icon"
                  placeholder="Number of bedrooms"
                />
              </div>
            </div>

            {/* Bathrooms */}
            <div className="form-group">
              <label className="form-label">Bathrooms</label>
              <div className="input-icon-wrapper">
                <Bath size={18} className="input-icon" />
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  className="form-input with-icon"
                  placeholder="Number of bathrooms"
                />
              </div>
            </div>
          </div>

          {/* Amenities Section */}
          <div className="form-section-title">
            <h3>Amenities</h3>
            <div className="form-section-divider"></div>
          </div>

          <div className="form-group">
            <label className="form-label">Select Available Amenities</label>
            <div className="amenities-grid">
              {amenities.map(amenity => (
                <div
                  key={amenity.id}
                  className={`amenity-item ${selectedAmenities.includes(amenity.id) ? 'selected' : ''}`}
                  onClick={() => handleAmenityToggle(amenity.id)}
                >
                  <div className="amenity-content">
                    <span className="amenity-icon">{amenity.icon}</span>
                    <span className="amenity-label">{amenity.name}</span>
                    {selectedAmenities.includes(amenity.id) && 
                      <Check size={16} className="amenity-check" />
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="form-section-title">
            <h3>Additional Information</h3>
            <div className="form-section-divider"></div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-textarea"
              placeholder="Describe your property - include details about the neighborhood, special features, etc."
              rows={5}
            ></textarea>
          </div>

          {/* Upload Images & Videos */}
          <div className="form-group">
            <label className="form-label">Upload Images & Videos</label>
            <div className="upload-area">
              {/* Uploaded images preview */}
              {images.length > 0 && (
                <div className="preview-grid">
                  {images.map((image, index) => (
                    <div key={index} className="preview-item">
                      <img
                        src={image.preview}
                        alt={`Preview ${index}`}
                        className="preview-image"
                      />
                      <button
                        type="button"
                        className="preview-remove"
                        onClick={() => removeImage(index)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload zone */}
              <div className="upload-content">
                <Upload className="upload-icon" />
                <p className="upload-title">Click to upload or drag and drop</p>
                <p className="upload-subtitle">SVG, PNG, JPG or MP4 (max. 10MB)</p>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  className="hidden"
                  id="file-upload"
                  onChange={handleImageUpload}
                />
                <label
                  htmlFor="file-upload"
                  className="upload-button"
                >
                  <ImagePlus size={18} className="upload-button-icon" />
                  Select Files
                </label>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPropertyPage;