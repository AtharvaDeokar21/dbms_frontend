import React, { useState } from 'react';
import axios from 'axios';

const FertilizerPesticideForm = () => {
  const [formData, setFormData] = useState({
    product_name: '',
    type: '', // Changed to store the selected type (Fertilizer or Pesticide)
    cost: '',
    quantity_used: ''
  });

  const handleChange = (e) => {
    // Check if the input is for the type and update accordingly
    if (e.target.name === 'type') {
      setFormData({ ...formData, type: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData); // Log the form data to the console
    try {
    //   await axios.post('http://localhost:8000/api/fertilizer-pesticide-info/', formData);
      alert("Fertilizer/Pesticide record submitted!");
      // Clear the form data after submission
      setFormData({
        product_name: '',
        type: '',
        cost: '',
        quantity_used: ''
      });
    } catch (error) {
      console.error("Error submitting fertilizer/pesticide record", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Fertilizer/Pesticide Information</h2>

      <label className="block mb-2">
        Product Name:
        <input
          type="text"
          name="product_name"
          value={formData.product_name}
          onChange={handleChange}
          placeholder="Product Name"
          className="block w-full mt-1 p-2 border"
          required
        />
      </label>

      <fieldset className="mb-4">
        <legend className="mb-2">Type:</legend>
        <label className="inline-flex items-center mr-4">
          <input
            type="radio"
            name="type"
            value="Fertilizer"
            checked={formData.type === 'Fertilizer'}
            onChange={handleChange}
            className="form-radio"
          />
          <span className="ml-2">Fertilizer</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="type"
            value="Pesticide"
            checked={formData.type === 'Pesticide'}
            onChange={handleChange}
            className="form-radio"
          />
          <span className="ml-2">Pesticide</span>
        </label>
      </fieldset>

      <label className="block mb-2">
        Cost:
        <input
          type="number"
          name="cost"
          value={formData.cost}
          onChange={handleChange}
          placeholder="Cost"
          className="block w-full mt-1 p-2 border"
          required
        />
      </label>

      <label className="block mb-2">
        Quantity Used (kg):
        <input
          type="number"
          name="quantity_used"
          value={formData.quantity_used}
          onChange={handleChange}
          placeholder="Quantity Used"
          className="block w-full mt-1 p-2 border"
          required
        />
      </label>

      <button type="submit" className="mt-4 p-2 bg-blue-500 text-white">Submit</button>
    </form>
  );
};

export default FertilizerPesticideForm;
