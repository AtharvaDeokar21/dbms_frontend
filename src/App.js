import logo from './logo.svg';
import './App.css';

import FertilizerPesticideForm from './components/FertilizerPesticideForm';
import GrowForm from './components/GrowForm';
import ManageCropForm from './components/ManageCropForm';
import { BrowserRouter as Router, Route, Switch, Routes, BrowserRouter } from 'react-router-dom';
import FarmerProfileForm from './components/FarmerProfileForm';
import SalesForm from './components/SalesForm';
import CropForm from './components/CropForm';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>  
          <Route path="/farmer" element={<FarmerProfileForm />} />
          <Route path="/fertilizers" element={<FertilizerPesticideForm />} />
          <Route path="/grows" element={<GrowForm />} />
          <Route path="/managecrops" element={<ManageCropForm />} />
          <Route path="/sales" element={<SalesForm />} />
          <Route path="/crops" element={<CropForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    
    
  );
}

export default App;
