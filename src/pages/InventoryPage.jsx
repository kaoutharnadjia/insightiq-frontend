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

  // Guard clause
  if (!data || !data.insights) {
    return <Layout erpType={erpType} title="Inventory Management"><div className="p-10 text-center text-text-muted">No inventory data available</div></Layout>;
  }

  const inventoryInsights = data.insights.filter(i => i.type === 'inventory' || i.type === 'stockout');

  const chartData = {
    labels: ['Laptops', 'Monitors', 'Peripherals', 'Servers', 'Networking'],
    datasets: [{
      label: 'Stock Levels',
      data: [65, 45, 80, 25, 55],
      backgroundColor: 'rgba(90, 15, 28, 0.2)', // burgundy
      borderColor: '#5a0f1c',
      borderWidth: 2,
      borderRadius: 8,
    }]
  };

  return (
    <Layout erpType={erpType} title="Inventory Management">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-bg-secondary p-10 rounded-[2.5rem] border border-border-dark relative overflow-hidden group glow-red">
            <div className="absolute top-0 right-0 w-64 h-64 bg-burgundy/5 blur-3xl -mr-32 -mt-32"></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-text-muted text-xs font-black uppercase tracking-widest mb-2">Inventory Assets Value</p>
                <h2 className="text-6xl font-black text-text-primary text-glow-primary">{(Number(data.kpis.inventoryValue) || 0).toLocaleString()} DA</h2>
              </div>
              <div className="p-4 bg-burgundy/10 rounded-2xl text-accent-red glow-soft">
                <Package size={32} />
              </div>
            </div>
          </div>

          <div className="bg-bg-secondary p-8 rounded-[2.5rem] border border-border-dark glow-red">
             <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center space-x-3">
               <BarChart3 className="text-accent-red" />
               <span>Stock Category Distribution</span>
             </h3>
             <div className="h-64">
                <Bar data={chartData} options={commonOptions} />
             </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-text-primary flex items-center space-x-3">
              <AlertTriangle className="text-accent-soft" />
              <span>Critical Overlays</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {inventoryInsights.map((insight, idx) => (
                 <div key={idx} className={`p-6 rounded-3xl border bg-bg-secondary border-border-dark hover:bg-bg-card transition-all glow-red ${insight.severity === 'high' ? 'border-accent-red/50 glow-soft' : ''}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-text-primary font-bold">{insight.product || 'Unknown Product'}</h4>
                        <p className="text-text-secondary text-xs mt-1">{insight.prediction || 'No prediction available'}</p>
                      </div>
                      <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${insight.severity === 'high' ? 'bg-accent-red/20 text-accent-red' : 'bg-burgundy/20 text-text-secondary'}`}>
                        {insight.severity || 'low'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-text-primary text-[11px] font-bold bg-bg-main/50 px-4 py-2 rounded-xl border border-border-dark w-fit">
                        <span>{insight.recommendation || 'No recommendation'}</span>
                        <ArrowRight size={12} className="text-accent-red" />
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-bg-secondary p-8 rounded-[2.5rem] border border-border-dark space-y-8 glow-red">
              <h3 className="text-text-primary font-bold flex items-center space-x-2">
                <CheckCircle2 size={18} className="text-accent-red" />
                <span>Logistics Compliance</span>
              </h3>
              <RiskItem label="Stockout Probability" percentage={75} color="bg-accent-red" />
              <RiskItem label="Warehouse Capacity" percentage={88} color="bg-wine-red" />
              <RiskItem label="Supplier Delay" percentage={12} color="bg-burgundy" />
           </div>

           <div className="p-8 bg-gradient-to-br from-burgundy to-wine-red rounded-[2.5rem] text-text-primary glow-red">
              <p className="font-black uppercase tracking-widest text-[10px] mb-2 opacity-80">Supply Chain Tip</p>
              <h4 className="font-bold text-lg mb-4 text-glow-primary">Enable Auto-Replenish</h4>
              <p className="text-sm text-text-primary/80">Integrating your supplier portal with InsightIQ can reduce stockout risk by 45%.</p>
           </div>
        </div>
      </div>
    </Layout>
  );
};

const RiskItem = ({ label, percentage, color }) => (
  <div className="space-y-3">
    <div className="flex justify-between text-sm font-bold">
      <span className="text-text-secondary">{label || 'Unknown'}</span>
      <span className="text-text-primary">{percentage || 0}%</span>
    </div>
    <div className="h-1.5 bg-bg-main rounded-full overflow-hidden border border-border-dark">
      <div className={`h-full ${color || 'bg-accent-red'} glow-soft`} style={{ width: `${percentage || 0}%` }}></div>
    </div>
  </div>
);

export default InventoryPage;
