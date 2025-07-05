/**
 * API Service
 * Centralized file for all API calls to the backend
 */
import axios from 'axios';

// Create axios instance with base URL
const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authorization header interceptor
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/users', userData),
  login: (userData) => api.post('/users/login', userData),
  getUserProfile: () => api.get('/users/profile'),
  updateUserProfile: (userData) => api.put('/users/profile', userData),
};

// Product API calls
export const productAPI = {
  // Public routes
  getProducts: (keyword = '', pageNumber = '', category = '', minPrice, maxPrice) => {
    let url = `/products?keyword=${keyword}&pageNumber=${pageNumber}`;
    if (category) url += `&category=${category}`;
    if (minPrice) url += `&minPrice=${minPrice}`;
    if (maxPrice) url += `&maxPrice=${maxPrice}`;
    return api.get(url);
  },
  getProductById: (id) => api.get(`/products/${id}`),
  createProductReview: (productId, review) => api.post(`/products/${productId}/reviews`, review),
  getTopProducts: (limit) => api.get(`/products/top?limit=${limit || 5}`),
  getFeaturedProducts: (limit) => api.get(`/products/featured?limit=${limit || 5}`),

  // Admin routes
  createProduct: (productData) => {
    return api.post(`/products`, productData);
  },
  updateProduct: (id, productData) => {
    return api.put(`/products/${id}`, productData);
  },
  deleteProduct: (id) => {
    return api.delete(`/products/${id}`);
  }
};

// Service API for astrology, numerology, and vastu services
export const serviceAPI = {
  // Public routes
  getServices: async (params = {}) => {
    const { category, featured, limit, page, search } = params;
    let url = '/services?';
    
    if (category) url += `category=${category}&`;
    if (featured) url += `featured=${featured}&`;
    if (limit) url += `limit=${limit}&`;
    if (page) url += `page=${page}&`;
    if (search) url += `search=${encodeURIComponent(search)}&`;
    
    return api.get(url);
  },
  getServiceById: async (id) => api.get(`/services/id/${id}`),
  getServiceBySlug: async (slug) => api.get(`/services/slug/${slug}`),
  
  // Admin routes
  createService: async (serviceData) => {
    // Get auth token from localStorage
    const userInfo = localStorage.getItem('userInfo');
    let headers = {};
    
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return api.post('/services', serviceData, { headers });
  },
  updateService: async (id, serviceData) => {
    return api.put(`/services/${id}`, serviceData);
  },
  deleteService: async (id) => {
    return api.delete(`/services/${id}`);
  },
  updateServiceFAQs: async (id, faqs) => {
    return api.put(`/services/${id}/faqs`, { faqs });
  }
};

// Order API calls
export const orderAPI = {
  // Customer routes
  createOrder: (order) => api.post('/orders', order),
  getOrderById: (id) => api.get(`/orders/${id}`),
  updateOrderToPaid: (id, paymentResult) => api.put(`/orders/${id}/pay`, paymentResult),
  getMyOrders: () => api.get('/orders/myorders'),
  
  // Admin routes
  getAllOrders: () => api.get('/orders'),
  updateOrderStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
  deleteOrder: (id) => api.delete(`/orders/${id}`)
};

// Cart API calls
export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (productId, quantity) => api.post('/cart', { productId, quantity }),
  updateCartItem: (itemId, quantity) => api.put(`/cart/${itemId}`, { quantity }),
  removeFromCart: (itemId) => api.delete(`/cart/${itemId}`),
  clearCart: () => api.delete('/cart'),
};

// Payment API calls
export const paymentAPI = {
  createPaymentIntent: (amount) => api.post('/payments/create-payment-intent', { amount }),
  verifyPayment: (paymentId) => api.post('/payments/verify', { paymentId }),
  getPaymentMethods: () => api.get('/payments/methods'),
};

export default api;
