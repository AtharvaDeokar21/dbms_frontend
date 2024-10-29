import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GrowForm = () => {
  const [farmers, setFarmers] = useState([]);
  const [crops, setCrops] = useState([]);
  const [formData, setFormData] = useState({
    farmer_id: '',
    crop_id: ''
  });

  useEffect(() => {
    const fetchFarmersAndCrops = async () => {
      try {
        const farmerResponse = await axios.get('http://localhost:8000/api/farmerprofileinfo/');
        setFarmers(farmerResponse.data);

        const cropResponse = await axios.get('http://localhost:8000/api/cropinfo/');
        setCrops(cropResponse.data);
      } catch (error) {
        console.error("Failed to fetch farmers or crops", error);
      }
    };

    fetchFarmersAndCrops();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/grows/', formData);
      alert("Grow record submitted!");
    } catch (error) {
      console.error("Error submitting grow record", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Grows Record</h2>
      
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
        Crop:
        <select name="crop_id" onChange={handleChange} className="block w-full mt-1 p-2 border">
          <option value="">Select Crop</option>
          {crops.map(crop => (
            <option key={crop.id} value={crop.id}>{crop.name}</option>
          ))}
        </select>
      </label>

      <button type="submit" className="mt-4 p-2 bg-blue-500 text-white">Submit</button>
    </form>
  );
};

export default GrowForm;
