import React, { useState } from 'react';
import axios from 'axios';

const FarmerProfileForm = () => {
  const [formData, setFormData] = useState({
    fname: '',
    mname: '',
    lname: '',
    location: '',
    contact: '',
    area: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/farmerprofileinfo/', formData);
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
          name="fname" 
          onChange={handleChange} 
          placeholder="First Name" 
          className="block w-full mt-1 p-2 border" 
        />
      </label>

      <label className="block mb-2">
        Middle Name:
        <input 
          type="text" 
          name="mname" 
          onChange={handleChange} 
          placeholder="Middle Name" 
          className="block w-full mt-1 p-2 border" 
        />
      </label>

      <label className="block mb-2">
        Last Name:
        <input 
          type="text" 
          name="lname" 
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
          name="contact" 
          onChange={handleChange} 
          placeholder="Contact" 
          className="block w-full mt-1 p-2 border" 
        />
      </label>

      <label className="block mb-2">
        Land Area:
        <input 
          type="number" 
          name="area" 
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
