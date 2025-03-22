import React, { createContext, useState, useEffect, useCallback } from 'react';
import { fetchProperties, fetchFeaturedProperties, fetchPropertyById, searchProperties } from '../services/api';

export const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [currentProperty, setCurrentProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useState({});
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12
  });

  // Fetch all properties
  const getAllProperties = useCallback(async (page = 1, limit = 12) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchProperties(page, limit);
      setProperties(response.data);
      setPagination({
        currentPage: response.pagination.currentPage,
        totalPages: response.pagination.totalPages,
        totalItems: response.pagination.totalItems,
        itemsPerPage: response.pagination.itemsPerPage
      });
      return response;
    } catch (err) {
      setError(err.message || 'Failed to fetch properties');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch featured properties
  const getFeaturedProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchFeaturedProperties();
      setFeaturedProperties(data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch featured properties');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch property by ID
  const getPropertyById = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPropertyById(id);
      setCurrentProperty(data);
      return data;
    } catch (err) {
      setError(err.message || `Failed to fetch property with ID: ${id}`);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Search properties with filters
  const searchPropertiesWithFilters = useCallback(async (params, page = 1, limit = 12) => {
    try {
      setLoading(true);
      setError(null);
      setSearchParams(params);
      const response = await searchProperties(params, page, limit);
      setSearchResults(response.data);
      setPagination({
        currentPage: response.pagination.currentPage,
        totalPages: response.pagination.totalPages,
        totalItems: response.pagination.totalItems,
        itemsPerPage: response.pagination.itemsPerPage
      });
      return response;
    } catch (err) {
      setError(err.message || 'Failed to search properties');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Load next page
  const loadNextPage = useCallback(async () => {
    if (pagination.currentPage < pagination.totalPages) {
      const nextPage = pagination.currentPage + 1;
      if (Object.keys(searchParams).length > 0) {
        await searchPropertiesWithFilters(searchParams, nextPage, pagination.itemsPerPage);
      } else {
        await getAllProperties(nextPage, pagination.itemsPerPage);
      }
    }
  }, [pagination, searchParams, searchPropertiesWithFilters, getAllProperties]);

  // Load previous page
  const loadPreviousPage = useCallback(async () => {
    if (pagination.currentPage > 1) {
      const prevPage = pagination.currentPage - 1;
      if (Object.keys(searchParams).length > 0) {
        await searchPropertiesWithFilters(searchParams, prevPage, pagination.itemsPerPage);
      } else {
        await getAllProperties(prevPage, pagination.itemsPerPage);
      }
    }
  }, [pagination, searchParams, searchPropertiesWithFilters, getAllProperties]);

  const value = {
    properties,
    featuredProperties,
    currentProperty,
    loading,
    error,
    searchResults,
    pagination,
    getAllProperties,
    getFeaturedProperties,
    getPropertyById,
    searchPropertiesWithFilters,
    loadNextPage,
    loadPreviousPage
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};