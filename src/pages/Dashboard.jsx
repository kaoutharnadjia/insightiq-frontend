import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnalytics } from '../hooks/useAnalytics';
import Layout from '../components/Layout';
import { DollarSign, Package, CreditCard, Cog, ArrowRight, Star, TrendingUp } from 'lucide-react';
import ProcessingScreen from '../components/ProcessingScreen';

const Dashboard = ({ erpType }) => {
  const navigate = useNavigate();
  const { data, loading } = useAnalytics(erpType);

  if (loading) return <ProcessingScreen message="Synchronizing InsightIQ Hub" />;

  const systemInsight = data.insights.find(i => i.type === 'system') || { readiness: '98' };

  return (
    <Layout erpType={erpType} title="Dashboard">
      <div className="space-y-10 pb-10">
        {/* Hero Section */}
        <div className="relative glass-morphism-red rounded-[3rem] p-8 md:p-16 overflow-hidden group">
          {/* Graph Background Simulation */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="none">
              <path 
                d="M0 150 Q 100 130, 150 100 T 300 50 T 400 20" 
                fill="none" 
                stroke="#e61e3c" 
                strokeWidth="2"
                className="drop-shadow-[0_0_10px_rgba(230,30,60,0.8)]"
              />
              <circle cx="150" cy="100" r="4" fill="#e61e3c" className="animate-pulse" />
              <circle cx="300" cy="50" r="4" fill="#e61e3c" className="animate-pulse" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-8">
                <Star className="text-accent-red fill-accent-red" size={16} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
                  AI Readiness: <span className="text-white">{systemInsight.readiness}%</span>
                </span>
              </div>
              
              <h2 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-white">
                Your Business<br className="hidden md:block" />
                Intelligence,<br className="hidden md:block" />
                Decoded.
              </h2>
              
              <div className="w-12 h-1 bg-accent-red mb-8"></div>
              
              <p className="text-text-secondary font-medium text-sm md:text-base leading-relaxed max-w-md">
                Explore specialized insights optimized for your {erpType} environment. Choose a module below to deep dive into real-time analytics and predictive modeling.
              </p>
            </div>

            <div className="hidden md:flex flex-1 justify-end">
               <div className="grid grid-cols-2 gap-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-32 h-32 bg-white/5 rounded-3xl backdrop-blur-md border border-white/10 flex items-center justify-center animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
                       <div className="w-12 h-2 bg-accent-red/20 rounded-full"></div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Glossy Overlay */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none -skew-x-12 translate-x-1/2"></div>
        </div>

        {/* Explore Modules Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-xl font-black text-white">Explore Modules</h3>
            <button className="text-text-muted text-sm font-bold flex items-center space-x-2 hover:text-accent-red transition-colors">
              <span>View all</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ModuleCard 
              title="Sales"
              subtitle="Intelligence"
              desc="Track performance & revenue insights"
              icon={<TrendingUp size={24} />}
              onClick={() => navigate('/sales')}
            />
            <ModuleCard 
              title="Inventory"
              subtitle="Intelligence"
              desc="Optimize stock & reduce shortages"
              icon={<Package size={24} />}
              onClick={() => navigate('/inventory')}
            />
            <ModuleCard 
              title="Financial"
              subtitle="Intelligence"
              desc="Monitor cash flow & profitability"
              icon={<CreditCard size={24} />}
              onClick={() => navigate('/finance')}
            />
            <ModuleCard 
              title="Operations"
              subtitle="Intelligence"
              desc="Improve efficiency & productivity"
              icon={<Cog size={24} />}
              onClick={() => navigate('/support')}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

const ModuleCard = ({ title, subtitle, desc, icon, onClick }) => (
  <button 
    onClick={onClick}
    className="bg-bg-secondary border border-white/5 p-6 rounded-[2rem] text-left transition-all hover:border-accent-red/30 hover:glow-red group"
  >
    <div className="bg-accent-red/10 w-12 h-12 rounded-2xl flex items-center justify-center text-accent-red mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div className="mb-4">
      <h4 className="text-lg font-black text-white leading-tight">{title}</h4>
      <p className="text-xs font-bold text-white/40">{subtitle}</p>
    </div>
    <p className="text-[10px] text-text-muted font-medium mb-6 leading-snug">
      {desc}
    </p>
    <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-text-muted group-hover:bg-accent-red group-hover:text-white transition-all">
      <ArrowRight size={14} />
    </div>
  </button>
);

export default Dashboard;
