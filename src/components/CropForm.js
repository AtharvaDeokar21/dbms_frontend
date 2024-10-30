import React, { useState } from 'react';
import axios from 'axios';

const CropForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    estimated_yield: '',
    planting_date: '',
    harvesting_date: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/crops/', formData);
      alert("Crop record submitted!");
    } catch (error) {
      console.error("Error submitting crop record", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Crop Information</h2>

      <label className="block mb-2">
        Crop Name:
        <input type="text" name="name" onChange={handleChange} placeholder="Crop Name" className="block w-full mt-1 p-2 border" />
      </label>

      <label className="block mb-2">
        Estimated Yield (kg):
        <input type="number" name="estimated_yield" onChange={handleChange} placeholder="Estimated Yield" className="block w-full mt-1 p-2 border" />
      </label>

      <label className="block mb-2">
        Planting Date:
        <input type="date" name="planting_date" onChange={handleChange} className="block w-full mt-1 p-2 border" />
      </label>

      <label className="block mb-2">
        Harvesting Date:
        <input type="date" name="harvesting_date" onChange={handleChange} className="block w-full mt-1 p-2 border" />
      </label>

      <button type="submit" className="mt-4 p-2 bg-blue-500 text-white">Submit</button>
    </form>
  );
};

export default CropForm;
