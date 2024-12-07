const API_URL = 'https://pwadeployedvercel.vercel.app/api';
// const API_URL = 'https://localhost:5001/api';

export const api = {
  async login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  },

  async register(username, email, password) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    return response.json();
  },

  async toggleFavorite(movieData, token) {
    const response = await fetch(`${API_URL}/movies/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ movieData })
    });
    return response.json();
  },

  async getFavorites(token) {
    const response = await fetch(`${API_URL}/movies/favorites`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();
  }
};
