import axios from 'axios';

const BASE_URL = 'https://api.jikan.moe/v4';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Jikan API has strict rate limits, adjust timeout if necessary
  timeout: 10000,
});

// Helper for handling errors
const handleRequest = async (request) => {
  try {
    const response = await request();
    return response.data.data;
  } catch (error) {
    console.error('API Error:', error.response?.data?.message || error.message);
    throw error;
  }
};

// API Services
export const api = {
  // Home Page Endpoints
  getTopAnime: () => handleRequest(() => apiClient.get('/top/anime?limit=15')),
  getTrendingMovies: () => handleRequest(() => apiClient.get('/top/anime?type=movie&limit=15')),
  getAiringAnime: () => handleRequest(() => apiClient.get('/top/anime?filter=airing&limit=15')),
  getUpcomingAnime: () => handleRequest(() => apiClient.get('/seasons/upcoming?limit=15')),
  
  // Search and Filter Endpoints
  searchAnime: (query, page = 1, type = '', status = '') => {
    let url = `/anime?q=${encodeURIComponent(query)}&page=${page}&limit=24`;
    if (type) url += `&type=${type}`;
    if (status) url += `&status=${status}`;
    // We return full response here because we need pagination data
    return apiClient.get(url).then(res => res.data);
  },
  
  // Details Page Endpoints
  getAnimeFullById: (id) => handleRequest(() => apiClient.get(`/anime/${id}/full`)),
  getAnimeCharacters: (id) => handleRequest(() => apiClient.get(`/anime/${id}/characters`)),
  getAnimeRecommendations: (id) => handleRequest(() => apiClient.get(`/anime/${id}/recommendations`)),
  
  // Other Endpoints
  getRandomAnime: () => handleRequest(() => apiClient.get('/random/anime')),
  getGenres: () => handleRequest(() => apiClient.get('/genres/anime')),
};
