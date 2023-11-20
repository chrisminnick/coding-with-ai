// api code for making requests to the server
//
const API_URL = 'http://localhost:8081/api';

export const api = {
  // make a get request to the server
  get: async (url, token, postId) => {
    const response = await fetch(`${API_URL}/${url}/${postId ? postId : ''}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  },
  // make a post request to the server
  post: async (url, token, body) => {
    console.dir(`body: ${JSON.stringify(body)}`);
    const response = await fetch(`${API_URL}/${url}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  },
  // make a post request to the server for user signup
  signup: async (url, body) => {
    const response = await fetch(`${API_URL}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  },
  // make a post request to the server for user login
  login: async (body) => {
    const response = await fetch(`${API_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  },
  // make a post request to the server for user logout
  logout: async (token) => {
    const response = await fetch(`${API_URL}/user/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  },
  // make a put request to the server
  put: async (url, token, body) => {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body,
    });
    const data = await response.json();
    return data;
  },
  // make a delete request to the server
  delete: async (url, token) => {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  },
};
