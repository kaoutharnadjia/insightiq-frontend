import React, { useState } from 'react';
import api from '../api/config';
import { Database, Link2, CheckCircle, AlertCircle } from 'lucide-react';

const ConnectionScreen = ({ onConnect }) => {
  const [erpType, setErpType] = useState('odoo');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConnect = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/api/connection?erpType=${erpType}`);
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
    <div className="min-h-screen bg-abyss flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-crimson-night rounded-3xl p-10 shadow-2xl border border-dark-rose glow-burgundy">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-burgundy/10 p-4 rounded-2xl mb-6 glow-crimson">
            <Database className="text-crimson w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold text-pearl mb-2 text-glow-pearl">InsightIQ</h1>
          <p className="text-dusty-rose text-center">Connect your AI agent to an ERP system to start generating predictions.</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-xs font-bold text-dusty-rose/60 uppercase tracking-widest mb-3 block">Select ERP System</label>
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
                      ? 'border-crimson bg-burgundy/20 text-crimson glow-crimson' 
                      : 'border-dark-rose bg-abyss text-dusty-rose hover:bg-dark-rose/20'
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
            <div className="bg-crimson/10 border border-crimson/20 text-crimson p-4 rounded-xl flex items-center space-x-3 glow-crimson">
              <AlertCircle size={20} />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <button
            onClick={handleConnect}
            disabled={loading}
            className="w-full bg-crimson hover:bg-burgundy disabled:opacity-50 text-pearl font-bold py-4 rounded-2xl transition-all shadow-lg glow-crimson flex items-center justify-center space-x-3 group"
          >
            {loading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-pearl"></span>
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
