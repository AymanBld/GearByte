const API_URL = 'http://localhost:8000/';
// const API_URL = 'http://gearbyte.onrender.com/';

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

export const fetchApi = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const fetchOptions = {
    ...options,
    headers,
  };

  return await fetch(`${API_URL}${endpoint}`, fetchOptions);
};
