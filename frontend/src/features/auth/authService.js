import axios from 'axios';

// Base API endpoint for user-related actions
const API_URL = '/api/users/';

// Accepts userData (FormData object), sends POST request to register a new user
// Stores user data in localStorage on success
const register = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  
  const response = await axios.post(API_URL, userData, config);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Accepts userData (email & password), sends POST request to login endpoint
// Stores user data in localStorage on success
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Retrieves user from localStorage and fetches user profile from backend using token
const getCurrentUser = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user) {
    return null;
  }

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const response = await axios.get(API_URL + 'me', config);
  return response.data;
};

// Removes user data from localStorage
const logout = () => {
  localStorage.removeItem('user');
};

// Export all authentication service functions
const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;
