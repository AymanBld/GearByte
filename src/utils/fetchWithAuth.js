const API_URL = 'http://localhost:8000/';
// const API_URL = 'http://gearbyte.onrender.com/';

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  // Set default headers
  const defaultHeaders = {
    'Authorization': `Token ${token}`,
  };

  // If sending JSON data, add Content-Type header
  if (options.body && !(options.body instanceof FormData)) {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  const headers = {
    ...defaultHeaders,
    ...options.headers,
  };

  const fetchOptions = {
    ...options,
    headers,
  };

  return await fetch(`${API_URL}${endpoint}`, fetchOptions);
};

export const fetchApi = async (endpoint, options = {}) => {
  const headers = {
    ...options.headers,
  };

  const fetchOptions = {
    ...options,
    headers,
  };

  return await fetch(`${API_URL}${endpoint}`, fetchOptions);
};
