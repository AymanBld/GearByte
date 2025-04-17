const API_URL = 'http://localhost:8000/';

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`,
    ...options.headers,
  };

  const fetchOptions = {
    ...options,
    headers,
  };

  return await fetch(`${API_URL}${endpoint}`, fetchOptions);
};