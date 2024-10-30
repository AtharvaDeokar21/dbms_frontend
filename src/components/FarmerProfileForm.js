import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
axios.defaults.withCredentials = true;
const FarmerProfileForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    location: '',
    phone_number: '',
    land_area: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    // Fetch the CSRF token
    const csrftoken = Cookies.get('csrftoken');
    console.log("CSRF Token:", csrftoken);
    console.log("session id: ", Cookies.get('sessionid'));
    console.log("Submitting Farmer Profile with data:", formData);
    // if (!Cookies.get('sessionid')) {
    //   alert("User not authenticated. Please log in.");
    //   return;
    // }
    try {
      await axios.post('http://localhost:8000/api/farmers/', formData, {
        headers: {
          'X-CSRFToken': csrftoken,  // Add the CSRF token to the headers
        },
        withCredentials: true,  // This includes cookies with the request
      });
      alert("Farmer Profile Submitted!");
    } catch (error) {
      console.error("Error submitting farmer profile", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Farmer Profile</h2>

      <label className="block mb-2">
        First Name:
        <input 
          type="text" 
          name="first_name" 
          onChange={handleChange} 
          placeholder="First Name" 
          className="block w-full mt-1 p-2 border" 
        />
      </label>

      <label className="block mb-2">
        Middle Name:
        <input 
          type="text" 
          name="middle_name" 
          onChange={handleChange} 
          placeholder="Middle Name" 
          className="block w-full mt-1 p-2 border" 
        />
      </label>

      <label className="block mb-2">
        Last Name:
        <input 
          type="text" 
          name="last_name" 
          onChange={handleChange} 
          placeholder="Last Name" 
          className="block w-full mt-1 p-2 border" 
        />
      </label>

      <label className="block mb-2">
        Location:
        <input 
          type="text" 
          name="location" 
          onChange={handleChange} 
          placeholder="Location" 
          className="block w-full mt-1 p-2 border" 
        />
      </label>

      <label className="block mb-2">
        Contact:
        <input 
          type="number" 
          name="phone_number" 
          onChange={handleChange} 
          placeholder="Contact" 
          className="block w-full mt-1 p-2 border" 
        />
      </label>

      <label className="block mb-2">
        Land Area:
        <input 
          type="number" 
          name="land_area" 
          onChange={handleChange} 
          placeholder="Land Area" 
          className="block w-full mt-1 p-2 border" 
        />
      </label>

      <button type="submit" className="mt-4 p-2 bg-blue-500 text-white">Submit</button>
    </form>
  );
};

export default FarmerProfileForm;
