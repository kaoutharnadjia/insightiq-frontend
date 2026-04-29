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
        <div className="bg-gradient-to-r from-burgundy to-deep-wine rounded-[2.5rem] p-12 text-pearl relative overflow-hidden glow-burgundy">
           <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                 <Star className="text-antique-gold fill-antique-gold" size={24} />
                 <span className="font-black uppercase tracking-widest text-xs opacity-80">AI Readiness: 98%</span>
              </div>
              <h2 className="text-5xl font-black mb-4 leading-tight text-glow-pearl">Your Business Intelligence,<br />Decoded in Real-Time.</h2>
              <p className="text-pearl/80 font-medium text-lg max-w-xl">
                 Explore specialized insights optimized for your {erpType} environment. Choose a module below to deep dive.
              </p>
           </div>
           <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 -skew-x-12 translate-x-1/2"></div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <NavCard 
              title="Sales & Revenue" 
              desc="Full financial transparency with predicted revenue growth." 
              icon={<DollarSign size={32} />} 
              color="crimson"
              onClick={() => navigate('/revenue')}
              stat={`$${data.kpis.totalSales.toLocaleString()}`}
           />
           <NavCard 
              title="Inventory Health" 
              desc="Smart stock management with preemptive reorder logic." 
              icon={<Package size={32} />} 
              color="burgundy"
              onClick={() => navigate('/inventory')}
              stat={`$${data.kpis.inventoryValue.toLocaleString()}`}
           />
           <NavCard 
              title="Customer Success" 
              desc="Experience analytics and support resolution bottlenecks." 
              icon={<MessageSquare size={32} />} 
              color="antique-gold"
              onClick={() => navigate('/support')}
              stat={`${data.kpis.resolutionRate}% Rate`}
           />
        </div>

        {/* Quick Summary Row */}
        <div className="bg-crimson-night border border-dark-rose rounded-3xl p-10 flex flex-col md:flex-row justify-between items-center gap-8 glow-burgundy">
           <div className="flex items-center space-x-6">
              <div className="p-5 bg-burgundy/10 rounded-3xl text-crimson glow-crimson">
                 <TrendingUp size={40} />
              </div>
              <div>
                 <p className="text-pearl font-bold text-2xl">Overall System Pulse</p>
                 <p className="text-dusty-rose font-medium">All ERP-Connectors are operating at peak efficiency.</p>
              </div>
           </div>
           <div className="flex gap-12">
              <div className="text-center">
                 <p className="text-dusty-rose text-[10px] font-black uppercase tracking-[0.2em] mb-1">Active Insights</p>
                 <p className="text-3xl font-black text-pearl text-glow-pearl">{data.insights.length}</p>
              </div>
              <div className="text-center">
                 <p className="text-dusty-rose text-[10px] font-black uppercase tracking-[0.2em] mb-1">Sync Latency</p>
                 <p className="text-3xl font-black text-pearl text-glow-pearl">4ms</p>
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
    className="bg-crimson-night p-10 rounded-[2.5rem] border border-dark-rose text-left transition-all hover:scale-[1.02] hover:border-burgundy/50 group relative overflow-hidden glow-burgundy hover:glow-crimson"
  >
    <div className={`absolute top-0 right-0 w-40 h-40 bg-${color}/5 blur-3xl -mr-20 -mt-20 group-hover:bg-crimson/10 transition-all`}></div>
    <div className={`w-20 h-20 bg-${color === 'antique-gold' ? 'antique-gold' : color}/10 rounded-3xl flex items-center justify-center text-${color === 'antique-gold' ? 'antique-gold' : color} mb-8 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-2xl font-black text-pearl mb-3 flex items-center justify-between">
      <span>{title}</span>
      <ChevronRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-crimson" />
    </h3>
    <p className="text-dusty-rose font-medium mb-8 leading-relaxed">
      {desc}
    </p>
    <div className="flex items-center justify-between pt-6 border-t border-dark-rose">
      <span className="text-xs font-black uppercase tracking-widest text-dusty-rose/50">KPI Overview</span>
      <span className={`text-xl font-black text-${color === 'antique-gold' ? 'antique-gold' : color}`}>{stat}</span>
    </div>
  </button>
);

export default Dashboard;
