import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
axios.defaults.withCredentials = true
const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Logging in with:", formData); // For debugging purposes
    try {
      const response = await axios.post('http://localhost:8000/api/login/', formData, {
        withCredentials: true, // Ensures cookies are handled
      });
      
      console.log("Login successful:", response.data);
      // Store CSRF token for future requests
      const csrfToken = response.data.csrfToken;
      if (csrfToken) {
        Cookies.set('csrftoken', csrfToken); // Store CSRF token in cookies
      }

      // Handle additional success logic here, like redirecting
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error here (e.g., display error message)
    }
  };

  // Axios interceptor to attach CSRF token to every request
  axios.interceptors.request.use((config) => {
    const csrftoken = Cookies.get('csrftoken');
    if (csrftoken) {
      config.headers['X-CSRFToken'] = csrftoken;
    }
    return config;
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <label className="block mb-2">
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="block w-full p-2 border mt-1"
            required
          />
        </label>

        <label className="block mb-4">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="block w-full p-2 border mt-1"
            required
          />
        </label>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
