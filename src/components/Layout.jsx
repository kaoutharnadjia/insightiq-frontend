import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Activity } from 'lucide-react';

const Layout = ({ children, erpType, title }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0F172A] p-6 md:p-10 font-sans text-gray-300">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center space-x-6">
            {title !== 'Dashboard Hub' && (
              <button 
                onClick={() => navigate('/')}
                className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all group"
              >
                <ArrowLeft className="text-indigo-400 group-hover:-translate-x-1 transition-transform" />
              </button>
            )}
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <h1 className="text-4xl font-black text-white tracking-tight">{title}</h1>
                <div className="h-10 w-10 bg-white rounded-lg p-1 flex items-center justify-center border border-white/10">
                   <img 
                      src={`/${erpType}-logo.${erpType === 'odoo' ? 'png' : 'webp'}`} 
                      alt={erpType} 
                      className="max-h-full max-w-full object-contain"
                   />
                </div>
              </div>
              <p className="text-indigo-400/60 font-medium uppercase tracking-widest text-[10px] flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>InsightIQ • {erpType} Systems</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl flex items-center space-x-4">
              <Activity className="text-indigo-400" size={20} />
              <span className="text-sm font-bold text-white">AI Engine: Active</span>
            </div>
          </div>
        </header>

        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
