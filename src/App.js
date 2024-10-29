import logo from './logo.svg';
import './App.css';

import FertilizerPesticideForm from './components/FertilizerPesticideForm';
import GrowForm from './components/GrowForm';
import ManageCropForm from './components/ManageCropForm';
import { BrowserRouter as Router, Route, Switch, Routes, BrowserRouter } from 'react-router-dom';
import FarmerProfileForm from './components/FarmerProfileForm';
import SalesForm from './components/SalesForm';
import CropForm from './components/CropForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>  
          <Route path="/farmer" element={<FarmerProfileForm />} />
          <Route path="/fertilizers-pesticides" element={<FertilizerPesticideForm />} />
          <Route path="/grows" element={<GrowForm />} />
          <Route path="/manage-crops" element={<ManageCropForm />} />
          <Route path="/sales" element={<SalesForm />} />
          <Route path="/crops" element={<CropForm />} />
      </Routes>
    </BrowserRouter>
    
    
  );
}

export default App;
