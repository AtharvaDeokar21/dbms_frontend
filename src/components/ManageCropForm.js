import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageCropForm = () => {
  const [pesticides, setPesticides] = useState([]);
  const [crops, setCrops] = useState([]);
  const [formData, setFormData] = useState({
    pesticide_id: '',
    crop_id: ''
  });

  useEffect(() => {
    const fetchPesticidesAndCrops = async () => {
      try {
        const pesticideResponse = await axios.get('http://localhost:8000/api/fertilizer-pesticide-info/');
        setPesticides(pesticideResponse.data);

        const cropResponse = await axios.get('http://localhost:8000/api/cropinfo/');
        setCrops(cropResponse.data);
      } catch (error) {
        console.error("Failed to fetch pesticides or crops", error);
      }
    };

    fetchPesticidesAndCrops();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/managecrop/', formData);
      alert("Manage crop record submitted!");
    } catch (error) {
      console.error("Error submitting manage crop record", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Manage Crop Record</h2>
      
      <label className="block mb-2">
        Pesticide:
        <select name="pesticide_id" onChange={handleChange} className="block w-full mt-1 p-2 border">
          <option value="">Select Pesticide</option>
          {pesticides.map(pesticide => (
            <option key={pesticide.id} value={pesticide.id}>{pesticide.name}</option>
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

export default ManageCropForm;
