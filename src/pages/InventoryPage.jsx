import React from 'react';
import { useAnalytics } from '../hooks/useAnalytics';
import Layout from '../components/Layout';
import ProcessingScreen from '../components/ProcessingScreen';
import { Package, AlertTriangle, CheckCircle2, ArrowRight, BarChart3 } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import '../utils/chartSetup';
import { commonOptions } from '../utils/chartSetup';

const InventoryPage = ({ erpType }) => {
  const { data, loading } = useAnalytics(erpType);

  if (loading) return <ProcessingScreen message="Scanning Inventory Nodes" />;

  const inventoryInsights = data.insights.filter(i => i.type === 'inventory' || i.type === 'stockout');

  const chartData = {
    labels: ['Laptops', 'Monitors', 'Peripherals', 'Servers', 'Networking'],
    datasets: [{
      label: 'Stock Levels',
      data: [65, 45, 80, 25, 55],
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      borderColor: '#3b82f6',
      borderWidth: 2,
      borderRadius: 8,
    }]
  };

  return (
    <Layout erpType={erpType} title="Inventory Management">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#1E293B] p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-3xl -mr-32 -mt-32"></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">Inventory Assets Value</p>
                <h2 className="text-6xl font-black text-white">${data.kpis.inventoryValue.toLocaleString()}</h2>
              </div>
              <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-400">
                <Package size={32} />
              </div>
            </div>
          </div>

          <div className="bg-[#1E293B] p-8 rounded-[2.5rem] border border-white/5">
             <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-3">
               <BarChart3 className="text-blue-400" />
               <span>Stock Category Distribution</span>
             </h3>
             <div className="h-64">
                <Bar data={chartData} options={commonOptions} />
             </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center space-x-3">
              <AlertTriangle className="text-amber-400" />
              <span>Critical Overlays</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {inventoryInsights.map((insight, idx) => (
                 <div key={idx} className={`p-6 rounded-3xl border bg-white/5 border-white/10 hover:bg-white/10 transition-all ${insight.severity === 'high' ? 'border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.05)]' : ''}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-white font-bold">{insight.product}</h4>
                        <p className="text-indigo-400/60 text-xs mt-1">{insight.prediction}</p>
                      </div>
                      <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${insight.severity === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-gray-400'}`}>
                        {insight.severity}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-white text-[11px] font-bold bg-white/5 px-4 py-2 rounded-xl border border-white/5 w-fit">
                        <span>{insight.recommendation}</span>
                        <ArrowRight size={12} className="text-indigo-400" />
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-[#1E293B] p-8 rounded-[2.5rem] border border-white/5 space-y-8">
              <h3 className="text-white font-bold flex items-center space-x-2">
                 <CheckCircle2 size={18} className="text-emerald-400" />
                 <span>Logistics Compliance</span>
              </h3>
              <RiskItem label="Stockout Probability" percentage={75} color="bg-red-500" />
              <RiskItem label="Warehouse Capacity" percentage={88} color="bg-blue-500" />
              <RiskItem label="Supplier Delay" percentage={12} color="bg-emerald-500" />
           </div>

           <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white">
              <p className="font-black uppercase tracking-widest text-[10px] mb-2 opacity-80">Supply Chain Tip</p>
              <h4 className="font-bold text-lg mb-2">Enable Auto-Replenish</h4>
              <p className="text-sm text-indigo-100 opacity-90">Integrating your supplier portal with InsightIQ can reduce stockout risk by 45%.</p>
           </div>
        </div>
      </div>
    </Layout>
  );
};

const RiskItem = ({ label, percentage, color }) => (
  <div className="space-y-3">
    <div className="flex justify-between text-sm font-bold">
      <span className="text-gray-400">{label}</span>
      <span className="text-white">{percentage}%</span>
    </div>
    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
      <div className={`h-full ${color}`} style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);

export default InventoryPage;
