import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ConnectionScreen from './pages/ConnectionScreen';
import Dashboard from './pages/Dashboard';
import RevenuePage from './pages/RevenuePage';
import InventoryPage from './pages/InventoryPage';
import SupportPage from './pages/SupportPage';

function App() {
  const [erpType, setErpType] = useState(null);

  if (!erpType) {
    return <ConnectionScreen onConnect={(type) => setErpType(type)} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard erpType={erpType} />} />
        <Route path="/revenue" element={<RevenuePage erpType={erpType} />} />
        <Route path="/inventory" element={<InventoryPage erpType={erpType} />} />
        <Route path="/support" element={<SupportPage erpType={erpType} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
