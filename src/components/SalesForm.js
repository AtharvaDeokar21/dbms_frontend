import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesForm = () => {
  const [crops, setCrops] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [formData, setFormData] = useState({
    crop_id: '',
    farmer_id: '',
    quantity_sold: '',
    date_of_sale: '',
    price_per_unit: ''
  });

  useEffect(() => {
    const fetchCropsAndFarmers = async () => {
      try {
        const cropResponse = await axios.get('http://localhost:8000/api/crops/');
        setCrops(cropResponse.data);

        const farmerResponse = await axios.get('http://localhost:8000/api/farmers/');
        setFarmers(farmerResponse.data);
      } catch (error) {
        console.error("Failed to fetch crops or farmers", error);
      }
    };

    fetchCropsAndFarmers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/market-data/', formData);
      alert("Sale record submitted!");
    } catch (error) {
      console.error("Error submitting sale record", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Sale Information</h2>

      <label className="block mb-2">
        Crop:
        <select name="crop_id" onChange={handleChange} className="block w-full mt-1 p-2 border">
          <option value="">Select Crop</option>
          {crops.map(crop => (
            <option key={crop.id} value={crop.id}>{crop.name}</option>
          ))}
        </select>
      </label>

      <label className="block mb-2">
        Farmer:
        <select name="farmer_id" onChange={handleChange} className="block w-full mt-1 p-2 border">
          <option value="">Select Farmer</option>
          {farmers.map(farmer => (
            <option key={farmer.id} value={farmer.id}>{farmer.name}</option>
          ))}
        </select>
      </label>

      <label className="block mb-2">
        Quantity Sold:
        <input type="number" name="quantity_sold" onChange={handleChange} placeholder="Quantity Sold" className="block w-full mt-1 p-2 border" />
      </label>

      <label className="block mb-2">
        Date of Sale:
        <input type="date" name="date_of_sale" onChange={handleChange} className="block w-full mt-1 p-2 border" />
      </label>

      <label className="block mb-2">
        Price per Unit:
        <input type="number" name="price_per_unit" onChange={handleChange} placeholder="Price per Unit" className="block w-full mt-1 p-2 border" />
      </label>

      <button type="submit" className="mt-4 p-2 bg-blue-500 text-white">Submit</button>
    </form>
  );
};

export default SalesForm;
