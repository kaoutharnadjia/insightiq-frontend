import React, { useState } from 'react';
import axios from 'axios';
import { Database, Link2, CheckCircle, AlertCircle } from 'lucide-react';

const ConnectionScreen = ({ onConnect }) => {
  const [erpType, setErpType] = useState('odoo');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConnect = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`http://localhost:5001/api/connection?erpType=${erpType}`);
      if (res.data.status === 'Connected') {
        onConnect(erpType);
      }
    } catch (err) {
      setError('Failed to connect to ERP system. Please ensure the ERP server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-[#1E293B] rounded-3xl p-10 shadow-2xl border border-white/5">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-indigo-500/10 p-4 rounded-2xl mb-6">
            <Database className="text-indigo-400 w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">InsightIQ</h1>
          <p className="text-gray-400 text-center">Connect your AI agent to an ERP system to start generating predictions.</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 block">Select ERP System</label>
            <div className="grid grid-cols-1 gap-4">
              {[
                { id: 'odoo', label: 'Odoo', logo: '/odoo-logo.png' },
                { id: 'sap', label: 'SAP Business', logo: '/sap-logo.webp' },
                { id: 'oracle', label: 'Oracle ERP', logo: '/oracle-logo.webp' }
              ].map((erp) => (
                <button
                  key={erp.id}
                  onClick={() => setErpType(erp.id)}
                  className={`flex items-center space-x-4 p-4 rounded-2xl border-2 transition-all font-bold ${
                    erpType === erp.id 
                      ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400' 
                      : 'border-white/5 bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <div className="w-12 h-12 bg-white rounded-lg p-2 flex items-center justify-center overflow-hidden shrink-0">
                    <img src={erp.logo} alt={erp.label} className="max-w-full max-h-full object-contain" />
                  </div>
                  <span className="uppercase text-sm tracking-widest">{erp.label}</span>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center space-x-3">
              <AlertCircle size={20} />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <button
            onClick={handleConnect}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center space-x-3 group"
          >
            {loading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
            ) : (
              <>
                <Link2 className="group-hover:rotate-45 transition-transform" />
                <span>Connect InsightIQ</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionScreen;
