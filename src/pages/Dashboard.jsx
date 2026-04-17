import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnalytics } from '../hooks/useAnalytics';
import Layout from '../components/Layout';
import { DollarSign, Package, MessageSquare, TrendingUp, ChevronRight, Star } from 'lucide-react';
import ProcessingScreen from '../components/ProcessingScreen';

const Dashboard = ({ erpType }) => {
  const navigate = useNavigate();
  const { data, loading } = useAnalytics(erpType);

  if (loading) return <ProcessingScreen message="Synchronizing InsightIQ Hub" />;

  return (
    <Layout erpType={erpType} title="InsightIQ Hub">
      <div className="space-y-12">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-[2.5rem] p-12 text-white relative overflow-hidden">
           <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                 <Star className="text-amber-300 fill-amber-300" size={24} />
                 <span className="font-black uppercase tracking-widest text-xs opacity-80">AI Readiness: 98%</span>
              </div>
              <h2 className="text-5xl font-black mb-4 leading-tight">Your Business Intelligence,<br />Decoded in Real-Time.</h2>
              <p className="text-indigo-100 font-medium text-lg max-w-xl opacity-90">
                 Explore specialized insights optimized for your {erpType} environment. Choose a module below to deep dive.
              </p>
           </div>
           <div className="absolute top-0 right-0 w-1/3 h-full bg-white/10 -skew-x-12 translate-x-1/2"></div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <NavCard 
              title="Sales & Revenue" 
              desc="Full financial transparency with predicted revenue growth." 
              icon={<DollarSign size={32} />} 
              color="emerald"
              onClick={() => navigate('/revenue')}
              stat={`$${data.kpis.totalSales.toLocaleString()}`}
           />
           <NavCard 
              title="Inventory Health" 
              desc="Smart stock management with preemptive reorder logic." 
              icon={<Package size={32} />} 
              color="blue"
              onClick={() => navigate('/inventory')}
              stat={`$${data.kpis.inventoryValue.toLocaleString()}`}
           />
           <NavCard 
              title="Customer Success" 
              desc="Experience analytics and support resolution bottlenecks." 
              icon={<MessageSquare size={32} />} 
              color="amber"
              onClick={() => navigate('/support')}
              stat={`${data.kpis.resolutionRate}% Rate`}
           />
        </div>

        {/* Quick Summary Row */}
        <div className="bg-[#1E293B] border border-white/5 rounded-3xl p-10 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center space-x-6">
              <div className="p-5 bg-indigo-500/10 rounded-3xl text-indigo-400">
                 <TrendingUp size={40} />
              </div>
              <div>
                 <p className="text-white font-bold text-2xl">Overall System Pulse</p>
                 <p className="text-gray-400 font-medium">All ERP-Connectors are operating at peak efficiency.</p>
              </div>
           </div>
           <div className="flex gap-12">
              <div className="text-center">
                 <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Active Insights</p>
                 <p className="text-3xl font-black text-white">{data.insights.length}</p>
              </div>
              <div className="text-center">
                 <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Sync Latency</p>
                 <p className="text-3xl font-black text-white">4ms</p>
              </div>
           </div>
        </div>
      </div>
    </Layout>
  );
};

const NavCard = ({ title, desc, icon, color, onClick, stat }) => (
  <button 
    onClick={onClick}
    className="bg-[#1E293B] p-10 rounded-[2.5rem] border border-white/5 text-left transition-all hover:scale-[1.02] hover:border-indigo-500/30 group relative overflow-hidden"
  >
    <div className={`absolute top-0 right-0 w-40 h-40 bg-${color}-500/5 blur-3xl -mr-20 -mt-20 group-hover:bg-indigo-500/10 transition-all`}></div>
    <div className={`w-20 h-20 bg-${color}-500/10 rounded-3xl flex items-center justify-center text-${color}-400 mb-8 mb-8 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-2xl font-black text-white mb-3 flex items-center justify-between">
      <span>{title}</span>
      <ChevronRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-indigo-400" />
    </h3>
    <p className="text-gray-400 font-medium mb-8 leading-relaxed">
      {desc}
    </p>
    <div className="pt-8 border-t border-white/5 flex flex-col">
       <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Live Metric</span>
       <span className="text-2xl font-black text-white">{stat}</span>
    </div>
  </button>
);

export default Dashboard;
